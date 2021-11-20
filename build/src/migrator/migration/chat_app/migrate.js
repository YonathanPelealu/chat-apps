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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMigration = void 0;
const postgre_1 = __importDefault(require("../../../connections/db/postgre"));
const errorHandler_1 = require("../../handler/errorHandler");
const createQuery = ({ table_name, references, columns, }) => {
    return {
        query: `CREATE TABLE IF NOT EXISTS ${table_name} (
		id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
		is_active BOOLEAN DEFAULT true,
		${references.length > 0 ? references + "," : ""}
		${columns.length > 0 ? columns + "," : ""}
		created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
		updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);`,
    };
};
const init = {
    query: `CREATE EXTENSION IF NOT EXISTS "pgcrypto";`,
};
const functionIntervalWithoutDays = {
    query: `create or replace function interval_without_days(interval)
	returns interval language sql as $$
		select $1- date_part('day', $1)* '1d'::interval+ date_part('day', $1)* '24h'::interval;
	$$;`,
};
const updatedAtAutomatically = {
    query: `CREATE OR REPLACE FUNCTION trigger_set_timestamp()
	RETURNS TRIGGER AS $$
	BEGIN
	  NEW.updated_at = NOW();
	  RETURN NEW;
	END;
	$$ LANGUAGE plpgsql;`,
};
const triggerUpdate = (table) => {
    const data = {
        query: `DROP TRIGGER IF EXISTS set_timestamp ON "public"."${table}"; 
		CREATE TRIGGER set_timestamp
		BEFORE UPDATE ON ${table}
		FOR EACH ROW
		EXECUTE PROCEDURE trigger_set_timestamp();`,
    };
    return data;
};
const clients = createQuery({
    table_name: "clients",
    columns: ["data JSONB"],
    references: []
});
const room = createQuery({
    table_name: "room",
    columns: ["data JSONB", "is_deleted BOOLEAN"],
    references: ["client_id UUID REFERENCES clients"]
});
const activity_log = createQuery({
    table_name: "activity_log",
    columns: ["user_id TEXT"],
    references: ["clients_id"]
});
const messages = createQuery({
    table_name: "messages",
    columns: ["path TEXT", "text TEXT", "sent_by UUID", "is_deleted BOOLEAN"],
    references: ["room_id UUID REFERENCES room"]
});
const room_latest_msg = createQuery({
    table_name: "room_latest_msg",
    columns: ["user_id TEXT"],
    references: ["room_id UUID REFERENCES room", "message_id UUID message"]
});
const allQueries = [
    init,
    functionIntervalWithoutDays,
    updatedAtAutomatically,
    clients,
    triggerUpdate("clients"),
    room,
    triggerUpdate("room"),
    messages,
    triggerUpdate("messages"),
    activity_log,
    triggerUpdate("activity_log"),
    room_latest_msg,
    triggerUpdate("room_latest_msg")
];
const chatMigration = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("db chat migration run");
        yield postgre_1.default.query("SET SEARCH_PATH TO public", []);
        yield postgre_1.default.transaction(allQueries);
        console.log("db chat migration done");
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
    }
});
exports.chatMigration = chatMigration;
