import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Productos,
  Ventas,
} from '../models';
import {ProductosRepository} from '../repositories';

export class ProductosVentasController {
  constructor(
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
  ) { }

  @get('/productos/{id}/ventas', {
    responses: {
      '200': {
        description: 'Ventas belonging to Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ventas)},
          },
        },
      },
    },
  })
  async getVentas(
    @param.path.string('id') id: typeof Productos.prototype.id,
  ): Promise<Ventas> {
    return this.productosRepository.ventas(id);
  }
}
