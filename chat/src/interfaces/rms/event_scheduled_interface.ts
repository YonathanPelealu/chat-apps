import {
	departmentDataType,
	department_data_init,
} from "../department_interface";
import { event_data_init, eventDataType } from "./event_interfaces";
import { priorityDataType, priority_data_init } from "./priority_interface";
import { moduleType } from "../moduleInterfaces";
import { locationDataType, location_data_init } from "../location_interface";
import { scheduleDataType, schedule_data_init } from "./schedule_interface";
import { tagDataType, tag_data_init } from "./tag_interface";
import {
	eventStatusDataType,
	event_status_data_init,
} from "./event_status_interface";

export type eventScheduleAddFormType = {
	category_id: string;
	tag_id: string;
	location_id: string;
	event_detail: string;
	attachment: File | null;
	schedule_data: scheduleDataType;
};

export type eventScheduledListType = {
	event_id: string;
	tag_data: tagDataType;
	location_data: locationDataType;
	schedule_data: scheduleDataType;
	scheduled_parent_id: null | string;
};

export const event_scheduled_list_init: eventScheduledListType = {
	event_id: "",
	tag_data: tag_data_init,
	location_data: location_data_init,
	schedule_data: schedule_data_init,
	scheduled_parent_id: null,
};

export type eventScheduledDetailType = {
	id: string;
	user_id: string;
	category_name: string;
	created_at: Date;
	data: eventDataType;
	is_active: boolean;
	is_scheduled: boolean;

	location_id: string;
	location_data: locationDataType;
	location_others: null | string;

	module_type: moduleType;
	priority_data: priorityDataType;
	department_data: departmentDataType;

	schedule_data: scheduleDataType;
	scheduled_parent_id: null | string;

	assign_to: string[];

	tag_id: string;
	tag_data: tagDataType;
	tag_others: null;

	updated_at: Date;
};

export const event_scheduled_detail_init: eventScheduledDetailType = {
	id: "",
	user_id: "",
	category_name: "",
	created_at: new Date(),
	data: event_data_init,
	is_active: true,
	is_scheduled: true,
	location_data: location_data_init,
	location_id: "",
	location_others: null,
	module_type: "rms",
	priority_data: priority_data_init,
	department_data: department_data_init,
	schedule_data: schedule_data_init,
	assign_to: [""],
	scheduled_parent_id: null,
	tag_data: tag_data_init,
	tag_id: "",
	tag_others: null,
	updated_at: new Date(),
};

export type eventScheduledHistoryType = {
	event_id: string;
	scheduled_parent_id: string | null;
	scheduled_iteration: number | null;
	schedule_data: scheduleDataType;
	status_data: eventStatusDataType;
	latest_update?: Date;
	assign_to?: string[];
};

export const event_scheduled_history_init: eventScheduledHistoryType = {
	event_id: "",
	scheduled_parent_id: "",
	schedule_data: schedule_data_init,
	scheduled_iteration: null,
	status_data: event_status_data_init,
	latest_update: new Date(),
	assign_to: [""],
};
