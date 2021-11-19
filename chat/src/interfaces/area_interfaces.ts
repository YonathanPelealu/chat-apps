export type areaDataType = {
	name: string;
	description: string;
};

export const area_data_init: areaDataType = {
	name: "",
	description: "",
};

export type areaType = {
	area_id: string;
	company_id: string;
	created_at: Date;
	data: { description: string; name: string };
	id: string;
	updated_at: Date;
};
