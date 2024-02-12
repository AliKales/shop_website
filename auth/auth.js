function login() {
    const username = document.getElementById("txt_username").value
    const password = document.getElementById("txt_password").value


    fetch("https://go-shopi.onrender.com/api/login", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json().then((body => handle_login(response.status, body, username))))
}

function handle_login(status, json, username) {
    if (status === 403) {
        toastFunction("Verify your email and log in!")
        return
    } else if (status !== 200) {
        toastFunction(json.message)
        return
    }
    localStorage.setItem("token_info", JSON.stringify(json))
    window.location = "/user/" + username
}

function register() {
    const username = document.getElementById("txt_username").value
    const email = document.getElementById("txt_email").value
    const password = document.getElementById("txt_password").value
    const password2 = document.getElementById("txt_password2").value

    if (password !== password2) {
        toastFunction("Passwords must match!")
        return
    }

    fetch("https://go-shopi.onrender.com/api/signup", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            username: username,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json().then((body => handleRegister(response.status, body, username))))
}

function handleRegister(status, json, username) {
    if (status !== 403) {
        toastFunction("Verify your email and log in!")
        return
    }
    toastFunction(json.message)
}

async function getAuthToken() {
    const info = localStorage.getItem("token_info")

    if (!info) {
        return null
    }

    var data

    try {
        data = JSON.parse(info)
    } catch (error) {
        return null
    }

    const tokenExpireAt = new Date(data.tokenExpireAt)
    const now = new Date()


    if (now < tokenExpireAt) {
        return data.token
    }

    if (!data.refreshTokenExpireAt) {
        return null
    }

    const refreshTokenExpireAt = Date(data.refreshTokenExpireAt)

    if (now > refreshTokenExpireAt) {
        return null
    }

    const response = await fetch("https://go-shopi.onrender.com/api/refresh-token", {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${data.refreshToken}`,
            "Content-type": "application/json; charset=UTF-8"
        },
    });

    if (!response.ok) {
        return null
    }

    const json = await response.json();
    localStorage.setItem("token_info", JSON.stringify(json))
    return json.token
}

function toastFunction(message) {
    var x = document.getElementById("toast");
    x.textContent = message
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}