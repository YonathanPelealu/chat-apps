export type maintenanceListType = {
	id: string;
	expired_date: Date;
	data: { coverage: string };
	item_id: string;
	vendor_id: string;
};

export type maintenanceAttachmentListType = {
	id: string;
	data: { name: string; path: string };
	maintenance_id: string;
	user_id: string;
};
