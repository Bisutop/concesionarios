export interface ICliente {
  id?: number;
  dni?: string;
  nombre?: string;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public dni?: string, public nombre?: string) {}
}

export function getClienteIdentifier(cliente: ICliente): number | undefined {
  return cliente.id;
}
