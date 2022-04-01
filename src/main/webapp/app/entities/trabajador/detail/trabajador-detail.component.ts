import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITrabajador } from '../trabajador.model';

@Component({
  selector: 'jhi-trabajador-detail',
  templateUrl: './trabajador-detail.component.html',
})
export class TrabajadorDetailComponent implements OnInit {
  trabajador: ITrabajador | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ trabajador }) => {
      this.trabajador = trabajador;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
