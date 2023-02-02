const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
class ClienteService {
  constructor() {
    this.cliente = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 0;
    for (let index = 0; index < limit; index++) {
      this.cliente.push({
        id: faker.datatype.uuid(),
        image: faker.image.imageUrl(),
        medioPago: 'credit',
        numeroMedioPago: parseInt(faker.random.number(10)),
        idUsuario: faker.datatype.uuid(),
      });
    }
  }
  async create(data) {
    try {
      const query =
        'INSERT INTO cliente(imagen_recibos_publicos,medio_pago,numero_medio_pago,id_usuario) values ($1,$2,$3,$4)';
      const rta = await this.pool.query(query, [
        data.image,
        data.medioPago,
        data.numeroMedioPago,
        data.idUsuario,
      ]);
      return rta;
      // return { nada: 'nada' };
    } catch (error) {
      console.log('ERROR::', error);
    }
  }

  async finde() {
    const query = 'SELECT * FROM cliente';
    const rta = await this.pool.query(query);
    console.log(rta);
    return rta.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM cliente WHERE id_cliente=' + id + '';
    console.log(id);
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async update(id, changes) {
    const index = this.cliente.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('No encontrado');
    } else {
      const user = this.cliente[index];
      this.cliente[index] = {
        ...user,
        changes,
      };
      return this.cliente[index];
    }
  }

  async delete(id) {
    const query = 'DELETE FROM cliente WHERE id_cliente=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }
}
module.exports = ClienteService;
