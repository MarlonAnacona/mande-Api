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
    const query =
      'INSERT INTO usuarios(tipo_documento,numero_documento,nombre,apellido,email,telefono,genero,password,direccion) values (?,?,?,?,?,?,?,?,?)';
    const rta = await this.pool.query(query);
    return rta;
  }

  async finde() {
    const query = 'SELECT * FROM usuario';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw boom.notFound('product not found');
    }
    if (user.isBlock) {
      throw boom.conflict('product is block');
    }
    return user;
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
