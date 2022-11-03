import supertest from 'supertest'
import app from '../../server'
import db from '../../database'
import UserModel from '../../models/user.model'
import ProductModel from '../../models/product.model'
import OrderModel from '../../models/order.model'
import OrderedproductModel from '../../models/order-products.model'
import User from '../../types/user.type'
import Product from '../../types/product.type'
import Order from '../../types/order.type'
import Orderedproduct from '../../types/order-product.type'

const request = supertest(app)
const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()
const ordedproductModel = new OrderedproductModel()
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InBvdGF0b0B0ZXN0LmNvbSIsInVzZXJfbmFtZSI6InBvdGF0b2xlYWd1ZSIsImZpcnN0X25hbWUiOiJraGFsZWQiLCJsYXN0X25hbWUiOiJlbGFnYW15In0sImlhdCI6MTY2NDUyNjUxNX0.gZwbmbHZbgNVRGAdbIZKIwSDfC9qaWEWBQsvzFBqeas'

describe('Test ordered products endpoints', () => {
  const testuser = {
    email: 'test@test.com',
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
    await ordedproductModel.addProduct(testorderedproduct, 1)
  })

  afterAll(async () => {
    const connection = await db.connect()
    const sql =
      'DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;'
    await connection.query(sql)
    connection.release()
  })
  it('Check request without Authorization (401),Add product endpoint', async () => {
    const response = await request.post('/api/orders/1/products').send({
      quantity: 10,
      product_id: 1,
    } as Orderedproduct)
    expect(response.status).toBe(401)
  })

  it('Add product endpoint', async () => {
    const response = await request
      .post('/api/orders/1/products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send({
        quantity: 10,
        product_id: 1,
      } as Orderedproduct)
    expect(response.status).toBe(200)
    const { quantity, product_id, order_id } = response.body.data
    expect(quantity).toBe(10)
    expect(Number(product_id)).toBe(1)
    expect(Number(order_id)).toBe(1)
  })
  it('Get Products of an order endpoint', async () => {
    const response = await request
      .get('/api/orders/1/products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
  })
  it('Delete product of order endpoint', async () => {
    const response = await request
      .delete('/api/orders/1/products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(200)
    expect(response.body.data.id).toBe(1)
  })
})
