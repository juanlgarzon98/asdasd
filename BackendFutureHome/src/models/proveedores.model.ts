import {Entity, model, property, hasMany} from '@loopback/repository';
import {Compras} from './compras.model';

@model()
export class Proveedores extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  domicilio: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @hasMany(() => Compras)
  compras: Compras[];

  constructor(data?: Partial<Proveedores>) {
    super(data);
  }
}

export interface ProveedoresRelations {
  // describe navigational properties here
}

export type ProveedoresWithRelations = Proveedores & ProveedoresRelations;
