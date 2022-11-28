export async function sendJSONQuery(url, method, data) {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

export async function sendQuery(url, method) {
    return await fetch(url, {
        method: method
    });
}