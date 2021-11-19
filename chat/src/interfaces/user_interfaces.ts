export type userDataType = {
	name: string;
	email: string;
	password: string;
	phone: string;
};

export type userType = {
	id?: string; // leave it optional
	company_id: string;
	role_id: string;
	department?: string[]; // web frontend need this department name lists
	department_ids: string[];
	department_escalation: number[];
	data: userDataType;
	is_active: boolean;
};

export const user_data_init: userDataType = {
	email: "",
	name: "",
	password: "",
	phone: "",
};

export const user_init: userType = {
	id: "",
	company_id: "",
	role_id: "",
	department: [""],
	department_ids: [],
	department_escalation: [],
	data: user_data_init,
	is_active: true,
};

export const user_list_init: userType = {
	id: "",
	company_id: "",
	role_id: "",
	department: [""],
	department_ids: [],
	department_escalation: [],
	data: user_data_init,
	is_active: true,
};

export type departmentUser = {
	[index: number]: string;
};
