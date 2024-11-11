const displayItemCounter = (button) => {

    button.style.display = 'none';

    const selector = button.nextElementSibling;
    selector.style.display = 'flex';
}

function incrementQuantity(counter) {
    let currentQuantity = parseInt(counter.textContent);
    counter.textContent = currentQuantity + 1;
}

function decrementQuantity(counter) {
    let currentQuantity = parseInt(counter.textContent);
    if (currentQuantity > 1) {
        counter.textContent = currentQuantity - 1;
    }
}

const createItem = (image, dessertType, dessertName, price) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("item");

    const pic = document.createElement('img');
    pic.src = image;
    pic.alt = "dessert";
    pic.width = 200;
    pic.height = 200;
    itemDiv.appendChild(pic);

    const button = document.createElement("button");
    button.classList.add("add-to-cart");
    button.textContent = "Click me";
    button.addEventListener("click", function() {
        displayItemCounter(button);
    });
    itemDiv.appendChild(button);

    const hiddenDivForButton = document.createElement("div");
    hiddenDivForButton.classList.add("selector");
    hiddenDivForButton.style.display = "none";

    const decrementButton = document.createElement("button");
    decrementButton.classList.add("decrement");
    decrementButton.textContent = "-";

    const buttonSpan = document.createElement("span");
    buttonSpan.classList.add("counter");
    buttonSpan.textContent = "1";

    const incrementButton = document.createElement("button");
    incrementButton.classList.add("increment");
    incrementButton.textContent = "+";

    decrementButton.addEventListener("click", function() {
        decrementQuantity(buttonSpan);
    });

    incrementButton.addEventListener("click", function() {
        incrementQuantity(buttonSpan);
    });

    hiddenDivForButton.appendChild(decrementButton);
    hiddenDivForButton.appendChild(buttonSpan);
    hiddenDivForButton.appendChild(incrementButton);

    itemDiv.appendChild(hiddenDivForButton);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");

    const typeDiv = document.createElement("div");
    typeDiv.classList.add("dessert-type");
    typeDiv.textContent = dessertType;
    descriptionDiv.appendChild(typeDiv);

    const nameDiv = document.createElement("div");
    nameDiv.classList.add("dessert-name");
    nameDiv.textContent = dessertName;
    descriptionDiv.appendChild(nameDiv);

    const priceDiv = document.createElement("div");
    priceDiv.classList.add("price");
    priceDiv.textContent = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
    descriptionDiv.appendChild(priceDiv);

    itemDiv.appendChild(descriptionDiv);
    return itemDiv;
}

fetch("data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Error fetching Json file! " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const cart = document.getElementById("cart");

        data.forEach(item => {
            const image = item.image.desktop;
            const dessertType = item.category;
            const dessertName = item.name;
            const price = item.price;

            const itemElement = createItem(image, dessertType, dessertName, price);
            cart.appendChild(itemElement);
        });
    })
    .catch(error => {
        console.error(error);
    });
