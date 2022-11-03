import UserModel from '../../models/user.model'
import ProductModel from '../../models/product.model'
import OrderModel from '../../models/order.model'
import User from '../../types/user.type'
import Product from '../../types/product.type'
import Order from '../../types/order.type'
import db from '../../database'

const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()

describe('Order Model', () => {
  describe('Test Methods exists', () => {
    it('should have Create order method', () => {
      expect(orderModel.create).toBeDefined()
    })
    it('should have Update one order method', () => {
      expect(orderModel.updateOne).toBeDefined()
    })
    it('should have Delete one order method', () => {
      expect(orderModel.deleteOne).toBeDefined()
    })
    it('should have Get many orders method', () => {
      expect(orderModel.getMany).toBeDefined()
    })
    it('should have Get one order method', () => {
      expect(orderModel.getOne).toBeDefined()
    })
  })
})
describe('Test Order Model ', () => {
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

  beforeAll(async () => {
    await userModel.create(testuser)
    await productModel.create(testproduct)
  })
  afterAll(async () => {
    const connection = await db.connect()
    const sql =
      'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;'
    await connection.query(sql)
    connection.release()
  })

  it('Create method should return an order after created', async () => {
    const createdorder = await orderModel.create(testorder)
    expect(createdorder.id).toEqual(1)
  })

  it('Check Get many method to return All orders in DB', async () => {
    const orders = await orderModel.getMany()
    expect(orders.length).toBe(1)
  })

  it('Check Get one method to return order from DB', async () => {
    const callorder = await orderModel.getOne(1)
    expect(callorder.id).toBe(1)
    expect(callorder.status).toBe('Active')
  })

  it('Check Update one method to update order', async () => {
    const updatedorder = await orderModel.updateOne(
      {
        ...testorder,
        status: 'Completed',
      },
      1
    )
    expect(updatedorder.id).toBe(testorder.user_id)
    expect(updatedorder.status).toBe('Completed')
  })

  it('Check Delete one method to delete the product from DB', async () => {
    const deletedorder = await orderModel.deleteOne(1)
    expect(deletedorder.id).toBe(1)
  })
})
