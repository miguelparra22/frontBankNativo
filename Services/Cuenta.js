
//Consultar cuenta por medio de la cedula.

async function buscarCuenta() {
    let datosCuenta = {};

    datosCuenta.id_usuario_cuenta = document.getElementById("cedulaTxt").value;

    const request = await fetch('http://localhost:8080/api/consultarCuentaPorId', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.token
        },
        body: JSON.stringify(datosCuenta)

    });


    const response = await request.text();

    document.getElementById("cuentaTxt").value = response;
}



//validar la info del usuario
async function validarUserTransaccion() {

    let datos = {};
    datos.id_usuario = document.getElementById("cedulaTxt").value;
    datos.password = document.getElementById("passwordTxt").value;

    const request = await fetch('http://localhost:8080/api/validarTransaccion', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)

    });

    const respuesta = await request.text();


    if (respuesta != "fail") {

        retirarValor();

        window.location.href = "Principal.html";



    } else {
        Swal.fire({
            title: 'Error',
            text: 'Las credenciales son incorrectas.',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

    }

}





//Retirar

async function retirarValor() {
    let datosRetiro = {};


    datosRetiro.id_cuenta = document.getElementById("cuentaTxt").value;
    const valorRetirar = document.getElementById("retiroTxt").value;




    const request = await fetch('http://localhost:8080/api/retirarSaldo?valorRetirar=' + valorRetirar, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosRetiro)
    });


    registarTransaccion(datosRetiro.id_cuenta, "Retiro");

    if (request !== null && registarTransaccion !== null) {
        Swal.fire({
            title: 'Exito',
            text: 'Retiro realizado con éxito.',
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

}








//validar la info del usuario
async function validarUserTransaccionRecarga() {

    let datos = {};
    datos.id_usuario = document.getElementById("cedulaTxt").value;
    datos.password = document.getElementById("passwordTxt").value;



    const request = await fetch('http://localhost:8080/api/validarTransaccion', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)

    });

    const respuesta = await request.text();


    if (respuesta != "fail") {

        ConsigarValor();

        window.location.href = "Principal.html";

    } else {
        Swal.fire({
            title: 'Error',
            text: 'Las credenciales son incorrectas.',
            icon: 'error',
            confirmButtonText: 'Ok'
        })

    }

}


async function ConsigarValor() {

    let datosRetiro = {};


    datosRetiro.id_cuenta = document.getElementById("cuentaTxt").value;
    const valorConsignar = document.getElementById("retiroTxt").value;


    if (valorConsignar <= 0) {

        Swal.fire({
            title: 'Error',
            text: 'La consignación debe ser mayor a 0.',
            icon: 'error',
            confirmButtonText: 'Ok'
        })



    } else {


        const request = await fetch('http://localhost:8080/api/consignarSaldo?valorConsignar=' + valorConsignar, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosRetiro)
        });




        registarTransaccion(datosRetiro.id_cuenta, "Recarga");

        if (request !== null && registarTransaccion !== null) {
            Swal.fire({
                title: 'Éxito',
                text: 'Recargar realizada con éxito.',
                icon: 'success',
                confirmButtonText: 'Ok'
            })

            window.location.href = "principal.html"
        }



    }

}

//Registrar Transaccion
async function registarTransaccion(idCuenta, tipoTransaccion) {

    let datosTransaccion = {};

    datosTransaccion.id_cuenta = idCuenta;
    datosTransaccion.tipo_transaccion = tipoTransaccion;

    const request = await fetch('http://localhost:8080/api/registroTransaccion', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosTransaccion)
    });



}


