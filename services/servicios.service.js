const faker = require("faker");
const boom = require("@hapi/boom")

class servicioService {


    constructor() {
        this.servicios = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.servicios.push({
                id: faker.datatype.uuid(),
                date: faker.date.between(),
                valor_Servicio: parseInt(faker.commerce.price(), 10),
                observacion: " ",
                estado_service:false,
                califica:parseInt(faker.random.number(50))
            });

        }
    }
    async create(data) {


        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.servicios.push(newProduct);
        return newProduct;
    }

    finde() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(this.servicios);
            }, 5000);
        })
        return this.servicios;
    }

    async findOne(id) {

        const product = this.servicios.find(item => item.id === id);
        if (!product) {
          throw boom.notFound('product not found');
        }
        if (product.isBlock) {
          throw boom.conflict('product is block');
        }
        return product;
      }


    async update(id, changes) {
        const index = this.servicios.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound("No encontrado");
        } else {
            const product = this.servicios[index];
            this.servicios[index] = {
                ...product,
                changes
            }
            return this.servicios[index]
        }
    }

    async delete(id) {


        const index = this.servicios.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('product not found');
        } else {
            this.servicios.splice(index, 1)
            return { id };
        }
    }

}
module.exports = servicioService;