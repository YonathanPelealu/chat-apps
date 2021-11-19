import { accessListsType } from "./access_lists_interfaces";
export type tokenObjectType = {
	data: {
		company_id: string;
		department_ids: string[];
		role_id: string;
		user_id: string;
		user_name: string;
		access_lists: accessListsType;
	};
	expired: string;
	issued: Date;
	token: string;
};
