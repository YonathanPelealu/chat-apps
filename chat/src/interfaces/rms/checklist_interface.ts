export type checklistListType = {
	index?: number;
	name: string;
	sequence: number;
	type: "checkbox" | "textbox";
	value: "checked" | "unchecked" | string;
};

export const checklist_list_init: checklistListType = {
	index: 0,
	name: "",
	type: "checkbox",
	value: "",
	sequence: 0,
};

export type checklistDataType = {
	name: string;
	lists: checklistListType[];
};

export const checklist_data_init = {
	name: "",
	lists: [checklist_list_init],
};

export type checklistType = {
	id: string;
	department_id: string;
	data: checklistDataType;
};

export const checklist_init: checklistType = {
	id: "",
	department_id: "",
	data: checklist_data_init,
};

export type checklistSheet = {
	[index: number]: string;
};
