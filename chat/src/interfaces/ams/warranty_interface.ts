export type warrantyListType = {
	id: string;
	data: { coverage: string };
	expired_date: Date;
	item_id: string;
	vendor_id: string;
};

export type warrantyAttachmentListType = {
	id: string;
	data: { name: string; path: string };
	user_id: string;
	warranty_id: string;
};
