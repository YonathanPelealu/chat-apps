export type causeListType = {
	id: string;
	data: { name: string };
	company_id: string;
};

export const cause_list_init: causeListType = {
	id: "",
	data: {
		name: "",
	},
	company_id: "",
};

export type causeList = {
	id: string;
	is_active: boolean;
	company_id: string;
	data: {
		name: string;
	};
	created_at: string;
	updated_at: string;
};
