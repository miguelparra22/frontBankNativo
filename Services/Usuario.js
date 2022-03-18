

async function iniciarSesion(){

    let datos ={};
    datos.email = document.getElementById("emailTxt").value;
    datos.password = document.getElementById("passwordTxt").value;

    console.log(datos)
  
    const request = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
      
    });
   
    const respuesta = await request.text();
    
  
    if(respuesta != "fail"){
         localStorage.token = respuesta;
         localStorage.email = datos.email;

         window.location.href = "Principal.html";
         
           
        
    }else{
      alert("las credenciales son incorrectas.")
    }

  }

  async function consultarIdporEmail(){
       let datosUsuario = {}
       datosUsuario.email = localStorage.email;

      const request = await fetch('http://localhost:8080/api/usuariosCorreo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosUsuario)
        
      });


      const usuarios = await request.json();
      consultarSaldo(usuarios)
      console.log(usuarios);
  }


  async function consultarSaldo(id){
      let datosSaldo = {};

      datosSaldo.id_usuario_cuenta = id;

      const request = await fetch('http://localhost:8080/api/consultarSaldo', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosSaldo)
        
      });

      
      const response = await request.text();

      document.getElementById("Saldo").innerHTML = "Su saldo actual es:" + " " + response;
  }


  function irRetiros(){
     window.location = "./Retiros.html"
  }

  function Inicio(){
    window.location = "./Principal.html"
  }

  function irConsignaciones(){
    window.location = "./Consignacion.html"
  }
  

  function salir(){
    window.location = "./index.html"
  }
  