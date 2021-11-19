import { currencyType } from "./general_interface";

export type sparepartListDataType = {
	currency: currencyType;
	price: number;
	quantity: number;
	total_price: number;
};
export type sparepartListsListType = {
	id: string;
	data: sparepartListDataType;
	sparepart_id: string;
	workorder_id: string;
};

export type sparepartDataType = {
	name: string;
	serial_number: string;
	manufacturer: string;
	originally: string;
};
export type sparepartListType = {
	id: string;
	vendor_ids: string[];
	data: sparepartDataType;
	company_id: string;
	brand_id: string;
	default_vendor_id: string;
	similar_id: string;
};

export type sparepartVendorListType = {
	vendor_id: string;
	vendor_name: string;
	vendor_address: string;
	pic_name: string;
	pic_email: string;
	pic_phone: string;
	pic_position: string;
};

export const sparepart_vendor_list_init: sparepartVendorListType = {
	vendor_id: "",
	vendor_name: "",
	vendor_address: "",
	pic_name: "",
	pic_email: "",
	pic_position: "",
	pic_phone: "",
};

export const sparepart_list_init: sparepartListType = {
	id: "",
	company_id: "",
	vendor_ids: [""],
	data: {
		name: "",
		serial_number: "",
		manufacturer: "",
		originally: "",
	},
	brand_id: "",
	default_vendor_id: "",
	similar_id: "",
};

export type formAddSparepartList = {
	workorder_id: string;
	sparepart_id: string;
	data: sparepartListDataType;
};

export type formEditSparepartList = {
	id: string;
	price: number;
	quantity: number;
};
