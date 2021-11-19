export type publicTableType =
	| "apps_version"
	| "company"
	| "department"
	| "role"
	| "users"
	| "location"
	| "area"
	| "chat_app";

export type rmsTableType =
	| "checklist_temp"
	| "checklist_event"
	| "tag"
	| "comment"
	| "event"
	| "event_log"
	| "event_meta"
	| "event_status"
	| "event_status_log"
	| "item"
	| "item_log"
	| "item_status_log"
	| "notification"
	| "schedule"
	| "reminder"
	| "category"
	| "priority";

export type amsTableType =
	| "asset"
	| "asset_attachment"
	| "asset_category"
	| "asset_type"
	| "perfectroom_type"
	| "perfectroom_asset_type"
	| "item"
	| "brand"
	| "item_status"
	| "warranty"
	| "warranty_attachment"
	| "item_additional_info"
	| "maintenance"
	| "maintenance_attachment"
	| "item_movement"
	| "item_log"
	| "sparepart_lists"
	| "vendor"
	| "vendor_attachment"
	| "sparepart"
	| "tool_temp"
	| "testcomm_temp"
	| "cause"
	| "solution_temp"
	| "tool_lists"
	| "testcomm_lists"
	| "solution_lists"
	| "cost_lists"
	| "schedule"
	| "workorder"
	| "workorder_attachment"
	| "similars"
	| "sparepart_log"
	| "comment"
	| "workorder_log"
	| "workorder_meta"
	| "workorder_log"
	| "workorder_status"
	| "workorder_status_log"
	| "notification"
	| "preventive_item_list"
	| "checklist_workorder"
	| "cost_temp";

export type chatTableType =
	|"clients"
	| "room"
	| "activity_log"
	| "messages"
	| "room_latest_msg";