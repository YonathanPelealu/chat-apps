import { api } from "./external/api";

type notificationTopicType = "event" | "reminder";
type notificationPayloadType = {
	topic: notificationTopicType;
	data: {
		users_id: string[];
		description: string;
		event_id: string;
		tag: string;
	};
};
export const sendNotification = async ({
	topic,
	data,
}: notificationPayloadType): Promise<void> => {
	try {
		await api({
			baseURL: "http://127.0.0.1:3235",
			method: "post",
			request_name: `Push notification for rms ${topic}`,
			api_path: "/notification/rms/event",
			data,
		});
	} catch (e) {
		console.log(e);
	}
};
