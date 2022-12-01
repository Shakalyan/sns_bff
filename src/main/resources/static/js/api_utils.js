export let API_URLS = {
    host: "http://localhost:8080/",
    resourceHost: "http://backend:5000/",
    main: "main",
    authentication: "api/auth",
    registration: "api/register"
};

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