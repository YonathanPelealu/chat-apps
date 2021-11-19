export type notificationViewType = "all" | "unread";

export type notificationListType = {
	id: string;
	description: string;
	created_at: Date;
	is_read: boolean;
	user_id: string;
	event_id: string;
};

export const notification_list_init: notificationListType = {
	id: "",
	user_id: "",
	event_id: "",
	is_read: false,
	description: "",
	created_at: new Date(),
};

export type notificationDataType = {
	user_id: string;
	event_id?: string;
	workorder_id?: string;
	is_read?: boolean;
	description: string;
};
