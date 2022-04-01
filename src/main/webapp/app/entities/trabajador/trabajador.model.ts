export interface ITrabajador {
  id?: number;
  dni?: string;
  nombre?: string;
}

export class Trabajador implements ITrabajador {
  constructor(public id?: number, public dni?: string, public nombre?: string) {}
}

export function getTrabajadorIdentifier(trabajador: ITrabajador): number | undefined {
  return trabajador.id;
}
