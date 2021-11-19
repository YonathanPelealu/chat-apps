export type rmsEventAccessViewType =
	| "all_department"
	| "user_department"
	| "createdby_user"
	| "user";
export type rmsEventAccessActionType =
	| "add_event"
	| "assign_employee"
	| "complete_event"
	| "pending_event"
	| "uncomplete_event"
	| "change_schedule";

export type rmsEventScheduledAccessViewType = "all_department" | "user";
export type rmsEventScheduledAccessActionType =
	| "assign_employee"
	| "change_schedule"
	| "cancel_schedule";

export type rmsAccessTopicType =
	| "event"
	| "event_scheduled"
	| "location_overview"
	| "lost_and_found"
	| "packages"
	| "reminder"
	| "dashboard"
	| "report"
	| "setting"
	| "event_notification_department";

export type unionRMSAccessValueType =
	| rmsEventAccessViewType
	| rmsEventAccessActionType
	| rmsEventScheduledAccessViewType
	| rmsEventScheduledAccessActionType;

export type actionAccessType = "is_active" | "view" | "action";

export type accessListsType = {
	rms: {
		event: {
			is_active: boolean;
			view: Array<rmsEventAccessViewType>;
			action: Array<rmsEventAccessActionType>;
		};
		event_scheduled: {
			is_active: boolean;
			view: Array<rmsEventScheduledAccessViewType>;
			action: Array<rmsEventScheduledAccessActionType>;
		};
		location_overview: {
			is_active: boolean;
		};
		lost_and_found: {
			is_active: boolean;
		};
		packages: {
			is_active: boolean;
		};
		reminder: {
			is_active: boolean;
		};
		dashboard: {
			is_active: boolean;
		};
		report: {
			is_active: boolean;
		};
		setting: {
			is_active: boolean;
		};
		event_notification_department: {
			is_active: boolean;
		};
	};
	ams: Record<string, any>;
	hms: Record<string, any>;
};

export const access_lists_super_admin = {
	ams: {},
	hms: {},
	rms: {
		event: {
			view: ["all_department", "user_department"],
			action: [
				"add_event",
				"assign_employee",
				"complete_event",
				"pending_event",
				"uncomplete_event",
				"change_schedule",
			],
			is_active: true,
		},
		report: {
			is_active: true,
		},
		setting: {
			is_active: true,
		},
		event_notification_department: {
			is_active: true,
		},
		packages: {
			is_active: true,
		},
		reminder: {
			is_active: true,
		},
		dashboard: {
			is_active: true,
		},
		lost_and_found: {
			is_active: true,
		},
		event_scheduled: {
			view: ["all_department"],
			action: ["assign_employee", "change_schedule", "cancel_schedule"],
			is_active: true,
		},
		location_overview: {
			is_active: true,
		},
	},
};

export const access_lists_init: accessListsType = {
	rms: {
		event: {
			is_active: false,
			view: [],
			action: [],
		},
		event_scheduled: {
			is_active: false,
			view: [],
			action: [],
		},
		location_overview: {
			is_active: false,
		},
		lost_and_found: {
			is_active: false,
		},
		packages: {
			is_active: false,
		},
		reminder: {
			is_active: false,
		},
		dashboard: {
			is_active: false,
		},
		report: {
			is_active: false,
		},
		setting: {
			is_active: false,
		},
		event_notification_department: {
			is_active: false,
		},
	},
	ams: {},
	hms: {},
};
