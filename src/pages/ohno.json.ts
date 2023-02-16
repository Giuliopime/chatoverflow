import.meta.env.OPENAI_API_KEY

export async function get({ request }) {
    const question = request.searchParams.get("question")
    console.debug(question)

    if (!question) {
        return new Response(null, {
            status: 400,
            statusText: 'Pass a question as a query param mate'
        });
    }

    return new Response(JSON.stringify(product), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}
