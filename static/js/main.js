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
    
    // ==========================================================================
    // RESPONSIVE MENU (PARA FUTURAS MEJORAS)
    // ==========================================================================
    
    // Preparar estructura para menú móvil hamburguesa
    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
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
    // MENÚ HAMBURGUESA MÓVIL
    // ==========================================================================
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('🍔 Botón hamburguesa:', mobileMenuBtn);
    console.log('📱 Menú navegación:', navMenu);
    
    if (mobileMenuBtn && navMenu) {
        console.log('✅ Elementos del menú móvil encontrados');
        
        mobileMenuBtn.addEventListener('click', function() {
            console.log('🍔 Click en botón hamburguesa'); // Debug
            
            // Toggle clase active en el botón hamburguesa
            mobileMenuBtn.classList.toggle('active');
            
            // Toggle clase active en el menú
            navMenu.classList.toggle('active');
            
            console.log('📱 Clases del menú:', navMenu.classList);
            
            // Prevenir scroll cuando el menú está abierto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('🔒 Menú abierto desde la derecha'); // Debug
            } else {
                document.body.style.overflow = '';
                console.log('🔓 Menú cerrado'); // Debug
            }
        });

        // Cerrar menú al hacer click en un enlace de navegación (no en redes sociales)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnButton = mobileMenuBtn.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al presionar escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

});