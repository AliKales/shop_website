function login() {
    const username = document.getElementById("txt_username").value
    const password = document.getElementById("txt_password").value


    fetch("http://localhost:8080/api/login", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json().then((body => handle_login(response.ok, body, username))))
}

function handle_login(ok, json, username) {
    console.log(json);
    if (!ok) {
        toastFunction(json.message ?? "Unexpected Error!")
        return
    }
    localStorage.setItem("token_info", json.data)
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

    fetch("http://localhost:8080/api/signup", {
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
        .then((response) => response.json().then((body => handle_login(response.ok, body, username))))
}

function handle_register(ok, json, username) {
    if (!ok) {
        toastFunction(json.message ?? "Unexpected error!")
        return
    }
    localStorage.setItem("token_info", json.data)
    window.location = "/user/" + username
}

function toastFunction(message) {
    var x = document.getElementById("toast");
    x.textContent = message
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}