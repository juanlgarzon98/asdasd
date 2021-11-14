import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Productos, ProductosRelations, Compras, Ventas} from '../models';
import {ComprasRepository} from './compras.repository';
import {VentasRepository} from './ventas.repository';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.id,
  ProductosRelations
> {

  public readonly compras: HasManyRepositoryFactory<Compras, typeof Productos.prototype.id>;

  public readonly ventas: BelongsToAccessor<Ventas, typeof Productos.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ComprasRepository') protected comprasRepositoryGetter: Getter<ComprasRepository>, @repository.getter('VentasRepository') protected ventasRepositoryGetter: Getter<VentasRepository>,
  ) {
    super(Productos, dataSource);
    this.ventas = this.createBelongsToAccessorFor('ventas', ventasRepositoryGetter,);
    this.registerInclusionResolver('ventas', this.ventas.inclusionResolver);
    this.compras = this.createHasManyRepositoryFactoryFor('compras', comprasRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
  }
}
