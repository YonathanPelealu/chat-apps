import { chatTableType } from "../../../interfaces/table_interface";
import db from "../../../connections/db/postgre";
import { errorHandler } from "../../handler/errorHandler";

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

const auditTable = (table: string) => {
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

const auditTrail = (table: string) => {
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

const auditTrigger = (table: string): any => {
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

const setupAuditTrail = (tables: Array<chatTableType>) => {
	tables.map((table) => {
		allQueries.push(auditTable(table));
		allQueries.push(auditTrail(table));
		allQueries.push(auditTrigger(table));
	});
};

setupAuditTrail(["clients", "room", "activity_log", "messages", "room_latest_msg"]);

export const publicAuditTrail = async (): Promise<void> => {
	try {
		await db.query("SET SEARCH_PATH TO public", []);
		console.log("db public audit trail setup run");
		await db.transaction(allQueries);
		console.log("db public audit trail setup done");
	} catch (e:any) {
		errorHandler(e);
	}
};
