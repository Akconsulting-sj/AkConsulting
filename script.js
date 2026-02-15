// --- LÓGICA DEL PRELOADER ---
// Global variables to track state
let pageLoaded = false;
let minimumTimeElapsed = false;

// Function to hide the preloader
function hidePreloader() {
    if (pageLoaded && minimumTimeElapsed) {
        const preloader = document.getElementById('preloader');
        const body = document.body;

        if (preloader) {
            preloader.classList.add('preloader-hidden');
            // Remove overflow hidden after a small delay to ensure smoother transition.
            // This needs to be done *before* the preloader is fully gone.
            setTimeout(() => {
                 body.style.overflow = 'visible'; // Re-enable scrolling
                 // Also, ensure `body` doesn't have the `.loading` class if it were added for initial overflow:hidden
                 // (though we're setting style.overflow directly, this is good practice if a class were used)
            }, 500); // Give some time before enabling scroll

            // Ensure display: none happens after CSS transition (0.75s)
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }
}

// Track when the page has fully loaded
window.onload = () => {
    pageLoaded = true;
    hidePreloader();
};

// Ensure a minimum display time for the preloader
setTimeout(() => {
    minimumTimeElapsed = true;
    hidePreloader();
}, 1500); // Preloader stays for at least 1.5 seconds


// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // --- CONFIGURACIÓN DE SCROLL ---
    const isMobile = window.innerWidth <= 992;
    
    // Dejamos los defaults como estaban para no romper nada.
    ScrollTrigger.defaults({
        scroller: isMobile ? window : ".scroll-container"
    });

    // --- ANIMACIONES HERO ---
    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#hero",
            toggleActions: "play none none none"
        }
    });
    
    heroTimeline.from(".hero-content .text-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // =========================================================
    // --- ANIMACIONES AÑADIDAS Y CORREGIDAS ---
    // =========================================================
    
    const animConfig = {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2
    };

    // --- ANIMACIONES SECCIÓN SOBRE NOSOTROS ---
    // Se eliminan .about-left y .feature-item que no existen en el HTML.
    // Se reemplazan por animaciones para los elementos reales.
    gsap.from(".about-intro-block > *", {
        ...animConfig,
        scrollTrigger: {
            trigger: ".about-intro-block",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from(".director-row > *", {
        ...animConfig,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".director-row",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    
    // Animamos las 3 filas restantes de Misión, Visión y Valores
    document.querySelectorAll('.about-row.spacer-large').forEach(row => {
        gsap.from(row.children, {
            ...animConfig,
            scrollTrigger: {
                trigger: row,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });


    // --- ANIMACIONES SERVICIOS ---
    // La animación para .service-card ya existía y funcionaba. La mantenemos.
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 70%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });
    // Añadimos animación para la intro de la sección
    gsap.from(".services-intro > *", {
        ...animConfig,
        scrollTrigger: {
            trigger: ".services-intro",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
    

    // --- ANIMACIONES FORMACIÓN (TRAINING) ---
    gsap.from("#training .section-title, #training .separator-line, #training .training-desc", {
        ...animConfig,
        scrollTrigger: {
            trigger: "#training",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from(".training-card", {
        ...animConfig,
        stagger: 0.1,
        scrollTrigger: {
            trigger: ".training-carousel-wrapper",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });


    // --- ANIMACIONES TRABAJOS ---
    // Se corrige el selector .work-item por .card-work-finished
    gsap.from(".card-work-finished", {
        scrollTrigger: {
            trigger: ".works-display-grid",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, // Stagger más rápido para la grilla
        ease: "power2.out"
    });
     // Añadimos animación para la intro de la sección
    gsap.from("#works .section-title, #works .separator-line, #works .works-desc", {
        ...animConfig,
        scrollTrigger: {
            trigger: "#works",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });


    // --- ANIMACIÓN CLIENTES (ya existía) ---
    gsap.from(".logo-box", {
        scrollTrigger: {
            trigger: ".clients-slider",
            start: "top 90%",
            toggleActions: "play none none reverse"
        },
        scale: 0.5,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1
    });

    // --- ANIMACIÓN CONTACTO ---
    gsap.from("#contact h2, .contact-form-wrapper, .contact-info > *", {
        ...animConfig,
        stagger: 0.3,
         scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    })

    // --- REFRESCAR SCROLLTRIGGER ---
    ScrollTrigger.refresh();


    // =========================================================
    // --- LÓGICA ORIGINAL DEL SITIO (SIN CAMBIOS) ---
    // =========================================================

    // --- LÓGICA DE ACORDEÓN DE SERVICIOS ---
    // (Esta funcionalidad se elimina porque las tarjetas ahora son estáticas)

    // --- LÓGICA CARRUSEL FORMACIÓN (1 a 1 + SCROLL FLUIDO) ---
    const tSlider = document.getElementById('training-slider');
    const tPrevBtn = document.querySelector('.t-prev');
    const tNextBtn = document.querySelector('.t-next');

    if (tSlider) {
        
        const moveTrainingSlider = (direction) => {
            const card = tSlider.querySelector('.training-card');
            
            if (card) {
                const cardWidth = card.offsetWidth;
                const style = window.getComputedStyle(tSlider);
                const gapVal = parseFloat(style.columnGap) || parseFloat(style.gap);
                const gap = !isNaN(gapVal) ? gapVal : 32;
                const scrollStep = cardWidth + gap;

                if (direction === 'next') {
                    tSlider.scrollBy({ left: scrollStep, behavior: 'smooth' });
                } else {
                    tSlider.scrollBy({ left: -scrollStep, behavior: 'smooth' });
                }
            }
        };

        if (tNextBtn) tNextBtn.addEventListener('click', () => moveTrainingSlider('next'));
        if (tPrevBtn) tPrevBtn.addEventListener('click', () => moveTrainingSlider('prev'));

        tSlider.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            tSlider.scrollBy({
                left: evt.deltaY * 3, 
                behavior: 'smooth'
            });
        }, { passive: false });
    }
});

// --- MANEJO DEL MENÚ RESPONSIVE (CON CAMBIO DE ICONO X) ---
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');
const menuIcon = menuToggle ? menuToggle.querySelector('i') : null;

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        
        if (menuIcon) {
            if (nav.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        }
    });
}

// Cerrar menú al hacer clic en un link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});