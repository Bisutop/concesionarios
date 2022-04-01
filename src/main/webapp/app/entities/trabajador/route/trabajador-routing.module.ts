import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TrabajadorComponent } from '../list/trabajador.component';
import { TrabajadorDetailComponent } from '../detail/trabajador-detail.component';
import { TrabajadorUpdateComponent } from '../update/trabajador-update.component';
import { TrabajadorRoutingResolveService } from './trabajador-routing-resolve.service';

const trabajadorRoute: Routes = [
  {
    path: '',
    component: TrabajadorComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TrabajadorDetailComponent,
    resolve: {
      trabajador: TrabajadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TrabajadorUpdateComponent,
    resolve: {
      trabajador: TrabajadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TrabajadorUpdateComponent,
    resolve: {
      trabajador: TrabajadorRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trabajadorRoute)],
  exports: [RouterModule],
})
export class TrabajadorRoutingModule {}
