import { accessListsType, access_lists_init } from "./access_lists_interfaces";

export type roleDataType = {
	access_lists: accessListsType;
	description: string;
	name: string;
};

export const role_data_init: roleDataType = {
	access_lists: access_lists_init,
	description: "",
	name: "",
};

export type roleType = {
	id: string;
	company_id: string;
	data: roleDataType;
	is_active: boolean;
};

export const role_list_init: roleType = {
	id: "",
	company_id: "",
	data: role_data_init,
	is_active: false,
};
