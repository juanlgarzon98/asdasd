import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Ventas,
  Clientes,
} from '../models';
import {VentasRepository} from '../repositories';

export class VentasClientesController {
  constructor(
    @repository(VentasRepository)
    public ventasRepository: VentasRepository,
  ) { }

  @get('/ventas/{id}/clientes', {
    responses: {
      '200': {
        description: 'Clientes belonging to Ventas',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Clientes)},
          },
        },
      },
    },
  })
  async getClientes(
    @param.path.string('id') id: typeof Ventas.prototype.id,
  ): Promise<Clientes> {
    return this.ventasRepository.cliente(id);
  }
}
