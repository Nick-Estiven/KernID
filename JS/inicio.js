document.addEventListener('DOMContentLoaded', () => {

    const svg = document.getElementById('canvasHilos');
    const intro = document.getElementById('intro');

    // Configuración de cuántos hilos dibujar y sus colores
    const colores = ['#70edf8', '#cbcdff', '#fafafa', '#8aebff', '#fcfcfc'];
    const cantidadHilos = 5;
    const puntosPorHilo = 40; // cuántos segmentos usamos para dibujar cada curva

    // Creamos los elementos <path> UNA sola vez, y los vamos a ir
    // actualizando en cada fotograma (más eficiente que crear/borrar)
    const hilos = [];

    for (let i = 0; i < cantidadHilos; i++) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.classList.add('hilo');
        path.style.stroke = colores[i % colores.length];
        path.style.color = colores[i % colores.length]; // para el drop-shadow "currentColor"
        svg.appendChild(path);
        hilos.push(path);
    }

    let tiempo = 0;

    // Convierte una lista de puntos [[x,y], [x,y], ...] en un
    // string de curvas suaves, en vez de líneas rectas entre puntos.
    // La técnica: en vez de ir DIRECTO a cada punto (esquina filosa),
    // usamos el punto como "guía" y terminamos cada tramo en el punto
    // MEDIO entre él y el siguiente — eso redondea cada unión.
    function suavizarCurva(puntos) {
        let d = `M ${puntos[0][0]},${puntos[0][1]}`;

        for (let i = 1; i < puntos.length - 1; i++) {
            const actual = puntos[i];
            const siguiente = puntos[i + 1];
            const puntoMedioX = (actual[0] + siguiente[0]) / 2;
            const puntoMedioY = (actual[1] + siguiente[1]) / 2;

            // Q = curva cuadrática: "actual" es el punto de control (guía),
            // el punto medio es donde realmente termina el trazo
            d += ` Q ${actual[0]},${actual[1]} ${puntoMedioX},${puntoMedioY}`;
        }

        // Cerramos con el último punto real
        const ultimo = puntos[puntos.length - 1];
        d += ` L ${ultimo[0]},${ultimo[1]}`;

        return d;
    }

    function animar() {
        tiempo += 0.008; // velocidad general del movimiento

        hilos.forEach((path, indice) => {
            let puntos = [];

            // Cada hilo tiene su propia fase y amplitud, para que no
            // se muevan todos exactamente igual (se ve más orgánico)
            const fase = indice * 1.4;
            const amplitud = 50 + indice * 15;
            const direccion = indice % 2 === 0 ? 1 : -1; // alternamos diagonal

            for (let p = 0; p <= puntosPorHilo; p++) {
                const x = (p / puntosPorHilo) * 1600;

                // "Pinch" hacia el centro: la amplitud se reduce
                // cerca de x=800 (mitad de pantalla) y crece en los bordes
                const distanciaAlCentro = Math.abs(x - 800) / 800; // 0 en el centro, 1 en los bordes
                const amplitudLocal = amplitud * (0.05 + distanciaAlCentro * 1);

                const y = 450
                    + direccion * (x - 800) * 0.15
                    + Math.sin(x * 0.006 + tiempo + fase) * amplitudLocal;

                puntos.push([x, y]);
            }

            path.setAttribute('d', suavizarCurva(puntos));
        });

        requestAnimationFrame(animar);
    }

    animar();

    // La intro se oculta después de 4.8 segundos
    setTimeout(() => {
        intro.classList.add('intro--oculta');
    }, 3000);

});