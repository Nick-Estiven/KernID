/* ==========================================================================
   KERNID PORTADA - FRASES TÁCTICAS EN BUCLE AUTOMÁTICO
   ========================================================================== */

// 1. EL ALMACÉN: Tus frases contundentes cortas
const listaFrases = [
    "INVESTIGA BLINDAJES MODERNOS",
    "INVESTIGACIÓN RIGUROSA",
    "EXPLORA EL ARSENAL GLOBAL",
    "PON A PRUEBA TU CONOCIMIENTO"
];

let indiceActual = 0; // El marcador que sabe cuál frase de la lista está activa
const elementoTexto = document.getElementById('textoDinamico'); // El radar captura el h1 por su ID

// 2. LA ORDEN DE CAMBIO (La función)
function cambiarFrase() {
    // Paso A: Inyectamos tu clase inventada para apagar los músculos (Se vuelve invisible suavemente)
    elementoTexto.classList.add('frase-oculta');

    // Paso B: El temporizador de un tiro (setTimeout) espera 0.5 segundos a que esté invisible para cambiar el texto en secreto
    setTimeout(() => {
        // Fórmula matemática para saltar a la siguiente frase de la lista infinitamente
        indiceActual = (indiceActual + 1) % listaFrases.length;
        
        // Cambiamos el texto plano del HTML por la nueva frase del almacén
        elementoTexto.textContent = listaFrases[indiceActual];
        
        // Paso C: Borramos la clase inventada de la cédula para que el músculo CSS vuelva a prender la visibilidad
        elementoTexto.classList.remove('frase-oculta');
    }, 500); // 500 milisegundos de espera
}

// 3. EL TEMPORIZADOR AUTOMÁTICO DE FÁBRICA: Ejecuta la función cada 5 segundos (5000ms)
setInterval(cambiarFrase, 3400);


    
