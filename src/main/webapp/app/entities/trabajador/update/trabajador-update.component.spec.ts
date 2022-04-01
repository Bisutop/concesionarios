import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { TrabajadorService } from '../service/trabajador.service';
import { ITrabajador, Trabajador } from '../trabajador.model';

import { TrabajadorUpdateComponent } from './trabajador-update.component';

describe('Trabajador Management Update Component', () => {
  let comp: TrabajadorUpdateComponent;
  let fixture: ComponentFixture<TrabajadorUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let trabajadorService: TrabajadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [TrabajadorUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TrabajadorUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TrabajadorUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    trabajadorService = TestBed.inject(TrabajadorService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const trabajador: ITrabajador = { id: 456 };

      activatedRoute.data = of({ trabajador });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(trabajador));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trabajador>>();
      const trabajador = { id: 123 };
      jest.spyOn(trabajadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trabajador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trabajador }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(trabajadorService.update).toHaveBeenCalledWith(trabajador);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trabajador>>();
      const trabajador = new Trabajador();
      jest.spyOn(trabajadorService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trabajador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: trabajador }));
      saveSubject.complete();

      // THEN
      expect(trabajadorService.create).toHaveBeenCalledWith(trabajador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Trabajador>>();
      const trabajador = { id: 123 };
      jest.spyOn(trabajadorService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ trabajador });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(trabajadorService.update).toHaveBeenCalledWith(trabajador);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
