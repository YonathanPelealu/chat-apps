type log_add_workorder_temp = "Created new workorder";
export const log_add_workorder_temp_init = "Created new workorder";

type log_add_recur_workorder_temp = "Created new recurring workorder";
export const log_add_recur_workorder_temp_init =
	"Created new recurring workorder";

type log_assign_workorder_temp = "Assigned this workorder";
export const log_assign_workorder_temp_init = "Assigned this workorder";

type log_workorder_status_update_temp = "Update the workorder status" | string;
export const log_workorder_status_update_temp_init =
	"Update the workorder status";

type log_change_schedule_temp = "Change the schedule";
export const log_change_schedule_temp = "Change the schedule";

// comment
type log_add_comment_temp = "Added a comment";
export const log_add_comment_temp_init = "Added a comment";

type log_add_comment_attachment_temp = "Added an attachment";
export const log_add_comment_attachment_temp_init = "Added an attachment";

export type workorder_log_type = {
	workorder_id: string;
	user_id: string;
	user_name?: string;
	description:
		| log_add_workorder_temp
		| log_add_recur_workorder_temp
		| log_assign_workorder_temp
		| log_add_comment_temp
		| log_add_comment_attachment_temp
		| log_workorder_status_update_temp
		| log_change_schedule_temp;
};
