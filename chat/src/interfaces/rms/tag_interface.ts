import { priorityDataType } from "./priority_interface";
import { departmentDataType } from "../department_interface";
import { checklistListType } from "./checklist_interface";

export type tagDataType = {
	name: string;
	description: string;
	is_team: boolean;
	point: number;
	resolve_time: number[];
};

export const tag_data_init = {
	name: "",
	point: 0,
	is_team: true,
	description: "",
	resolve_time: [0, 0, 0],
};

export type tagListsDetailType = {
	id: string;
	department_id: string;
	category_id: string;
	checklist_temp_id: string;
	data: tagDataType;
	department_data: departmentDataType;
	priority_data: priorityDataType;
	checklist_data: checklistListType;
	// response_time: number[];
	priority_id: string;
	cause_ids?: string[];
	tool_temp_id?: string;
	testcomm_temp_id?: string;
};

export type formResolveTimeType = {
	day: number;
	hour: number;
	minute: number;
};

export type tagFormType = {
	name: string;
	description: string;
	is_team: boolean;
	point: number;
	department_id: string;
	category_id: string;
	priority_id: string;
	checklist_temp_id: string;
	resolve_time: formResolveTimeType[];
	cause_ids?: string[];
	tool_temp_id?: string;
	testcomm_temp_id?: string;
};

export type tagFormNewResolveTimeType = {
	name: string;
	department_id: string;
	category_id: string;
	priority_id: string;
	checklist_temp_id: string;
	resolve_time: number[];
};

export const tag_form_init: tagFormType = {
	name: "",
	description: "",
	is_team: false,
	point: 0,
	department_id: "",
	category_id: "",
	priority_id: "",
	checklist_temp_id: "",
	resolve_time: [
		{
			day: 0,
			hour: 0,
			minute: 0,
		},
		{
			day: 0,
			hour: 0,
			minute: 0,
		},
		{
			day: 0,
			hour: 0,
			minute: 0,
		},
	],
};

export type tagSheet = {
	[index: number]: number;
};
