"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../handler/errorHandler");
const pg_1 = require("pg");
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = process.env;
const pool = new pg_1.Pool({
    host: PGHOST,
    user: PGUSER,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: Number(PGPORT),
});
pool.on("connect", (client) => {
    client.query("SET SEARCH_PATH TO rms");
});
const query = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pool
        .query(text, params)
        .then((res) => {
        return res;
    })
        .catch((err) => {
        (0, errorHandler_1.dbErrorHandler)(err);
        throw new Error(err);
    });
});
const client = (text, params) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pool.connect().then((client) => __awaiter(void 0, void 0, void 0, function* () {
        return yield client
            .query(text, params)
            .then((res) => {
            client.release();
            return res;
        })
            .catch((err) => {
            client.release();
            (0, errorHandler_1.dbErrorHandler)(err.stack);
            throw new Error(err.stack);
        });
    }));
});
// query in map [{query, params}]
const transaction = (allQueries) => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield pool.connect();
    try {
        yield client.query("BEGIN");
        allQueries.map((queries) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield client.query(queries.query, queries.params || []);
            }
            catch (e) {
                (0, errorHandler_1.dbErrorHandler)(e);
                // throw new Error(e); //
            }
        }));
        yield client.query("COMMIT");
        return true;
    }
    catch (e) {
        yield client.query("ROLLBACK");
        (0, errorHandler_1.dbErrorHandler)(e);
        throw new Error(e);
    }
    finally {
        client.release();
    }
});
pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", client, err);
    process.exit(-1);
});
exports.default = {
    query,
    client,
    transaction,
};
