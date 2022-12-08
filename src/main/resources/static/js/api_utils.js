export let API_URLS = {
    host: "http://localhost:8080/",
    resourceHost: "http://25.32.228.64:5000/",
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

export async function sendBlobWithAuthorization(url, method, fileName, file, token) {
    const formData = new FormData();
    formData.append(fileName, file);
    return await fetch(url, {
        method: method,
        headers: {
            'Authorization': token
        },
        body: formData
    });
}

export async function sendJSONQueryWithAuthorization(url, method, data, token) {
    return await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    });
}

export async function sendQueryWithAuthorization(url, method, token) {
    return await fetch(url, {
        method: method,
        headers: {
            'Authorization': token
        }
    });
}

export function getUserToken() {
    return sessionStorage.getItem("user_token");
}

export function setUserToken(token) {
    sessionStorage.setItem("user_token", token);
}
