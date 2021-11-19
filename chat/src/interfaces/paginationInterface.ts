export type paginationType = {
	current_page: number;
	show_per_page: number;
	total_item?: number;
};

export type dateType = {
	left_range: string;
	right_range: string;
	single_date: string;
};
