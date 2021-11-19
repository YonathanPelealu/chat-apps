import { locationData } from "./item_interface";

export type assetDataType = {
	name: string;
	model_number: string;
	manufacturer: string;
	photo: string;
	description: string;
	is_warranty: boolean;
	is_maintenance: boolean;
	quantity: string;
	additional_information?: string;
};

export const asset_data_init: assetDataType = {
	name: "",
	model_number: "",
	manufacturer: "",
	photo: "",
	description: "",
	is_warranty: false,
	is_maintenance: false,
	quantity: "",
	additional_information: "",
};

export type assetCustomFieldType = {
	name: string;
	type:
		| "text"
		| "calendar"
		| "number"
		| "currency"
		| "image"
		| "pdf"
		| "vendor";
};

export type assetListType = {
	id: string;
	data: assetDataType;
	vendor_ids: string[];
	sparepart_ids: string[];
	custom_fields: assetCustomFieldType[];
	company_id: string;
	asset_category_id: string;
	asset_type_id: string;
	brand_id: string;
	default_vendor_id: string;
	is_created_on_mobile?: boolean
};

export type assetAttachmentListType = {
	id: string;
	data: {
		name: string;
		path: string;
	};
	asset_id: string;
	user_id: string;
};

export type assetCategoryListType = {
	id: string;
	data: {
		name: string;
	};
	company_id: string;
};

export type assetAllListType = {
	id: string;
	name: string;
};

export const asset_all_list_type: assetAllListType = {
	id: "",
	name: "",
};

export type assetTypeDataType = {
	name: string;
};

export type assetTypeListType = {
	id: string;
	data: assetTypeDataType;
	asset_category_id: string;
};

export type assetAttachment = {
	name: string;
	path: string;
};

export type assetOption = {
	asset_id: string;
	asset_name: string;
	category: string;
	type: string;
	brand: string;
};

export type assetListDisplayType = {
	id: string;
	asset_name: string;
	asset_category: string;
	asset_type: string;
	brand: string;
	quantity: string;
};

export const asset_list_display_type: assetListDisplayType = {
	id: "",
	asset_name: "",
	asset_category: "",
	asset_type: "",
	brand: "",
	quantity: "",
};

export type assetListMobile = {
	id: string;
	name: string;
	category: string;
	type: string;
	brand: string;
};

export type detailAssetMobile = {
	id: string;
	asset_name: string;
	model_number: string;
	photo: string;
	is_warranty: boolean;
	is_maintenance: boolean;
	id_category: string;
	category: string;
	id_type: string;
	type: string;
	id_brand: string;
	brand: string;
	additional_information: string;
	is_created_on_mobile?: boolean;
};

export type assetListItemMobile = {
	id: string;
	name: string;
	location: locationData;
	status: string;
};
