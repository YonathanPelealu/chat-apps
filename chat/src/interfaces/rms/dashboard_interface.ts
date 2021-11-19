import dayjs from "dayjs";
import { statusColorSelectorType } from "./color_interface";
import {
	reminderDataType,
	reminderFormData,
	reminder_data_init,
	reminder_form_data_init,
} from "./reminder_interfaces";

export type dashboardFilterDataType = {
	left_range: string;
	right_range: string;
	department_lists: { ids: string[]; names: string[] };
};

export const dashboard_filter_data_init: dashboardFilterDataType = {
	left_range: dayjs().format("YYYY-MM-DD"),
	right_range: dayjs().format("YYYY-MM-DD"),
	department_lists: { ids: [], names: [] },
};

type countReminderType = {
	count: number;
	status: statusColorSelectorType;
};

export type dashboardReminderDataType = {
	list_reminder: reminderFormData[];
	countReminder: countReminderType[];
};

export const dashboard_reminder_data_init: dashboardReminderDataType = {
	list_reminder: [reminder_form_data_init],
	countReminder: [
		{ status: "open", count: 0 },
		{ status: "overdue", count: 0 },
		{ status: "done", count: 0 },
	],
};

type countEventType = {
	count_event: number;
	status: statusColorSelectorType;
};

export type dashboardEventDataType = {
	totalEvent: number;
	normalEvent: number;
	scheduleEvent: number;
	countEvent: countEventType[];
	tagBarOverdue: [
		{
			tag: string;
			total_event: number;
		}
	];
	locationBar: [
		{
			location: string;
			total_event: number;
		}
	];
	tagBar: [
		{
			tag: string;
			total_event: number;
		}
	];
	eventList: [
		{
			event_id: string;
			status: string;
			tag: string;
			area: string;
			location: string;
			planned_time: string;
		}
	];
	eventScheduleList: [
		{
			event_id: string;
			status: string;
			tag: string;
			area: string;
			location: string;
			planned_time: string;
		}
	];
};

export const dashboard_event_data_init: dashboardEventDataType = {
	totalEvent: 0,
	normalEvent: 0,
	scheduleEvent: 0,
	countEvent: [
		{ status: "open", count_event: 0 },
		{ status: "uncompleted", count_event: 0 },
		{ status: "ongoing", count_event: 0 },
		{ status: "completed", count_event: 0 },
		{ status: "pending", count_event: 0 },
		{ status: "overdue-response", count_event: 0 },
		{ status: "overdue-resolve", count_event: 0 },
		{ status: "overdue", count_event: 0 },
		{ status: "done", count_event: 0 },
	],
	tagBarOverdue: [
		{
			tag: "",
			total_event: 0,
		},
	],
	locationBar: [
		{
			location: "",
			total_event: 0,
		},
	],
	tagBar: [
		{
			tag: "",
			total_event: 0,
		},
	],
	eventList: [
		{
			event_id: "",
			status: "",
			tag: "",
			location: "",
			planned_time: "",
			area: "",
		},
	],
	eventScheduleList: [
		{
			event_id: "",
			status: "",
			tag: "",
			area: "",
			location: "",
			planned_time: "",
		},
	],
};
