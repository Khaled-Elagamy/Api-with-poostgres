import UserModel from '../models/user.model'
import db from '../database'
import User from '../types/user.type'

const userModel = new UserModel()

describe('Check Authentication', () => {
  describe('Test Method exsits', () => {
    it('Should have an Authenticate user method', () => {
      expect(userModel.authenticate).toBeDefined()
    })
  })
  describe('Test Authentication ', () => {
    const testuser = {
      email: 'auth@test.com',
      user_name: 'authUser',
      first_name: 'Test',
      last_name: 'User',
      password: 'test@123',
    } as User

    beforeAll(async () => {
      const createdUser = await userModel.create(testuser)
    })

    afterAll(async () => {
      const connection = await db.connect()
      const sql =
        'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;'
      await connection.query(sql)
      connection.release()
    })

    it('Authenication return the authenticated user', async () => {
      const authenticatedUser = await userModel.authenticate(
        testuser.email,
        testuser.password as string
      )
      expect(authenticatedUser?.id).toEqual(1)
      expect(authenticatedUser?.email).toBe(testuser.email)
      expect(authenticatedUser?.user_name).toBe(testuser.user_name)
      expect(authenticatedUser?.first_name).toBe(testuser.first_name)
      expect(authenticatedUser?.last_name).toBe(testuser.last_name)
    })

    it('Authentication return null for wrong credentials', async () => {
      const authenticatedUser = await userModel.authenticate(
        'wrond@test.com',
        'wrong'
      )
      expect(authenticatedUser).toBe(null)
    })
  })
})
