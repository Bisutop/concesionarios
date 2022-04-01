import { IModelo } from 'app/entities/modelo/modelo.model';

export interface ICoche {
  id?: number;
  matricula?: string;
  color?: string;
  anyo?: number;
  potencia?: number;
  modelo?: IModelo;
}

export class Coche implements ICoche {
  constructor(
    public id?: number,
    public matricula?: string,
    public color?: string,
    public anyo?: number,
    public potencia?: number,
    public modelo?: IModelo
  ) {}
}

export function getCocheIdentifier(coche: ICoche): number | undefined {
  return coche.id;
}
