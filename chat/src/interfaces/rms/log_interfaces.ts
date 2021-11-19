export type logType = {
	id: string;
	item_id: string;
	event_id: string;
	user_name: string;
	description: string;
	created_at: Date;
};

export const log_init = {
	id: "",
	item_id: "",
	event_id: "",
	user_name: "",
	description: "",
	created_at: new Date(),
};
