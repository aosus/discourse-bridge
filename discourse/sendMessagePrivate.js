import fetch from 'node-fetch';

export default async function sendMessagePrivate(Api_Username, title, raw, sendTo) {

    try {

        let body = {
            title: title,
            raw: raw,
            archetype: "private_message",
            target_recipients: sendTo
        }

        let init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': process.env.token_discourse,
                'Api-Username': Api_Username
            },
            body: JSON.stringify(body),
        }
        let response = await fetch(process.env.url + '/posts.json ', init);
        let data = await response.json();

        if (data?.action && data?.errors) {

            return {
                action: data?.action,
                errors: data?.errors
            }

        }

        else {

            return {

                id: data?.id,
                username: data?.username,
                created_at: data?.created_at,
                cooked: data?.cooked,
                raw: data?.raw,
                topic_id: data?.topic_id,
                topic_slug: data?.topic_slug,

            }

        }

    } catch (error) {

        console.log(error);

    }

}
