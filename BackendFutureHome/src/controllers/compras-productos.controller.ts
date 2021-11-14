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
  Productos,
} from '../models';
import {ComprasRepository} from '../repositories';

export class ComprasProductosController {
  constructor(
    @repository(ComprasRepository)
    public comprasRepository: ComprasRepository,
  ) { }

  @get('/compras/{id}/productos', {
    responses: {
      '200': {
        description: 'Productos belonging to Compras',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async getProductos(
    @param.path.string('id') id: typeof Compras.prototype.id,
  ): Promise<Productos> {
    return this.comprasRepository.productos(id);
  }
}
