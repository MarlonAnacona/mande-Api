const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
class productService {
  constructor() {
    this.products = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 0;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }
  async create(data) {
    try {
      const query =
        'INSERT INTO pago(id_servicio,fecha_pago,valor_pago,numero_medio_pago,pago_realizado) values ($1,$2,$3,$4,$5)';
      const rta = await this.pool.query(query, [
        data.idService,
        data.fechaPago,
        data.valorPago,
        data.numeroPago,
        data.pagoRealizado,
      ]);
      return rta;
      // return { nada: 'nada' };
    } catch (error) {
      console.log('ERROR::', error);
    }
  }

  async finde() {
    const query = 'SELECT * FROM pago';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM pago WHERE id_pago=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('No encontrado');
    } else {
      const product = this.products[index];
      this.products[index] = {
        ...product,
        changes,
      };
      return this.products[index];
    }
  }

  async delete(id) {
    const query = 'DELETE FROM pago WHERE id_pago=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }
}
module.exports = productService;
