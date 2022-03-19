console.log('Segunda entrega del proyecto final');

function orderList() {
    let text = '';
    let orderList = JSON.parse(sessionStorage.getItem('order'));
    let list = document.getElementById('card');
    let display = document.createElement("div");
    
    if (orderList.productName != 'Torta'){
        text = 'docena de';
    }

    display.innerHTML = `<div class="col-sm-4 fourcol">
                            <section class="group1">
                                <h5>${orderList.quantity} ${text} ${orderList.productName} de ${orderList.flavor} con ${orderList.toppings}</h5>
                                <p class="about_taital">Los ingredientes son:</p>
                                <p class="about_taital">${orderList.cookingRecipe}</p>
                                <p class="about_taital">Debera ser entregado dentro de ${orderList.deliveryTime} dias</p> 
                                <p class="about_taital">--- Datos del cliente ---</p>
                                <ul class="about_taital">
                                    <li>Nombre: ${orderList.customerName}</li>
                                    <li>Telefono: ${orderList.customerPhone}</li>
                                    <li>Email: ${orderList.customerEmail}</li>
                                </ul>
                                <button type="button" id="remove" class="main_bt_order">Finalizar</button>
                            </section>
                        </div>`;
    list.appendChild(display);
    let button = document.querySelector('#remove');
    button.addEventListener('click', removeList);
}

function removeList() {
    sessionStorage.removeItem('order');
}

orderList();