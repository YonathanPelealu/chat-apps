export type filterDataType = {
	area: { ids: string[]; names: string[] };
	category: { ids: string[]; names: string[] };
	status: string;
	tag: { ids: string[]; names: string[] };
	location: { ids: string[]; names: string[] };
	start_date: string;
	end_date: string;
	department: { ids: string[]; names: string[] };
	user: { ids: string[]; names: string[] };
	employee: { ids: string[]; names: string[] };
};

export const filter_init: filterDataType = {
	area: { ids: [], names: [] },
	category: { ids: [], names: [] },
	status: "",
	tag: { ids: [], names: [] },
	location: { ids: [], names: [] },
	start_date: "",
	end_date: "",
	department: { ids: [], names: [] },
	user: { ids: [], names: [] },
	employee: { ids: [], names: [] },
};

export type listEventEmployee = {
	event_id: string;
	name_tag: string;
	planned_time: string;
	resolve_sla: string;
	resolve_time: string;
	response_sla: string;
	response_time: string;
	status: string;
};

export const list_event_employee_init = {
	event_id: "",
	name_tag: "",
	planned_time: "",
	resolve_sla: "",
	resolve_time: "",
	response_sla: "",
	response_time: "",
	status: "",
};

export type eventDetailDataType = {
	eventDetailReport: [
		{
			event_ids: string;
			user_name: string;
			department: string[];
			status: string;
			planned_time: string;
			location: string;
			tag: string;
			target_resolve_time: string;
			target_response_time: string;
			start_time: string;
			resolve: {
				day: number;
				hour: number;
				minute: number;
			};
			response: {
				day: number;
				hour: number;
				minute: number;
			};
		}
	];
	comment: [
		{
			id: string;
			is_active: boolean;
			event_id: string;
			item_id: string;
			user_id: string;
			data: {
				text: string;
				attachment: string;
			};
			created_at: string;
			updated_at: string;
			user_name: string;
		}
	];
	event_log: [
		{
			id: string;
			is_active: boolean;
			event_id: string;
			item_id: string;
			user_id: string;
			description: string;
			created_at: string;
			updated_at: string;
			user_name: string;
			department_ids: string[];
		}
	];
};

export const event_detail_data_init: eventDetailDataType = {
	eventDetailReport: [
		{
			event_ids: "",
			user_name: "",
			department: [""],
			status: "",
			planned_time: "",
			location: "",
			tag: "",
			target_resolve_time: "",
			target_response_time: "",
			start_time: "",
			resolve: {
				day: 0,
				hour: 0,
				minute: 0,
			},
			response: {
				day: 0,
				hour: 0,
				minute: 0,
			},
		},
	],
	comment: [
		{
			id: "",
			is_active: false,
			event_id: "",
			item_id: "",
			user_id: "",
			data: {
				text: "",
				attachment: "",
			},
			created_at: "",
			updated_at: "",
			user_name: "",
		},
	],
	event_log: [
		{
			id: "",
			is_active: false,
			event_id: "",
			item_id: "",
			user_id: "",
			description: "",
			created_at: "",
			updated_at: "",
			user_name: "",
			department_ids: [""],
		},
	],
};

export type eventEmployeeDataType = {
	totalEvent: string;
	totalHour: string;
	listEvent: listEventEmployee[];
};

export const event_employee_data_init: eventEmployeeDataType = {
	totalEvent: "",
	totalHour: "",
	listEvent: [list_event_employee_init],
};

export type eventStatusDataType = {
	id: string;
	location: string;
	tag: string;
	status: string;
	planned_time: string;
	status_change: string;
};

export const event_status_data_init: eventStatusDataType = {
	id: "",
	location: "",
	tag: "",
	status: "",
	planned_time: "",
	status_change: "",
};

export type listEventTag = {
	event_id: string;
	category: string;
	tag: string;
	status: string;
	planned_time: string;
};

export const list_event_tag_init = {
	event_id: "",
	category: "",
	tag: "",
	status: "",
	planned_time: "",
};

export type eventDataType = {
	event_id: string;
	location: string;
	tag: string;
	assign_to: string;
	planned_time: string;
};

export const event_data_init: eventDataType = {
	event_id: "",
	location: "",
	tag: "",
	assign_to: "",
	planned_time: "",
};

export type eventTagDataType = {
	listEvent: listEventTag[];
	dataForCard: {
		slowest_tag_response: string;
		fastest_tag_response: string;
		slowest_response_time: string;
		fastest_response_time: string;
		slowest_tag_resolve: string;
		fastest_tag_resolve: string;
		slowest_resolve_time: string;
		fastest_resolve_time: string;
		average_response_time: string;
		average_resolve_time: string;
	};
};

export const event_tag_data_init: eventTagDataType = {
	listEvent: [list_event_tag_init],
	dataForCard: {
		slowest_tag_response: "",
		fastest_tag_response: "",
		slowest_response_time: "",
		fastest_response_time: "",
		slowest_tag_resolve: "",
		fastest_tag_resolve: "",
		slowest_resolve_time: "",
		fastest_resolve_time: "",
		average_response_time: "",
		average_resolve_time: "",
	},
};

export type listEventDataType = {
	area: string;
	event_id: string;
	location: string;
	planned_time: string;
	status: string;
	tag: string;
};

export const list_event_data_init: listEventDataType = {
	area: "",
	event_id: "",
	location: "",
	planned_time: "",
	status: "",
	tag: "",
};

export type topTagBarDataType = {
	tag: string;
	total_event: number;
};

export const top_tag_bar_data_init: topTagBarDataType = {
	tag: "",
	total_event: 0,
};

export type workingHourDataType = {
	working_hour: string;
};

export const working_hour_data_init: workingHourDataType = {
	working_hour: "",
};

export type eventLocationDataType = {
	listEvent: listEventDataType[];
	topTagBar: topTagBarDataType[];
	workingHour: workingHourDataType;
	totalEvent: number;
};

export const event_location_data_init: eventLocationDataType = {
	listEvent: [list_event_data_init],
	topTagBar: [top_tag_bar_data_init],
	workingHour: working_hour_data_init,
	totalEvent: 0,
};

export type listEventTagDataType = {
	tag: string;
	average_response_time: string;
	target_response: string;
	average_resolve_time: string;
	target_resolve: string;
	location: string;
	total_event: string;
};

export const list_event_tag_data_init: listEventTagDataType = {
	tag: "",
	average_response_time: "",
	target_response: "",
	average_resolve_time: "",
	target_resolve: "",
	location: "",
	total_event: "",
};

export type dataForGraphTag = {
	current_database: string;
};

export const data_for_graph_tag: dataForGraphTag = {
	current_database: "",
};

export type dataForBarTag = {
	tag: string;
	total_event: number;
};

export const data_for_bar_tag: dataForBarTag = {
	tag: "",
	total_event: 0,
};

export type tagLocationDataType = {
	listEvent: listEventTagDataType[];
	dataForGraph: dataForGraphTag[];
	dataForBar: dataForBarTag[];
};

export const tag_location_data_init: tagLocationDataType = {
	listEvent: [list_event_tag_data_init],
	dataForGraph: [data_for_graph_tag],
	dataForBar: [data_for_bar_tag],
};

export type tagSummaryDataType = {
	countEvent: [
		{
			status: string;
			count_event: number;
		}
	];
	eventInformation: {
		category: string;
		tag: string;
		average_resolve_time: string;
		average_response_time: string;
		target_resolve: string;
		target_response: string;
	};
	topLocationBar: [
		{
			location: string;
			total_event: string;
		}
	];
	topResponseEmployeeBar: [
		{
			employee: string;
			response_time: string;
		}
	];
	topResolveEmployeeBar: [
		{
			employee: string;
			resolve_time: string;
		}
	];
	widgetTagSummary: {
		average_resolve: string;
		average_response: string;
		fastest_response: string;
		fastest_resolve: string;
		slowest_response: string;
		slowest_resolve: string;
	};
	workOrderList: [];
};

export const tag_summary_data_init: tagSummaryDataType = {
	countEvent: [
		{
			status: "",
			count_event: 0,
		},
	],
	eventInformation: {
		category: "",
		tag: "",
		average_resolve_time: "",
		average_response_time: "",
		target_resolve: "",
		target_response: "",
	},
	topLocationBar: [
		{
			location: "",
			total_event: "",
		},
	],
	topResponseEmployeeBar: [
		{
			employee: "",
			response_time: "",
		},
	],
	topResolveEmployeeBar: [
		{
			employee: "",
			resolve_time: "",
		},
	],
	widgetTagSummary: {
		average_resolve: "",
		average_response: "",
		fastest_response: "",
		fastest_resolve: "",
		slowest_response: "",
		slowest_resolve: "",
	},

	workOrderList: [],
};

export type eventStatusCardDataType = {
	countStatus: [{ count_event: string; status: string; total_event: string }];
	totalEvent: string;
};

export const event_status_card_data_init: eventStatusCardDataType = {
	countStatus: [{ count_event: "", status: "", total_event: "" }],
	totalEvent: "",
};
