import { assetTypeListType } from "./asset_interface";

export type perfectroomDataType = {
	name: string;
	description: string;
};


export type perfectroomListType = {
	id: string;
	company_id: string;
	data: perfectroomDataType;
};

export type perfectroomAssetTypeListType = {
	perfectroom_type_id: string;
	asset_type_id: string;
	quantity: number;
};

export const perfectroom_asset_type_list_init: perfectroomAssetTypeListType = {
	perfectroom_type_id: "",
	asset_type_id: "", 
	quantity: 0,
};

export type perfectroomTempAssetDataListType = {
	name: string;
	quantity: string;
}

export const perfectroom_temp_list_data_list_init:
	perfectroomTempAssetDataListType = {
	name: "",
	quantity: "",
}

export type perfectroomTempListDataType = {
	name: string;
	description: string;
	lists: perfectroomTempAssetDataListType[];
};

export type perfectroomTempListType = {
	id: string;
	data: perfectroomTempListDataType;
	company_id: string;
};

export const perfectroom_temp_list_init: perfectroomTempListType = {
	id: "",
	data: {
		name: "",
		description: "",
		lists: [perfectroom_temp_list_data_list_init]
	},
	company_id: ""
}



