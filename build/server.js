"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./middleware/logger"));
const helmet_1 = __importDefault(require("helmet"));
const error_1 = __importDefault(require("./middleware/error"));
const Raterlimit_1 = __importDefault(require("./middleware/Raterlimit"));
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
const port = config_1.default.port || 3000;
//Parser middleware
app.use(express_1.default.json());
//Security middleware
app.use((0, helmet_1.default)());
//Logger middleware
app.use(logger_1.default);
//Rate limiter middleware
app.use(Raterlimit_1.default);
//Error handler middleware
app.use(error_1.default);
//Routes
app.use('/api', routes_1.default);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
database_1.default.connect().then((client) => {
    return client
        .query('SELECT NOW()')
        .then((res) => {
        client.release();
        console.log(res.rows);
    })
        .catch((err) => {
        client.release();
        console.log(err.stack);
    });
});
app.use((_req, res) => {
    res.status(404).json({
        message: 'Get back to the documentation',
    });
});
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
exports.default = app;
