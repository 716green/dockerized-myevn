"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const express_1 = __importDefault(require("express"));
const db_config_1 = __importDefault(require("./config/db.config"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: __dirname + '../.env' });
exports.env = process.env;
const app = (0, express_1.default)();
const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 5000;
console.log({ dbConfig: db_config_1.default });
console.log('NODE_ENV=' + process.env.NODE_ENV);
const connection = mysql_1.default.createConnection({
    host: db_config_1.default.HOST,
    user: db_config_1.default.USER,
    password: db_config_1.default.PASSWORD,
    database: db_config_1.default.DB,
});
app.get('/mysql', (_req, res) => {
    connection.connect();
    connection.query('SHOW tables;', (err, results, _fields) => {
        if (err) {
            console.error({ err });
        }
        else {
            console.log({ results });
            res.json(results);
        }
    });
    connection.end();
});
app.get('/', (_req, res) => {
    res.json({ hello: 'world' });
});
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map