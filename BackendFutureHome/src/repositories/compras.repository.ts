import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Compras, ComprasRelations, Proveedores, Productos} from '../models';
import {ProveedoresRepository} from './proveedores.repository';
import {ProductosRepository} from './productos.repository';

export class ComprasRepository extends DefaultCrudRepository<
  Compras,
  typeof Compras.prototype.id,
  ComprasRelations
> {

  public readonly proveedores: BelongsToAccessor<Proveedores, typeof Compras.prototype.id>;

  public readonly productos: BelongsToAccessor<Productos, typeof Compras.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProveedoresRepository') protected proveedoresRepositoryGetter: Getter<ProveedoresRepository>, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>,
  ) {
    super(Compras, dataSource);
    this.productos = this.createBelongsToAccessorFor('productos', productosRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
    this.proveedores = this.createBelongsToAccessorFor('proveedores', proveedoresRepositoryGetter,);
    this.registerInclusionResolver('proveedores', this.proveedores.inclusionResolver);
  }
}
