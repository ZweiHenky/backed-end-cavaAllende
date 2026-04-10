import { API_KEY, APP_ID, ONESIGNAL_URL } from "../envs.js";

export const sendPush = async (title: string, message: string, user_id: string, order_id: string) => {

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `KEY ${API_KEY}`,
        },
        body: JSON.stringify({
            app_id: APP_ID,
            contents: {
                en: message,
            },
            headings: {
                en: title,
            },
            include_aliases: {external_id: [user_id]},
            custom_data: {
                order_id: order_id,
                type: "order",
            },
            target_channel: "push",
            url: "cavaallende://orders/" + order_id,
        }),
    };

    const response = await fetch(`${ONESIGNAL_URL}/notifications?c=push`, options);

    const data = await response.json();

    return data;
}