import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'
import db from '../../database'

const productmodel = new ProductModel()

describe('Product Model', () => {
  describe('Test Methods exists', () => {
    it('should have Create product method', () => {
      expect(productmodel.create).toBeDefined()
    })
    it('should have Update one product method', () => {
      expect(productmodel.updateOne).toBeDefined()
    })
    it('should have Delete one product method', () => {
      expect(productmodel.deleteOne).toBeDefined()
    })
    it('should have Get many products method', () => {
      expect(productmodel.getMany).toBeDefined()
    })
    it('should have Get one product method', () => {
      expect(productmodel.getOne).toBeDefined()
    })
  })
})
describe('Test Product Model ', () => {
  const testproduct = {
    product_name: 'testproduct',
    product_descrip: 'Product to test',
    price: 100,
  } as Product

  afterAll(async () => {
    const connection = await db.connect()
    const sql =
      'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;'
    await connection.query(sql)
    connection.release()
  })
  it('Create method should return a Product', async () => {
    const createdproduct = await productmodel.create(testproduct)
    expect(createdproduct).toEqual({
      id: 1,
      product_name: 'testproduct',
      product_descrip: 'Product to test',
      price: 100,
    } as Product)
  })

  it('Check Get many method to return All products in DB', async () => {
    const products = await productmodel.getMany()
    expect(products.length).toBe(1)
  })

  it('Check Get one method to return testproduct from DB', async () => {
    const callproduct = await productmodel.getOne(1)
    expect(callproduct.id).toEqual(1)
    expect(callproduct.product_name).toBe(testproduct.product_name)
    expect(callproduct.product_descrip).toBe(testproduct.product_descrip)
    expect(callproduct.price).toBe(testproduct.price)
  })

  it('Check Update one method to update product', async () => {
    const updatedProduct = await productmodel.updateOne(
      {
        ...testproduct,
        product_name: 'updatedproduct',
        product_descrip: 'Update the product',
        price: 1000,
      },
      1
    )
    expect(updatedProduct.id).toBe(1)
    expect(updatedProduct.product_name).toBe('updatedproduct')
    expect(updatedProduct.product_descrip).toBe('Update the product')
    expect(updatedProduct.price).toBe(1000)
  })

  it('Check Delete one method to delete the product from DB', async () => {
    const deletedproduct = await productmodel.deleteOne(1)
    expect(deletedproduct.id).toEqual(1)
  })
})
