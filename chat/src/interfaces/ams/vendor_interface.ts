import { assetDataType, assetTypeDataType } from "./asset_interface";
import { brandListType } from "./brand_interface";
import { locationDataType } from "../location_interface";
import { tagDataType } from "../rms/tag_interface";
import { scheduleListType } from "./schedule_interface";
import { workorderListType } from "./workorder_interface";

export type vendorDataType = {
	name: string;
	address: string;
	phone_number: string;
};

export const vendor_data_init: vendorDataType = {
	name: "",
	address: "",
	phone_number: "",
};

export type vendorPICdataType = {
	name: string;
	position: string;
	phone_number: string;
	email: string;
	is_default: boolean;
};

export const vendor_pic_data_init: vendorPICdataType = {
	name: "",
	position: "",
	phone_number: "",
	email: "",
	is_default: false,
};

export type vendorListType = {
	id: string;
	data: vendorDataType;
	pic_data: vendorPICdataType[];
	company_id: string;
};

export const vendor_list_init: vendorListType = {
	id: "",
	data: {
		name: "",
		address: "",
		phone_number: "",
	},
	pic_data: [vendor_pic_data_init],
	company_id: "",
};

export type vendorAttachmentListType = {
	id: string;
	date: { name: string; path: string };
	vendor_id: string;
};

export type workorderHistoryType = {
	location_id: string;
	asset_name: assetDataType["name"];
	tag_name: tagDataType["name"];
	date: scheduleListType["data"]["start_date"];
	time: scheduleListType["data"]["start_time"];
	type: string;
};

export const workorder_history_init: workorderHistoryType = {
	location_id: "",
	asset_name: "",
	tag_name: "",
	date: "",
	time: "",
	type: "",
};

export type relatedItemListType = {
	id: string;
	vendor_id: string;
	type_id: string;
	brand_id: string;
	location_id: string;
	asset_name: assetDataType["name"];
	asset_type: assetTypeDataType["name"];
	brand: brandListType["data"]["name"];
	location: locationDataType["name"];
};

export const related_item_list_init: relatedItemListType = {
	id: "",
	vendor_id: "",
	type_id: "",
	brand_id: "",
	location_id: "",
	asset_name: "",
	asset_type: "",
	brand: "",
	location: "",
};

export type vendorSuggestion = {
	id: string;
	name: string;
	pic_data: vendorPICdataType;
};

export type vendorListDisplayType = {
	id: string;
	vendor_name: string;
	pic_name: string;
	pic_position: string;
	pic_phone: string;
	is_default: string;
};

export const vendor_list_display_init: vendorListDisplayType = {
	id: "",
	vendor_name: "",
	pic_name: "",
	pic_position: "",
	pic_phone: "",
	is_default: "",
};
