import { chatTableType } from "../../interfaces/table_interface";
import db from "../../connection/db/postgre";
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
	table_name: "clients",
	columns: ["data JSONB"],
	references: [],
});
const room = createQuery({
	table_name: "room",
	columns: [
		"data JSONB",
		"user_ids text[]",
		"is_deleted BOOLEAN DEFAULT false",
	],
	references: ["clients_id UUID REFERENCES clients"],
});
const activity_log = createQuery({
    table_name:"activity_log",
    columns: ["user_id TEXT"],
    references:["clients_id UUID REFERENCES clients, room_id UUID REFERENCES room"]
})
const messages = createQuery({
	table_name: "messages",
	columns: ["path TEXT", "text TEXT", "sent_by TEXT", "is_deleted BOOLEAN"],
	references: ["room_id UUID REFERENCES room"],
});
const room_latest_msg = createQuery({
	table_name: "room_latest_msg",
	columns: ["user_id TEXT"],
	references: [
		"room_id UUID REFERENCES room",
		"message_id UUID REFERENCES messages",
	],
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
	triggerUpdate("room_latest_msg"),
];
export const chatMigration = async (): Promise<void> => {
	try {
		console.log("db chat migration run");
		await db.query("SET SEARCH_PATH TO public", []);
		await db.transaction(allQueries);
		console.log("db chat migration done");
	} catch (e) {
		errorHandler(e);
	}
};
