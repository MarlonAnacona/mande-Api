const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
class trabajadoresLaboresService {
  constructor() {
    this.trabajadoresLabores = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 0;
    for (let index = 0; index < limit; index++) {
      this.trabajadoresLabores.push({
        id: faker.datatype.uuid(),
        idUsuario: faker.datatype.uuid(),
        idLabora: faker.datatype.uuid(),
      });
    }
  }
  async create(data) {
    try {
      const query =
        'INSERT INTO labortrabajador(id_labor_trabajador,id_trabajador,id_labor) VALUES($1,$2,$3)';

      const rta = await this.pool.query(query, [
        data.idTrabajador,
        data.idLabor,
      ]);
      return rta;
    } catch (err) {
      console.log('ERROR::', err);
    }
  }

  async finde() {
    const query = 'SELECT * FROM labortrabajador';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query =
      'SELECT * FROM labortrabajador WHERE id_labor_trabajador= ' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async update(id, changes) {
    const index = this.trabajadoresLabores.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('No encontrado');
    } else {
      const user = this.trabajadoresLabores[index];
      this.trabajadoresLabores[index] = {
        ...user,
        changes,
      };
      return this.trabajadoresLabores[index];
    }
  }

  async delete(id) {
    const query =
      'DELETE FROM labortrabajador WHERE id_labor_trabajador=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }
}
module.exports = trabajadoresLaboresService;
