var store
var storeItems = []

async function init() {
    var currentURL = window.location.href;
    storeLinkName = currentURL.split('/').last;

    if (!storeLinkName) {
        storeLinkName = "caroby"
    }

    const token = await getAuthToken()

    fetch("https://go-shopi.onrender.com/api/store/" + storeLinkName, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
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
    store = body.store
    storeItems = body.items

    if (body.cartItemLength && body.cartItemLength > 0) {
        document.getElementById("div-cart-val").style.display = "flex"
        document.getElementById("cart-val").innerHTML = body.cartItemLength
    }

    document.getElementById("h-store").innerHTML = store.name.toUpperCase()

    for (let index = 0; index < storeItems.length; index++) {
        const item = storeItems[index];

        const htmlItem = `
        <div id="item-${index}" class="item">
            <img src="https://media.istockphoto.com/id/1142211733/tr/foto%C4%9Fraf/beyaz-arka-planda-izole-kaput-ile-sweatshirt-%C3%B6n.jpg?s=612x612&w=0&k=20&c=wHDy2EP4DRqOehboFKHbCET7CMcZMG0plkFzrnh2weg="
                alt="Product 1">
            <h3>${item.name}</h3>
            <h4>${item.price}</h4>
            <button class="outlined-button" onclick="addToCart(${index})">Add To Cart</button>
        </div>
        `
        const newDiv = document.createElement('div');
        newDiv.innerHTML = htmlItem;

        const columnItems = document.getElementById('column-items');
        columnItems.appendChild(newDiv);
    }
}

async function addToCart(index) {
    const token = await getAuthToken()
    if (!token) {
        return
    }

    i = storeItems[index]

    const response = await fetch("https://go-shopi.onrender.com/api/add-to-cart?item=" + i.id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        },
    });

    if (!response.ok) {
        return null
    }

    const json = await response.json();

    console.log(json);
}