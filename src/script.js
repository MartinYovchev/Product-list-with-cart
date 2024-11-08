const createItem = (image, dessertType, dessertName, price)=>{
    const itemDiv = document.createElement("div");
    itemDiv.id = "item";
    
    const pic = document.createElement('img');
    pic.src = image;
    pic.alt = "dessert";
    pic.width = 200;
    pic.height = 200;
    itemDiv.appendChild(pic)

    const button = document.createElement("button");
    button.id = "add-to-cart";
    button.textContent = "Click me";
    button.addEventListener("click", () => {});
    itemDiv.appendChild(button);


    const descriptionDiv = document.createElement("div");
    descriptionDiv.id = "description"

    const typeDiv = document.createElement("div");
    typeDiv.id = "dessert-type";
    typeDiv.textContent = dessertType;
    descriptionDiv.appendChild(typeDiv);

    const nameDiv = document.createElement("div");
    nameDiv.id = "dessert-name";
    nameDiv.textContent = dessertName;
    descriptionDiv.appendChild(nameDiv);

    const priceDiv = document.createElement("div");
    priceDiv.id = "price";
    priceDiv.textContent = price;
    descriptionDiv.appendChild(priceDiv);

    itemDiv.appendChild(descriptionDiv);
    return itemDiv;

}

fetch("data.json").then(response =>{
    if(!response.ok){
        throw new Error("Error fetching Json file!" + response.statusText);
    }
    return response.json()}).then(data =>{
        const cart = document.getElementById("cart");  

        data.forEach(item => {
            const image = item.image.desktop; 
            const dessertType = item.category;
            const dessertName = item.name;
            const price = item.price;

            const itemElement = createItem(image, dessertType, dessertName, price);
            cart.appendChild(itemElement);
        });
    }).catch(error =>{
        console.error(error);
    })