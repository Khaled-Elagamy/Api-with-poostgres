"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const order_products_model_1 = __importDefault(require("../../models/order-products.model"));
const request = (0, supertest_1.default)(server_1.default);
const userModel = new user_model_1.default();
const productModel = new product_model_1.default();
const orderModel = new order_model_1.default();
const ordedproductModel = new order_products_model_1.default();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InBvdGF0b0B0ZXN0LmNvbSIsInVzZXJfbmFtZSI6InBvdGF0b2xlYWd1ZSIsImZpcnN0X25hbWUiOiJraGFsZWQiLCJsYXN0X25hbWUiOiJlbGFnYW15In0sImlhdCI6MTY2NDUyNjUxNX0.gZwbmbHZbgNVRGAdbIZKIwSDfC9qaWEWBQsvzFBqeas';
describe('Test ordered products endpoints', () => {
    const testuser = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test@123',
    };
    const testproduct = {
        product_name: 'testproduct',
        product_descrip: 'Product to test',
        price: 100,
    };
    const testorder = {
        user_id: 1,
    };
    const testorderedproduct = {
        quantity: 10,
        product_id: 1,
    };
    beforeAll(async () => {
        await userModel.create(testuser);
        await productModel.create(testproduct);
        await orderModel.create(testorder);
        await ordedproductModel.addProduct(testorderedproduct, 1);
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    it('Check request without Authorization (401),Add product endpoint', async () => {
        const response = await request.post('/api/orders/1/products').send({
            quantity: 10,
            product_id: 1,
        });
        expect(response.status).toBe(401);
    });
    it('Add product endpoint', async () => {
        const response = await request
            .post('/api/orders/1/products')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send({
            quantity: 10,
            product_id: 1,
        });
        expect(response.status).toBe(200);
        const { quantity, product_id, order_id } = response.body.data;
        expect(quantity).toBe(10);
        expect(Number(product_id)).toBe(1);
        expect(Number(order_id)).toBe(1);
    });
    it('Get Products of an order endpoint', async () => {
        const response = await request
            .get('/api/orders/1/products')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });
    it('Delete product of order endpoint', async () => {
        const response = await request
            .delete('/api/orders/1/products')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(1);
    });
});
