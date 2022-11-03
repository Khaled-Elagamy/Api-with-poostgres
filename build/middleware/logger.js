"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req, res, next) => {
    const method = req.method, ip = req.ip, url = req.url, status = res.statusCode;
    const start = process.hrtime();
    const durationInMilliseconds = getActualRequestDurationInMilliseconds(start);
    console.log(`\x1b[34m [${ip} ] used \x1b[32m${method}: (site:${url}) ${status} \x1b[31m${durationInMilliseconds}ms\x1b[0m`);
    next();
};
exports.default = logger;
const getActualRequestDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9; // convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};
