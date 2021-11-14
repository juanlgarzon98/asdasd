import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Proveedores} from './proveedores.model';
import {Productos} from './productos.model';

@model()
export class Compras extends Entity {
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
  unidades: number;

  @property({
    type: 'string',
    required: true,
  })
  talla: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'number',
    required: true,
  })
  totalCompra: number;

  @belongsTo(() => Proveedores)
  proveedoresId: string;

  @belongsTo(() => Productos)
  productosId: string;

  constructor(data?: Partial<Compras>) {
    super(data);
  }
}

export interface ComprasRelations {
  // describe navigational properties here
}

export type ComprasWithRelations = Compras & ComprasRelations;
