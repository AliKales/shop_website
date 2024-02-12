var regexPattern = /^shopi\.com\/[a-z]*$/;

// Add event listener to check and modify the input value
document.getElementById('txt_link').addEventListener('input', function () {
    var inputValue = this.value;

    if (!regexPattern.test(inputValue)) {
        if (this.value.startsWith("shopi.com/")) {
            this.value = inputValue.slice(0, -1);
        } else {
            this.value = "shopi.com/"
        }
    }
});

async function createStore() {
    const name = document.getElementById("txt_name").value
    var linkName = document.getElementById("txt_link").value

    linkName = linkName.split("/")[1]

    if (!name || !linkName) {
        toastFunction("Please fill up!")
    }

    const token = await getAuthToken()

    if (!token) {
        window.location.href = "/auth/login.html"
        return
    }

    const response = await fetch("https://go-shopi.onrender.com/api/create-store", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            linkName: linkName,
        }),
    });

    const responseData = await response.json();


    if (!response.ok) {
        toastFunction(responseData.message)
        return
    }

    window.location.href = "/" + linkName
}

function toastFunction(message) {
    var x = document.getElementById("toast");
    x.textContent = message
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
}