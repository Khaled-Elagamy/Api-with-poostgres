"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const request = (0, supertest_1.default)(server_1.default);
const productModel = new product_model_1.default();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InBvdGF0b0B0ZXN0LmNvbSIsInVzZXJfbmFtZSI6InBvdGF0b2xlYWd1ZSIsImZpcnN0X25hbWUiOiJraGFsZWQiLCJsYXN0X25hbWUiOiJlbGFnYW15In0sImlhdCI6MTY2NDUyNjUxNX0.gZwbmbHZbgNVRGAdbIZKIwSDfC9qaWEWBQsvzFBqeas';
describe('Test products endpoints', () => {
    const testproduct = {
        product_name: 'testproduct',
        product_descrip: 'Product to test',
        price: 100,
    };
    beforeAll(async () => {
        const product = await productModel.create(testproduct);
        testproduct.id = product.id;
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    describe('Test CRUD products API methods', () => {
        it('Check request without Authorization (401),Create new product', async () => {
            const res = await request.post('/api/products/').send({
                product_name: 'testproduct2',
                product_descrip: '2 Product to test',
                price: 200,
            });
            expect(res.status).toBe(401);
        });
        it('Try to create new product', async () => {
            const res = await request
                .post('/api/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                product_name: 'testproduct2',
                product_descrip: '2 Product to test',
                price: 200,
            });
            expect(res.status).toBe(200);
            const { product_name, product_descrip, price } = res.body.data;
            expect(product_name).toBe('testproduct2');
            expect(product_descrip).toBe('2 Product to test');
            expect(price).toBe(200);
        });
        it('Check get list of products created', async () => {
            const res = await request
                .get('/api/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        });
        it('Check get ceratin  product', async () => {
            const res = await request
                .get(`/api/products/${testproduct.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(String(res.body.data.id)).toBe(`${testproduct.id}`);
        });
        it('Check update product info', async () => {
            const res = await request
                .patch(`/api/products/${testproduct.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                ...testproduct,
                price: 300,
            });
            expect(res.status).toBe(200);
            const { id, price } = res.body.data;
            expect(id).toBe(testproduct.id);
            expect(price).toBe(300);
        });
        it('Check delete product ', async () => {
            const res = await request
                .delete(`/api/products/${testproduct.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(testproduct.id);
            expect(res.body.data.price).toBe(300);
        });
    });
});
