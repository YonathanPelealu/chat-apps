export type checklistEventType = {
	id: string;
	fill_by: string | null;
	is_active: boolean;
	name: string;
	sequence: number;
	type: "checkbox" | "textbox";
	value: "checked" | "unchecked" | string;
};

export const checklist_list_event_init: checklistEventType = {
	id: "",
	fill_by: "",
	is_active: true,
	name: "",
	sequence: 0,
	type: "checkbox",
	value: "",
};
