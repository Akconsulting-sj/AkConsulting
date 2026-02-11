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
    // (Aquí estaba el error de locoScroll, lo hemos quitado)
    ScrollTrigger.refresh();

    // --- LÓGICA DEL CARRUSEL DE TRABAJOS ---
    const slider = document.getElementById('works-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (slider && prevBtn && nextBtn) {
        
        const moveSlider = (direction) => {
            const card = slider.querySelector('.card-work-finished');
            
            if (card) {
                // Calculamos el ancho real de la tarjeta + el gap definido en CSS
                const cardWidth = card.offsetWidth; 
                // Leemos el gap directamente del estilo CSS para que sea exacto
                const style = window.getComputedStyle(slider);
                const gap = parseFloat(style.gap) || 24; 
                
                const scrollAmount = cardWidth + gap;

                if (direction === 'next') {
                    slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                } else {
                    slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                }
            }
        };

        nextBtn.addEventListener('click', () => moveSlider('next'));
        prevBtn.addEventListener('click', () => moveSlider('prev'));
    }

    // --- LÓGICA DE ACORDEÓN DE SERVICIOS ---
    const serviceHeaders = document.querySelectorAll('.service-header-box');

    serviceHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Encuentra la tarjeta padre
            const card = header.parentElement;
            
            // Opcional: Si quieres que al abrir una se cierren las otras (Efecto Acordeón estricto)
            // Descomenta las siguientes 3 líneas:
            /* document.querySelectorAll('.service-card').forEach(c => {
                if (c !== card) c.classList.remove('active');
            });
            */

            // Alternar la clase 'active' en la tarjeta clickeada
            card.classList.toggle('active');
        });
    });

    // --- LÓGICA CARRUSEL FORMACIÓN ---
    const tSlider = document.getElementById('training-slider');
    const tPrevBtn = document.querySelector('.t-prev');
    const tNextBtn = document.querySelector('.t-next');

    if (tSlider && tPrevBtn && tNextBtn) {
        
        tNextBtn.addEventListener('click', () => {
            // Desplaza el ancho de una tarjeta (360) + gap (32) = aprox 392px
            tSlider.scrollBy({ left: 392, behavior: 'smooth' });
        });

        tPrevBtn.addEventListener('click', () => {
            tSlider.scrollBy({ left: -392, behavior: 'smooth' });
        });
    }
});

// --- MANEJO DEL MENÚ RESPONSIVE ---
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav ul li a');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// --- EFECTO HOVER SERVICIOS ---
const cards = document.querySelectorAll('.service-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.02, duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3 });
    });
});