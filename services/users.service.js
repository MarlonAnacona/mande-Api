const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
const serviceCliente = require('./cliente.services');
const { encrypt, compare } = require('../middlware/encryptaPassword');

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
      const password1 = await encrypt(data.password);

      console.log(password1);
      const query =
        'INSERT INTO usuario(tipo_documento,numero_documento,nombre,apellido,email,telefono,genero,password,direccion,tipousuario) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';

      const rta = await this.pool.query(query, [
        data.tipoDocumento,
        data.numeroDocumento,
        data.nombre,
        data.apellido,
        data.email,
        data.telefono,
        data.genero,
        password1,
        data.direccion,
        data.tipousuario,
      ]);

      if (data.tipousuario == 2) {
        const query3 =
          'SELECT id_usuario FROM usuario WHERE numero_documento=' +
          data.numeroDocumento +
          '';
        const rta3 = await this.pool.query(query3);
        const query1 =
          'INSERT INTO cliente(imagen_recibos_publicos,medio_pago,numero_medio_pago,id_usuario) values (null,' +
          rta3.rows[0].id_usuario +
          ',null,null)';
        const rta1 = await this.pool.query(query1);
      } else {
        const query3 =
          'SELECT id_usuario FROM usuario WHERE numero_documento=' +
          data.numeroDocumento +
          '';
        const rta3 = await this.pool.query(query3);
        const query2 =
          'INSERT INTO trabajador(imagen_perfil,imagen_doc_identidad,promedio_estrellas,disponible,id_usuario) VALUES(null,null,null,null,' +
          rta3.rows[0].id_usuario +
          ')';
        const rta2 = await this.pool.query(query2);
      }

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
    try {
      console.log(changes);
      const query =
        'UPDATE usuario SET nombre=$1,apellido=$2,email=$3,telefono=$4,password=$5,direccion=$6 WHERE id_usuario= ' +
        id +
        '';

      const rta = await this.pool.query(query, [
        changes.nombre,
        changes.apellido,
        changes.email,
        changes.telefono,
        changes.password,
        changes.direccion,
      ]);
      return rta;
    } catch (error) {
      console.log('ERROR::', error);
    }
  }

  async delete(id) {
    const query = 'DELETE FROM usuario WHERE id_usuario=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }
}
module.exports = usersService;
