import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: import.meta.env.OPENAI_ORG,
    apiKey: import.meta.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function get({ request }) {
    const url = new URL(request.url)
    const params = new URLSearchParams(url.search)
    const question = params.get("question")

    if (!question) {
        return new Response(null, {
            status: 400,
            statusText: 'Pass a question as a query param mate'
        });
    }

    const openAiResponse = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: decodeURIComponent(question),
        max_tokens: 4000,
        temperature: 0.1
    });

    return new Response(JSON.stringify(openAiResponse.data.choices[0].text.replaceAll("+", "")), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
