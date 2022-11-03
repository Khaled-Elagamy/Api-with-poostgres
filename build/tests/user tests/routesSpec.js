"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const server_1 = __importDefault(require("../../server"));
const userModel = new user_model_1.default();
const request = (0, supertest_1.default)(server_1.default);
let token = '';
describe('User Api Endpoints', () => {
    const testuser = {
        email: 'test@test.com',
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: 'test@123',
    };
    beforeAll(async () => {
        const newuser = await userModel.create(testuser);
        testuser.id = newuser.id;
    });
    afterAll(async () => {
        const connection = await database_1.default.connect();
        const sql = 'DELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;';
        await connection.query(sql);
        connection.release();
    });
    describe('Test Authenticate method', () => {
        it('Get token by authenticating', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                email: 'test@test.com',
                password: 'test@123',
            });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(testuser.id);
            expect(email).toBe('test@test.com');
            token = userToken;
        });
        it('Reject authenication with wrong email', async () => {
            const res = await request
                .post('/api/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                email: 'wrong@test.com',
                password: 'wrong@123',
            });
            expect(res.status).toBe(401);
        });
    });
    describe('Test CRUD Users API methods', () => {
        it('Check request without Authorization (401),Get user info', async () => {
            const res = await request.get(`/api/users/${testuser.id}`);
            expect(res.status).toBe(401);
        });
        it('Try to create new user', async () => {
            const res = await request
                .post('/api/users/')
                .set('Content-type', 'application/json')
                .send({
                email: 'tes2t@test.com',
                user_name: 'testUser2',
                first_name: 'second',
                last_name: 'User',
                password: 'test@123',
            });
            expect(res.status).toBe(200);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe('tes2t@test.com');
            expect(user_name).toBe('testUser2');
            expect(first_name).toBe('second');
            expect(last_name).toBe('User');
        });
        it('Check get list of users', async () => {
            const res = await request
                .get('/api/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.length).toBe(2);
        });
        it('Check get user info', async () => {
            const res = await request
                .get(`/api/users/${testuser.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.user_name).toBe('testUser');
            expect(res.body.data.email).toBe('test@test.com');
        });
        it('Check update user info', async () => {
            const res = await request
                .patch(`/api/users/${testuser.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                ...testuser,
                user_name: 'updateduser',
                first_name: 'hello',
                last_name: 'user',
            });
            expect(res.status).toBe(200);
            const { id, email, user_name, first_name, last_name } = res.body.data;
            expect(id).toBe(testuser.id);
            expect(email).toBe(testuser.email);
            expect(user_name).toBe('updateduser');
            expect(first_name).toBe('hello');
            expect(last_name).toBe('user');
        });
        it('Check delete user ', async () => {
            const res = await request
                .delete(`/api/users/${testuser.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(testuser.id);
            expect(res.body.data.user_name).toBe('updateduser');
        });
    });
});
