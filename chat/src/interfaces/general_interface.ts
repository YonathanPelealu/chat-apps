import { accessListsType } from "./access_lists_interfaces";

export type anyObjectType = Record<string, any>;
export type unknownObjectType = Record<string, unknown>;

export type tokenPayloadType = {
	data: {
		user_id: string;
		role_id: string;
		department_id: string;
		company_id: string;
		access_lists: accessListsType;
	};
};

export type responseType = {
	is_show: false;
	type: "success" | "warning" | "error";
	message: "";
};

export type filterType = Record<string, Array<string | number>>;
export const filter_init: filterType = {};

export type serviceType = "rms" | "ams" | "hms";
export type statusDataType = {
	name: string;
};
