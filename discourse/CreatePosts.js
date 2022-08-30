import fetch from 'node-fetch';
import fs from 'fs-extra';

export default async function CreatePosts(Api_Username, title, raw, category) {

    try {

        let config = fs.readJsonSync('config.json');
        let body = {

            "title": title,
            "raw": raw,
            "category": category
        }
        let init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Api-Key': config?.token_discourse,
                'Api-Username': Api_Username
            },
            body: JSON.stringify(body),
        }
        let response = await fetch(config?.url + '/posts.json ', init);
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
                post_number: data?.post_number,
                post_type: data?.post_type,
                reply_count: data?.reply_count,
                reply_to_post_number: data?.reply_to_post_number,
                topic_id: data?.topic_id,
                topic_slug: data?.topic_slug

            }

        }

    } catch (error) {

        console.log(error);

    }

}
