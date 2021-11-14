import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Proveedores, ProveedoresRelations, Compras} from '../models';
import {ComprasRepository} from './compras.repository';

export class ProveedoresRepository extends DefaultCrudRepository<
  Proveedores,
  typeof Proveedores.prototype.id,
  ProveedoresRelations
> {

  public readonly compras: HasManyRepositoryFactory<Compras, typeof Proveedores.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ComprasRepository') protected comprasRepositoryGetter: Getter<ComprasRepository>,
  ) {
    super(Proveedores, dataSource);
    this.compras = this.createHasManyRepositoryFactoryFor('compras', comprasRepositoryGetter,);
    this.registerInclusionResolver('compras', this.compras.inclusionResolver);
  }
}
