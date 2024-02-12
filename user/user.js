var username
var user
var store

function init() {
    var currentURL = window.location.href;
    username = currentURL.split('/user/')[1];

    if (!username) {
        return
    }

    fetch("https://go-shopi.onrender.com/api/user/" + username, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json().then((body => handle_init(response.ok, body))))
}

init()

function handle_init(ok, body) {
    if (!ok) {
        return
    }

    console.log(body);

    user = body.user
    store = body.store

    document.getElementById("h-name").textContent = user.username
    document.getElementById("h-date").textContent = user.createdAt

    if (!store) {
        document.getElementById("btn").style.display = "none"
    }
}

function goToShop() {
    window.location.href = "/" + store.linkName
}