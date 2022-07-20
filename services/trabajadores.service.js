const faker = require("faker");
const boom = require("@hapi/boom")

class TrabajadoresService{


    constructor() {
        this.trabajdores = [];
        this.generate();
    }

    generate() {
        
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.trabajdores.push({
                id: faker.datatype.uuid(),
                image: faker.image.imageUrl(),
                imageDocumento: faker.image.imageUrl(),
                estrellas: parseInt(faker.random.number(10)),
                disponibilidad:true,
                idUsuario: faker.datatype.uuid(),
            });
          
        }
    }
    async create(data) {


        const newUsers = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.trabajdores.push(newUsers);
        return newUsers;
    }

    finde() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(this.trabajdores);
            }, 5000);
        })
        return this.trabajdores;
    }

    async findOne(id) {

        const user = this.trabajdores.find(item => item.id === id);
        if (!user) {
          throw boom.notFound("product not found");
        }
        if (user.isBlock) {
          throw boom.conflict("product is block");
        }
        return user;
      }


    async update(id, changes) {
        const index = this.trabajdores.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("No encontrado");
        } else {
            const user = this.trabajdores[index];
            this.trabajdores[index] = {
                ...user,
                changes
            }
            return this.trabajdores[index]
        }
    }

    async delete(id) {


        const index = this.trabajdores.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("product not found");
        } else {
            this.trabajdores.splice(index, 1)
            return { id };
        }
    }

}
module.exports = TrabajadoresService;