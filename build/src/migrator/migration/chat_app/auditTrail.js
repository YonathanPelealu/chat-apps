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
exports.publicAuditTrail = void 0;
const postgre_1 = __importDefault(require("../../../connections/db/postgre"));
const errorHandler_1 = require("../../handler/errorHandler");
/* AUDIT TRAIL NEEDS START */
const auditDMLType = {
    query: `
		DO $$
		BEGIN
			CREATE TYPE dml_type AS ENUM ('INSERT', 'UPDATE', 'DELETE');
			EXCEPTION WHEN DUPLICATE_OBJECT THEN RAISE NOTICE 'reader  exists, skipping...';
		END$$
	`,
};
const auditTable = (table) => {
    return {
        query: `
	CREATE TABLE IF NOT EXISTS ${table}_audit_log (
		${table}_id uuid NOT NULL,
		old_row_data jsonb,
		new_row_data jsonb,
		dml_type dml_type NOT NULL,
		dml_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
		-- --------- -------- ------- dml_created_by varchar(255) NOT NULL,
		PRIMARY KEY (${table}_id, dml_type, dml_timestamp)
	)
	`,
    };
};
const auditTrail = (table) => {
    return {
        query: `
	CREATE OR REPLACE FUNCTION ${table}_audit_trigger_func()
	RETURNS trigger AS $body$
	BEGIN
		if (TG_OP = 'INSERT') then
			INSERT INTO public.${table}_audit_log (
				${table}_id,
				old_row_data,
				new_row_data,
				dml_type,
				dml_timestamp
				-- --------- -------- ------- dml_created_by
			)
			VALUES(
				NEW.id,
				null,
				to_jsonb(NEW),
				'INSERT',
				CURRENT_TIMESTAMP
				-- --------- -------- ------- current_setting('var.logged_user')
			);
			RETURN NEW;

		elsif (TG_OP = 'UPDATE') then
			INSERT INTO public.${table}_audit_log (
				${table}_id,
				old_row_data,
				new_row_data,
				dml_type,
				dml_timestamp
				-- --------- -------- ------- dml_created_by
			)
			VALUES(
				NEW.id,
				to_jsonb(OLD),
				to_jsonb(NEW),
				'UPDATE',
				CURRENT_TIMESTAMP
				-- --------- -------- ------- current_setting('var.logged_user')
			);		
			RETURN NEW;

		elsif (TG_OP = 'DELETE') then
			INSERT INTO public.${table}_audit_log (
				${table}_id,
				old_row_data,
				new_row_data,
				dml_type,
				dml_timestamp
				-- --------- -------- ------- dml_created_by
			)
			VALUES(
				OLD.id,
				to_jsonb(OLD),
				null,
				'DELETE',
				CURRENT_TIMESTAMP
				-- --------- -------- ------- current_setting('var.logged_user')
			);
			RETURN OLD;

		end if;
		
	END;
	$body$
	LANGUAGE plpgsql
	`,
    };
};
const auditTrigger = (table) => {
    return {
        query: `DROP TRIGGER IF EXISTS ${table}_audit_trigger ON public.${table};
	CREATE TRIGGER ${table}_audit_trigger
	AFTER INSERT OR UPDATE OR DELETE ON public.${table}
	FOR EACH ROW EXECUTE FUNCTION ${table}_audit_trigger_func()
`,
    };
};
/* AUDIT TRAIL NEEDS END */
const allQueries = [auditDMLType];
const setupAuditTrail = (tables) => {
    tables.map((table) => {
        allQueries.push(auditTable(table));
        allQueries.push(auditTrail(table));
        allQueries.push(auditTrigger(table));
    });
};
setupAuditTrail(["clients", "room", "activity_log", "messages", "room_latest_msg"]);
const publicAuditTrail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield postgre_1.default.query("SET SEARCH_PATH TO public", []);
        console.log("db public audit trail setup run");
        yield postgre_1.default.transaction(allQueries);
        console.log("db public audit trail setup done");
    }
    catch (e) {
        (0, errorHandler_1.errorHandler)(e);
    }
});
exports.publicAuditTrail = publicAuditTrail;
