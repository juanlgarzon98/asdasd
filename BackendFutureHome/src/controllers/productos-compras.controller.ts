import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Productos,
  Compras,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosComprasController {
  constructor(
    @repository(ProductosRepository) protected productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/compras', {
    responses: {
      '200': {
        description: 'Array of Productos has many Compras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Compras)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Compras>,
  ): Promise<Compras[]> {
    return this.productosRepository.compras(id).find(filter);
  }

  @post('/productos/{id}/compras', {
    responses: {
      '200': {
        description: 'Productos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compras)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Productos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compras, {
            title: 'NewComprasInProductos',
            exclude: ['id'],
            optional: ['productosId']
          }),
        },
      },
    }) compras: Omit<Compras, 'id'>,
  ): Promise<Compras> {
    return this.productosRepository.compras(id).create(compras);
  }

  @patch('/productos/{id}/compras', {
    responses: {
      '200': {
        description: 'Productos.Compras PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compras, {partial: true}),
        },
      },
    })
    compras: Partial<Compras>,
    @param.query.object('where', getWhereSchemaFor(Compras)) where?: Where<Compras>,
  ): Promise<Count> {
    return this.productosRepository.compras(id).patch(compras, where);
  }

  @del('/productos/{id}/compras', {
    responses: {
      '200': {
        description: 'Productos.Compras DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Compras)) where?: Where<Compras>,
  ): Promise<Count> {
    return this.productosRepository.compras(id).delete(where);
  }
}
