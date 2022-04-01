import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITrabajador, Trabajador } from '../trabajador.model';
import { TrabajadorService } from '../service/trabajador.service';

@Component({
  selector: 'jhi-trabajador-update',
  templateUrl: './trabajador-update.component.html',
})
export class TrabajadorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    dni: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
  });

  constructor(protected trabajadorService: TrabajadorService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trabajador }) => {
      this.updateForm(trabajador);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const trabajador = this.createFromForm();
    if (trabajador.id !== undefined) {
      this.subscribeToSaveResponse(this.trabajadorService.update(trabajador));
    } else {
      this.subscribeToSaveResponse(this.trabajadorService.create(trabajador));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITrabajador>>): void {
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

  protected updateForm(trabajador: ITrabajador): void {
    this.editForm.patchValue({
      id: trabajador.id,
      dni: trabajador.dni,
      nombre: trabajador.nombre,
    });
  }

  protected createFromForm(): ITrabajador {
    return {
      ...new Trabajador(),
      id: this.editForm.get(['id'])!.value,
      dni: this.editForm.get(['dni'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
    };
  }
}
