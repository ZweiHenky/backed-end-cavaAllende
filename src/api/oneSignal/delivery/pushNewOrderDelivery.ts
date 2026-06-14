import { API_KEY, APP_ID, ONESIGNAL_URL } from "../envs.js";

export const pushNewOrderDelivery = async (title: string, message: string, order_id: string) => {
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
            filters: [
                { "field": "tag", "key": "role", "relation": "=", "value": "delivery" }
            ],
            custom_data: {
                order_id: order_id,
                type: "order",
            },
            target_channel: "push",
            url: "cavaallende://deliveries/detailOrder/" + order_id,
            android_channel_id: "c2481ea7-8c0a-4097-95ec-c9f6a0fe41c9",
        }),
    };

    const response = await fetch(`${ONESIGNAL_URL}/notifications?c=push`, options);
    
    const data = await response.json();

    return data;
}