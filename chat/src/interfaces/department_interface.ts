export type departmentDataType = {
	name: string;
	description: string;
};

export const department_data_init = {
	name: "",
	description: "",
};

export type departmentType = {
	id: string;
	data: departmentDataType;
	company_id: string;
	is_active: boolean;
};

export const department_init: departmentType = {
	id: "",
	data: {
		name: "",
		description: "",
	},
	is_active: true,
	company_id: "",
};
