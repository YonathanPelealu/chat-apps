import { statusDataType } from "../general_interface";
import { locationDataType } from "../location_interface";
import { priorityDataType } from "../rms/priority_interface";
import { scheduleDataType } from "../rms/schedule_interface";
import { tagDataType } from "../rms/tag_interface";
import { assetDataType } from "./asset_interface";
import { suggestionType } from "./general_interface";
import { itemDataType } from "./item_interface";
import { toolTempListDataType } from "./tool_interface";
import { vendorDataType, vendorPICdataType } from "./vendor_interface";

export type workorderDataType = {
	description: string;
	attachment: string;
	bast_note: string;
	bast_result: string;
};

export type workorderSignatureType = {
	sign_by: string;
	attachment: string;
};

export type workorderListType = {
	id: string;
	cause_ids: string[];
	item_id: string;
	is_preventive: boolean;
	is_using_warranty: boolean;
	is_using_maintenance: boolean;
	data: workorderDataType;
	signature: workorderSignatureType;
	asset_type_id: string;
	asset_id: string;
	location_id: string;
	category_id: string;
	tag_id: string;
	workorder_parent_id: string;
};

export type preventiveItemListType = {
	id: string;
	workorder_id: string;
	item_id: string;
	start_time: string;
};

export type workorderAttachmentListType = {
	id: string;
	data: { name: string; path: string };
	workorder_id: string;
	user_id: string;
};
export type workorderLogType = {
	workorder_id: string;
	user_id: string;
	description: string;
};

export type workorderList = {
	id: string;
	items: string;
	tag: string;
	priority: string;
	status: string;
	time: string;
	assign_to: string[];
	planned_time: string;
	status_index: number;
	priority_index: number;
};

export const work_order_init: workorderList = {
	id: "",
	items: "",
	tag: "",
	priority: "",
	status: "",
	time: "",
	assign_to: [""],
	planned_time: "",
	status_index: 0,
	priority_index: 0,
};

export type workorderChart = {
	item: string;
	time: string;
};

export type workorderGantChart = {
	list: workorderList[];
	gantChart: workorderChart[];
};

export type workorderListMobile = {
	workorder_id: string;
	is_preventive: boolean;
	tag: tagDataType;
	location: locationDataType;
	schedule: scheduleDataType;
	priority: priorityDataType;
	assign_to: string[];
	status_update_time: string;
};

export type addWorkorderCorrective = {
	company_id: string;
	asset_type_id: string;
	asset_id: string;
	location_id: string;
	tag_id: string;
	category_id?: string;
	user_id: string;
	user_name: string;
	item_id: string;
	data: workorderDataType;
	schedule_data: scheduleDataType;
};

export type formUpdateChecklistWorkorder = {
	id: string;
	value: string;
};
export type workorderMobileDetail = {
	id: string;
	is_using_warranty: boolean | null;
	is_using_maintenance: boolean | null;
	tag: tagDataType;
	location: locationDataType;
	asset_id?: string;
	asset: assetDataType;
	item_id: string;
	item: itemDataType;
	schedule: scheduleDataType;
	priority: priorityDataType;
	status_data: statusDataType;
	attachment: string[];
	assign_to: suggestionType[];
	status_update_time: string;
	warranty_vendor: vendorDataType | null;
	maintenance_vendor: vendorDataType | null;
	warranty_pic: vendorPICdataType | null;
	maintenance_pic: vendorPICdataType | null;
};

type checklistWorkorder = {
	id: string;
	workorder_id: string;
	fill_by: null | string;
	name: string;
	type: string;
	value: string;
};

export type workorderDetailChecklist = {
	tool_temp:
		| {
				id: string;
				data: toolTempListDataType;
		  }
		| [];
	checklist_workorder: checklistWorkorder[] | [];
};

type solutionDataCause = {
	id: string;
	fill_by: string;
	name: string;
	type: string;
	value: string;
	sequence: number;
};

export type workorderDetailCause = {
	cause_id: string;
	cause_name: string;
	solution: solutionDataCause[];
};

export type workorderMetaType = {
	id: string;
	workorder_id: string;
	assign_to: string[];
	is_active: boolean;
	notice_to: string[];
	overdue_resolve_count: number | null;
	overdue_response_count: number | null;
	resolve: { time: Date; user_id: string };
	response: { time: Date; user_id: string };
	schedule_id: string;
	share_to: string[];
	status_id: string;
};

export const workorder_meta_init: workorderMetaType = {
	id: "",
	workorder_id: "",
	assign_to: [""],
	is_active: true,
	notice_to: [""],
	overdue_resolve_count: null,
	overdue_response_count: null,
	resolve: { time: new Date(), user_id: "" },
	response: { time: new Date(), user_id: "" },
	schedule_id: "",
	share_to: [""],
	status_id: "",
};

export type sparepartList = {
	id: string;
	name: string;
	price: number;
	quantity: number;
	total_price: number;
	currency: string;
};

export type workroderDetailExpanse = {
	spareparts: sparepartList[] | [];
	services: sparepartList[] | [];
};

export type formUpdateWorkorderStatus = {
	workorder_id: string;
	status_id: string;
	detail: string;
	schedule_data?: scheduleDataType;
};

export type listWObyCommentMobile = {
	workorder_id: string;
	tag: tagDataType;
	location: locationDataType;
	schedule: scheduleDataType;
	status: string;
	priority: priorityDataType;
	comment_time: string;
};

export const workorder_data_init: workorderDataType = {
	description: "",
	attachment: "",
	bast_note: "",
	bast_result: "",
};
