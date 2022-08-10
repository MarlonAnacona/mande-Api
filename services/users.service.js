const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
class usersService {
  constructor() {
    this.users = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 0;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        tipoDocumento: 'CC',
        numeroDocumento: parseInt('4515341'),
        name: faker.name.firstName(),
        sex: 'f',
        celphone: parseInt(faker.phone.phoneNumber()),
        email: faker.internet.email(),
        password: faker.internet.password(),
        addres: faker.address.streetAddress(),
      });
    }
  }
  async create(data) {
    try {
      const query =
        'INSERT INTO usuario(tipo_documento,numero_documento,nombre,apellido,email,telefono,genero,password,direccion) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)';

      const rta = await this.pool.query(query, [
        data.tipoDocumento,
        data.numeroDocumento,
        data.nombre,
        data.apellido,
        data.email,
        data.telefono,
        data.genero,
        data.password,
        data.direccion,
      ]);
      return rta;
    } catch (err) {
      console.log('ERROR::', err);
    }
  }

  async finde() {
    const query = 'SELECT * FROM usuario';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM usuario WHERE id_usuario=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async update(id, changes) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('No encontrado');
    } else {
      const user = this.users[index];
      this.users[index] = {
        ...user,
        changes,
      };
      return this.users[index];
    }
  }

  async delete(id) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    } else {
      this.users.splice(index, 1);
      return { id };
    }
  }
}
module.exports = usersService;
