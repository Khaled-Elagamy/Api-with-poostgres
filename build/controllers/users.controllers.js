"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.deleteOne = exports.updateOne = exports.getOne = exports.getMany = exports.create = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userModel = new user_model_1.default();
const create = async (req, res, next) => {
    try {
        const user = await userModel.create(req.body);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        res.json({
            status: 'success',
            data: { ...user, token },
            message: 'User Created-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.create = create;
const getMany = async (_, res, next) => {
    try {
        const users = await userModel.getMany();
        res.json({
            status: 'success',
            data: users,
            message: 'Users retrieved-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMany = getMany;
const getOne = async (req, res, next) => {
    try {
        const user = await userModel.getOne(req.params.id);
        if (user == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: user,
            message: 'User retrieved-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getOne = getOne;
const updateOne = async (req, res, next) => {
    try {
        const user = await userModel.updateOne(req.body, req.params.id);
        if (user == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: user,
            message: 'User Updated-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateOne = updateOne;
const deleteOne = async (req, res, next) => {
    try {
        const user = await userModel.deleteOne(req.params.id);
        if (user == null) {
            return res.status(404).json({
                status: 'failed',
                ERROR: 'User Not-Found (Wrong ID)',
            });
        }
        return res.json({
            status: 'success',
            data: user,
            message: 'User Deleted-Successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteOne = deleteOne;
const authenticate = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.authenticate(email, password);
        const token = jsonwebtoken_1.default.sign({ user }, config_1.default.tokenSecret);
        if (!user) {
            return res.status(401).json({
                status: 'error',
                message: 'The username and password do not match',
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: 'User Authenticated-Successfully',
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.authenticate = authenticate;
