const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres');
class TrabajadoresService {
  constructor() {
    this.trabajdores = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 0;
    for (let index = 0; index < limit; index++) {
      this.trabajdores.push({
        id: faker.datatype.uuid(),
        image: faker.image.imageUrl(),
        imageDocumento: faker.image.imageUrl(),
        estrellas: parseInt(faker.random.number(10)),
        disponibilidad: true,
        idUsuario: faker.datatype.uuid(),
      });
    }
  }
  async create(data) {
    try {
      const query =
        'INSERT INTO trabajador(imagen_perfil,imagen_doc_identidad,promedio_estrellas,disponible,id_usuario) VALUES($1,$2,$3,$4,$5,$6)';

      const rta = await this.pool.query(query, [
        data.image,
        data.imageDocumento,
        data.CantidadEstrellas,
        data.disponibilidad,
        data.direccion,
        data.idUsuario,
      ]);
      return rta;
    } catch (err) {
      console.log('ERROR::', err);
    }
  }

  async finde() {
    const query = 'SELECT * FROM trabajador';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

  async findOne(id) {
    const query = 'SELECT * FROM trabajador WHERE id_trabajador=' + id + '';
    const rta = await this.pool.query(query);

    return rta.rows;
  }

  async update(id, changes) {
    try {
      console.log(changes);
      const query =
        'UPDATE trabajadores SET imagen_perfil=$1,imagen_doc_identidad=$2,promedio_estrellas=$3,disponible=$4 WHERE id_usuario= ' +
        id +
        '';

      const rta = await this.pool.query(query, [
        changes.image,
        changes.imageDocumento,
        changes.CantidadEstrellas,
        changes.disponibilidad,
      ]);
      return rta;
    } catch (error) {
      console.log('ERROR::', error);
    }
  }

  async delete(id) {
    const query = 'DELETE FROM trabajador WHERE id_trabajador=' + id + '';
    const rta = await this.pool.query(query);
    return rta.rows;
  }
}
module.exports = TrabajadoresService;
