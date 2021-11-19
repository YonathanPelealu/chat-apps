import dayjs from "dayjs";
import { api } from "./external/api";
import { anyObjectType } from "./../interfaces/general_interface";

type dynamicSchedulerTopicType =
	| "reminder"
	| "event_escalation_response"
	| "event_escalation_resolve";
type dynamicSchedulerPayloadType = {
	topic: dynamicSchedulerTopicType;
	data: anyObjectType;
	schedule: Date;
};

export const sendToDynamicScheduler = async ({
	topic,
	data,
	schedule,
}: dynamicSchedulerPayloadType): Promise<void> => {
	const diff_time_in_ms = dayjs(schedule).diff(dayjs());
	try {
		await api({
			baseURL: "http://127.0.0.1:4151",
			method: "post",
			request_name: `sending task ${topic} todo at ${schedule} on dynamic scheduler`,
			api_path: "/pub",
			params: { topic, defer: diff_time_in_ms },
			data,
		});
	} catch (e) {
		console.log(e);
	}
};
