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

document.addEventListener('DOMContentLoaded', () => {
    const menu2 = document.querySelector('.menu-2');

    if (!menu2) return;

    // Define cuántos píxeles quieres que baje/se separe la caja al inicio
    const distanciaInicial = 30; 

    function actualizarMenu() {
        let scrollY = window.scrollY;

        // A la distancia inicial le restamos el scroll actual.
        // Math.max asegura que se detenga en 0 cuando llegue arriba del todo.
        let movimiento = Math.max(0, distanciaInicial - scrollY);

        // Aplicamos el movimiento directamente en tiempo real
        menu2.style.transform = `translateY(${movimiento}px)`;
    }

    // Ejecuta al cargar la página para que no empiece pegada
    actualizarMenu();

    // Actualiza dinámicamente cada vez que haces scroll
    window.addEventListener('scroll', actualizarMenu);
});