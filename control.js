let form        = document.getElementById("form");
let correo      = document.getElementById("correo");
let pass        = document.getElementById("pass");

let ico_correo  = document.getElementById("ico_correo");
let ico_pass    = document.getElementById("ico_pass");

let text_correo = document.getElementById("text_correo");
let text_pass   = document.getElementById("text_pass");

let login       = document.getElementById("login");

let regular     = /[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]{2,4}/;





/**
 * función que cambia mensaje en input
 */
function messageErrorEvent(msg){
    return event.target.setCustomValidity(msg);
}





/**
 * funcion que imprime íconos en formulario
 */
function checkIcon(idName, icoValue, idIco){

    if ( idIco.childElementCount >= 1 ){
        let delIco = document.getElementById(idName);
        delIco.parentNode.removeChild(delIco)
    }

    let addIco = document.createElement("span");
    addIco.id = idName;
    addIco.className = "material-icons-outlined";
    addIco.textContent = icoValue;
    idIco.appendChild(addIco);
}





/**
 * función que chequea el campo de correo
 */
function checkArroba(e){
    correo.oninvalid = messageErrorEvent('');
    let arroba = 0;

    for (let i = 0; i < correo.value.length; i++){
        if (correo.value.charAt(i) == '@'){
            arroba++
        }
    }

    if ( arroba == 1 && regular.test(correo.value) ){
        checkIcon("check_correo", "done", ico_correo)
        ico_correo.classList.add('done');
        ico_correo.classList.remove('error');
        return true;
    }else {
        e = 2;        
    }
    
    if ( arroba >= 2 || ( arroba == 0 && e ==1 ) || e == 2) {
        switch (arroba) {
            case 0:
                if (correo.value.length == 0){
                    correo.oninvalid = messageErrorEvent('Este campo no puede estar vacío!');
                }else {
                    correo.oninvalid = messageErrorEvent(
                        'Debes incluir un "@" en tu dirección de correo electrónico. "' +
                        correo.value +
                        '" no es una dirección válida.'
                        );
                }
                break;

            case 2:
                correo.oninvalid = messageErrorEvent('Ingresaste ' + arroba + ' "@" debes ingresar solo una!');
                break;

            default:
                correo.oninvalid = messageErrorEvent('correo electrónico no válido!');
                break;
        }
        checkIcon("check_correo", "priority_high", ico_correo);
        ico_correo.classList.add('error');
        ico_correo.classList.remove('done');
    }
    return false;
}





/**
 * función que chequea el campo de contraseñas
 */
function chekPass(e){
    pass.oninvalid = messageErrorEvent('');

    if ( e == 1 && pass.value.length < 8 ){
        pass.oninvalid = messageErrorEvent('La contraseña debe contener al menos 8 caracteres!');
        checkIcon("check_pass", "priority_high", ico_pass);
        ico_pass.classList.add('error');
        ico_pass.classList.remove('done');
    }

    if ( e == 0 && ico_pass.childElementCount == 1 && pass.value.length < 8 ){
        checkIcon("check_pass", "priority_high", ico_pass);
        ico_pass.classList.add('error');
        ico_pass.classList.remove('done');
    }

    if ( pass.value.length >= 8 ){
        pass.oninvalid = messageErrorEvent('');
        checkIcon("check_pass", "done", ico_pass);
        ico_pass.classList.add('done');
        ico_pass.classList.remove('error');
        pass_check = true;
        return true;
    }
    return false;
}






/**
 * Eventos del campo input id=correo
 */

// escucha si se preciona una tecla
correo.addEventListener("keyup", function(event){
    checkArroba(0);
})

// escucha si el foco no está más en el input correo
correo.addEventListener("blur", function(event){
    checkArroba(1)
})





/**
 * Eventos del campo input id=pass
 */

// escucha si se preciona una tecla
pass.addEventListener("keyup", function(event){
    chekPass(0);
})

// escucha si el foco no está más en el input pass
pass.addEventListener("blur", function(event){
    chekPass(1)
})





/**
 * escucha el botón submit
 */
form.addEventListener("submit", function(e){
    e.preventDefault();
    if (checkArroba){
        login.classList.add("login_active");
    }
})





window.onload = function () {
    correo.setCustomValidity('Este campo no puede estar vacío.');
    pass.setCustomValidity('El campo contraseña no puede estar vacío.');
}