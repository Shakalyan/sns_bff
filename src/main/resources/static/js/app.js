"use strict";

import {sendQuery} from "./api_utils.js";

const API_URLS = {
    host: "http://localhost:8080/",
    main: "main",
    authentication: "api/authentication",
    registration: "api/registration"
};

const authView = {
    card: document.querySelector("#auth_div"),
    loginField: document.querySelector("#auth_login"),
    passwordField: document.querySelector("#auth_password"),
    errorField: document.querySelector("#auth_error"),
    submitButton: document.querySelector("#auth_submit_button"),
    toRegButton: document.querySelector("#auth_to_reg_button")
};

const regView = {
    card: document.querySelector("#reg_div"),
    loginField: document.querySelector("#reg_login"),
    passwordField: document.querySelector("#reg_password"),
    repPasswordField: document.querySelector("#reg_rep_password"),
    errorField: document.querySelector("#reg_error"),
    submitButton: document.querySelector("#reg_submit_button"),
    toAuthButton: document.querySelector("#reg_to_auth_button")
};

authView.submitButton.addEventListener("click", function() {
    let user = new User(authView.loginField.value, authView.passwordField.value);
    let response = sendRequest( API_URLS.host + API_URLS.authentication, "POST", JSON.stringify(user));
    response.then(function(resp) {
        if(resp.status == 200) {
            authView.errorField.textContent = "";
            window.open(API_URLS.host + API_URLS.main, "_self")
        }
        else {
            authView.errorField.textContent = resp.data;
        }
    });

    //window.location.replace("test");
});

authView.toRegButton.addEventListener("click", function() {
    /*hideElement(authView.card);
    showElement(regView.card);*/
    sendQuery("http://192.168.106.35:5000/join", "GET").then((response) => {
        console.log(response);
    });
});

regView.submitButton.addEventListener("click", function() {
    let login = regView.loginField.value;
    let password = regView.passwordField.value;
    let passwordRep = regView.repPasswordField.value;

    if(password.toString() != passwordRep.toString()) {
        regView.errorField.textContent = "Passwords do not match";
        return;
    }

    let user = new User(login, password);
    const response = sendRequest(API_URLS.host + API_URLS.registration, "POST", JSON.stringify(user));
    response.then(function(resp) {
        if(resp.status == 200) {
            regView.errorField.classList.remove("error");
            regView.errorField.classList.add("success");
        }
        else {
            regView.errorField.classList.remove("success");
            regView.errorField.classList.add("error");
        }
        regView.errorField.textContent = resp.data;
    });

});

regView.toAuthButton.addEventListener("click", function() {
    hideElement(regView.card);
    showElement(authView.card);
});

function User(login, password) {
    this.login = login;
    this.password = password;
}

async function sendRequest(url, requestMethod, requestBody) {
    const response = await fetch(url, {
                                    method: requestMethod,
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: requestBody
                                });
    return await response.json();
}

function showElement(element) {
    element.classList.remove("hide");
}

function hideElement(element) {
    element.classList.add("hide");
}