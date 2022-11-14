// funciones utiles que no se relacionan directamente con el proyecto



// ----------------------------------------------------
// --------------- Manejo de fechas -------------------
// ----------------------------------------------------

// let date = new Date();            dato nativo de js
// console.log(date.)                saber fecha, hora, etc. actuales
// console.log(date.getDate())       numero de la posicion en la que esta este mismo mes (ej, septiembre: 8)
// console.log(date.getMonth())      numero del mes anterior
// console.log(date.getFullYear())   año actual


const getNextDay = () => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1)                    //para que el turno sea el dia de mañana y que no se pueda sacar hoy
    return tomorrow;
}

// dd/mm/yyyy

const getTomorrowDate = () => {
    let year = getNextDay().getFullYear();
    let month = getNextDay().getMonth() + 1;
    let day = getNextDay().getDate();
    return `${year}-${padTo2Digits(month)}-${padTo2Digits(day)}`;
}

// MANEJO DE FECHAS
function padTo2Digits(num){
    return num.toString().padStart(2, "0");
    // padStart agrega caracteres al inicio de nuestra cadena
}

const setDateIntervals = () => {
    dateInput.value = getTomorrowDate();
    dateInput.min = getTomorrowDate();            //aca el minimo para pedir turno
    dateInput.max = getNextDay().getFullYear() + '-12-31';               //aca el maximo para pedir turno, que es hasta este año (2022)
};

// ----------------------------------------------------
// ------------ Checkeo de validaciones ---------------
// ----------------------------------------------------

const isValidDate = (date) => {
    const currentDate = new Date();
    const turnDate = getNextDay();
    return currentDate < turnDate
}

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

const isPhoneValid = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone)
}

// creamos la funcion para validar si un campo esta vacio
const isEmpty = (value) => value === !value.length;
//funcion para mostrar el error 
// recibir el input y el msg de error


// ----------------------------------------------------
// --------------- Manejo de Errores ------------------
// ----------------------------------------------------

const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.add("error")
    const error = formField.querySelector("small");
    error.textContent = message;
}
const clearError = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error")
    const error = formField.querySelector("small");
    error.textContent = "";
}

// ----------------------------------------------------------
// -- Utils para propiedades del objeto que va a la agenda --
// ----------------------------------------------------------

const getRadioValue = (inputs) => {
    // transformamos la nodelist en un array para usar el find
    const checkedInput = [...inputs].find((input) => input.checked);
    return checkedInput.value // agarramos el valor del input checkeado
}

const getCheckedOptions = (inputs) => {
    const checkedOptions = [...inputs]
    .filter(input => input.checked)
    .map(opt => opt.value);
    return checkedOptions;
}

const formatDate = (date) => {
    // spliteamos la fecha con el metodo split cambiamos la orientacion con el reverse
    // y joineamos otra vez los elementos con una barra separadora
    const splitDate = date.split('-').reverse().join('/');
    return splitDate
}



// ----------------------------------------------------
// --------------- Formato de las cards ---------------
// ----------------------------------------------------


const setCardBackground = (quantity) => {
    return quantity === "Más de 10"
    ? "violet-card"
    : quantity === "Entre 5 y 10"
    ? "red-card"
    : "black-card"
}

const setTimeBackground = (quantity) => {
    return quantity === "Menos de 5" ? "red-card" : "black-card"
}

const setDateBackground = (quantity) => {
    return quantity === "Más de 10" ? "red-card" : "violet-card";
}

const setCardImg = (quantity) => {
    return quantity === "Más de 10"
    ? "./assets/img/server.png"
    : quantity === "Entre 5 y 10"
    ? "./assets/img/laptop.png"
    : "./assets/img/lupa.png"
}
const setCardImgClass = (quantity) => {
    return quantity === "Más de 10"
    ? "server-img"
    : quantity === "Entre 5 y 10"
    ? "laptop-img"
    : "lupa-img"
}