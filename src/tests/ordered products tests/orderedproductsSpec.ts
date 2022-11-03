import UserModel from '../../models/user.model'
import ProductModel from '../../models/product.model'
import OrderModel from '../../models/order.model'
import OrderedproductModel from '../../models/order-products.model'
import User from '../../types/user.type'
import Product from '../../types/product.type'
import Order from '../../types/order.type'
import Orderedproduct from '../../types/order-product.type'
import db from '../../database'

const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()
const ordedproductModel = new OrderedproductModel()

describe('OrderedProduct Model', () => {
  describe('Test Methods exists', () => {
    it('should have Create order method', () => {
      expect(ordedproductModel.addProduct).toBeDefined()
    })
  })
  it('should have Get many orderedProducts method', () => {
    expect(ordedproductModel.getProducts).toBeDefined()
  })
  it('should have Delete one orderedProduct method', () => {
    expect(orderModel.deleteOne).toBeDefined()
  })
})
describe('Test OrderProduct Model ', () => {
  const testuser = {
    email: 'test1.com',
    user_name: 'testUser',
    first_name: 'Test',
    last_name: 'User',
    password: 'test@123',
  } as User

  const testproduct = {
    product_name: 'testproduct',
    product_descrip: 'Product to test',
    price: 100,
  } as Product

  const testorder = {
    user_id: 1,
  } as Order

  const testorderedproduct = {
    quantity: 10,
    product_id: 1,
  } as Orderedproduct

  beforeAll(async () => {
    await userModel.create(testuser)
    await productModel.create(testproduct)
    await orderModel.create(testorder)
  })
  afterAll(async () => {
    const connection = await db.connect()
    const sql =
      'DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await connection.query(sql)
    connection.release()
  })

  it('Add product method should add product to order', async () => {
    const addedproduct = await ordedproductModel.addProduct(
      testorderedproduct,
      1
    )
    expect(addedproduct.id).toBe(1)
    expect(addedproduct.quantity).toBe(10)
    expect(Number(addedproduct.order_id)).toBe(1)
    expect(Number(addedproduct.product_id)).toBe(1)
  })

  it('Check Get products method to return All products in certain order in DB', async () => {
    const products = await ordedproductModel.getProducts(1)
    expect(products.length).toBe(1)
  })

  it('Check Delete product method to delete the product from the order ', async () => {
    const deletedproduct = await ordedproductModel.deleteProduct(1)
    expect(deletedproduct.id).toBe(1)
  })
})
