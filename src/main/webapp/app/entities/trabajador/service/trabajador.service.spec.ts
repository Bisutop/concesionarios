import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ITrabajador, Trabajador } from '../trabajador.model';

import { TrabajadorService } from './trabajador.service';

describe('Trabajador Service', () => {
  let service: TrabajadorService;
  let httpMock: HttpTestingController;
  let elemDefault: ITrabajador;
  let expectedResult: ITrabajador | ITrabajador[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(TrabajadorService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      dni: 'AAAAAAA',
      nombre: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Trabajador', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Trabajador()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Trabajador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dni: 'BBBBBB',
          nombre: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Trabajador', () => {
      const patchObject = Object.assign(
        {
          nombre: 'BBBBBB',
        },
        new Trabajador()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Trabajador', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          dni: 'BBBBBB',
          nombre: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Trabajador', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addTrabajadorToCollectionIfMissing', () => {
      it('should add a Trabajador to an empty array', () => {
        const trabajador: ITrabajador = { id: 123 };
        expectedResult = service.addTrabajadorToCollectionIfMissing([], trabajador);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trabajador);
      });

      it('should not add a Trabajador to an array that contains it', () => {
        const trabajador: ITrabajador = { id: 123 };
        const trabajadorCollection: ITrabajador[] = [
          {
            ...trabajador,
          },
          { id: 456 },
        ];
        expectedResult = service.addTrabajadorToCollectionIfMissing(trabajadorCollection, trabajador);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Trabajador to an array that doesn't contain it", () => {
        const trabajador: ITrabajador = { id: 123 };
        const trabajadorCollection: ITrabajador[] = [{ id: 456 }];
        expectedResult = service.addTrabajadorToCollectionIfMissing(trabajadorCollection, trabajador);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trabajador);
      });

      it('should add only unique Trabajador to an array', () => {
        const trabajadorArray: ITrabajador[] = [{ id: 123 }, { id: 456 }, { id: 3888 }];
        const trabajadorCollection: ITrabajador[] = [{ id: 123 }];
        expectedResult = service.addTrabajadorToCollectionIfMissing(trabajadorCollection, ...trabajadorArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const trabajador: ITrabajador = { id: 123 };
        const trabajador2: ITrabajador = { id: 456 };
        expectedResult = service.addTrabajadorToCollectionIfMissing([], trabajador, trabajador2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(trabajador);
        expect(expectedResult).toContain(trabajador2);
      });

      it('should accept null and undefined values', () => {
        const trabajador: ITrabajador = { id: 123 };
        expectedResult = service.addTrabajadorToCollectionIfMissing([], null, trabajador, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(trabajador);
      });

      it('should return initial array if no Trabajador is added', () => {
        const trabajadorCollection: ITrabajador[] = [{ id: 123 }];
        expectedResult = service.addTrabajadorToCollectionIfMissing(trabajadorCollection, undefined, null);
        expect(expectedResult).toEqual(trabajadorCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
