const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');

class laborService {
  constructor() {
    this.labores = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 0;
    for (let index = 0; index < limit; index++) {
      this.labores.push({
        id: faker.datatype.uuid(),
        name: 'jardinero',
        unitLabor: parseInt(faker.random.number(50)),
        priceLabor: parseInt(faker.commerce.price(), 10),
      });
    }
  }
  async create(data) {
    try {
      const query =
        'INSERT INTO labor(nombre_labor,precio_unidad_labor) values ($1,$2)';
      const rta = await this.pool.query(query, [
        data.nombreLabor,
        data.precioValor,
      ]);
      return rta;
      // return { nada: 'nada' };
    } catch (error) {
      console.log('ERROR::', error);
    }
  }

  async finde() {
    const query = 'SELECT * FROM labor';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM labor WHERE id_labor=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async update(id, changes) {
    const index = this.labores.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('No encontrado');
    } else {
      const product = this.labores[index];
      this.labores[index] = {
        ...product,
        changes,
      };
      return this.labores[index];
    }
  }

  async delete(id) {
    const query = 'DELETE FROM labor WHERE id_labor=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }
}
module.exports = laborService;
