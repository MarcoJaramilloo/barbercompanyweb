// ==========================================================================
// BARBERÍA - MENÚ MÓVIL SIMPLE
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 JavaScript cargado');
    
    // ==========================================================================
    // HEADER DINÁMICO - EFECTO SCROLL
    // ==========================================================================
    
    const header = document.querySelector('.header');
    console.log('Header encontrado:', header);
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.2)';
            header.style.backdropFilter = 'blur(15px)';
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    // ==========================================================================
    // MENÚ HAMBURGUESA MÓVIL
    // ==========================================================================
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    console.log('🍔 Botón hamburguesa encontrado:', !!mobileMenuBtn);
    console.log('📱 Menú navegación encontrado:', !!navMenu);
    
    if (mobileMenuBtn && navMenu) {
        console.log('✅ Configurando menú móvil...');
        
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🍔 ¡CLICK EN HAMBURGUESA!');
            
            // Toggle clases active
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Botón activo:', mobileMenuBtn.classList.contains('active'));
            console.log('Menú activo:', navMenu.classList.contains('active'));
            
            // NO bloquear scroll para dropdown - es más natural
            if (navMenu.classList.contains('active')) {
                console.log('� Dropdown ABIERTO (sin bloqueo de scroll)');
            } else {
                console.log('� Dropdown CERRADO');
            }
        });

        // Cerrar menú al hacer click en enlaces
        const navLinks = navMenu.querySelectorAll('.nav-link');
        console.log('🔗 Enlaces encontrados:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('🔗 Click en enlace - Cerrando menú');
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                console.log('⌨️ Escape presionado - Cerrando menú');
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
        
    } else {
        console.error('❌ No se encontraron los elementos del menú móvil');
    }
});
