const faker = require('faker')

class ProductService {
  constructor () {
    this.products = []
    this.generate()
  }

  async generate() {
    const limit = 100
    for (let idx = 0; idx < limit; idx++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl()
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find() {
    return this.products
  }

  async findOne(id) {
    const product = this.products.find(item => item.id === id)
    return product
  }

  async update(id, changes) {
    const idx = this.products.findIndex(item => item.id === id)
    if (idx === -1) {
      throw new Error('Product not found')
    }
    const product = this.products[idx]
    this.products[idx] = {
      ...product,
      ...changes
    }
    return this.products[idx]
  }

  async delete(id) {
    const idx = this.products.findIndex(item => item.id === id)
    if (idx === -1) {
      throw new Error('Product not found')
    }
    this.products.splice(idx, 1)
    return { id }
  }
}

module.exports = ProductService
