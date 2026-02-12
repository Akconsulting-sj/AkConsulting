// Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", () => {
    
    gsap.registerPlugin(ScrollTrigger);

    // --- CONFIGURACIÓN DE SCROLL ---
    const isMobile = window.innerWidth <= 992;
    
    ScrollTrigger.defaults({
        scroller: isMobile ? window : ".scroll-container"
    });

    // --- ANIMACIONES HERO ---
    const heroTimeline = gsap.timeline();
    
    heroTimeline.from(".hero-content .text-reveal", {
        y: 50, 
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // --- ANIMACIONES SECCIÓN SOBRE NOSOTROS ---
    gsap.from(".about-left", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%",
            toggleActions: "play none none reverse" 
        },
        x: -50,
        duration: 1,
        ease: "power2.out"
    });

    gsap.from(".feature-item", {
        scrollTrigger: {
            trigger: "#about",
            start: "top 75%"
        },
        x: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
    });

    // --- ANIMACIONES SERVICIOS ---
    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 70%"
        },
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // --- ANIMACIONES TRABAJOS ---
    gsap.from(".work-item", {
        scrollTrigger: {
            trigger: "#works",
            start: "top 80%"
        },
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    gsap.from(".logo-box", {
        scrollTrigger: {
            trigger: ".clients-slider",
            start: "top 90%"
        },
        scale: 0.5,
        duration: 0.5,
        stagger: 0.1
    });

    // --- REFRESCAR SCROLLTRIGGER ---
    ScrollTrigger.refresh();

    // --- LÓGICA DE ACORDEÓN DE SERVICIOS ---
    const serviceHeaders = document.querySelectorAll('.service-header-box');
    serviceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const card = header.parentElement;
            card.classList.toggle('active');
        });
    });

    // =========================================================
    // --- LÓGICA CARRUSEL FORMACIÓN (1 a 1 + SCROLL FLUIDO) ---
    // =========================================================
    const tSlider = document.getElementById('training-slider');
    const tPrevBtn = document.querySelector('.t-prev');
    const tNextBtn = document.querySelector('.t-next');

    if (tSlider) {
        
        // 1. NAVEGACIÓN CON FLECHAS (De 1 en 1 con cálculo preciso)
        const moveTrainingSlider = (direction) => {
            const card = tSlider.querySelector('.training-card');
            
            if (card) {
                // Obtenemos el ancho exacto de la tarjeta visible
                const cardWidth = card.offsetWidth;
                
                // Obtenemos el gap (espacio) computado del CSS
                const style = window.getComputedStyle(tSlider);
                // Si el gap no está definido o es 'normal', usamos 32px (2rem) como fallback seguro
                const gapVal = parseFloat(style.columnGap) || parseFloat(style.gap);
                const gap = !isNaN(gapVal) ? gapVal : 32;
                
                // Distancia exacta: 1 tarjeta + 1 espacio
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

        // 2. NAVEGACIÓN CON RUEDA DEL MOUSE (Suavidad Mejorada)
        tSlider.addEventListener('wheel', (evt) => {
            // Evitamos el scroll vertical de la página
            evt.preventDefault();
            
            // Usamos scrollBy con 'smooth' en lugar de cambiar scrollLeft directamente.
            // Multiplicamos deltaY * 3 para darle "inercia" y evitar que el scroll-snap lo frene en seco.
            tSlider.scrollBy({
                left: evt.deltaY * 3, 
                behavior: 'smooth'
            });
        }, { passive: false }); // Importante para que preventDefault funcione en navegadores modernos
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
        
        // Cambiar icono entre hamburguesa y X
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
        
        // Restaurar icono a hamburguesa al cerrar
        if (menuIcon) {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
});