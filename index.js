


//FORMULARIO PRINCIPAL
let datosPresupuesto = document.getElementById("formularioPrincipal")
datosPresupuesto.addEventListener("submit",mostrarMensaje)

let recuperaDatos = document.getElementById("botonRecuperar")
recuperaDatos.addEventListener("submit",traerDatos)

//CONVERTIR A MAYUSCULA LA RAZON SOCIAL-NOMBRE
function mayusculas(e) {
  e.value = e.value.toUpperCase();
}

//DATOS
function mostrarMensaje(e){
  Toastify({
    text: "Presupuesto Listo!",
    duration: 5000,
   
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "center", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, # 4682B4, # 808080)",
      text: "linear-gradient(to right, # 808080)"
    },
    onClick: function(){} // Callback after click
  }).showToast();    
  
  function traerDatos(e){
    Toastify({
      text: "Presupuesto Listo!",
      duration: 5000,
     
      newWindow: true,
      close: true,
      gravity: "top", 
      position: "center", 
      stopOnFocus: true, 
      style: {
        background: "linear-gradient(to right, # 4682B4, # 808080)",
        text: "linear-gradient(to right, # 808080)"
      },
      onClick: function(){} // Callback after click
    }).showToast();    
  
  
  
  e.preventDefault()
    
let divPresupuesto = document.getElementById("presup")
let razonSocial = e.target[0].value  
let pesoStl = parseInt (e.target [1].value) 
let tiempoImpresionhoras = parseInt( e.target [2].value)
let tiempoImpresionminutos = parseInt (e.target [3].value)
let pesoBobina = parseInt (e.target [4].value)
let precioBobina = parseInt (e.target [5].value)
let consumoKVimpresora = parseInt (e.target [6].value)
let precioKVcompania = parseInt (e.target [7].value)
let porcentajeGanancia = parseInt  (e.target [8].value)
let preciogramo = 0
// CALCULO DEL VALOR GRAMO
preciogramo = precioBobina/pesoBobina 
//CALCULO PASAR HORAS Y MINUTOS A DECIMAL
let conversorDetiempo = 0
conversorDetiempo = tiempoImpresionminutos/60 + tiempoImpresionhoras
//CALCULO DE VALOR MANO DE OBRA-COSTO
let manodeobra=0
manodeobra = pesoStl*preciogramo + conversorDetiempo * consumoKVimpresora *precioKVcompania
//CALCULO DE GANANCIA A OBTENER
let gana=0
gana  = manodeobra*porcentajeGanancia/100
//CALCULO TOTAL FINAL A COBRAR
let totalfinal=0
totalfinal = manodeobra + gana
//FECHA PARA EL PRESUPUESTO
var fecha = new Date();
var hoy = fecha.toLocaleString();

//DATOS PARA EL PRESUPUESTO EN FORMATO TABLAS
let ingDatos = document.createElement ("table") 

//GUARDAR DATOS LOCAL JSON
function guardaDatoslocal(){

  localStorage.setItem("razonSocial",JSON.stringify(razonSocial))
  localStorage.setItem("pesoStl",JSON.stringify(pesoStl))
  localStorage.setItem("tiempoImpresionhoras",JSON.stringify(tiempoImpresionhoras))
  localStorage.setItem("tiempoImpresionminuto",JSON.stringify(tiempoImpresionminutos))
  localStorage.setItem("pesoBobina",JSON.stringify(pesoBobina))
  localStorage.setItem("precioBobina",JSON.stringify(precioBobina))
  localStorage.setItem("consumoKVimpresora",JSON.stringify(consumoKVimpresora))
  localStorage.setItem("precioKVcompania",JSON.stringify(precioKVcompania))
  localStorage.setItem("porcentajeGanancia",JSON.stringify(porcentajeGanancia))
}

guardaDatoslocal()

//TRAER DATOS LOCAL JSON
function parseaLocal(){
  let datosDeusuario =  JSON.parse(localStorage.getItem("razonSocial"))
 let datosPeso =  JSON.parse(localStorage.getItem("pesoStl"))
  let datosTiempoH =  JSON.parse(localStorage.getItem("tiempoImpresionhoras"))
  let datosTiempoM =  JSON.parse(localStorage.getItem("tiempoImpresionminutos"))
  let datosPespbobina =  JSON.parse(localStorage.getItem("pesoBobina"))
  let datosPreciobobina =  JSON.parse(localStorage.getItem("precioBobina"))
  let datosConsumokv =  JSON.parse(localStorage.getItem("consumoKVimpresora"))
  let datosPreciokv =  JSON.parse(localStorage.getItem("precioKVcompania"))
  let datosGanancia =  JSON.parse(localStorage.getItem("porcentajeGanancia"))

}

  
parseaLocal()







//INNER HTML PARA MOSTRAR LOS DATOS EN LA TABLA PRESUPUESTO
    
ingDatos.innerHTML = ` 

<caption></caption>
<thead>
    <tr>
    <p> </p>
    <p> </p>
    <p> </p>
      <th scope="col">PRESUPUESTO   [X]  </th>
      <th scope="col"> ‏‏‎ ‎ ‏‏‎ ‎ </th>
      <th scope="col">${hoy}</th>
      
    </tr>
</thead>

    <tbody>
      <tr>
      <th scope="row">  RAZON SOCIAL:</th>
      <td></td>
      <td>${razonSocial}</td>
      
      </tr>
      <tr>
      <th scope="row">COSTO MANO DE OBRA:</th>
      <td></td>
      <td>${ "$" + manodeobra.toFixed(2) }</td>
      
      </tr>
      <tr>
      <th scope="row">GANANCIA A OBTENER:</th>
      <td></td>
      <td>${ "$" + gana.toFixed(2)}</td>
      
      </tr>
      <tr>
      <th scope="row">TOTAL A COBRAR CLIENTE:</th>
      <td></td>
      <td>${ "$" + totalfinal.toFixed(2)}</td>
      
      </tr>
      
    </tbody>
    <input class="botonVaciarpresup" id="vaciaPresup" type="submit" value="Vaciar Presupuesto">
    
    
    ` 
    
    //BORRA FORMULARIO DE CARGA Y MUESTRA TABLA PRESUPUESTO
    
    formularioPrincipal.remove()
    divPresupuesto.append(ingDatos)

    
function vaciarPresupuesto() {
      let vaciar = document.getElementById('vaciaPresup')
      vaciar.addEventListener('click', borrarvaciarPresupuesto)
  }
  function borrarvaciarPresupuesto() {
    Swal.fire({
      title: 'Vaciar Presupuesto',
      text: "Tendrás que cargar los datos nuevamente!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Borrado!',
          'El presupuesto fue borrado!.',
          'success'
           
        )
        window.location = "./index.html"
      }
      
    })
  
  }
  
  
  
 
  
  vaciarPresupuesto()
  
  
  
  
  
  
  
  
  
  
  
 
    
  
  
  
  
  
  
  }
  
  

  