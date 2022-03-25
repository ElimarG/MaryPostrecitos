console.log('Desafio Entregable - Incorporando librerias al simulador de pedidos de repostería');

class Users {
    constructor(userName, password) {
        this.userName = userName
        this.password = password
    }
}

function defaultAccess() {
    let defaultAccess = {userName: 'admin', password: 'admin123'};
    let defaultJson = JSON.stringify(defaultAccess);
    sessionStorage.setItem('access', defaultJson);
    
    const { userName, password } = defaultAccess
    console.log(`Login Usuario: ${userName} Contraseña: ${password}`)
    
    let button = document.querySelector('#submit');
    button.addEventListener('click', validateUser);
}

function validateUser(event) {
    let validateUser = JSON.parse(sessionStorage.getItem('access'));
    let name = document.getElementById('user').value;
    let pass = document.getElementById('password').value;

    if (validateUser.userName != name || validateUser.password != pass) {
        event.preventDefault();
        Swal.fire({
            icon: 'error',
            title: 'Datos de acceso incorrectos',
            text: 'Verificar usuario por defecto'
        })  
    }
}

defaultAccess();
