export type solutionListTypeType = "textbox" | "checkbox";

export type solutionTempDataType = {
	name: string;
	type: "checkbox" | "textbox";
	sequence: number;
};

export type solutionTempListType = {
	id: string;
	data: solutionTempDataType;
	cause_id: string;
};

export const solution_temp_list_init: solutionTempListType = {
	id: "",
	data: {
		name: "",
		type: "checkbox",
		sequence: 0,
	},
	cause_id: "",
};

export type solutionListType = {
	id: string;
	name: string;
	type: solutionListTypeType;
	value: string;
	sequence: number;
	workorder_id: string;
	cause_id: string;
	fill_by: string;
};

export type causeSolutionWorkorder = {
	cause_id: string;
	cause_name: string;
	solution_lists_id: string;
	fill_by: null | string;
	name: string;
	type: string;
	value: null | string;
	sequence: number;
};

export type updateSolution = {
	id: string;
	value: string;
};

export type formUpdateSolutionByWO = {
	workorder_id: string;
	cause_id: string;
	solution_lists: updateSolution[];
};
