export type eventStatusNameType =
	| "open"
	| "ongoing"
	| "overdue-response"
	| "overdue-resolve"
	| "done"
	| "pending"
	| "completed"
	| "uncompleted";

export type eventStatusDataType = {
	name: eventStatusNameType;
};

export type eventStatusType = {
	id: string;
	data: eventStatusDataType;
};

export const event_status_data_init: eventStatusDataType = {
	name: "open",
};

export const event_status_init: eventStatusType = {
	id: "",
	data: event_status_data_init,
};
