var items = []

async function init() {
    const token = await getAuthToken()
    if (!token) {
        window.location.href = "/auth/login.html"
        return
    }

    const response = await fetch("https://go-shopi.onrender.com/api/cart", {
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
    document.getElementById("h-items").innerHTML = "ITEMS " + json.itemLength
    document.getElementById("h-price").innerHTML = "$" + json.totalPrice
    items = json.items

    for (let index = 0; index < items.length; index++) {
        const element = items[index];

        const htmlItem = `
                <img src="https://media.istockphoto.com/id/1142211733/tr/foto%C4%9Fraf/beyaz-arka-planda-izole-kaput-ile-sweatshirt-%C3%B6n.jpg?s=612x612&w=0&k=20&c=wHDy2EP4DRqOehboFKHbCET7CMcZMG0plkFzrnh2weg="
                    alt="Product 1">
                <div class="item-details">
                    <h3>${element.name}</h3>
                    <p>${element.count}</p>
                    <p>$${element.price}</p>
                </div>
                <a class="hidden-a" onclick="deleteItem(${element.id})"> 
                    <object data="../svgs/trash-solid.svg" type="image/svg+xml"
                        style="width: 20px; height: 20px; pointer-events: none;"></object>
                </a>               
        `
        const newDiv = document.createElement('div');
        newDiv.innerHTML = htmlItem;
        newDiv.id = "item-" + element.id
        newDiv.className = "item"

        const columnItems = document.getElementById('column-items');
        columnItems.appendChild(newDiv);
    }
}

init()

async function deleteItem(itemId) {
    const token = await getAuthToken()
    if (!token) {
        window.location.href = "/auth/login.html"
        return
    }

    const divToRemove = document.getElementById("item-" + itemId);
    if (divToRemove) {
        const columnItems = document.getElementById('column-items');
        columnItems.removeChild(divToRemove);

        items = items.filter(item => item.id !== itemId.toString())
        document.getElementById("h-items").textContent = "ITEMS " + items.length

        const totalPrice = items.reduce((accumulator, currentItem) => accumulator + currentItem.price, 0);
        document.getElementById("h-price").textContent = "$" + totalPrice


        fetch("https://go-shopi.onrender.com/api/delete-from-cart?item=" + itemId, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-type": "application/json; charset=UTF-8"
            },
        });
    }
}