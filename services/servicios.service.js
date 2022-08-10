const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');

class servicioService {
  constructor() {
    //console.log('POOL:: ', pool);
    this.servicios = [];
    // this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 0;
    for (let index = 0; index < limit; index++) {
      this.servicios.push({
        id: faker.datatype.uuid(),
        date: faker.date.between(),
        valor_Servicio: parseInt(faker.commerce.price(), 10),
        observacion: ' ',
        estado_service: false,
        califica: parseInt(faker.random.number(50)),
      });
    }
  }
  async create(data) {
    /*const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.servicios.push(newProduct);*/
    try {
      const query =
        'INSERT INTO servicio(id_usuario,id_trabajador,id_labor,fecha_servicio,observacion_servicio,valor_servicio,estado_servicio,calificacion_servicio) values ($1,$2,$3,$4,$5,$6,$7,$8)';
      const rta = await this.pool.query(query, [
        data.idusuario,
        data.idtrabajador,
        data.idLabor,
        data.fechaServicio,
        data.observacion,
        data.valor_Servicio,
        data.estado_service,
        data.califica,
      ]);
      return rta;
      // return { nada: 'nada' };
    } catch (error) {
      console.log('ERROR::', error);
    }
  }

  async finde() {
    try {
      const query = 'SELECT * FROM servicio';
      const rta = await this.pool.query(query);
      return rta.rows;
      // return { nada: 'nada' };
    } catch (error) {
      console.log('ERROR::', error);
    }
  }

  async findOne(id) {
    const query = 'SELECT * FROM servicio WHERE id_servicio=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async update(id, changes) {
    const index = this.servicios.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('No encontrado');
    } else {
      const product = this.servicios[index];
      this.servicios[index] = {
        ...product,
        changes,
      };
      return this.servicios[index];
    }
  }

  async delete(id) {
    const index = this.servicios.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    } else {
      this.servicios.splice(index, 1);
      return { id };
    }
  }
}
module.exports = servicioService;
