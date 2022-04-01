import { IMarca } from 'app/entities/marca/marca.model';

export interface IModelo {
  id?: number;
  modelo?: string | null;
  marca?: IMarca;
}

export class Modelo implements IModelo {
  constructor(public id?: number, public modelo?: string | null, public marca?: IMarca) {}
}

export function getModeloIdentifier(modelo: IModelo): number | undefined {
  return modelo.id;
}
