export async function sendJSONQuery(url, method, data) {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function sendQuery(url, method) {
    const response = await fetch(url, {
        method: method
    });
    return response.json();
}