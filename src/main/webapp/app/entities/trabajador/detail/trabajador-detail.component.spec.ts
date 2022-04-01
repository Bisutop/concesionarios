import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TrabajadorDetailComponent } from './trabajador-detail.component';

describe('Trabajador Management Detail Component', () => {
  let comp: TrabajadorDetailComponent;
  let fixture: ComponentFixture<TrabajadorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrabajadorDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ trabajador: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(TrabajadorDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(TrabajadorDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load trabajador on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.trabajador).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
