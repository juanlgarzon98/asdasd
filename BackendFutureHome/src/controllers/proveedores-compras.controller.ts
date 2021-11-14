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
  Proveedores,
  Compras,
} from '../models';
import {ProveedoresRepository} from '../repositories';

export class ProveedoresComprasController {
  constructor(
    @repository(ProveedoresRepository) protected proveedoresRepository: ProveedoresRepository,
  ) { }

  @get('/proveedores/{id}/compras', {
    responses: {
      '200': {
        description: 'Array of Proveedores has many Compras',
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
    return this.proveedoresRepository.compras(id).find(filter);
  }

  @post('/proveedores/{id}/compras', {
    responses: {
      '200': {
        description: 'Proveedores model instance',
        content: {'application/json': {schema: getModelSchemaRef(Compras)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proveedores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Compras, {
            title: 'NewComprasInProveedores',
            exclude: ['id'],
            optional: ['proveedoresId']
          }),
        },
      },
    }) compras: Omit<Compras, 'id'>,
  ): Promise<Compras> {
    return this.proveedoresRepository.compras(id).create(compras);
  }

  @patch('/proveedores/{id}/compras', {
    responses: {
      '200': {
        description: 'Proveedores.Compras PATCH success count',
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
    return this.proveedoresRepository.compras(id).patch(compras, where);
  }

  @del('/proveedores/{id}/compras', {
    responses: {
      '200': {
        description: 'Proveedores.Compras DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Compras)) where?: Where<Compras>,
  ): Promise<Count> {
    return this.proveedoresRepository.compras(id).delete(where);
  }
}
