import {sendJSONQuery} from "./api_utils.js";

const API_URLS = {
    host: "http://localhost:8080/",
    main: "main",
    authentication: "api/auth",
    registration: "api/register"
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
    emailField: document.querySelector("#reg_email"),
    phoneField: document.querySelector("#reg_phone"),
    passwordField: document.querySelector("#reg_password"),
    repPasswordField: document.querySelector("#reg_rep_password"),
    errorField: document.querySelector("#reg_error"),
    submitButton: document.querySelector("#reg_submit_button"),
    toAuthButton: document.querySelector("#reg_to_auth_button")
};

authView.submitButton.addEventListener("click", function() {
    let user = new User(authView.loginField.value, authView.passwordField.value);
    sendJSONQuery( API_URLS.host + API_URLS.authentication, "POST", user)
        .then((response) => {
            console.log(response);
            if(response.status === 200) {
                authView.errorField.textContent = "";
                window.open(API_URLS.host + API_URLS.main, "_self");
            }
            else {
                response.text().then((text) => {
                    authView.errorField.textContent = text;
                })
            }
        })
});

authView.toRegButton.addEventListener("click", function() {
    hideElement(authView.card);
    showElement(regView.card);
});

regView.submitButton.addEventListener("click", function() {
    let login = regView.loginField.value;
    let email = regView.emailField.value;
    let phone = regView.phoneField.value;
    let password = regView.passwordField.value;
    let passwordRep = regView.repPasswordField.value;

    if(password.toString() !== passwordRep.toString()) {
        regView.errorField.textContent = "Passwords do not match";
        return;
    }

    let registrationDto = new RegistrationDto(login, password, email, phone);
    sendJSONQuery(API_URLS.host + API_URLS.registration, "POST", registrationDto)
        .then((response) => {
            if(response.status === 200) {
                regView.errorField.classList.remove("error");
                regView.errorField.classList.add("success");
            }
            else {
                regView.errorField.classList.remove("success");
                regView.errorField.classList.add("error");
            }
            response.text().then((text) => {
                regView.errorField.textContent = text;
            })
        })
});

regView.toAuthButton.addEventListener("click", function() {
    hideElement(regView.card);
    showElement(authView.card);
});

function RegistrationDto(username, password, email, phone) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
}

function User(username, password) {
    this.username = username;
    this.password = password;
}

function showElement(element) {
    element.classList.remove("hide");
}

function hideElement(element) {
    element.classList.add("hide");
}