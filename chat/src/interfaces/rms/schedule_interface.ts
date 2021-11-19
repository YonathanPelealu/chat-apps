import dayjs from "dayjs";
export type schedule_repeat_type = "daily" | "weekly" | "monthly" | "yearly";

export type scheduleDataType = {
	end_date: string;
	start_date: string;
	start_time: string;
	repeat_type: schedule_repeat_type | null;
	repeat_count: number;
};
export const schedule_data_init: scheduleDataType = {
	end_date: dayjs().format("YYYY-MM-DD"),
	start_date: dayjs().format("YYYY-MM-DD"),
	start_time: dayjs(
		new Date().setMinutes(Math.ceil(new Date().getMinutes() / 15) * 15)
	).format("HH:mm"),
	repeat_type: "daily",
	repeat_count: 1,
};

export type scheduleType = {
	id: string;
	data: scheduleDataType;
};
export const schedule_type: scheduleType = {
	id: "",
	data: schedule_data_init,
};
