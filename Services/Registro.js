

/*
function validarCorreo(email){

}

document.getElementById('email').addEventListener('input', function() {
    campo = event.target;
    valido = document.getElementById('emailOK');
        
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    //Se muestra un texto a modo de ejemplo, luego va a ser un icono
    if (emailRegex.test(campo.value)) {
      valido.innerText = "válido";
    } else {
      valido.innerText = "incorrecto";
    }
});*/


async function registrarUsuarios() {

    let datos = {};
    datos.id_usuario = document.getElementById("cedulaTxt").value;
    datos.nombre = document.getElementById("nombreTxt").value;
    datos.apellido = document.getElementById("apellidoText").value;
    datos.email = document.getElementById("emailTxt").value;
    datos.password = document.getElementById("passwordTxt").value;
    let repetirPassword = document.getElementById("repetirPassword").value


    if(repetirPassword != datos.password){
        Swal.fire({
            title: 'Error!',
            text: 'Las contraseñas no coinciden.',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        return; //al poner el return sin accion corta la funcion
    }

    const request = await fetch('http://localhost:8080/api/registroUsuario', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos)
    });
    
    const cuenta = registrarCuenta();

    if (cuenta !== null) {
       
        Swal.fire({
            title: 'Éxito!',
            text: 'Cuenta creada de manera exitosa.',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        window.location.href = "index.html"
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Cuenta creada de manera erronea',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
    }

  






}


async function registrarCuenta() {

    let date = new Date();
    //let creacionCuentaId = String(date.getDate()).padStart(2, '0')  + String(date.getMonth()  + date.getFullYear());
    let creacionCuentaId = String(date.getMonth() + date.getFullYear());
    let usuario = document.getElementById("cedulaTxt").value;

    let datos2 = {};
    datos2.id_cuenta = creacionCuentaId + usuario;
    datos2.id_usuario_cuenta = usuario;
    datos2.saldo = document.getElementById("SaldoTxt").value;


   if(datos2.saldo < 0){

    Swal.fire({
        title: 'Error!',
        text: 'El saldo no puede ser menor a 0.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
       
   }else{
    const respuesta = await fetch('http://localhost:8080/api/registroCuenta', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos2)
    });

   }

  

   

}
