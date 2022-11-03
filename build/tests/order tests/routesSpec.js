"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const database_1 = __importDefault(require("../../database"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const request = (0, supertest_1.default)(server_1.default);
const userModel = new user_model_1.default();
const orderModel = new order_model_1.default();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJlbWFpbCI6InBvdGF0b0B0ZXN0LmNvbSIsInVzZXJfbmFtZSI6InBvdGF0b2xlYWd1ZSIsImZpcnN0X25hbWUiOiJraGFsZWQiLCJsYXN0X25hbWUiOiJlbGFnYW15In0sImlhdCI6MTY2NDUyNjUxNX0.gZwbmbHZbgNVRGAdbIZKIwSDfC9qaWEWBQsvzFBqeas';
describe('Test Orders endpoints', () => {
    const testuser = {
        email: 'test11@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test@123',
    };
    const testorder = {
        user_id: 1,
    };
    beforeAll(async () => {
        await userModel.create(testuser);
        const order = await orderModel.create(testorder);
        testorder.id = order.id;
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM orders;\n ALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    describe('Test CRUD Orders API methods', () => {
        it('Try to create new order without authorization,Return 401', async () => {
            const res = await request.post('/api/orders/').send({
                user_id: 1,
            });
            expect(res.status).toBe(401);
        });
        it('Try to create new order', async () => {
            const res = await request
                .post('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                user_id: 1,
            });
            expect(res.status).toBe(200);
            const { user_id, status } = res.body.data;
            expect(Number(user_id)).toBe(1);
            expect(status).toBe('Active');
        });
        it('Check get list of orders created', async () => {
            const res = await request
                .get('/api/orders/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        });
        it('Check get ceratin  order', async () => {
            const res = await request
                .get(`/api/orders/${testorder.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(String(res.body.data.id)).toBe(`${testorder.id}`);
        });
        it('Check update order info', async () => {
            const res = await request
                .patch(`/api/orders/${testorder.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                ...testorder,
                status: 'Completed',
            });
            expect(res.status).toBe(200);
            const { id, status } = res.body.data;
            expect(id).toBe(testorder.id);
            expect(status).toBe('Completed');
        });
        it('Check delete order ', async () => {
            const res = await request
                .delete(`/api/orders/${testorder.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(testorder.id);
            expect(res.body.data.status).toBe('Completed');
        });
    });
});
