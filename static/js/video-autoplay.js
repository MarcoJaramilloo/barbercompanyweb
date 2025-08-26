/**
 * VIDEO AUTOPLAY ON SCROLL
 * Reproduce automáticamente los videos cuando aparecen en pantalla
 */

document.addEventListener('DOMContentLoaded', function() {
    const videos = document.querySelectorAll('[data-autoplay-on-scroll]');
    
    if (videos.length === 0) return;
    
    videos.forEach(video => {
        let hasPlayed = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasPlayed) {
                    // El video está visible en la pantalla
                    try {
                        video.play().then(() => {
                            hasPlayed = true;
                            console.log('Video reproducido automáticamente');
                            
                            // Agregar clase para indicar que se está reproduciendo
                            video.classList.add('auto-playing');
                        }).catch((error) => {
                            console.log('No se pudo reproducir automáticamente:', error);
                            // En algunos navegadores el autoplay está bloqueado
                            // Mostrar un indicador visual para que el usuario haga clic
                            showPlayIndicator(video);
                        });
                    } catch (error) {
                        console.log('Error al intentar reproducir:', error);
                        showPlayIndicator(video);
                    }
                }
            });
        }, {
            threshold: 0.1, // Se activa cuando solo el 10% del video es visible
            rootMargin: '200px 0px 0px 0px' // Comienza 200px antes de que el video sea visible
        });
        
        observer.observe(video);
    });
});

/**
 * Muestra un indicador visual cuando el autoplay está bloqueado
 */
function showPlayIndicator(video) {
    // Agregar un overlay con indicador de play
    if (!video.parentElement.querySelector('.play-indicator')) {
        const indicator = document.createElement('div');
        indicator.className = 'play-indicator';
        indicator.innerHTML = '<i class="fas fa-play"></i><span>Haz clic para reproducir</span>';
        indicator.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 1rem 2rem;
            border-radius: 25px;
            cursor: pointer;
            z-index: 10;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.1rem;
            transition: all 0.3s ease;
        `;
        
        // Hacer el contenedor padre relativo si no lo es
        if (getComputedStyle(video.parentElement).position === 'static') {
            video.parentElement.style.position = 'relative';
        }
        
        video.parentElement.appendChild(indicator);
        
        // Manejar clic en el indicador
        indicator.addEventListener('click', () => {
            video.play();
            indicator.remove();
        });
        
        // Ocultar indicador después de 5 segundos
        setTimeout(() => {
            if (indicator.parentElement) {
                indicator.style.opacity = '0';
                setTimeout(() => indicator.remove(), 300);
            }
        }, 5000);
    }
}
