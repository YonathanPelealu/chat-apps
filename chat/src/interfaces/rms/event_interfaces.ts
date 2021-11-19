import { scheduleDataType, schedule_data_init } from "./schedule_interface";
import {
	eventStatusDataType,
	event_status_data_init,
} from "./event_status_interface";
import { locationDataType, location_data_init } from "../location_interface";
import { priorityDataType, priority_data_init } from "./priority_interface";
import { tagDataType, tag_data_init } from "./tag_interface";

export type addEventType = {
	user_id: string;
	category_id: string;
	tag_id: string;
	location_id: string;
	event_detail: string;
	attachment: string;
	is_scheduled: boolean;
	schedule_data: scheduleDataType;
};

export type eventDataType = {
	cost: string;
	is_ams?: boolean;
	attachment: string;
	event_detail: string;
};

export const event_data_init: eventDataType = {
	cost: "",
	is_ams: false,
	attachment: "",
	event_detail: "",
};

export type eventDetailType = {
	id: string;
	event_id?: string;
	data: eventDataType;
	tag_data: tagDataType;
	priority_data: priorityDataType;
	location_data: locationDataType;
	status_data: eventStatusDataType;
	category_name: string;
	assign_to: string[];
	schedule_data: scheduleDataType;
	is_scheduled: boolean;
	created_at: Date;
	status_update_time: Date;
	tag_department: string;
	tag_id: string;
	id_department_tag: string;
};

export const event_detail_init: eventDetailType = {
	id: "",
	event_id: "",
	data: event_data_init,
	tag_data: tag_data_init,
	priority_data: priority_data_init,
	location_data: location_data_init,
	status_data: event_status_data_init,
	category_name: "",
	assign_to: [""],
	is_scheduled: false,
	schedule_data: schedule_data_init,
	created_at: new Date(),
	status_update_time: new Date(),
	tag_department: "",
	tag_id: "",
	id_department_tag: "",
};

export type eventListByComment = {
	event_id: string;
	tag: string;
	location: locationDataType;
	time: string;
	schedule: scheduleDataType;
	status: string;
};
