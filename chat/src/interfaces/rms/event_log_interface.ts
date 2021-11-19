type log_add_event_temp = "Created new event";
export const log_add_event_temp_init = "Created new event";

type log_add_recur_event_temp = "Created new recurring event";
export const log_add_recur_event_temp_init = "Created new recurring event";

type log_assign_event_temp = "Assigned this event";
export const log_assign_event_temp_init = "Assigned this event";

type log_event_status_update_temp = "Update the event status" | string;
export const log_event_status_update_temp_init = "Update the event status";

type log_change_schedule_temp = "Change the schedule";
export const log_change_schedule_temp = "Change the schedule";

// comment
type log_add_comment_temp = "Added a comment";
export const log_add_comment_temp_init = "Added a comment";

type log_add_comment_attachment_temp = "Added an attachment";
export const log_add_comment_attachment_temp_init = "Added an attachment";

export type event_log_type = {
	event_id: string;
	user_id: string;
	description:
		| log_add_event_temp
		| log_add_recur_event_temp
		| log_assign_event_temp
		| log_add_comment_temp
		| log_add_comment_attachment_temp
		| log_event_status_update_temp
		| log_change_schedule_temp;
};
