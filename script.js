
const listaPeliculas = [];                //constante que almacena objetos con los datos de cada pelicula                             
const cuerpoTabla = document.getElementById('tabla');

document.getElementById("puntuacion").addEventListener("input", function () {
    document.getElementById("valorPuntuacion").textContent = this.value;
});

//Función para obtener el emoji correspondiente a la puntuación de la película
function obtenerEmoji(puntuacion) {
    if (puntuacion > 8.5) return "⭐";
    if (puntuacion >= 5) return "👍";
    return "👎";
}

//Esta función se encarga de agregar una película a la tabla y actualizar la media de puntuaciones
function agregarPelicula() {
    let titulo = document.getElementById("titulo").value;
    let duracion = parseInt(document.getElementById("duracion").value);
    let puntuacion = parseFloat(document.getElementById("puntuacion").value);

    const datosPelicula = {
        titulo: titulo,
        duracion: duracion,
        puntuacion: puntuacion
    };
    listaPeliculas.push(datosPelicula);

    // Se llama a obtenerEmoji y se guarda en una variable para para ponerlo al lado de la nota
    let emoji = obtenerEmoji(puntuacion);

    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
                <td>${titulo}</td>
                <td>${duracion} min</td>
                <td>${puntuacion} ${emoji}</td>
            `;
    cuerpoTabla.appendChild(nuevaFila);

    let suma = 0;
    for (let i = 0; i < listaPeliculas.length; i++) {
        suma = suma + listaPeliculas[i].puntuacion;
    }
    let media = suma / listaPeliculas.length;

    document.getElementById("mediaPuntuacion").textContent = media.toFixed(1);
}

function exportarCSV() {

    let csv = "Título,Duración,Puntuación\n";                     // cabecera del fichero CSV
    for (let i = 0; i < listaPeliculas.length; i++) {
        csv = csv + listaPeliculas[i].titulo + "," + listaPeliculas[i].duracion + "," + listaPeliculas[i].puntuacion + "\n";  // pega en el csv cada película con sus datos separados por comas
    }

    const archivo = new Blob([csv], { type: 'text/csv' });        // blob csv es un objeto el "[csv]" es el contenido del archivo y el "type" es el tipo de archivo que se va a crear
    const url = URL.createObjectURL(archivo);                     // crea una URL temporal para ese archivo
    const enlace_de_descarga = document.createElement('a');       // crea un enlace invisible
    enlace_de_descarga.href = url;                                // apunta el enlace al archivo
    enlace_de_descarga.download = 'registro.csv';                 // nombre del archivo que se descargará
    enlace_de_descarga.click();                                   // simula un clic para iniciar la descarga
    URL.revokeObjectURL(url);                                     // libera la URL temporal para liberar recursos
    document.body.removeChild(enlace_de_descarga);
}