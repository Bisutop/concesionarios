import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IVenta, Venta } from '../venta.model';
import { VentaService } from '../service/venta.service';
import { ICoche } from 'app/entities/coche/coche.model';
import { CocheService } from 'app/entities/coche/service/coche.service';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ClienteService } from 'app/entities/cliente/service/cliente.service';
import { ITrabajador } from 'app/entities/trabajador/trabajador.model';
import { TrabajadorService } from 'app/entities/trabajador/service/trabajador.service';

@Component({
  selector: 'jhi-venta-update',
  templateUrl: './venta-update.component.html',
})
export class VentaUpdateComponent implements OnInit {
  isSaving = false;

  matricula_cochesCollection: ICoche[] = [];
  clientesSharedCollection: ICliente[] = [];
  trabajadorsSharedCollection: ITrabajador[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    matricula_coche: [null, Validators.required],
    cliente: [null, Validators.required],
    trabajador: [null, Validators.required],
  });

  constructor(
    protected ventaService: VentaService,
    protected cocheService: CocheService,
    protected clienteService: ClienteService,
    protected trabajadorService: TrabajadorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venta }) => {
      this.updateForm(venta);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const venta = this.createFromForm();
    if (venta.id !== undefined) {
      this.subscribeToSaveResponse(this.ventaService.update(venta));
    } else {
      this.subscribeToSaveResponse(this.ventaService.create(venta));
    }
  }

  trackCocheById(index: number, item: ICoche): number {
    return item.id!;
  }

  trackClienteById(index: number, item: ICliente): number {
    return item.id!;
  }

  trackTrabajadorById(index: number, item: ITrabajador): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenta>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(venta: IVenta): void {
    this.editForm.patchValue({
      id: venta.id,
      fecha: venta.fecha,
      matricula_coche: venta.matricula_coche,
      cliente: venta.cliente,
      trabajador: venta.trabajador,
    });

    this.matricula_cochesCollection = this.cocheService.addCocheToCollectionIfMissing(
      this.matricula_cochesCollection,
      venta.matricula_coche
    );
    this.clientesSharedCollection = this.clienteService.addClienteToCollectionIfMissing(this.clientesSharedCollection, venta.cliente);
    this.trabajadorsSharedCollection = this.trabajadorService.addTrabajadorToCollectionIfMissing(
      this.trabajadorsSharedCollection,
      venta.trabajador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cocheService
      .query({ filter: 'venta-is-null' })
      .pipe(map((res: HttpResponse<ICoche[]>) => res.body ?? []))
      .pipe(map((coches: ICoche[]) => this.cocheService.addCocheToCollectionIfMissing(coches, this.editForm.get('matricula_coche')!.value)))
      .subscribe((coches: ICoche[]) => (this.matricula_cochesCollection = coches));

    this.clienteService
      .query()
      .pipe(map((res: HttpResponse<ICliente[]>) => res.body ?? []))
      .pipe(
        map((clientes: ICliente[]) => this.clienteService.addClienteToCollectionIfMissing(clientes, this.editForm.get('cliente')!.value))
      )
      .subscribe((clientes: ICliente[]) => (this.clientesSharedCollection = clientes));

    this.trabajadorService
      .query()
      .pipe(map((res: HttpResponse<ITrabajador[]>) => res.body ?? []))
      .pipe(
        map((trabajadors: ITrabajador[]) =>
          this.trabajadorService.addTrabajadorToCollectionIfMissing(trabajadors, this.editForm.get('trabajador')!.value)
        )
      )
      .subscribe((trabajadors: ITrabajador[]) => (this.trabajadorsSharedCollection = trabajadors));
  }

  protected createFromForm(): IVenta {
    return {
      ...new Venta(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      matricula_coche: this.editForm.get(['matricula_coche'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      trabajador: this.editForm.get(['trabajador'])!.value,
    };
  }
}
