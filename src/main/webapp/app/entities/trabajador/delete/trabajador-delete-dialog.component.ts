import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITrabajador } from '../trabajador.model';
import { TrabajadorService } from '../service/trabajador.service';

@Component({
  templateUrl: './trabajador-delete-dialog.component.html',
})
export class TrabajadorDeleteDialogComponent {
  trabajador?: ITrabajador;

  constructor(protected trabajadorService: TrabajadorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.trabajadorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
