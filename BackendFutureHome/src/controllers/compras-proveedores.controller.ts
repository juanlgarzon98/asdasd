import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Compras,
  Proveedores,
} from '../models';
import {ComprasRepository} from '../repositories';

export class ComprasProveedoresController {
  constructor(
    @repository(ComprasRepository)
    public comprasRepository: ComprasRepository,
  ) { }

  @get('/compras/{id}/proveedores', {
    responses: {
      '200': {
        description: 'Proveedores belonging to Compras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proveedores)},
          },
        },
      },
    },
  })
  async getProveedores(
    @param.path.string('id') id: typeof Compras.prototype.id,
  ): Promise<Proveedores> {
    return this.comprasRepository.proveedores(id);
  }
}
