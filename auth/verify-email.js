function verify() {
    var url = new URL(window.location.href);
    var token = url.searchParams.get('token');

    if (!token || !token.includes("|verify-email")) {
        document.getElementById("txt").innerHTML = "Wrong token!"
        document.getElementById("loader").style.display = "none"
        return
    }

    fetch("https://go-shopi.onrender.com/api/user-action?token=" + token, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then((response) => response.json().then((body => handle(response.status, body))))
}

function handle(status, body) {
    document.getElementById("txt").innerHTML = body.message
    document.getElementById("loader").style.display = "none"

    if (status !== 200) {
        return
    }

    document.getElementById("checkmark").style.display = "block"

    setTimeout(function () {
        window.location.href = "/login.html"
    }, 1500);
}