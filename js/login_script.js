console.log('Segunda entrega del proyecto final');

class Users {
    constructor(userName, password) {
        this.userName = userName
        this.password = password
    }
}

function defaultAccess() {
    let defaultAccess = {userName: 'admin', password: 'admin123'};
    let defaultJson = JSON.stringify(defaultAccess);
    localStorage.setItem('access', defaultJson);

    let button = document.querySelector('#submit');
    button.addEventListener('click', validateUser);
}

function saveAccess(user, password) {
    let access = [];
    access.push(new Users(user, password));
    let accessJson = (clave, valor) => localStorage.setItem(clave, valor);
    accessJson('access', JSON.stringify(access[0]));
}

function validateUser(event) {
    let validateUser = JSON.parse(localStorage.getItem('access'));
    let name = document.getElementById('user').value;
    let pass = document.getElementById('password').value;

    if (validateUser.userName != name || validateUser.password != pass) {
        event.preventDefault();
        alert('Datos de acceso incorrectos. \nDebera crear un usuario y contraseña nuevo');
        let newUser = prompt('Ingrese un nombre de usuario');
        let newPass = prompt('Ingrese una contraseña');
        if (newUser == '' || newPass == '') {
            alert('Error. \nSe necesita ingresar los datos solicitados correctamente');
            defaultAccess();
        } else {
            saveAccess(newUser, newPass);
        }        
    }
}

defaultAccess();
