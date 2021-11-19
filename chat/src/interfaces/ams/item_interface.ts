import {
	maintenanceAttachmentListType,
	maintenanceListType,
} from "./maintenance_interface";
import {
	warrantyAttachmentListType,
	warrantyListType,
} from "./warranty_interface";
import { currencyType, itemStatusDefaultType } from "./general_interface";
import { locationDataType } from "../location_interface";
import { vendorPICdataType } from "./vendor_interface";

export type itemDataType = {
	qrcode: string;
	barcode: string;
	serial_number: string;
	rfid: string;
	price: {
		currency: currencyType;
		value: number;
	};
};

export const item_data_init: itemDataType = {
	qrcode: "",
	barcode: "",
	serial_number: "",
	rfid: "",
	price: {
		currency: "idr",
		value: 0,
	},
};

export type itemListType = {
	id: string;
	data: itemDataType;
	date_purchase: Date;
	date_installation: Date;
	asset_id: string;
	parent_id: string;
	location_id: string;
	area_id: string;
	item_status_id: string;
	vendor_id: string;
};
export const item_list_init: itemListType = {
	id: "",
	data: item_data_init,
	date_purchase: new Date(),
	date_installation: new Date(),
	asset_id: "",
	parent_id: "",
	location_id: "",
	area_id: "",
	item_status_id: "",
	vendor_id: "",
};

export type addItemFormDataType = {
	general_info: itemListType;
	warranty: warrantyListType;
	warranty_attachment: warrantyAttachmentListType[];
	maintenance: maintenanceListType;
	maintenance_attachment: maintenanceAttachmentListType[];
	additional_info: itemAdditionalInfoListType[];
};

export type addItemFormMobile = {
	data: itemDataType;
	date_purchase: Date;
	date_installation: Date;
	parent_id: string | null;
	location_id: string;
	area_id: string;
	item_status_id: string;
	vendor_id: string;
	asset_id: string;
};

export type itemStatusListType = {
	id: string;
	data: { name: itemStatusDefaultType | string };
};

export type itemAdditionalInfoListType = {
	id: string;
	item_id: string;
	data: {
		name: string;
		type:
			| "text"
			| "calendar"
			| "number"
			| "currency"
			| "image"
			| "pdf"
			| "vendor";
		value: string;
	};
};

export type itemMovementListType = {
	id: string;
	schedule_movement: Date;
	old_location_id: string;
	new_location_id: string;
	pic_user_id: string;
};

export type itemLogListType = {
	id: string;
	description: string;
	item_id: string;
	user_id: string;
};

export type itemListMobile = {
	id: string;
	asset_name: string;
	status: string;
	data_location: locationDataType;
};

export type itemDetailMobile = {
	item_id: string;
	item_data: itemDataType;
	area_id: string;
	area: string;
	location_id: string;
	location: locationDataType;
	vendor_id: string;
	vendor_name: string;
	pic_vendor: vendorPICdataType;
	date_purchase: Date;
	date_installation: Date;
	status_id: string;
	status: string;
};

type attachment = {
	id: string;
	name: string;
	path: string;
};
export type warrantyContract = {
	id: string;
	vendor_id: string;
	vendor: string;
	vendor_pic: vendorPICdataType;
	expired_date: Date;
	coverage: string;
	warranty_attachment: attachment[];
};

export type maintenanceContract = {
	id: string;
	vendor_id: string;
	vendor: string;
	vendor_pic: vendorPICdataType;
	expired_date: Date;
	coverage: string;
	maintenance_attahment: attachment[];
};

export type itemDetailContract = {
	warranty: warrantyContract;
	maintenance: maintenanceContract;
};

export type itemDetailAdditional = {
	id: string;
	name: string;
	type:
		| "text"
		| "calendar"
		| "number"
		| "currency"
		| "image"
		| "pdf"
		| "vendor";
	value: any;
};

export type updateCOntract = {
	vendor: string;
	expired_date: Date;
	coverage: string;
};
export type updateItemContract = {
	item_id: string;
	warranty: updateCOntract;
	maintenance: updateCOntract;
};

export type locationData = {
	name: string,
	floor: string,
	description: string
}
export type asset_list_overview = [
	{
		id: string,
		data: {
			name: string
		},
		perfect_qty: number,
		total_item: number,
		perfectroom_type_id: string,
		is_complete: boolean
	}
]
export type itemOverview = {
	location_id: string;
	data: locationData,
	asset_type_lists: asset_list_overview,
	is_perfect : boolean | null
}
