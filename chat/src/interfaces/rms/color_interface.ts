export type statusColorSelectorType =
	| "primary"
	| "secondary"
	| "open"
	| "ongoing"
	| "done"
	| "pending"
	| "uncompleted"
	| "overdue"
	| "overdue-response"
	| "overdue-resolve"
	| "completed"
	| "event"
	| "scheduled event"
	| "close"
	| "stored"
	| "missing";

export const status_color_selector_init = {
	primary: "#1e0068",
	secondary: "#0450ee",
	open: "#096fce",
	ongoing: "#c2c2c8",
	done: "#0450ee",
	pending: "#ce7f09",
	completed: "#1e0068",
	uncompleted: "#ce0909",
	overdue: "#6a0404",
	"overdue-response": "#ce0909",
	"overdue-resolve": "#ce0909",
	event: "#1e0068",
	"scheduled event": "#0450ee",
	"close": "#1E0068",
	"stored": "#C2C2C8",
	"missing": "#CE0909",
};
