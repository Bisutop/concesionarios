import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { TrabajadorComponent } from './list/trabajador.component';
import { TrabajadorDetailComponent } from './detail/trabajador-detail.component';
import { TrabajadorUpdateComponent } from './update/trabajador-update.component';
import { TrabajadorDeleteDialogComponent } from './delete/trabajador-delete-dialog.component';
import { TrabajadorRoutingModule } from './route/trabajador-routing.module';

@NgModule({
  imports: [SharedModule, TrabajadorRoutingModule],
  declarations: [TrabajadorComponent, TrabajadorDetailComponent, TrabajadorUpdateComponent, TrabajadorDeleteDialogComponent],
  entryComponents: [TrabajadorDeleteDialogComponent],
})
export class TrabajadorModule {}
