const faker = require("faker");
const boom = require("@hapi/boom")

class usersService{


    constructor() {
        this.users = [];
        this.generate();
    }

    generate() {
        
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.users.push({
                id: faker.datatype.uuid(),
                tipoDocumento: "CC",
                numeroDocumento: parseInt("4515341"),
                name: faker.name.firstName(),
                sex: "f",
                celphone: parseInt(faker.phone.phoneNumber()),
                email: faker.internet.email(),
                password: faker.internet.password(),
                addres: faker.address.streetAddress(),
            });
          
        }
    }
    async create(data) {


        const newUsers = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.users.push(newUsers);
        return newUsers;
    }

    finde() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(this.users);
            }, 5000);
        })
        return this.users;
    }

    async findOne(id) {

        const user = this.users.find(item => item.id === id);
        if (!user) {
          throw boom.notFound("product not found");
        }
        if (user.isBlock) {
          throw boom.conflict("product is block");
        }
        return user;
      }


    async update(id, changes) {
        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("No encontrado");
        } else {
            const user = this.users[index];
            this.users[index] = {
                ...user,
                changes
            }
            return this.users[index]
        }
    }

    async delete(id) {


        const index = this.users.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("product not found");
        } else {
            this.users.splice(index, 1)
            return { id };
        }
    }

}
module.exports = usersService;