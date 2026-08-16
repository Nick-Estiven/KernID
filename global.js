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

    const menu = document.querySelector('.menu');
    const menu2 = document.querySelector('.menu-2');

    if (!menu || !menu2) return;
    //datos anticipados que guarda el js
    const distanciaInicial = 30;      // qué tanto se "despega" menu2 al inicio (ya existía)
    const alturaMenu = menu.offsetHeight; // mide la altura de lo que llamaste
    const umbral = 150;                 // lo que se necesita de scrolleo para que el menu se esconda

    let ultimoScroll = 0;         // dónde estabas la última vez, para comparar
    let scrollDownAcumulado = 0;  // cuánto llevas bajando sin interrupción (se resetea si subes)
    let oculto = 0;                // qué tan escondido está .menu ahora (0 = visible, alturaMenu = escondido)
              //nombre de la funcion
    function actualizar() {
        const scrollActual = window.scrollY;
        const diferencia = scrollActual - ultimoScroll; // positivo = bajando, negativo = subiendo

        if (diferencia > 0) {
            // BAJANDO: acumula, y solo esconde si ya pasaste el umbral
            scrollDownAcumulado += diferencia;
            if (scrollDownAcumulado > umbral) {
                oculto = Math.min(oculto + diferencia, alturaMenu); // no esconder más de lo que mide el menú
            }
        } else {
            // SUBIENDO: reaparece YA, sin umbral, y resetea el contador de bajada
            scrollDownAcumulado = 0;
            oculto = Math.max(oculto + diferencia, 0); // no dejar que "oculto" se vuelva negativo
        }

        menu.style.transform = `translateY(${-oculto}px)`; // mueve el menú hacia arriba según "oculto"

        // NUEVO: le restamos "oculto" para que menu2 "suba" y cierre el hueco que deja .menu al esconderse
        const movimientoMenu2 = Math.max(0, distanciaInicial - scrollActual) - oculto;
        menu2.style.transform = `translateY(${movimientoMenu2}px)`;

        ultimoScroll = scrollActual;
    }

    actualizar();
    window.addEventListener('scroll', actualizar);
});

