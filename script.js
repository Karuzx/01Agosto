document.addEventListener('DOMContentLoaded', () => {
    const stars = document.querySelectorAll('.star');
    const messagePopup = document.getElementById('message-popup');

    stars.forEach(star => {
        star.addEventListener('click', (event) => {
            const message = event.target.dataset.message;
            showMessage(message, event.clientX, event.clientY);
        });

        // Para evitar que el mensaje se quede si tocan fuera en móvil
        star.addEventListener('touchend', (event) => {
            event.preventDefault(); // Previene el doble tap si hay click
            const message = event.target.dataset.message;
            showMessage(message, event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        });
    });

    function showMessage(message, x, y) {
        messagePopup.textContent = message;
        
        // Posicionar el popup cerca del toque
        // Calcula para que el popup no se salga de la pantalla
        const popupWidth = messagePopup.offsetWidth;
        const popupHeight = messagePopup.offsetHeight;

        let leftPos = x;
        let topPos = y;

        // Ajusta si el popup se va a salir por la derecha
        if (leftPos + popupWidth > window.innerWidth) {
            leftPos = window.innerWidth - popupWidth - 20; // 20px de margen
        }
        // Ajusta si el popup se va a salir por abajo
        if (topPos + popupHeight > window.innerHeight) {
            topPos = window.innerHeight - popupHeight - 20;
        }
        // Ajusta si el popup se va a salir por la izquierda
        if (leftPos < 0) {
            leftPos = 20;
        }
        // Ajusta si el popup se va a salir por arriba (menos probable con toque abajo)
        if (topPos < 0) {
            topPos = 20;
        }

        messagePopup.style.left = `${leftPos}px`;
        messagePopup.style.top = `${topPos}px`;
        messagePopup.classList.add('show');

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            messagePopup.classList.remove('show');
        }, 4000); // El mensaje dura 4 segundos
    }

    // Ocultar el mensaje si se hace clic/toca fuera del popup
    document.addEventListener('click', (event) => {
        if (!messagePopup.contains(event.target) && !event.target.classList.contains('star')) {
            messagePopup.classList.remove('show');
        }
    });

    document.addEventListener('touchend', (event) => {
        if (!messagePopup.contains(event.target) && !event.target.classList.contains('star')) {
            messagePopup.classList.remove('show');
        }
    });
});
