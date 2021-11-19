export type brandListType = {
	id: string;
	company_id: string;
	data: {
		name: string;
	};
};

export const brand_list_init: brandListType = {
	id: "",
	company_id: "",
	data: {
		name: ""
	}
}