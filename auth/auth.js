function login() {
    const username = document.getElementById("txt_username").value
    const password = document.getElementById("txt_password").value


    fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json())
        .then((json) => handle_login(json, username));
}

function handle_login(json, username) {
    if (!json.result) {
        toastFunction(json.message ?? "Unexpected error!")
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

    fetch("http://localhost:3000/api/signup", {
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
        .then((response) => response.json())
        .then((json) => handle_register(json, username));
}

function handle_register(json, username) {
    if (!json.result) {
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