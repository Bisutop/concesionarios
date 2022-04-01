import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ITrabajador, Trabajador } from '../trabajador.model';
import { TrabajadorService } from '../service/trabajador.service';

@Injectable({ providedIn: 'root' })
export class TrabajadorRoutingResolveService implements Resolve<ITrabajador> {
  constructor(protected service: TrabajadorService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITrabajador> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((trabajador: HttpResponse<Trabajador>) => {
          if (trabajador.body) {
            return of(trabajador.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Trabajador());
  }
}
