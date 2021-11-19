export type testcommListListType = "textbox" | "checkbox";

export type testcommTempListListType = {
	name: string;
	type: "checkbox" | "textbox";
};

export const testcomm_temp_list_list_init: testcommTempListListType = {
	name: "",
	type: "checkbox",
};

export type testcommTempDataType = {
	name: string;
	lists: testcommTempListListType[];
};

export type testcommTempListType = {
	id: string;
	data: testcommTempDataType;
};

export const testcomm_temp_list_init: testcommTempListType = {
	id: "",
	data: {
		name: "",
		lists: [testcomm_temp_list_list_init],
	},
};

export type testcommListType = {
	id: string;
	name: string;
	type: testcommListListType;
	value: string;
	sequence: number;
	workorder_id: string;
	testcomm_temp_id: string;
	fill_by: string;
};

export const testcomm_list_init: testcommListType = {
	id: "",
	name: "",
	type: "checkbox",
	value: "",
	sequence: 0,
	workorder_id: "",
	testcomm_temp_id: "",
	fill_by: "",
};

export type woDetailTestcomList = {
	id: string;
	name: string;
	type: "checkbox" | "textbox";
	value: string | boolean | null;
};
