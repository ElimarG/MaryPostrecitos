console.log('Desafio Entregable - Fecth en el simulador de pedidos de repostería');

const URL = './data/data.json';

class Products {
    constructor(productName, quantity, flavor, toppings, deliveryTime, cookingRecipe, customerName, customerPhone, customerEmail) {
        this.productName = productName
        this.quantity = parseInt(quantity)
        this.flavor = flavor
        this.toppings = toppings
        this.deliveryTime = parseInt(deliveryTime)
        this.cookingRecipe = cookingRecipe
        this.customerName = customerName
        this.customerPhone = parseInt(customerPhone)
        this.customerEmail = customerEmail
    }
}

function order() {
    let choice = document.querySelectorAll('.dessert');
    choice.forEach((select) => {
        select.addEventListener('click', selectChoice)
    })
}

function selectChoice(event) {
    event.preventDefault();
    let dessert = event.target.parentNode;

    fetch(URL)
    .then( response => response.json() )
    .then( data => {
        data.forEach( product => {
            if (product.id == dessert.id) {                
                let choiceProduct = product.name;
                let chosenDessert = document.getElementById('sweet');
                let display = document.createElement("div");
                validateElement();
                display.innerHTML = `<input type="text" class="email-bt" name="choiceProduct" id="choiceProduct" value="${choiceProduct}" readonly>`;
                chosenDessert.appendChild(display);
                localStorage.setItem('recipe', product.cookingRecipe);

                let button = document.querySelector('#submit');
                button.addEventListener('click', validateProducts);
            }
        })    
    })   
}

function validateElement() {
    let validatediv = document.getElementById('choiceProduct');
    
    if (validatediv != null) {
        validatediv.remove();
    }
}

function validateProducts() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let choiceProduct = document.getElementById('choiceProduct').value;
    let dessertFlavor = document.getElementById('dessertFlavor').value;
    let quantity = document.getElementById('quantity').value;
    let toppings = document.getElementById('toppings').value;
    let storageRecipe = localStorage.getItem('recipe');

    if (name == '' || email == '' || phone == '' || dessertFlavor == '' || quantity == '' || toppings == '') {
        Swal.fire({
            icon: 'error',
            title: 'Pedido rechazado',
            text: 'Se necesita ingresar los datos solicitados correctamente'
        })
        order();
    } else {
        switch (choiceProduct) {
            case 'Torta':
                    const chocolateFlavor = dessertFlavor == 'Chocolate' ? ' 60g Cacao En Polvo' : '';
                    let cookingRecipe = storageRecipe + chocolateFlavor;
                    orderDescription(name, email, phone, choiceProduct, dessertFlavor, quantity, toppings, cookingRecipe);
                break;
            case 'Cupcake':
                    const chocolateFlavorc = dessertFlavor == 'Chocolate' ? ' 60g Cacao En Polvo' : '';
                    let cookingRecipec = storageRecipe + chocolateFlavorc;
                    orderDescription(name, email, phone, choiceProduct, dessertFlavor, quantity, toppings, cookingRecipec);
                break;
            case 'Galletas':
                const chocolateFlavorg = dessertFlavor == 'Chocolate' ? ' 150g Chocolate' : '';
                    let cookingRecipeg = storageRecipe + chocolateFlavorg;
                    orderDescription(name, email, phone, choiceProduct, dessertFlavor, quantity, toppings, cookingRecipeg);
                break;
            default:
                Swal.fire({
                    icon: 'warning',
                    title: 'El producto no se encuentra disponible'
                })
                order();
                break;
        }
    }
}    

function orderDescription(name, email, phone, choiceProduct, dessertFlavor, quantity, toppings, recipe) {
    let text = '';
    let time = (quantity * 2) + 1;
    
    if (choiceProduct != 'Torta'){
        text = 'docena de';
    }

    const arrOrder = JSON.parse(sessionStorage.getItem('order')) || [];

    arrOrder.push(new Products(choiceProduct, quantity, dessertFlavor, toppings, time, recipe, name, phone, email));
    let orderJson = (clave, valor) => sessionStorage.setItem(clave, valor);
    orderJson('order', JSON.stringify(arrOrder));
    
    let num = arrOrder[arrOrder.length -1]
      Swal.fire({
        icon: 'success',
        html: `<h1>Pedido generado</h1>
        <p>A nombre de: ${num.customerName}</p>
        <p>${num.quantity} ${text} ${num.productName} de ${num.flavor} con ${num.toppings}</p>
        <p>El pedido sera entregado dentro de ${num.deliveryTime} dias</p>`,
    });   
}

order();