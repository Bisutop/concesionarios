import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITrabajador, getTrabajadorIdentifier } from '../trabajador.model';

export type EntityResponseType = HttpResponse<ITrabajador>;
export type EntityArrayResponseType = HttpResponse<ITrabajador[]>;

@Injectable({ providedIn: 'root' })
export class TrabajadorService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/trabajadors');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(trabajador: ITrabajador): Observable<EntityResponseType> {
    return this.http.post<ITrabajador>(this.resourceUrl, trabajador, { observe: 'response' });
  }

  update(trabajador: ITrabajador): Observable<EntityResponseType> {
    return this.http.put<ITrabajador>(`${this.resourceUrl}/${getTrabajadorIdentifier(trabajador) as number}`, trabajador, {
      observe: 'response',
    });
  }

  partialUpdate(trabajador: ITrabajador): Observable<EntityResponseType> {
    return this.http.patch<ITrabajador>(`${this.resourceUrl}/${getTrabajadorIdentifier(trabajador) as number}`, trabajador, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrabajador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrabajador[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTrabajadorToCollectionIfMissing(
    trabajadorCollection: ITrabajador[],
    ...trabajadorsToCheck: (ITrabajador | null | undefined)[]
  ): ITrabajador[] {
    const trabajadors: ITrabajador[] = trabajadorsToCheck.filter(isPresent);
    if (trabajadors.length > 0) {
      const trabajadorCollectionIdentifiers = trabajadorCollection.map(trabajadorItem => getTrabajadorIdentifier(trabajadorItem)!);
      const trabajadorsToAdd = trabajadors.filter(trabajadorItem => {
        const trabajadorIdentifier = getTrabajadorIdentifier(trabajadorItem);
        if (trabajadorIdentifier == null || trabajadorCollectionIdentifiers.includes(trabajadorIdentifier)) {
          return false;
        }
        trabajadorCollectionIdentifiers.push(trabajadorIdentifier);
        return true;
      });
      return [...trabajadorsToAdd, ...trabajadorCollection];
    }
    return trabajadorCollection;
  }
}
