export type itemType = "package" | "lost" | "found";
export type itemStatusType = "open" | "stored" | "closed" | "missing";

export type itemDataType = {
	item_name: string;

	recipient: string;
	recipient2: string;
	belongs_to: string;
	belongs_to2: string;
	stored_by: string;
	person_in_charge: string;
	location: string;
	location2: string;
	phone_number: string;
	phone_number2: string;
	attachment: string | File; // img url
	description: string;

	type: string;
	status: itemStatusType;
};

export type itemListType = {
	id: string;
	created_at: Date;
	updated_at: Date;
	user_id: string;
	company_id: string;
	data: itemDataType;
};

export const item_status_lists = ["open", "stored", "closed", "missing"];

export const item_data_init: itemDataType = {
	item_name: "",

	recipient: "",
	recipient2: "",
	belongs_to: "",
	belongs_to2: "",
	stored_by: "",
	location: "",
	location2: "",
	person_in_charge: "",
	phone_number: "",
	phone_number2: "",
	attachment: "",
	description: "",

	type: "lost",
	status: "open",
};

export const item_list_init: itemListType = {
	id: "",
	created_at: new Date(),
	updated_at: new Date(),
	user_id: "",
	company_id: "",
	data: item_data_init,
};
