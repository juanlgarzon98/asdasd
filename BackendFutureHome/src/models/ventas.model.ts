import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Clientes} from './clientes.model';
import {Productos} from './productos.model';

@model()
export class Ventas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'number',
    required: true,
  })
  total: number;

  @belongsTo(() => Clientes)
  clienteId: string;

  @hasMany(() => Productos)
  productos: Productos[];

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}

export interface VentasRelations {
  // describe navigational properties here
}

export type VentasWithRelations = Ventas & VentasRelations;
