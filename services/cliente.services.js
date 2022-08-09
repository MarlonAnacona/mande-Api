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
    const newUsers = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.cliente.push(newUsers);
    return newUsers;
  }

  async finde() {
    const query = 'SELECT * FROM cliente';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const user = this.cliente.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('product not found');
    }
    if (user.isBlock) {
      throw boom.conflict('product is block');
    }
    return user;
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
    const index = this.cliente.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    } else {
      this.cliente.splice(index, 1);
      return { id };
    }
  }
}
module.exports = ClienteService;
