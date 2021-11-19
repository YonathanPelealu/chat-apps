export type commentType = {
	id?: string;
	workorder_id?: string;
	user_id?: string;
	item_id?: string;
	created_at?: Date;
	user_name?: string;
	data: {
		text: string;
		attachment: string;
	};
};

export const comment_init: commentType = {
	id: "",
	workorder_id: "",
	item_id: "",
	created_at: new Date(),
	user_name: "",
	data: {
		text: "",
		attachment: "",
	},
};
