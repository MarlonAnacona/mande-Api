const faker = require("faker");
const boom = require("@hapi/boom")

class trabajadoresLaboresService{


    constructor() {
        this.trabajadoresLabores = [];
        this.generate();
    }

    generate() {
        
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.trabajadoresLabores.push({
                id: faker.datatype.uuid(),
                idUsuario: faker.datatype.uuid(),
                idLabora: faker.datatype.uuid(),
            });
          
        }
    }
    async create(data) {


        const newUsers = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.trabajadoresLabores.push(newUsers);
        return newUsers;
    }

    finde() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(this.trabajadoresLabores);
            }, 5000);
        })
        return this.trabajadoresLabores;
    }

    async findOne(id) {

        const user = this.trabajadoresLabores.find(item => item.id === id);
        if (!user) {
          throw boom.notFound("product not found");
        }
        if (user.isBlock) {
          throw boom.conflict("product is block");
        }
        return user;
      }


    async update(id, changes) {
        const index = this.trabajadoresLabores.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("No encontrado");
        } else {
            const user = this.trabajadoresLabores[index];
            this.trabajadoresLabores[index] = {
                ...user,
                changes
            }
            return this.trabajadoresLabores[index]
        }
    }

    async delete(id) {


        const index = this.trabajadoresLabores.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("product not found");
        } else {
            this.trabajadoresLabores.splice(index, 1)
            return { id };
        }
    }

}
module.exports = trabajadoresLaboresService;