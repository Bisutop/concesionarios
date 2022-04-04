import { Component,  } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IVenta } from '../venta.model';
import { VentaService } from '../service/venta.service';

@Component({
  templateUrl: './venta-detail.component.html',
})
export class VentaDetailComponent {
  venta?: IVenta;

  constructor(protected ventaService: VentaService, protected activeModal: NgbActiveModal) {}


  cancel(): void {
    this.activeModal.dismiss
  }

  confirmVisto(id: number): void {
    this.ventaService.find(id).subscribe(() => {
      this.activeModal.close('visto');
    });
  }




}
