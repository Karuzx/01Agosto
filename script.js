document.addEventListener('DOMContentLoaded', () => {
    // --- Configuración Global ---
    const ANNIVERSARY_DATE = '2024-01-04'; // Formato YYYY-MM-DD para compatibilidad
    const WELCOME_MESSAGE = "Bienvenida a nuestro pequeño universo. Para entrar, por favor, introduce la fecha en que todo comenzó por segunda vez.";
    const GARDEN_INITIAL_MESSAGE = "¡Bienvenida a nuestro jardín! Haz clic en cada estrella para descubrir un pedacito de mi corazón.";

    // Citas del Principito
    const PRINCE_QUOTES = [
        "Fue el tiempo que pasaste con tu rosa lo que la hizo tan importante.",
        "Lo esencial es invisible a los ojos.",
        "Si vienes, por ejemplo, a las cuatro de la tarde, desde las tres yo empezaría a ser feliz.",
        "No se ve bien sino con el corazón. Lo esencial es invisible a los ojos.",
        "Caminando en línea recta no puede uno ir muy lejos."
    ];

    // Contenido de los recuerdos para los planetas (10 en total)
    const memories = [
        { title: "Nuestra Conexión Única", text: "Desde el primer momento, supe que nuestra conexión era especial. Un hilo invisible nos unió y desde entonces, mi mundo tiene más color." },
        { title: "Tu Risa Contagiosa", text: "Tu risa es la melodía más dulce. Cada vez que ríes, un pedacito de felicidad se esparce por mi corazón, iluminando todo a su paso." },
        { title: "Primer Viaje Juntos", text: "Ese viaje juntos fue más que un destino; fue el inicio de un camino lleno de aventuras y descubrimientos a tu lado. Inolvidable." },
        { title: "Apoyo Incondicional", text: "En cada paso, en cada desafío, siempre has estado ahí. Tu apoyo incondicional me da la fuerza para ser la mejor versión de mí mismo." },
        { title: "Momentos Cotidianos", text: "No son solo los grandes momentos, sino también esos pequeños instantes cotidianos a tu lado los que hacen mi vida completa y feliz." },
        { title: "Tu Infinita Paciencia", text: "Admiro tu paciencia, tu calma. Me enseñas a ver el mundo con otros ojos y a apreciar cada detalle, incluso en la prisa." },
        { title: "Nuestros Sueños Compartidos", text: "Soñar contigo es construir un futuro que quiero vivir. Cada sueño que compartimos me impulsa a crecer y a luchar por lo nuestro." },
        { title: "El Amor que Cuidamos", text: "Nuestro amor es como una rosa: única y preciosa, que debemos cuidar cada día. Y la tuya, mi amor, es la más hermosa de todas." },
        { title: "Tu Fortaleza Interior", text: "Tu fortaleza y tu espíritu me inspiran cada día. Eres un ejemplo de resiliencia y gracia, y me siento afortunado de estar a tu lado." },
        { title: "Mi Promesa Eterna", text: "Prometo cuidarte, amarte y acompañarte en cada paso de esta vida. Nuestro 'para siempre' es mi mayor deseo y mi realidad favorita." }
    ];

    // Datos de los planetas (tamaño y color)
    const planetData = [
        { size: 40, colorVar: 'var(--planet-color-1)' },
        { size: 50, colorVar: 'var(--planet-color-2)' },
        { size: 35, colorVar: 'var(--planet-color-3)' },
        { size: 60, colorVar: 'var(--planet-color-4)' },
        { size: 45, colorVar: 'var(--planet-color-5)' },
        { size: 55, colorVar: 'var(--planet-color-6)' },
        { size: 38, colorVar: 'var(--planet-color-7)' },
        { size: 48, colorVar: 'var(--planet-color-8)' },
        { size: 42, colorVar: 'var(--planet-color-9)' },
        { size: 65, colorVar: 'var(--planet-color-10)' }
    ];

    // Elementos flotantes (solo Principito)
    const floatingElementsData = [
        { type: 'prince', src: 'img/prince.png', count: 2 } // Asume que tienes img/prince.png
    ];

    // --- Referencias del DOM ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const gardenScreen = document.getElementById('garden-screen');
    const anniversaryDateInput = document.getElementById('anniversary-date-input');
    const enterButton = document.getElementById('enter-button');
    const errorMessage = document.getElementById('error-message');
    const gardenTitle = document.querySelector('.garden-title');
    const gardenMessage = document.querySelector('.garden-message');
    const starCluster = document.getElementById('star-cluster'); // Ahora será el contenedor de los planetas
    const memoryModal = document.getElementById('memory-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeButton = document.querySelector('.close-button');
    const centralRose = document.getElementById('central-rose');
    const floatingElementsContainer = document.querySelector('.floating-elements-container');

    // --- Lógica de la Pantalla de Bienvenida ---
    enterButton.addEventListener('click', () => {
        const inputDate = anniversaryDateInput.value; // Formato YYYY-MM-DD del input type="date"
        if (inputDate === ANNIVERSARY_DATE) {
            welcomeScreen.classList.remove('active');
            gardenScreen.classList.add('active');
            renderGarden(); // Inicia la renderización del jardín
        } else {
            errorMessage.textContent = 'Fecha incorrecta. Por favor, inténtalo de nuevo.';
        }
    });

    // --- Lógica del Jardín de Recuerdos ---

    /**
     * Renderiza el jardín de recuerdos, incluyendo la rosa, planetas y elementos flotantes.
     */
    const renderGarden = () => {
        gardenTitle.textContent = GARDEN_INITIAL_MESSAGE.split('!')[0] + '!';
        gardenMessage.textContent = GARDEN_INITIAL_MESSAGE.split('!')[1].trim();

        const containerSize = 600; // Coincide con el width/height de .rose-container en CSS
        const centerX = containerSize / 2;
        const centerY = containerSize / 2;

        // Generar planetas de recuerdos
        memories.forEach((memory, index) => {
            const planet = document.createElement('div');
            planet.classList.add('planet');
            planet.textContent = memory.title;

            // Asignar tamaño y color del planeta
            const pData = planetData[index % planetData.length]; // Usa los datos predefinidos
            planet.style.width = `${pData.size}px`;
            planet.style.height = `${pData.size}px`;
            planet.style.backgroundColor = pData.colorVar;

            // Calcular radio para la órbita (aumenta con el índice)
            const orbitRadius = 150 + (index * 30); // Incremento de 30px por planeta, empezando en 150px
            const initialAngle = (index / memories.length) * 2 * Math.PI; // Distribución inicial uniforme

            // Posicionar el planeta en su órbita inicial
            planet.style.left = `${centerX + orbitRadius * Math.cos(initialAngle) - (pData.size / 2)}px`;
            planet.style.top = `${centerY + orbitRadius * Math.sin(initialAngle) - (pData.size / 2)}px`;

            // Animación de órbita individual para cada planeta
            const animationName = `orbit-planet-${index}`;
            const animationDuration = 30 + (index * 5); // Órbitas más lentas para planetas exteriores
            const animationKeyframes = `
                @keyframes ${animationName} {
                    from { transform: rotate(0deg) translateX(${orbitRadius}px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(${orbitRadius}px) rotate(-360deg); }
                }
            `;
            const styleSheet = document.styleSheets[0];
            styleSheet.insertRule(animationKeyframes, styleSheet.cssRules.length);
            planet.style.animation = `${animationName} ${animationDuration}s linear infinite`;

            planet.addEventListener('click', () => showMemory(memory));
            starCluster.appendChild(planet);
        });


        // Añadir citas del Principito
        const quote1Element = document.getElementById('quote-1');
        const quote2Element = document.getElementById('quote-2');

        // Selecciona dos citas aleatorias distintas
        let randomIndex1 = Math.floor(Math.random() * PRINCE_QUOTES.length);
        let randomIndex2 = Math.floor(Math.random() * PRINCE_QUOTES.length);
        while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.floor(Math.random() * PRINCE_QUOTES.length);
        }

        quote1Element.textContent = `"${PRINCE_QUOTES[randomIndex1]}"`;
        quote2Element.textContent = `"${PRINCE_QUOTES[randomIndex2]}"`;

        // Generar elementos flotantes (solo Principito)
        floatingElementsData.forEach(data => {
            for (let i = 0; i < data.count; i++) {
                const element = document.createElement('div');
                element.classList.add('floating-element', data.type);

                const img = document.createElement('img');
                img.src = data.src;
                img.alt = data.type;
                element.appendChild(img);

                // Posición inicial aleatoria y duración de animación aleatoria
                const startX = Math.random() * window.innerWidth;
                const startY = -50 - (Math.random() * 100); // Empieza por encima de la pantalla
                element.style.left = `${startX}px`;
                element.style.top = `${startY}px`;
                element.style.animationDuration = `${20 + Math.random() * 10}s`; // 20-30s de duración
                element.style.animationDelay = `${i * 3 + Math.random() * 5}s`; // Escalonado y aleatorio

                floatingElementsContainer.appendChild(element);

                // Reiniciar animación cuando termina (para que sigan apareciendo)
                element.addEventListener('animationend', () => {
                    element.remove();
                    // Vuelve a crear el elemento para un ciclo infinito
                    const newElement = document.createElement('div');
                    newElement.classList.add('floating-element', data.type);
                    const newImg = document.createElement('img');
                    newImg.src = data.src;
                    newImg.alt = data.type;
                    newElement.appendChild(newImg);

                    const newStartX = Math.random() * window.innerWidth;
                    const newStartY = -50 - (Math.random() * 100);
                    newElement.style.left = `${newStartX}px`;
                    newElement.style.top = `${newStartY}px`;
                    newElement.style.animationDuration = `${20 + Math.random() * 10}s`;
                    newElement.style.animationDelay = `0s`; // Empieza inmediatamente
                    floatingElementsContainer.appendChild(newElement);
                });
            }
        });
    };

    /**
     * Muestra el modal con el detalle de un recuerdo.
     * @param {object} memory - Objeto con el título y texto del recuerdo.
     */
    const showMemory = (memory) => {
        modalTitle.textContent = memory.title;
        modalText.textContent = memory.text;
        memoryModal.style.display = 'flex';
    };

    // --- Lógica del Modal ---
    closeButton.addEventListener('click', () => {
        memoryModal.style.display = 'none';
    });

    // Cierra el modal si se hace clic fuera de su contenido
    window.addEventListener('click', (event) => {
        if (event.target === memoryModal) {
            memoryModal.style.display = 'none';
        }
    });

    // --- Inicialización ---
    // Asegurarse de que la pantalla de bienvenida esté activa al cargar
    welcomeScreen.classList.add('active');
});
