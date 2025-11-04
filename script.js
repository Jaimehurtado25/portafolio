// ============================================
// SCRIPT PRINCIPAL DEL PORTFOLIO
// ============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // MANEJO DEL FORMULARIO DE CONTACTO
    // ============================================
    
    // Obtener el formulario por su ID
    const contactForm = document.getElementById('contactForm');
    
    // Agregar un evento 'submit' al formulario
    contactForm.addEventListener('submit', function(event) {
        // Prevenir el comportamiento por defecto del formulario
        // (evitar que se recargue la página)
        event.preventDefault();
        
        // Obtener los valores de los campos del formulario
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;
        
        // Validar que los campos no estén vacíos
        if (nombre.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Mostrar mensaje en la consola del navegador
        console.log('Formulario enviado correctamente');
        console.log('Datos del formulario:');
        console.log('Nombre:', nombre);
        console.log('Correo:', correo);
        console.log('Mensaje:', mensaje);
        
        // Mostrar mensaje de confirmación al usuario
        alert('¡Mensaje enviado correctamente! Revisa la consola del navegador para ver los detalles.');
        
        // Limpiar el formulario después del envío
        contactForm.reset();
    });
    
    // ============================================
    // MENÚ HAMBURGUESA PARA MÓVILES
    // ============================================
    
    // Obtener el botón del menú hamburguesa y el menú
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Agregar evento de clic al botón hamburguesa
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(event) {
            // Prevenir que el evento se propague
            event.stopPropagation();
            // Alternar la clase 'active' en el menú
            navMenu.classList.toggle('active');
            // Cambiar el ícono del botón
            if (navMenu.classList.contains('active')) {
                navToggle.textContent = '✕';
            } else {
                navToggle.textContent = '☰';
            }
        });
    }
    
    // ============================================
    // SCROLL SUAVE PARA LOS ENLACES DEL MENÚ
    // ============================================
    
    // Obtener todos los enlaces del menú de navegación
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Agregar evento de clic a cada enlace
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Obtener el atributo href del enlace
            const href = this.getAttribute('href');
            
            // Verificar si el enlace es un ancla (comienza con #)
            if (href.startsWith('#')) {
                // Prevenir el comportamiento por defecto
                event.preventDefault();
                
                // Obtener el elemento destino usando el ID
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                // Si el elemento existe, hacer scroll suave hasta él
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            
            // Cerrar el menú móvil después de hacer clic en un enlace
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Restaurar el ícono del botón
                if (navToggle) {
                    navToggle.textContent = '☰';
                }
            }
        });
    });
    
    // Cerrar el menú al hacer clic fuera de él
    if (navMenu && navToggle) {
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                // Restaurar el ícono del botón
                navToggle.textContent = '☰';
            }
        });
        
        // Cerrar el menú al hacer scroll
        window.addEventListener('scroll', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.textContent = '☰';
            }
        });
    }
    
    // ============================================
    // EFECTO DE APARICIÓN EN SCROLL (ANIMACIÓN)
    // ============================================
    
    // Función para observar elementos cuando entran en el viewport
    const observerOptions = {
        threshold: 0.1, // Disparar cuando el 10% del elemento sea visible
        rootMargin: '0px 0px -50px 0px' // Margen adicional
    };
    
    // Crear un IntersectionObserver para animar elementos al hacer scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            // Si el elemento es visible, agregar clase de animación
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar todas las tarjetas de experiencia y proyectos
    const cards = document.querySelectorAll('.experience-card, .project-card, .skill-item');
    
    // Inicializar las tarjetas con opacidad 0 y posición inicial
    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // ============================================
    // BARRA DE PROGRESO DE HABILIDADES (ANIMACIÓN)
    // ============================================
    
    // Función para animar las barras de habilidades cuando son visibles
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                // Obtener el ancho almacenado en el estilo inline
                const width = entry.target.style.width;
                // Reiniciar el ancho y luego animarlo
                entry.target.style.width = '0%';
                setTimeout(function() {
                    entry.target.style.width = width;
                }, 100);
                // Dejar de observar después de la primera animación
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observar todas las barras de habilidades
    skillBars.forEach(function(bar) {
        skillObserver.observe(bar);
    });
    
    // ============================================
    // NAVEGACIÓN FIJADA CON EFECTO DE SCROLL
    // ============================================
    
    // Obtener el elemento de navegación
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    // Agregar evento de scroll para cambiar el estilo de la barra
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Agregar sombra cuando se hace scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Mensaje de bienvenida en la consola
    console.log('%c¡Bienvenido al portafolio de Jaime Alexander Hurtado!', 
                'color: #6366f1; font-size: 16px; font-weight: bold;');
    console.log('%cDesarrollado con HTML, CSS y JavaScript puro.', 
                'color: #ec4899; font-size: 12px;');
});

