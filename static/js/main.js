// ==========================================================================
// BARBERÍA - FUNCIONALIDADES JAVASCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // NAVEGACIÓN SUAVE
    // ==========================================================================
    
    // Scroll suave para enlaces internos
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================================================
    // HEADER DINÁMICO - EFECTO SCROLL
    // ==========================================================================
    
    const header = document.querySelector('.header');
    console.log('Header encontrado:', header); // Debug
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        console.log('Scroll actual:', currentScrollY); // Debug
        
        // Si el scroll está en el tope (0-50px), navbar oscuro
        if (currentScrollY <= 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
            console.log('Navbar oscuro aplicado'); // Debug
        } 
        // Si ha hecho scroll hacia abajo, navbar transparente y desenfocado
        else {
            header.style.background = 'rgba(0, 0, 0, 0.2)';
            header.style.backdropFilter = 'blur(15px)';
            console.log('Navbar transparente aplicado'); // Debug
        }
    }

    // Event listener directo para scroll
    window.addEventListener('scroll', handleScroll);
    
    // Ejecutar una vez al cargar para establecer el estado inicial
    handleScroll();
    
    // ==========================================================================
    // ANIMACIONES EN SCROLL
    // ==========================================================================
    
    // Función para animar elementos cuando entran en vista
    function animateOnScroll() {
        const elements = document.querySelectorAll('.fade-in-up');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Ejecutar animaciones en scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
    
    // ==========================================================================
    // GALERÍA DE IMÁGENES
    // ==========================================================================
    
    // Efecto hover para imágenes de galería
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Ensure gallery videos are muted by default so section-level autoplay can work
    const galleryVideos = document.querySelectorAll('video.basic-media');
    galleryVideos.forEach(v => { try { v.muted = true; } catch (e) {} });

    // Play / pause all gallery videos when the gallery section itself is shown/hidden
    const gallerySection = document.querySelector('#galeria');
    if (gallerySection && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const vids = gallerySection.querySelectorAll('video.basic-media');
                if (entry.isIntersecting) {
                    vids.forEach(v => {
                        try {
                            v.muted = true;
                            const p = v.play();
                            if (p !== undefined) p.catch(()=>{});
                        } catch (e) {}
                    });
                } else {
                    vids.forEach(v => { try { v.pause(); } catch (e) {} });
                }
            });
        }, { root: null, rootMargin: '0px', threshold: 0.25 }); // start when ~25% of gallery is visible

        sectionObserver.observe(gallerySection);
    }
    
    // ==========================================================================
    // BOTONES CON EFECTOS
    // ==========================================================================
    
    // Efecto ripple para botones
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ==========================================================================
    // FORMULARIOS
    // ==========================================================================
    
    // Validación básica para enlaces de WhatsApp
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Agregar tracking o analytics aquí si es necesario
            console.log('WhatsApp link clicked');
        });
    });
    
    // ==========================================================================
    // LAZY LOADING PARA IMÁGENES
    // ==========================================================================
    
    // Implementar lazy loading si el navegador no lo soporta nativamente
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Responsive menu is handled in mobile-menu.js (keeps behavior centralized)
    
    // ==========================================================================
    // UTILS
    // ==========================================================================
    
    // Función para formatear números de teléfono
    function formatPhoneNumber(phoneNumber) {
        // Remover todos los caracteres no numéricos
        const cleaned = phoneNumber.replace(/\D/g, '');
        
        // Formatear según la longitud
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        
        return phoneNumber;
    }
    
    // Aplicar formato a números de teléfono
    const phoneNumbers = document.querySelectorAll('.phone-number');
    phoneNumbers.forEach(phone => {
        phone.textContent = formatPhoneNumber(phone.textContent);
    });
    
    // ==========================================================================
    // PERFORMANCE
    // ==========================================================================
    
    // Throttle function para eventos que se disparan frecuentemente
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Aplicar throttle al evento scroll
    window.addEventListener('scroll', throttle(function() {
        // Funciones que se ejecutan en scroll con throttle
        animateOnScroll();
    }, 16)); // ~60fps
    
});

// ==========================================================================
// CSS PARA EFECTOS JAVASCRIPT
// ==========================================================================

// Agregar estilos dinámicos para efectos
const dynamicStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    /* Mobile menu styles para futuras mejoras */
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.95);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
    }
`;

// Inyectar estilos dinámicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// ==========================================================================
// SLIDER AUTOMÁTICO PARA SECCIÓN SOBRE NOSOTROS
// ==========================================================================

// Variables para el slider de "Sobre Nosotros"
let aboutSliderInterval;
let currentAboutSlide = 0;
let totalAboutSlides = 0;

// Función para inicializar el slider automático de "Sobre Nosotros"
function initAboutSlider() {
    const sliderRadios = document.querySelectorAll('input[name="slider"]');
    totalAboutSlides = sliderRadios.length;
    
    console.log('Inicializando slider About - Total slides:', totalAboutSlides); // Debug
    
    // Solo inicializar si hay más de un slide
    if (totalAboutSlides > 1) {
        // Encontrar cuál radio está checked inicialmente
        sliderRadios.forEach((radio, index) => {
            if (radio.checked) {
                currentAboutSlide = index;
                console.log('Slide inicial:', currentAboutSlide); // Debug
            }
        });
        
        // Iniciar el slider automático cada 3 segundos
        aboutSliderInterval = setInterval(() => {
            nextAboutSlide();
        }, 3000);
        
        console.log('Slider About iniciado correctamente'); // Debug
        
        // Pausar/reanudar al pasar el mouse sobre el slider
        const slider = document.querySelector('.css-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(aboutSliderInterval);
                console.log('Slider About pausado'); // Debug
            });
            
            slider.addEventListener('mouseleave', () => {
                aboutSliderInterval = setInterval(() => {
                    nextAboutSlide();
                }, 3000);
                console.log('Slider About reanudado'); // Debug
            });
        }
        
        // También actualizar los dots cuando se hace click manual
        const navDots = document.querySelectorAll('.nav-dot');
        navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentAboutSlide = index;
                console.log('Click manual en dot:', index); // Debug
                // Reiniciar el interval
                clearInterval(aboutSliderInterval);
                aboutSliderInterval = setInterval(() => {
                    nextAboutSlide();
                }, 3000);
            });
        });
    } else {
        console.log('No hay suficientes slides para inicializar el slider About'); // Debug
    }
}

// Función para cambiar al siguiente slide de "Sobre Nosotros"
function nextAboutSlide() {
    const sliderRadios = document.querySelectorAll('input[name="slider"]');
    
    if (sliderRadios.length > 0) {
        console.log('Cambiando de slide', currentAboutSlide, 'al siguiente'); // Debug
        
        // Desmarcar el slide actual
        sliderRadios[currentAboutSlide].checked = false;
        
        // Mover al siguiente slide (circular)
        currentAboutSlide = (currentAboutSlide + 1) % totalAboutSlides;
        
        // Marcar el nuevo slide (el CSS se encarga del resto automáticamente)
        sliderRadios[currentAboutSlide].checked = true;
        
        console.log('Nuevo slide activo:', currentAboutSlide); // Debug
    }
}

// ==========================================================================
// SLIDER DE SERVICIOS
// ==========================================================================

// Variables para controlar los sliders de servicios
let serviceSliders = {};
let serviceIntervals = {};

// Función para inicializar todos los sliders de servicios
function initServiceSliders() {
    // Encontrar todos los sliders de servicios
    const sliders = document.querySelectorAll('.service-image-slider');
    
    sliders.forEach(slider => {
        const serviceId = slider.dataset.serviceId;
        const slides = slider.querySelectorAll('.service-slide');
        
        // Solo inicializar si hay más de una imagen
        if (slides.length > 1) {
            serviceSliders[serviceId] = {
                currentSlide: 0,
                totalSlides: slides.length,
                slider: slider
            };
            
            // Iniciar slider automático cada 4 segundos
            serviceIntervals[serviceId] = setInterval(() => {
                nextServiceSlide(serviceId);
            }, 4000);
        }
    });
}

// Función para cambiar al siguiente slide
function nextServiceSlide(serviceId) {
    const sliderData = serviceSliders[serviceId];
    if (!sliderData) return;
    
    const slides = sliderData.slider.querySelectorAll('.service-slide');
    const dots = sliderData.slider.querySelectorAll('.dot');
    
    // Ocultar slide actual
    slides[sliderData.currentSlide].classList.remove('active');
    if (dots[sliderData.currentSlide]) {
        dots[sliderData.currentSlide].classList.remove('active');
    }
    
    // Mover al siguiente slide
    sliderData.currentSlide = (sliderData.currentSlide + 1) % sliderData.totalSlides;
    
    // Mostrar nuevo slide
    slides[sliderData.currentSlide].classList.add('active');
    if (dots[sliderData.currentSlide]) {
        dots[sliderData.currentSlide].classList.add('active');
    }
}

// Función para ir a un slide específico (cuando se hace click en los dots)
function currentServiceSlide(slideIndex, serviceId) {
    // Convertir a números para asegurar compatibilidad
    slideIndex = parseInt(slideIndex);
    serviceId = parseInt(serviceId);
    
    const sliderData = serviceSliders[serviceId];
    if (!sliderData) return;
    
    const slides = sliderData.slider.querySelectorAll('.service-slide');
    const dots = sliderData.slider.querySelectorAll('.dot');
    
    // Ocultar slide actual
    slides[sliderData.currentSlide].classList.remove('active');
    if (dots[sliderData.currentSlide]) {
        dots[sliderData.currentSlide].classList.remove('active');
    }
    
    // Cambiar al slide seleccionado
    sliderData.currentSlide = slideIndex - 1; // -1 porque slideIndex viene desde 1
    
    // Mostrar nuevo slide
    slides[sliderData.currentSlide].classList.add('active');
    if (dots[sliderData.currentSlide]) {
        dots[sliderData.currentSlide].classList.add('active');
    }
    
    // Reiniciar el interval automático
    clearInterval(serviceIntervals[serviceId]);
    serviceIntervals[serviceId] = setInterval(() => {
        nextServiceSlide(serviceId);
    }, 4000);
}

// Inicializar sliders después de que cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar slider de "Sobre Nosotros"
    setTimeout(initAboutSlider, 100);
    
    // Inicializar sliders de servicios
    setTimeout(initServiceSliders, 100);
    
    // Pausar/reanudar sliders al pasar el mouse
    document.addEventListener('mouseover', function(e) {
        if (e.target.closest('.service-image-slider')) {
            const slider = e.target.closest('.service-image-slider');
            const serviceId = slider.dataset.serviceId;
            if (serviceIntervals[serviceId]) {
                clearInterval(serviceIntervals[serviceId]);
            }
        }
    });

// NOTE: Masonry and imagesLoaded are intentionally not used for the basic gallery.
// The gallery markup and CSS are simplified to a row-based layout.
    // Masonry init: ensure we only use it if scripts are available and the grid exists
    function initMasonryIfNeeded() {
        const masonryGrid = document.querySelector('.js-masonry');
        if (!masonryGrid) return;
        if (typeof Masonry === 'undefined' || typeof imagesLoaded === 'undefined') return;

        if (masonryGrid.dataset.msnryInit) return; // already initialized

        let msnry;

        function createMasonry() {
            if (msnry) return;
            msnry = new Masonry(masonryGrid, {
                itemSelector: '.collage-item',
                columnWidth: '.grid-sizer',
                percentPosition: true,
                gutter: 0,
                horizontalOrder: true
            });

            window.addEventListener('resize', function() { if (msnry) msnry.layout(); });
            masonryGrid.dataset.msnryInit = '1';
        }

        const imgLoad = imagesLoaded(masonryGrid, { background: true });
        imgLoad.on('progress', function() { if (msnry) msnry.layout(); });
        imgLoad.on('always', function() { createMasonry(); if (msnry) msnry.layout(); });

        // Wait for video metadata too
        const videos = masonryGrid.querySelectorAll('video');
        if (videos.length > 0) {
            let ready = 0;
            videos.forEach(v => {
                if (v.readyState >= 1) { ready++; }
                else v.addEventListener('loadedmetadata', function() { ready++; if (msnry) msnry.layout(); if (ready === videos.length) { createMasonry(); if (msnry) msnry.layout(); } });
            });
            if (ready === videos.length) { createMasonry(); if (msnry) msnry.layout(); }
        }

        // Safety final layout after full load
        window.addEventListener('load', function() { if (!msnry) createMasonry(); if (msnry) msnry.layout(); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMasonryIfNeeded); else initMasonryIfNeeded();
    document.addEventListener('mouseout', function(e) {
        if (e.target.closest('.service-image-slider')) {
            const slider = e.target.closest('.service-image-slider');
            const serviceId = slider.dataset.serviceId;
            if (serviceSliders[serviceId] && serviceSliders[serviceId].totalSlides > 1) {
                serviceIntervals[serviceId] = setInterval(() => {
                    nextServiceSlide(serviceId);
                }, 4000);
            }
        }
    });
});

