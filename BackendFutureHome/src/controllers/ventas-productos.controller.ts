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
  Ventas,
  Productos,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasProductosController {
  constructor(
    @repository(VentasRepository) protected ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of Ventas has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.ventasRepository.productos(id).find(filter);
  }

  @post('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ventas.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInVentas',
            exclude: ['id'],
            optional: ['ventasId']
          }),
        },
      },
    }) productos: Omit<Productos, 'id'>,
  ): Promise<Productos> {
    return this.ventasRepository.productos(id).create(productos);
  }

  @patch('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Ventas.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.ventasRepository.productos(id).patch(productos, where);
  }

  @del('/ventas/{id}/productos', {
    responses: {
      '200': {
        description: 'Ventas.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.ventasRepository.productos(id).delete(where);
  }
}
