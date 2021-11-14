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
  Clientes,
  Ventas,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesVentasController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Array of Clientes has many Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ventas>,
  ): Promise<Ventas[]> {
    return this.clientesRepository.ventas(id).find(filter);
  }

  @post('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ventas)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {
            title: 'NewVentasInClientes',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) ventas: Omit<Ventas, 'id'>,
  ): Promise<Ventas> {
    return this.clientesRepository.ventas(id).create(ventas);
  }

  @patch('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Clientes.Ventas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ventas, {partial: true}),
        },
      },
    })
    ventas: Partial<Ventas>,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.clientesRepository.ventas(id).patch(ventas, where);
  }

  @del('/clientes/{id}/ventas', {
    responses: {
      '200': {
        description: 'Clientes.Ventas DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where<Ventas>,
  ): Promise<Count> {
    return this.clientesRepository.ventas(id).delete(where);
  }
}
