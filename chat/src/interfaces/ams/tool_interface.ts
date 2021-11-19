export type toolTempListDataListType = {
	name: string
}

export const tool_temp_list_data_list_init: toolTempListDataListType = {
	name: ""
}

export type toolTempListDataType = {
	name: string;
	lists: toolTempListDataListType[];
}

export type toolTempListType = {
	id: string;
	data: toolTempListDataType;
	company_id: string;
};

export const tool_temp_list_init: toolTempListType = {
	id: "",
	data: {
		name: "",
		lists: [tool_temp_list_data_list_init]
	},
	company_id: ""
}

export type toolListType = {
	id: string;
	name: string;
	is_checked: boolean;
	tool_temp_id: string;
	workorder_id: string;
	fill_by: string;
};
