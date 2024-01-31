function init() {
    var currentURL = window.location.href;
    storeLinkName = currentURL.split('/').last;

    fetch("http://localhost:8080/api/store/" + storeLinkName, {
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

    document.getElementById("id").textContent = body.store.name
}