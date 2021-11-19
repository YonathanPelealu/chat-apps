export type reminderType = "recent" | "past";
export type reminderStatusType = "open" | "done" | "overdue";

export type reminderDataType = {
	date_time: Date;
	description: string;
	status: reminderStatusType;
};

export const reminder_data_init: reminderDataType = {
	date_time: new Date(
		new Date().setMinutes(Math.ceil(new Date().getMinutes() / 15) * 15)
	),
	description: "",
	status: "open",
};

export type reminderListType = {
	id: string;
	data: reminderDataType;
};

export const reminder_list_init = {
	id: "",
	data: reminder_data_init,
};

export type reminderFormData = {
	id: string;
	assign_to: string[] | any[]; //web need this
	data: reminderDataType;
	user_names: string[];
};

export const reminder_form_data_init: reminderFormData = {
	id: "",
	assign_to: [""],
	data: reminder_data_init,
	user_names: [""],
};
