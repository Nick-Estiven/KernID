/* ==========================================================================
   KERNID - CEREBRO UNIVERSAL DEL REPRODUCTOR DE MÚSICA
   ========================================================================== */

// PASO 1: El radar busca el audio y el botón en la página actual usando sus IDs
const miAudio = document.getElementById('audioFondo'); 
const miBoton = document.getElementById('toggleMusic'); 

// PASO 2: Activamos el sensor de escucha para el clic del usuario
miBoton.addEventListener(`click`, () => {
    
    // PASO 3: La condición táctica (Verifica si está en silencio)
    if (miAudio.paused) {
        
        // SI ESTÁ PAUSADO: Dale play, cambia a icono de pausa y enciende el brillo CSS
        miAudio.play();
        miBoton.textContent = '⏸';
        miBoton.classList.add('activo');

    } else {
        
        // SI YA ESTÁ SONANDO: Ponle pausa, regresa el emoji original y apaga el brillo
        miAudio.pause();
        miBoton.textContent = '🎵';
        miBoton.classList.remove('activo');
    }
});

/* ==========================================================================
   KERNID - CEREBRO DETECTOR DE SCROLL (MÉTODO REUTILIZABLE)
   ========================================================================== */
// 1. EL ALMACÉN: Guarda en la memoria RAM la última posición del mouse (Eje Y)
let ultimaPosicionScroll = window.scrollY; 

// 2. EL RADAR: Captura tu barra de navegación del HTML usando su clase
const barraMenu = document.querySelector('.menu'); 

// 3. EL SENSOR: Le pone una "oreja" a toda la pantalla del navegador (window)
// Se queda espiando de forma infinita cada vez que el usuario mueve el scroll del mouse
window.addEventListener('scroll', () => {
    
    // Captura en cuántos píxeles de altura está el usuario en este microsegundo
    let posicionActualScroll = window.scrollY; 

    // 4. LA CONDICIÓN LÓGICA (El sistema de decisiones)
    if (posicionActualScroll > ultimaPosicionScroll && posicionActualScroll > 250) {
        
        // SI la posición actual es mayor (Significa que vas hacia ABAJO)
        // Y ya pasaste los 150px de la portada ➡️ INYECTA LA CLASE INVENTADA
        barraMenu.classList.add('oculto'); 

    } else {
        
        // SI NO (Significa que frenaste el mouse o vas hacia ARRIBA)
        // ➡️ BORRA LA CLASE INVENTADA de la cédula para que el menú regrese a top: 0
        barraMenu.classList.remove('oculto'); 
    }

    // Actualizamos el almacén con la posición actual para el siguiente movimiento
    ultimaPosicionScroll = posicionActualScroll; 
});
