import { chatTableType } from "../../../interfaces/table_interface";
import db from "../../../connections/db/postgre";
import { errorHandler } from "../../handler/errorHandler";

const createQuery = ({
	table_name,
	references,
	columns,
}: {
	table_name: chatTableType;
	references: string[];
	columns: string[];
}) => {
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

const triggerUpdate = (table: string): any => {
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
    table_name:"clients",
    columns: ["data jsonb"],
    references: []
})
const room = createQuery({
    table_name: "room",
    columns: ["user_ids uuid[]","type TEXT","name TEXT","is_deleted BOOLEAN"],
    references: ["client_id UUID REFERENCES clients"]
})
const activity_log = createQuery({
    table_name:"activity_log",
    columns: ["user_id uuid"],
    references:["clients_id"]
})
const allQueries = [
    init,
    functionIntervalWithoutDays,
    updatedAtAutomatically,
]
export const chatMigration = async (): Promise<void> => {
	try {
		console.log("db chat migration run");
		await db.query("SET SEARCH_PATH TO public", []);
		await db.transaction(allQueries);
		console.log("db public migration done");
	} catch (e) {
		errorHandler(e);
	}
};
