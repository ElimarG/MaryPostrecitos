console.log('Desafio Entregable - Fecth en el simulador de pedidos de repostería');

let pendingOrders = JSON.parse(sessionStorage.getItem('order')).length; 
Toastify({
    text: `Hay ${pendingOrders} pedidos por realizar`,    
    duration: 3000,
    style: {
        background: "linear-gradient(to bottom, rgba(250, 62, 25) 0%, rgb(189 42 42 / 50%) 100%)",
    }    
}).showToast();

let login = JSON.parse(sessionStorage.getItem('access')); 
const { userName } = login
Toastify({
    text: `Hola, ${userName}`,    
    duration: 3000,
    style: {
        background: "linear-gradient(to bottom, rgba(250, 62, 25) 0%, rgb(189 42 42 / 50%) 100%)",
    }    
}).showToast();

function orderList() { 
    let orderList = JSON.parse(sessionStorage.getItem('order')); 
    console.log(typeof orderList);
    let list = document.getElementById('card');
    
    for (let i = 0; i < orderList.length; i++) {
        let text = '';
        
        if (orderList[i].productName != 'Torta'){
            text = 'docena de';
        }
        
        list.innerHTML += `<div class="col-sm-4 fourcol">
                                <section class="group1">
                                    <h5>${orderList[i].quantity} ${text} ${orderList[i].productName} de ${orderList[i].flavor} con ${orderList[i].toppings}</h5>
                                    <p class="about_taital">Los ingredientes son:</p>
                                    <p class="about_taital">${orderList[i].cookingRecipe}</p>
                                    <p class="about_taital">Debera ser entregado dentro de ${orderList[i].deliveryTime} dias</p> 
                                    <p class="about_taital">--- Datos del cliente ---</p>
                                    <ul class="about_taital">
                                        <li>Nombre: ${orderList[i].customerName}</li>
                                        <li>Telefono: ${orderList[i].customerPhone}</li>
                                        <li>Email: ${orderList[i].customerEmail}</li>
                                    </ul>
                                </section>
                            </div>`;         
    }
}

orderList();