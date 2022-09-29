// Obtener referencia al input y a la imagen
  $seleccionArchivos = document.querySelector("#seleccionArchivos"),
  $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion"),
  $btnDigitalizar = document.querySelector("#btn-digitalizador");
// Escuchar cuando cambie
$seleccionArchivos.addEventListener("change", () => {
  // Los archivos seleccionados, pueden ser muchos o uno
  const archivos = $seleccionArchivos.files;
  // Si no hay archivos salimos de la función y quitamos la imagen
  if (!archivos || !archivos.length) {
    $imagenPrevisualizacion.src = "";
    return;
  }
  // Ahora tomamos el primer archivo, el cual vamos a previsualizar
  const primerArchivo = archivos[0];
  // Lo convertimos a un objeto de tipo objectURL
  const objectURL = URL.createObjectURL(primerArchivo);
  // Y a la fuente de la imagen le ponemos el objectURL
  $imagenPrevisualizacion.src = objectURL;
});

//escuchar cuando click
$btnDigitalizar.addEventListener("click", () => {

    const archivos = $seleccionArchivos.files;
    const primerArchivo = archivos[0];
    var data = primerArchivo;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "image/png");
    
    var file = primerArchivo;
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: file,
      redirect: 'follow'
    };

    fetch('http://127.0.0.1:3000/digitalizar?' + new URLSearchParams({
      imagen:document.getElementById("seleccionArchivos").value,
      fecha_inicio:document.getElementById("inicio").value,fecha_fin:document.getElementById("fin").value,
      modelo:document.getElementById("FormModelo").value,link:document.getElementById("seleccionArchivos").value,
      estacion:document.getElementById("FormEstacion").value}), requestOptions)
      .then(response => {
        response.text();
        if(response.status == 200){
          swal({
            title:'Digitalización exitosa!',
            text:'Tu banda fue digitalizada.',
            type: 'success',
            confirmButtonText:'Ok',
            confirmButtonColor: '#0f436b',
          });
        }else{
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Ocurrió un error en la digitalización.',
            confirmButtonText:'Ok',
            confirmButtonColor: '#0f436b',
          });
        }
      })
      .catch(error => {console.log('error', error);
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'Ocurrió un error en la digitalización.',
          confirmButtonText:'Ok',
          confirmButtonColor: '#0f436b',
        });});
        // document.getElementById("#seleccionArchivos").defaultValue = ""
});


