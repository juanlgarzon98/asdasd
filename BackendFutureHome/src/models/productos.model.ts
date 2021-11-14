import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Compras} from './compras.model';
import {Ventas} from './ventas.model';

@model()
export class Productos extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  talla: string;

  @property({
    type: 'number',
    required: true,
  })
  existencia: number;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @hasMany(() => Compras)
  compras: Compras[];

  @belongsTo(() => Ventas)
  ventasId: string;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
