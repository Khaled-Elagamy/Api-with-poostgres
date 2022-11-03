import supertest from 'supertest'
import app from '../server'

const request = supertest(app)

describe('Test basic endpoint server', () => {
  it('Get the /endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
  it('Try to request wrong route,Return 404', async () => {
    const res = await request.get('/api/data')
    expect(res.status).toBe(404)
  })
})
