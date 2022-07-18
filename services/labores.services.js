const faker = require("faker");
const boom = require("@hapi/boom")

class laborService {


    constructor() {
        this.labores = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.labores.push({
                id: faker.datatype.uuid(),
                name: "jardinero",
                unitLabor: parseInt(faker.random.number(50)),
                priceLabor: parseInt(faker.commerce.price(), 10),
            });

        }
    }
    async create(data) {


        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.labores.push(newProduct);
        return newProduct;
    }

    finde() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(this.labores);
            }, 5000);
        })
        return this.labores;
    }

    async findOne(id) {

        const product = this.labores.find(item => item.id === id);
        if (!product) {
            throw boom.notFound("No encontrado");
        }
        if (product.isBlock) {
          throw boom.conflict("product is block");
        }
        return product;
      }


    async update(id, changes) {
        const index = this.labores.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("No encontrado");
        } else {
            const product = this.labores[index];
            this.labores[index] = {
                ...product,
                changes
            }
            return this.labores[index]
        }
    }

    async delete(id) {


        const index = this.labores.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("No encontrado");
        } else {
            this.labores.splice(index, 1)
            return { id };
        }
    }

}
module.exports = laborService;