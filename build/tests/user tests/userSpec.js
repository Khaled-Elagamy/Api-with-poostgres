"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const database_1 = __importDefault(require("../../database"));
const userModel = new user_model_1.default();
describe('User Model', () => {
    describe('Test Methods exists', () => {
        it('should have Create user method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have Update one user method', () => {
            expect(userModel.updateOne).toBeDefined();
        });
        it('should have Delete one user method', () => {
            expect(userModel.deleteOne).toBeDefined();
        });
        it('should have Get many Users method', () => {
            expect(userModel.getMany).toBeDefined();
        });
        it('should have Get one user method', () => {
            expect(userModel.getOne).toBeDefined();
        });
    });
});
describe('Test User Model ', () => {
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
    it('Create method should return a New User', async () => {
        const seconduser = await userModel.create({
            email: 'tes2t@test.com',
            user_name: 'testUser2',
            first_name: 'second',
            last_name: 'User',
            password: 'test@123',
        });
        expect(seconduser).toEqual({
            id: 2,
            email: 'tes2t@test.com',
            user_name: 'testUser2',
            first_name: 'second',
            last_name: 'User',
        });
    });
    it('Check Get many method to return All users in DB', async () => {
        const users = await userModel.getMany();
        expect(users.length).toBe(2);
    });
    it('Check Get one method to return testuser from DB', async () => {
        const calluser = await userModel.getOne(1);
        expect(calluser.id).toBe(1);
        expect(calluser.email).toBe(testuser.email);
        expect(calluser.user_name).toBe(testuser.user_name);
        expect(calluser.first_name).toBe(testuser.first_name);
        expect(calluser.last_name).toBe(testuser.last_name);
    });
    it('Check Update one method to update user', async () => {
        const updatedUser = await userModel.updateOne({
            ...testuser,
            user_name: 'normaluser',
            first_name: 'new test',
        }, 1);
        expect(updatedUser.id).toBe(1);
        expect(updatedUser.email).toBe(testuser.email);
        expect(updatedUser.user_name).toBe('normaluser');
        expect(updatedUser.first_name).toBe('new test');
        expect(updatedUser.last_name).toBe(testuser.last_name);
    });
    it('Check Delete one method to delete the user from DB', async () => {
        const deleteduser = await userModel.deleteOne(1);
        expect(deleteduser.id).toBe(1);
    });
});
