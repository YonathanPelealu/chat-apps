export type scheduleRepeatTypeType = "daily" | "weekly" | "monthly" | "yearly";

export type scheduleListType = {
	id: string;
	data: {
		start_time: string;
		start_date: string;
		end_date: string;
		repeat_type: scheduleRepeatTypeType;
		repeat_count: number;
	};
};
