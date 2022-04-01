import dayjs from 'dayjs/esm';
import { ICoche } from 'app/entities/coche/coche.model';
import { ICliente } from 'app/entities/cliente/cliente.model';
import { ITrabajador } from 'app/entities/trabajador/trabajador.model';

export interface IVenta {
  id?: number;
  fecha?: dayjs.Dayjs;
  matricula_coche?: ICoche;
  cliente?: ICliente;
  trabajador?: ITrabajador;
}

export class Venta implements IVenta {
  constructor(
    public id?: number,
    public fecha?: dayjs.Dayjs,
    public matricula_coche?: ICoche,
    public cliente?: ICliente,
    public trabajador?: ITrabajador
  ) {}
}

export function getVentaIdentifier(venta: IVenta): number | undefined {
  return venta.id;
}
