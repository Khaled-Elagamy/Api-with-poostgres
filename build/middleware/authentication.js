"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const UnauthorizedError = (next) => {
    const error = new Error('Login Error:PLease try again');
    error.status = 401;
    next(error);
};
const authMiddleware = (req, _res, next) => {
    try {
        const authHeader = req.get('Authorization');
        if (authHeader) {
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.tokenSecret);
                if (decode) {
                    next();
                }
                else {
                    UnauthorizedError(next);
                }
            }
            else {
                UnauthorizedError(next);
            }
        }
        else {
            UnauthorizedError(next);
        }
    }
    catch (error) {
        UnauthorizedError(next);
    }
};
exports.default = authMiddleware;
