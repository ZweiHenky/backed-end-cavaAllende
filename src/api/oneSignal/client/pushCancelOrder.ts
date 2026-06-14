import { API_KEY, APP_ID, ONESIGNAL_URL } from "../envs.js";

export const pushCancelOrder = async (title: string, message: string, user_id: string, order_id: string) => {

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
            url: "cavaallende://orders/orderResume/" + order_id,
            android_channel_id: "c2481ea7-8c0a-4097-95ec-c9f6a0fe41c9",
        }),
    };

    const response = await fetch(`${ONESIGNAL_URL}/notifications?c=push`, options);
    
    console.log(response.status);

    const data = await response.json();

    console.log(data);

    return data;
}