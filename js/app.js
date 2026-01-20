// Funcionalidades adicionales del sitio

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos animables cuando se carguen
const observeElements = () => {
    document.querySelectorAll('.article-card, .about-hero, .cta-box').forEach(el => {
        observer.observe(el);
    });
};

// Ejecutar después de cargar contenido
setTimeout(observeElements, 100);

// Filtros de categorías en el blog
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-filter')) {
        // Actualizar botones activos
        document.querySelectorAll('.category-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        const category = e.target.getAttribute('data-category');
        
        // Filtrar artículos usando el atributo data-category
        const articles = document.querySelectorAll('.article-card');
        articles.forEach(article => {
            const articleCategory = article.getAttribute('data-category');
            
            if (category === 'all' || articleCategory === category) {
                article.style.display = 'flex';
            } else {
                article.style.display = 'none';
            }
        });
    }
});

// Prevenir comportamiento por defecto en enlaces #
document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href="#"]');
    if (link && !link.hasAttribute('data-page')) {
        e.preventDefault();
    }
});

// Header scroll effect
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Slider automático con flechas (para múltiples sliders)
window.initArticlesSlider = function() {
    console.log('Inicializando sliders...');
    const sliders = document.querySelectorAll('.articles-slider');
    console.log('Sliders encontrados:', sliders.length);
    
    sliders.forEach((sliderWrapper, sliderIndex) => {
        const slider = sliderWrapper.querySelector('.articles-slider-container');
        const slides = sliderWrapper.querySelectorAll('.article-slide');
        
        console.log(`Slider ${sliderIndex}: ${slides.length} slides`);
        
        if (!slider || slides.length === 0) {
            console.log(`Slider ${sliderIndex} sin contenido`);
            return;
        }
        
        let currentSlide = 0;
        let autoSlideInterval;
        const slideDuration = 25000; // 25 segundos
        
        function getSlidesToShow() {
            // Para el slider de programas, mostrar todos si es posible
            const sliderType = sliderWrapper.getAttribute('data-slider-type');
            if (sliderType === 'programs') {
                if (window.innerWidth >= 1400) return 6;
                if (window.innerWidth >= 1200) return 5;
                if (window.innerWidth >= 1024) return 4;
                if (window.innerWidth >= 768) return 3;
                return 2;
            }
            // Para el slider de artículos destacados, mostrar más tarjetas
            if (sliderType === 'articles') {
                if (window.innerWidth >= 1500) return 6;
                if (window.innerWidth >= 1300) return 5;
                if (window.innerWidth >= 1100) return 4;
                if (window.innerWidth >= 900) return 3;
                if (window.innerWidth >= 768) return 2;
                return 1;
            }
            // Para otros sliders, mantener el comportamiento normal
            if (window.innerWidth >= 1400) return 4;
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }
        
        function goToSlide(index, instant = false) {
            const slidesToShow = getSlidesToShow();
            const totalSlides = slides.length;
            
            // Si hay menos o igual slides que los que se muestran, no navegar
            if (totalSlides <= slidesToShow) {
                currentSlide = 0;
                slider.style.transform = `translateX(0%)`;
                return;
            }
            
            const maxIndex = totalSlides - slidesToShow;
            
            // Lógica circular: cuando llega al final, volver al inicio
            let targetIndex = index;
            if (index < 0) {
                targetIndex = maxIndex;
            } else if (index > maxIndex) {
                targetIndex = 0;
            }
            
            // Asegurar que targetIndex nunca exceda maxIndex para evitar espacios en blanco
            targetIndex = Math.max(0, Math.min(targetIndex, maxIndex));
            currentSlide = targetIndex;
            
            const slideWidth = 100 / slidesToShow;
            const translateX = -(currentSlide * slideWidth);
            
            if (instant) {
                slider.style.transition = 'none';
            } else {
                slider.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            slider.style.transform = `translateX(${translateX}%)`;
        }
        
        function nextSlide() {
            const slidesToShow = getSlidesToShow();
            const totalSlides = slides.length;
            
            if (totalSlides <= slidesToShow) return;
            
            const maxIndex = totalSlides - slidesToShow;
            
            // Circular: cuando llega al final, vuelve al inicio inmediatamente sin mostrar espacios
            if (currentSlide >= maxIndex) {
                // Volver al inicio sin transición para evitar espacios en blanco
                currentSlide = 0;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(0%)`;
                // Forzar reflow para que el cambio sin transición se aplique inmediatamente
                void slider.offsetWidth;
                // Luego restaurar transición para el siguiente movimiento
                setTimeout(() => {
                    slider.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                }, 10);
            } else {
                currentSlide++;
                goToSlide(currentSlide);
            }
        }
        
        function prevSlide() {
            const slidesToShow = getSlidesToShow();
            const totalSlides = slides.length;
            
            if (totalSlides <= slidesToShow) return;
            
            const maxIndex = totalSlides - slidesToShow;
            
            // Circular: cuando está al inicio, va al final inmediatamente
            if (currentSlide <= 0) {
                currentSlide = maxIndex;
            } else {
                currentSlide--;
            }
            goToSlide(currentSlide);
        }
        
        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                console.log(`Slider ${sliderIndex}: Auto-avance`);
                nextSlide();
            }, slideDuration);
        }
        
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }
        
        // Inicializar posición
        goToSlide(0);
        
        // Iniciar slider automático
        startAutoSlide();
        console.log(`Slider ${sliderIndex}: Auto-slide iniciado`);
        
        // Pausar al hover
        sliderWrapper.addEventListener('mouseenter', () => {
            console.log(`Slider ${sliderIndex}: Hover - pausado`);
            stopAutoSlide();
        });
        
        sliderWrapper.addEventListener('mouseleave', () => {
            console.log(`Slider ${sliderIndex}: Hover out - reanudado`);
            startAutoSlide();
        });
        
        // Flechas - click directo con delegación de eventos
        const nextBtn = sliderWrapper.querySelector('.slider-arrow-next');
        const prevBtn = sliderWrapper.querySelector('.slider-arrow-prev');
        
        console.log(`Slider ${sliderIndex}: Flechas encontradas - Next: ${!!nextBtn}, Prev: ${!!prevBtn}`);
        
        if (nextBtn) {
            nextBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Slider ${sliderIndex}: Click en flecha next`);
                nextSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 1000);
            };
        } else {
            console.warn(`Slider ${sliderIndex}: No se encontró botón next`);
        }
        
        if (prevBtn) {
            prevBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Slider ${sliderIndex}: Click en flecha prev`);
                prevSlide();
                stopAutoSlide();
                setTimeout(startAutoSlide, 1000);
            };
        } else {
            console.warn(`Slider ${sliderIndex}: No se encontró botón prev`);
        }
        
        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            stopAutoSlide();
        });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            setTimeout(startAutoSlide, 1000);
        });
        
        // Responsive
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                goToSlide(currentSlide);
            }, 250);
        });
    });
    
    console.log('Sliders inicializados completamente');
}

// FAQ Accordion (global para re-inicialización)
window.initFAQ = function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = question.classList.contains('active');
            
            // Cerrar todos los demás
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.querySelector('.faq-question').classList.remove('active');
                    item.querySelector('.faq-answer').classList.remove('active');
                }
            });
            
            // Toggle el actual
            if (isActive) {
                question.classList.remove('active');
                answer.classList.remove('active');
            } else {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// Cookie Banner
function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('acceptCookies');
    
    if (!banner || !acceptBtn) return;
    
    // Verificar si ya se aceptaron las cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000);
    }
    
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        banner.classList.remove('show');
        setTimeout(() => {
            banner.style.display = 'none';
        }, 400);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    const whatsappBtn = document.getElementById('whatsappButton');
    
    if (!scrollBtn || !whatsappBtn) return;
    
    // Mostrar/ocultar botón scroll según scroll (WhatsApp siempre visible)
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    
    // Scroll suave al hacer click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// WhatsApp Widget
function initWhatsAppWidget() {
    const whatsappBtn = document.getElementById('whatsappButton');
    const whatsappWidget = document.getElementById('whatsappWidget');
    const whatsappClose = document.getElementById('whatsappWidgetClose');
    const whatsappSend = document.getElementById('whatsappWidgetSend');
    const whatsappInput = document.getElementById('whatsappWidgetInput');
    const whatsappOpenApp = document.querySelector('.whatsapp-widget-open-app');
    
    if (!whatsappBtn || !whatsappWidget) return;
    
    const whatsappURL = 'https://KrisKNCreative.short.gy/wp-grupo';
    
    // Abrir widget
    whatsappBtn.addEventListener('click', () => {
        whatsappWidget.classList.add('active');
    });
    
    // Cerrar widget
    whatsappClose.addEventListener('click', () => {
        whatsappWidget.classList.remove('active');
    });
    
    // Enviar mensaje (redirige a WhatsApp comunidad)
    function sendMessage() {
        whatsappInput.value = '';
        whatsappWidget.classList.remove('active');
        window.open(whatsappURL, '_blank');
    }
    
    whatsappSend.addEventListener('click', sendMessage);
    
    whatsappInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Abrir WhatsApp directamente
    if (whatsappOpenApp) {
        whatsappOpenApp.href = whatsappURL;
    }
    
    // Cerrar widget al hacer click fuera
    document.addEventListener('click', (e) => {
        if (whatsappWidget.classList.contains('active') && 
            !whatsappWidget.contains(e.target) && 
            !whatsappBtn.contains(e.target)) {
            whatsappWidget.classList.remove('active');
        }
    });
}

// Sistema de popups flotantes de testimonios
const testimonialMessages = [
    // Mensajes de mujeres sobre programas
    { name: 'María G.', location: 'Bogotá, Colombia', gender: 'F', message: 'Acabo de completar Respira Pro y mi ansiedad ha disminuido increíblemente. La certificación me abrió nuevas oportunidades profesionales.' },
    { name: 'Ana L.', location: 'Medellín, Colombia', gender: 'F', message: 'Tráfico 10K cambió mi negocio. En menos de una semana ya tenía clientes llegando desde Facebook Ads. Totalmente recomendado.' },
    { name: 'Carmen R.', location: 'Cali, Colombia', gender: 'F', message: 'Cejas y Pestañas Pro me permitió montar mi propio negocio desde casa. Ya tengo clientas fijas y estoy generando ingresos constantes.' },
    { name: 'Laura M.', location: 'Buenos Aires, Argentina', gender: 'F', message: 'El Método BARF transformó la salud de mi perro. Ahora tiene más energía y su pelaje está increíble. Vale cada peso invertido.' },
    { name: 'Sofía P.', location: 'Santiago, Chile', gender: 'F', message: 'Master Reels me enseñó a crear contenido que realmente vende. Mis seguidores aumentaron y ahora tengo clientes constantes.' },
    { name: 'Valentina C.', location: 'Lima, Perú', gender: 'F', message: 'Capas Perfectas me dio la técnica que necesitaba para diferenciarme. Mis clientas están encantadas con los resultados.' },
    { name: 'Isabella T.', location: 'Quito, Ecuador', gender: 'F', message: 'SushiMaster fue exactamente lo que buscaba. Ya estoy vendiendo sushi para eventos y la inversión se recuperó rápido.' },
    { name: 'Daniela V.', location: 'Caracas, Venezuela', gender: 'F', message: 'Danza Árabe Terapéutica me ayudó a reconectar conmigo misma y ahora tengo mi propio espacio de clases. Es increíble.' },
    { name: 'Paula H.', location: 'Montevideo, Uruguay', gender: 'F', message: 'El Arte de Cultivar Fortuna me permitió monetizar mi pasión por las plantas. Ya tengo clientes regulares comprando mis suculentas.' },
    { name: 'Andrea Z.', location: 'Bogotá, Colombia', gender: 'F', message: 'Vestir Bien en el Siglo XXI me dio la confianza que necesitaba. Ahora me siento segura en cada reunión importante.' },
    { name: 'Natalia F.', location: 'Medellín, Colombia', gender: 'F', message: 'Airbnb Master me ayudó a rentabilizar mi apartamento. En el primer mes ya tenía más de 15 reservas. Excelente inversión.' },
    { name: 'Camila D.', location: 'Buenos Aires, Argentina', gender: 'F', message: 'Respira Pro no solo mejoró mi bienestar, también me certificó profesionalmente. Ahora ofrezco sesiones de breathwork.' },
    { name: 'Gabriela S.', location: 'Santiago, Chile', gender: 'F', message: 'Con Tráfico 10K aprendí a crear campañas que realmente funcionan. Mi ROI aumentó un 300% en solo dos meses.' },
    { name: 'Mariana A.', location: 'Lima, Perú', gender: 'F', message: 'Cejas y Pestañas Pro me dio todas las herramientas para emprender. Ya tengo mi estudio funcionando y clientas felices.' },
    { name: 'Lucía B.', location: 'Quito, Ecuador', gender: 'F', message: 'El Método BARF cambió completamente la vida de mi gato. Ahora está más saludable y activo que nunca.' },
    { name: 'Elena N.', location: 'Caracas, Venezuela', gender: 'F', message: 'Master Reels me enseñó estrategias que nunca había considerado. Mi contenido ahora tiene mucho más alcance y engagement.' },
    { name: 'Claudia J.', location: 'Montevideo, Uruguay', gender: 'F', message: 'Capas Perfectas me permitió ofrecer un servicio premium. Mis clientas están dispuestas a pagar más por la calidad.' },
    { name: 'Patricia K.', location: 'Bogotá, Colombia', gender: 'F', message: 'SushiMaster me dio la técnica y el conocimiento de negocio. Ya tengo pedidos regulares y estoy pensando en expandir.' },
    { name: 'Rosa L.', location: 'Medellín, Colombia', gender: 'F', message: 'Danza Árabe Terapéutica fue una transformación completa. Ahora tengo mi propio negocio de bienestar holístico.' },
    { name: 'Silvia M.', location: 'Cali, Colombia', gender: 'F', message: 'El Arte de Cultivar Fortuna me mostró cómo monetizar algo que siempre fue mi hobby. Ahora es mi fuente principal de ingresos.' },
    
    // Mensajes de hombres sobre programas
    { name: 'Carlos R.', location: 'Bogotá, Colombia', gender: 'M', message: 'Tráfico 10K me ayudó a escalar mi negocio digital. Las estrategias son prácticas y los resultados se ven rápido.' },
    { name: 'Juan P.', location: 'Medellín, Colombia', gender: 'M', message: 'Lider Master transformó mi forma de liderar equipos. Ahora tengo más confianza y mejores resultados en mi trabajo.' },
    { name: 'Andrés G.', location: 'Buenos Aires, Argentina', gender: 'M', message: 'Master Reels fue clave para mi estrategia de marketing. Aprendí a crear contenido que realmente convierte en ventas.' },
    { name: 'Diego M.', location: 'Santiago, Chile', gender: 'M', message: 'SushiMaster me permitió combinar mi pasión por la cocina con un negocio rentable. Ya tengo clientes regulares.' },
    { name: 'Roberto C.', location: 'Lima, Perú', gender: 'M', message: 'Airbnb Master me ayudó a rentabilizar mi propiedad. El sistema es claro y los resultados llegaron rápido.' },
    { name: 'Fernando L.', location: 'Quito, Ecuador', gender: 'M', message: 'El Arte de Cultivar Fortuna me mostró cómo convertir mi jardín en un negocio. Ya estoy vendiendo plantas regularmente.' },
    { name: 'Miguel A.', location: 'Caracas, Venezuela', gender: 'M', message: 'Vestir Bien en el Siglo XXI me dio la confianza profesional que necesitaba. Ahora me siento más seguro en reuniones importantes.' },
    { name: 'Luis H.', location: 'Montevideo, Uruguay', gender: 'M', message: 'Respira Pro me ayudó a manejar mejor el estrés laboral. La certificación también me abrió nuevas oportunidades.' },
    { name: 'Pedro S.', location: 'Bogotá, Colombia', gender: 'M', message: 'Tráfico 10K me enseñó a crear campañas efectivas sin desperdiciar presupuesto. Mi ROI mejoró significativamente.' },
    { name: 'Jorge T.', location: 'Medellín, Colombia', gender: 'M', message: 'Lider Master cambió mi perspectiva sobre el liderazgo. Ahora gestiono mejor mi equipo y los resultados son evidentes.' },
    { name: 'Ricardo V.', location: 'Buenos Aires, Argentina', gender: 'M', message: 'Master Reels me dio las herramientas para destacar en Instagram. Mi audiencia creció y ahora tengo más clientes.' },
    { name: 'Alberto D.', location: 'Santiago, Chile', gender: 'M', message: 'SushiMaster fue la mejor inversión. Aprendí técnicas profesionales y ahora tengo un negocio funcionando.' },
    { name: 'Eduardo F.', location: 'Lima, Perú', gender: 'M', message: 'Airbnb Master me mostró cómo maximizar mis ingresos. El sistema de gestión es eficiente y ahorra mucho tiempo.' },
    { name: 'Gustavo N.', location: 'Quito, Ecuador', gender: 'M', message: 'El Arte de Cultivar Fortuna me permitió monetizar mi pasión. Ya tengo clientes regulares y estoy pensando en expandir.' },
    { name: 'Óscar J.', location: 'Caracas, Venezuela', gender: 'M', message: 'Vestir Bien en el Siglo XXI me ayudó a proyectar mejor mi imagen profesional. Los resultados se notan inmediatamente.' },
    { name: 'Héctor K.', location: 'Montevideo, Uruguay', gender: 'M', message: 'Respira Pro mejoró mi bienestar y me certificó profesionalmente. Ahora ofrezco sesiones de breathwork.' },
    { name: 'Raúl B.', location: 'Bogotá, Colombia', gender: 'M', message: 'Tráfico 10K me enseñó estrategias que realmente funcionan. Mis campañas ahora tienen mejor rendimiento.' },
    { name: 'Sergio A.', location: 'Medellín, Colombia', gender: 'M', message: 'Lider Master transformó mi forma de trabajar. Ahora tengo más impacto y mejores resultados en mi organización.' },
    { name: 'Mario Z.', location: 'Cali, Colombia', gender: 'M', message: 'Master Reels fue clave para mi estrategia digital. Aprendí a crear contenido que realmente conecta con mi audiencia.' },
    { name: 'Francisco P.', location: 'Buenos Aires, Argentina', gender: 'M', message: 'SushiMaster me dio todo lo necesario para emprender. Ya tengo pedidos regulares y estoy muy satisfecho.' },
    
    // Más mensajes variados de mujeres
    { name: 'Adriana C.', location: 'Bogotá, Colombia', gender: 'F', message: 'La certificación de Respira Pro me abrió puertas que nunca imaginé. Ahora tengo mi propio negocio de bienestar.' },
    { name: 'Beatriz M.', location: 'Medellín, Colombia', gender: 'F', message: 'Tráfico 10K me enseñó a usar Facebook Ads de forma profesional. Mis ventas aumentaron desde la primera semana.' },
    { name: 'Cecilia R.', location: 'Buenos Aires, Argentina', gender: 'F', message: 'Cejas y Pestañas Pro me dio la técnica y el conocimiento de negocio. Ya tengo mi estudio funcionando.' },
    { name: 'Diana L.', location: 'Santiago, Chile', gender: 'F', message: 'El Método BARF mejoró la salud de mi mascota increíblemente. La inversión valió completamente la pena.' },
    { name: 'Esther G.', location: 'Lima, Perú', gender: 'F', message: 'Master Reels transformó mi presencia en Instagram. Ahora tengo más seguidores y más clientes.' },
    { name: 'Florencia H.', location: 'Quito, Ecuador', gender: 'F', message: 'Capas Perfectas me permitió ofrecer un servicio diferenciado. Mis clientas están muy satisfechas.' },
    { name: 'Gloria S.', location: 'Caracas, Venezuela', gender: 'F', message: 'SushiMaster fue exactamente lo que necesitaba. Ya estoy vendiendo sushi y generando ingresos.' },
    { name: 'Helena T.', location: 'Montevideo, Uruguay', gender: 'F', message: 'Danza Árabe Terapéutica me ayudó a reconectar conmigo misma. Ahora tengo mi propio espacio de clases.' },
    { name: 'Irene V.', location: 'Bogotá, Colombia', gender: 'F', message: 'El Arte de Cultivar Fortuna me mostró cómo monetizar mi pasión. Ya tengo clientes regulares.' },
    { name: 'Julia D.', location: 'Medellín, Colombia', gender: 'F', message: 'Vestir Bien en el Siglo XXI me dio la confianza profesional que necesitaba. Los resultados son evidentes.' },
    { name: 'Karina F.', location: 'Buenos Aires, Argentina', gender: 'F', message: 'Airbnb Master me ayudó a rentabilizar mi espacio. El sistema es claro y los resultados llegaron rápido.' },
    { name: 'Liliana N.', location: 'Santiago, Chile', gender: 'F', message: 'Respira Pro mejoró mi bienestar y me certificó. Ahora tengo nuevas oportunidades profesionales.' },
    { name: 'Mónica J.', location: 'Lima, Perú', gender: 'F', message: 'Tráfico 10K me enseñó estrategias prácticas. Mis campañas ahora tienen mejor rendimiento.' },
    { name: 'Natalia K.', location: 'Quito, Ecuador', gender: 'F', message: 'Cejas y Pestañas Pro me permitió montar mi negocio. Ya tengo clientas fijas y estoy muy satisfecha.' },
    { name: 'Olga B.', location: 'Caracas, Venezuela', gender: 'F', message: 'El Método BARF cambió la vida de mi perro. Ahora está más saludable y tiene más energía.' },
    { name: 'Patricia A.', location: 'Montevideo, Uruguay', gender: 'F', message: 'Master Reels me dio las herramientas para destacar. Mi contenido ahora tiene mucho más alcance.' },
    { name: 'Querida Z.', location: 'Bogotá, Colombia', gender: 'F', message: 'Capas Perfectas me dio la técnica que necesitaba. Mis clientas están encantadas con los resultados.' },
    { name: 'Rosa P.', location: 'Medellín, Colombia', gender: 'F', message: 'SushiMaster fue la mejor inversión. Aprendí técnicas profesionales y ahora tengo un negocio funcionando.' },
    { name: 'Sandra C.', location: 'Cali, Colombia', gender: 'F', message: 'Danza Árabe Terapéutica fue una transformación completa. Ahora tengo mi propio negocio de bienestar.' },
    
    // Más mensajes variados de hombres
    { name: 'Alejandro M.', location: 'Bogotá, Colombia', gender: 'M', message: 'Tráfico 10K me ayudó a escalar mi negocio. Las estrategias son prácticas y los resultados se ven rápido.' },
    { name: 'Bruno R.', location: 'Medellín, Colombia', gender: 'M', message: 'Lider Master transformó mi forma de liderar. Ahora tengo más confianza y mejores resultados.' },
    { name: 'César G.', location: 'Buenos Aires, Argentina', gender: 'M', message: 'Master Reels fue clave para mi marketing. Aprendí a crear contenido que realmente convierte.' },
    { name: 'Damián L.', location: 'Santiago, Chile', gender: 'M', message: 'SushiMaster me permitió combinar pasión y negocio. Ya tengo clientes regulares y estoy muy satisfecho.' },
    { name: 'Emilio C.', location: 'Lima, Perú', gender: 'M', message: 'Airbnb Master me mostró cómo maximizar ingresos. El sistema de gestión es eficiente y ahorra tiempo.' },
    { name: 'Fabián H.', location: 'Quito, Ecuador', gender: 'M', message: 'El Arte de Cultivar Fortuna me permitió monetizar mi jardín. Ya estoy vendiendo plantas regularmente.' },
    { name: 'Gonzalo S.', location: 'Caracas, Venezuela', gender: 'M', message: 'Vestir Bien me dio la confianza profesional. Ahora me siento más seguro en reuniones importantes.' },
    { name: 'Hugo T.', location: 'Montevideo, Uruguay', gender: 'M', message: 'Respira Pro mejoró mi bienestar. La certificación también me abrió nuevas oportunidades.' },
    { name: 'Ignacio V.', location: 'Bogotá, Colombia', gender: 'M', message: 'Tráfico 10K me enseñó a crear campañas efectivas. Mi ROI mejoró significativamente.' },
    { name: 'Javier D.', location: 'Medellín, Colombia', gender: 'M', message: 'Lider Master cambió mi perspectiva. Ahora gestiono mejor mi equipo y los resultados son evidentes.' },
    { name: 'Kevin F.', location: 'Buenos Aires, Argentina', gender: 'M', message: 'Master Reels me dio herramientas para destacar. Mi audiencia creció y ahora tengo más clientes.' },
    { name: 'Leandro N.', location: 'Santiago, Chile', gender: 'M', message: 'SushiMaster fue la mejor inversión. Aprendí técnicas profesionales y ahora tengo un negocio.' },
    { name: 'Manuel J.', location: 'Lima, Perú', gender: 'M', message: 'Airbnb Master me mostró cómo rentabilizar. El sistema es claro y los resultados llegaron rápido.' },
    { name: 'Nicolás K.', location: 'Quito, Ecuador', gender: 'M', message: 'El Arte de Cultivar Fortuna me permitió monetizar. Ya tengo clientes regulares y estoy expandiendo.' },
    { name: 'Óscar B.', location: 'Caracas, Venezuela', gender: 'M', message: 'Vestir Bien me ayudó a proyectar mejor. Los resultados se notan inmediatamente.' },
    { name: 'Pablo A.', location: 'Montevideo, Uruguay', gender: 'M', message: 'Respira Pro mejoró mi bienestar. Ahora ofrezco sesiones de breathwork profesionalmente.' },
    { name: 'Quique Z.', location: 'Bogotá, Colombia', gender: 'M', message: 'Tráfico 10K me enseñó estrategias que funcionan. Mis campañas tienen mejor rendimiento ahora.' },
    { name: 'Rafael P.', location: 'Medellín, Colombia', gender: 'M', message: 'Lider Master transformó mi trabajo. Ahora tengo más impacto y mejores resultados.' },
    { name: 'Sebastián C.', location: 'Cali, Colombia', gender: 'M', message: 'Master Reels fue clave para mi estrategia. Aprendí a crear contenido que realmente conecta.' },
    
    // Mensajes sobre certificaciones
    { name: 'María Elena R.', location: 'Bogotá, Colombia', gender: 'F', message: 'La certificación que obtuve me abrió puertas profesionales que nunca imaginé. Totalmente recomendado.' },
    { name: 'Carlos Alberto M.', location: 'Medellín, Colombia', gender: 'M', message: 'Obtener la certificación fue un antes y después en mi carrera. Ahora tengo más oportunidades.' },
    { name: 'Ana Sofía G.', location: 'Buenos Aires, Argentina', gender: 'F', message: 'La certificación me dio la credibilidad que necesitaba. Mis clientes confían más en mi trabajo.' },
    { name: 'Diego Fernando L.', location: 'Santiago, Chile', gender: 'M', message: 'La certificación internacional me permitió expandir mi negocio. Vale completamente la inversión.' },
    { name: 'Laura Patricia C.', location: 'Lima, Perú', gender: 'F', message: 'Estoy muy satisfecha con la certificación. Me dio las herramientas y el reconocimiento que buscaba.' },
    { name: 'Roberto Carlos H.', location: 'Quito, Ecuador', gender: 'M', message: 'La certificación transformó mi perfil profesional. Ahora tengo más clientes y mejores proyectos.' },
    { name: 'Carmen Rosa S.', location: 'Caracas, Venezuela', gender: 'F', message: 'Obtener la certificación fue la mejor decisión. Me abrió nuevas oportunidades de negocio.' },
    { name: 'Juan Pablo T.', location: 'Montevideo, Uruguay', gender: 'M', message: 'La certificación me dio la confianza profesional que necesitaba. Los resultados son evidentes.' },
    { name: 'Sofía Alejandra V.', location: 'Bogotá, Colombia', gender: 'F', message: 'Estoy encantada con la certificación. Me permitió diferenciarme en el mercado.' },
    { name: 'Andrés Felipe D.', location: 'Medellín, Colombia', gender: 'M', message: 'La certificación fue clave para mi crecimiento profesional. Ahora tengo más credibilidad.' },
    
    // Mensajes sobre experiencia general
    { name: 'Valentina Isabel F.', location: 'Buenos Aires, Argentina', gender: 'F', message: 'La experiencia superó todas mis expectativas. Aprendí mucho más de lo que esperaba.' },
    { name: 'Miguel Ángel N.', location: 'Santiago, Chile', gender: 'M', message: 'Excelente experiencia de aprendizaje. El contenido es práctico y los resultados se ven rápido.' },
    { name: 'Isabella María J.', location: 'Lima, Perú', gender: 'F', message: 'Estoy muy agradecida por esta experiencia. Me dio las herramientas para transformar mi negocio.' },
    { name: 'Fernando José K.', location: 'Quito, Ecuador', gender: 'M', message: 'La mejor inversión que he hecho. La experiencia fue completa y los resultados excelentes.' },
    { name: 'Daniela Andrea B.', location: 'Caracas, Venezuela', gender: 'F', message: 'Una experiencia transformadora. Aprendí estrategias que realmente funcionan en el mundo real.' },
    { name: 'Luis Fernando A.', location: 'Montevideo, Uruguay', gender: 'M', message: 'Excelente experiencia. El contenido es de alta calidad y muy aplicable a mi negocio.' },
    { name: 'Paula Andrea Z.', location: 'Bogotá, Colombia', gender: 'F', message: 'Estoy muy satisfecha con la experiencia. Me dio todo lo necesario para tener éxito.' },
    { name: 'Sergio Andrés P.', location: 'Medellín, Colombia', gender: 'M', message: 'Una experiencia increíble. Aprendí técnicas profesionales que aplico todos los días.' },
    { name: 'Camila Estefanía C.', location: 'Cali, Colombia', gender: 'F', message: 'La experiencia fue excelente. Me dio la confianza y las herramientas para emprender.' },
    { name: 'Ricardo Alberto M.', location: 'Buenos Aires, Argentina', gender: 'M', message: 'Excelente experiencia de aprendizaje. Los resultados se notan desde la primera semana.' }
];

let testimonialPopupInterval = null;
let currentTestimonialIndex = 0;

function initFloatingTestimonials() {
    // Limpiar intervalo anterior si existe
    if (testimonialPopupInterval) {
        clearInterval(testimonialPopupInterval);
        testimonialPopupInterval = null;
    }
    
    // Verificar si estamos en la página de inicio
    const navigator = window.navigator;
    const isHomePage = navigator && navigator.currentPage === 'home';
    
    // También verificar por contenido
    const mainContent = document.getElementById('mainContent');
    const hasHeroContent = mainContent && (mainContent.innerHTML.includes('hero') || mainContent.innerHTML.includes('Artículos Destacados'));
    
    if (!isHomePage && !hasHeroContent) {
        // Ocultar popup si existe
        const popupContainer = document.getElementById('floatingTestimonialPopup');
        if (popupContainer) {
            popupContainer.classList.remove('show');
            popupContainer.classList.add('hide');
        }
        return;
    }
    
    // Crear contenedor de popup si no existe
    let popupContainer = document.getElementById('floatingTestimonialPopup');
    if (!popupContainer) {
        popupContainer = document.createElement('div');
        popupContainer.id = 'floatingTestimonialPopup';
        popupContainer.className = 'floating-testimonial-popup';
        document.body.appendChild(popupContainer);
    }
    
    // Mostrar primer popup después de 5 segundos
    setTimeout(() => {
        showNextTestimonial();
    }, 5000);
    
    // Configurar intervalo para mostrar popups cada 25 segundos
    testimonialPopupInterval = setInterval(() => {
        showNextTestimonial();
    }, 25000);
}

function showNextTestimonial() {
    const popupContainer = document.getElementById('floatingTestimonialPopup');
    if (!popupContainer) return;
    
    // Seleccionar mensaje aleatorio
    const randomIndex = Math.floor(Math.random() * testimonialMessages.length);
    const testimonial = testimonialMessages[randomIndex];
    
    // Generar iniciales para el avatar
    const initials = testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    // Generar estrellas (siempre 5 para ser persuasivo)
    const stars = '★★★★★';
    
    // Crear contenido del popup
    popupContainer.innerHTML = `
        <div class="floating-testimonial-popup-header">
            <div class="floating-testimonial-popup-avatar">${initials}</div>
            <div class="floating-testimonial-popup-info">
                <p class="floating-testimonial-popup-name">${testimonial.name}</p>
                <p class="floating-testimonial-popup-location">${testimonial.location}</p>
            </div>
        </div>
        <p class="floating-testimonial-popup-content">${testimonial.message}</p>
        <div class="floating-testimonial-popup-rating">${stars}</div>
    `;
    
    // Mostrar popup
    popupContainer.classList.remove('hide');
    popupContainer.classList.add('show');
    
    // Ocultar después de 5 segundos
    setTimeout(() => {
        popupContainer.classList.remove('show');
        popupContainer.classList.add('hide');
    }, 5000);
}

function stopFloatingTestimonials() {
    if (testimonialPopupInterval) {
        clearInterval(testimonialPopupInterval);
        testimonialPopupInterval = null;
    }
    
    const popupContainer = document.getElementById('floatingTestimonialPopup');
    if (popupContainer) {
        popupContainer.classList.remove('show');
        popupContainer.classList.add('hide');
    }
}

// Función para mostrar/ocultar prueba social en hero
function initHeaderSocialProof() {
    const socialProof = document.getElementById('heroSocialProof');
    if (!socialProof) return;
    
    // Verificar si estamos en la página de inicio
    const navigator = window.navigator;
    const isHomePage = navigator && navigator.currentPage === 'home';
    
    // También verificar por contenido
    const mainContent = document.getElementById('mainContent');
    const hasHeroContent = mainContent && (mainContent.innerHTML.includes('hero') || mainContent.innerHTML.includes('Artículos Destacados'));
    
    // Mostrar solo en la página de inicio
    if (isHomePage || hasHeroContent) {
        socialProof.style.display = 'flex';
    } else {
        socialProof.style.display = 'none';
    }
}

// Inicializar cuando el contenido se carga
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initArticlesSlider();
        initCookieBanner();
        initScrollToTop();
        initWhatsAppWidget();
        initFloatingTestimonials();
        initHeaderSocialProof();
    }, 300);
});

// Re-inicializar después de navegación SPA
const originalPushState = history.pushState;
history.pushState = function() {
    originalPushState.apply(this, arguments);
    setTimeout(() => {
        initArticlesSlider();
        observeElements();
        initSearchFunctionality();
        
        // Inicializar popups y prueba social (las funciones verifican internamente si es home)
        if (typeof initFloatingTestimonials === 'function') {
            initFloatingTestimonials();
        }
        if (typeof initHeaderSocialProof === 'function') {
            initHeaderSocialProof();
        }
    }, 300);
};

// Console log personalizado
console.log('%cKrisKNCreative', 'font-size: 24px; font-weight: bold; color: #3282b8;');
console.log('%c¡Bienvenido al blog! 🚀', 'font-size: 14px; color: #e4e4e4;');

// Ya está incluido arriba

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error detectado:', e.error);
});

// Performance monitoring (opcional)
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.duration > 3000) {
                console.warn('Operación lenta detectada:', entry.name, entry.duration);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['measure', 'navigation'] });
    } catch (e) {
        // Navegador no soporta estas métricas
    }
}

// Sistema de cambio de tema (Claro/Oscuro)
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Cargar tema guardado o usar claro por defecto
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                // Icono de sol para cambiar a claro
                themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><path d="M12 1v6m0 10v6M23 12h-6M7 12H1m18.364-6.364l-4.243 4.243m-8.485 0L4.636 5.636m14.728 12.728l-4.243-4.243m-8.485 0L4.636 18.364"/>';
            } else {
                // Icono de luna para cambiar a oscuro
                themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
            }
        }
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}

// Sistema de búsqueda
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchButton || !searchResults) return;
    
    function performSearch(query) {
        if (!query || query.trim().length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        const searchTerm = query.toLowerCase().trim();
        const results = [];
        
        // Buscar en los artículos
        if (typeof ARTICLES !== 'undefined') {
            Object.keys(ARTICLES).forEach(articleId => {
                const article = ARTICLES[articleId];
                const title = article.title ? article.title.toLowerCase() : '';
                const description = article.description ? article.description.toLowerCase() : '';
                const content = article.content ? article.content.toLowerCase() : '';
                const category = article.category ? article.category.toLowerCase() : '';
                
                // Buscar coincidencias
                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    content.includes(searchTerm) ||
                    category.includes(searchTerm)) {
                    
                    // Calcular relevancia
                    let relevance = 0;
                    if (title.includes(searchTerm)) relevance += 10;
                    if (description.includes(searchTerm)) relevance += 5;
                    if (category.includes(searchTerm)) relevance += 3;
                    if (content.includes(searchTerm)) relevance += 1;
                    
                    results.push({
                        id: articleId,
                        title: article.title,
                        description: article.description || '',
                        category: article.category || '',
                        relevance: relevance
                    });
                }
            });
        }
        
        // Ordenar por relevancia
        results.sort((a, b) => b.relevance - a.relevance);
        
        // Mostrar resultados (máximo 10)
        displayResults(results.slice(0, 10));
    }
    
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-results-empty">No se encontraron resultados</div>';
            searchResults.classList.add('active');
            return;
        }
        
        searchResults.innerHTML = results.map(result => {
            const pageId = result.id.replace('article-', '');
            return `
                <div class="search-result-item" data-page="${pageId}">
                    <h4>${result.title}</h4>
                    <p>${result.description.substring(0, 80)}${result.description.length > 80 ? '...' : ''}</p>
                </div>
            `;
        }).join('');
        
        searchResults.classList.add('active');
        
        // Agregar event listeners a los resultados
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', () => {
                const pageId = item.getAttribute('data-page');
                if (pageId && window.navigator) {
                    window.navigator.loadPage(pageId);
                }
                searchResults.classList.remove('active');
                searchInput.value = '';
                // Cerrar menú móvil si está abierto
                const navMenu = document.getElementById('navMenu');
                const menuToggle = document.getElementById('menuToggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (menuToggle) menuToggle.classList.remove('active');
                }
                // Scroll al top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }
    
    // Event listeners
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length >= 2) {
            performSearch(query);
        } else {
            searchResults.classList.remove('active');
        }
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(searchInput.value);
        }
    });
    
    // Cerrar resultados al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && 
            !searchButton.contains(e.target) && 
            !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
}

// Inicializar búsqueda cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSearch, 100);
    });
} else {
    setTimeout(initSearch, 100);
}

// Slider automático para programas de Universidad.Online
window.initUniversidadSlider = function() {
    const slider = document.querySelector('.universidad-programs-slider');
    if (!slider) return;
    
    const container = slider.querySelector('.universidad-programs-container');
    const slides = container.querySelectorAll('.program-slide');
    const prevBtn = slider.querySelector('.slider-arrow-prev');
    const nextBtn = slider.querySelector('.slider-arrow-next');
    
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + 20; // width + gap
    let autoSlideInterval;
    
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        
        container.scrollTo({
            left: currentIndex * slideWidth,
            behavior: 'smooth'
        });
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 4000); // Cambia cada 4 segundos
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            setTimeout(startAutoSlide, 5000);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            stopAutoSlide();
            setTimeout(startAutoSlide, 5000);
        });
    }
    
    // Pausar al hover
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Iniciar auto-slide
    startAutoSlide();
    
    // Recalcular en resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const newSlideWidth = slides[0].offsetWidth + 20;
            container.scrollTo({
                left: currentIndex * newSlideWidth,
                behavior: 'smooth'
            });
        }, 250);
    });
};

// Sistema de popups de testimonios
window.initTestimonialPopups = function() {
    const testimonials = [
        { name: 'María González', location: 'México', text: 'Ya genero más de $3000 al mes gracias a los programas de Universidad.Online. La mejor inversión que he hecho.', rating: 5, avatar: '👩' },
        { name: 'Carlos Ramírez', location: 'Colombia', text: 'En 3 meses logré cambiar de carrera completamente. Ahora trabajo desde casa y gano el doble.', rating: 5, avatar: '👨' },
        { name: 'Ana Martínez', location: 'España', text: 'Los programas de marketing digital me ayudaron a lanzar mi negocio online. Ya tengo clientes recurrentes.', rating: 5, avatar: '👩' },
        { name: 'Roberto Silva', location: 'Argentina', text: 'La certificación de closer me cambió la vida. Ahora trabajo remoto para empresas internacionales.', rating: 5, avatar: '👨' },
        { name: 'Laura Fernández', location: 'Chile', text: 'Con el programa de barista abrí mi propia cafetería. Los clientes aman el café que preparo.', rating: 5, avatar: '👩' },
        { name: 'Diego Morales', location: 'Perú', text: 'El programa de IA me permitió automatizar mi negocio. Ahorro 20 horas semanales.', rating: 5, avatar: '👨' },
        { name: 'Sofía Herrera', location: 'Ecuador', text: 'Ya tengo mi certificación internacional. Me contrataron en una empresa multinacional.', rating: 5, avatar: '👩' },
        { name: 'Javier López', location: 'Venezuela', text: 'Los programas de negocios me enseñaron a monetizar mi conocimiento. Ya facturo $5000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Carmen Ruiz', location: 'México', text: 'El programa de manicurista me permitió abrir mi propio salón. Tengo lista de espera de clientes.', rating: 5, avatar: '👩' },
        { name: 'Miguel Torres', location: 'Colombia', text: 'Con el programa de YouTube ya tengo 50k suscriptores y monetizo mi canal.', rating: 5, avatar: '👨' },
        { name: 'Patricia Sánchez', location: 'España', text: 'Los programas de desarrollo personal transformaron mi vida. Ahora tengo más confianza y éxito.', rating: 5, avatar: '👩' },
        { name: 'Fernando Castro', location: 'Argentina', text: 'El programa de fotografía me permitió convertir mi hobby en negocio. Ya tengo clientes corporativos.', rating: 5, avatar: '👨' },
        { name: 'Isabel Vargas', location: 'Chile', text: 'Con el programa de asistente virtual trabajo para empresas de Estados Unidos. Gano en dólares.', rating: 5, avatar: '👩' },
        { name: 'Andrés Jiménez', location: 'Perú', text: 'Los programas de negocios digitales me enseñaron a escalar. Ya tengo 3 fuentes de ingresos pasivos.', rating: 5, avatar: '👨' },
        { name: 'Valentina Rojas', location: 'Ecuador', text: 'El programa de copywriting me ayudó a triplicar mis ventas. Ahora trabajo como freelance.', rating: 5, avatar: '👩' },
        { name: 'Ricardo Méndez', location: 'Venezuela', text: 'Con el programa de mecánica abrí mi taller. Ya tengo 5 empleados y facturo $10000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Gabriela Peña', location: 'México', text: 'Los programas de nutrición me ayudaron a certificarme. Ahora tengo mi consultorio online.', rating: 5, avatar: '👩' },
        { name: 'Oscar Díaz', location: 'Colombia', text: 'El programa de trading me enseñó a invertir correctamente. Ya genero ingresos pasivos.', rating: 5, avatar: '👨' },
        { name: 'Daniela Moreno', location: 'España', text: 'Con el programa de florista abrí mi negocio. Los eventos me contratan constantemente.', rating: 5, avatar: '👩' },
        { name: 'Luis Hernández', location: 'Argentina', text: 'Los programas de marketing me permitieron trabajar remoto. Ahora viajo mientras trabajo.', rating: 5, avatar: '👨' },
        { name: 'Andrea Castro', location: 'Chile', text: 'El programa de bartender me cambió la vida. Trabajo en los mejores bares de la ciudad.', rating: 5, avatar: '👩' },
        { name: 'Jorge Mendoza', location: 'Perú', text: 'Con el programa de panadería abrí mi pastelería. Ya tengo 2 sucursales y planeo expandirme.', rating: 5, avatar: '👨' },
        { name: 'Natalia Vega', location: 'Ecuador', text: 'Los programas de desarrollo personal me dieron las herramientas para emprender. Ya tengo mi marca.', rating: 5, avatar: '👩' },
        { name: 'Eduardo Ríos', location: 'Venezuela', text: 'El programa de CCTV me permitió iniciar mi empresa de seguridad. Ya tengo 15 clientes.', rating: 5, avatar: '👨' },
        { name: 'Monica Alvarado', location: 'México', text: 'Con el programa de yoga me certifiqué. Ahora doy clases online y tengo 200 estudiantes.', rating: 5, avatar: '👩' },
        { name: 'Sergio Campos', location: 'Colombia', text: 'Los programas de negocios me enseñaron a crear productos digitales. Ya vendí $20000 en 6 meses.', rating: 5, avatar: '👨' },
        { name: 'Lucía Morales', location: 'España', text: 'El programa de maquillaje me permitió trabajar en producciones. Ya trabajé en 3 películas.', rating: 5, avatar: '👩' },
        { name: 'Raúl Gutiérrez', location: 'Argentina', text: 'Con el programa de diseño gráfico trabajo para clientes internacionales. Gano en euros.', rating: 5, avatar: '👨' },
        { name: 'Paola Rojas', location: 'Chile', text: 'Los programas de finanzas me ayudaron a salir de deudas. Ahora tengo ahorros e inversiones.', rating: 5, avatar: '👩' },
        { name: 'Héctor Silva', location: 'Perú', text: 'El programa de ventas me permitió aumentar mis ingresos 300%. Ahora soy gerente de ventas.', rating: 5, avatar: '👨' },
        { name: 'Claudia Ramírez', location: 'Ecuador', text: 'Con el programa de coaching tengo mi propio negocio. Ya tengo 50 clientes activos.', rating: 5, avatar: '👩' },
        { name: 'Mario Herrera', location: 'Venezuela', text: 'Los programas de tecnología me permitieron trabajar remoto. Ahora vivo donde quiero.', rating: 5, avatar: '👨' },
        { name: 'Rosa Martínez', location: 'México', text: 'El programa de estética me ayudó a abrir mi spa. Ya tengo lista de espera de 2 meses.', rating: 5, avatar: '👩' },
        { name: 'Alberto Fuentes', location: 'Colombia', text: 'Con el programa de construcción trabajo independiente. Ya construí 5 casas este año.', rating: 5, avatar: '👨' },
        { name: 'Teresa López', location: 'España', text: 'Los programas de idiomas me permitieron trabajar como traductora. Gano $4000 mensuales.', rating: 5, avatar: '👩' },
        { name: 'Felipe Cruz', location: 'Argentina', text: 'El programa de electricidad me permitió iniciar mi empresa. Ya tengo 8 empleados.', rating: 5, avatar: '👨' },
        { name: 'Elena Vargas', location: 'Chile', text: 'Con el programa de repostería abrí mi negocio online. Vendo a todo el país por delivery.', rating: 5, avatar: '👩' },
        { name: 'Rodrigo Paredes', location: 'Perú', text: 'Los programas de negocios me enseñaron a escalar. Ya tengo 3 negocios funcionando.', rating: 5, avatar: '👨' },
        { name: 'Beatriz Soto', location: 'Ecuador', text: 'El programa de terapia me permitió certificarme. Ahora tengo mi consultorio y doy sesiones online.', rating: 5, avatar: '👩' },
        { name: 'Gustavo Ríos', location: 'Venezuela', text: 'Con el programa de plomería trabajo independiente. Gano más que en mi trabajo anterior.', rating: 5, avatar: '👨' },
        { name: 'Liliana Torres', location: 'México', text: 'Los programas de negocios digitales me permitieron trabajar desde casa. Ya no dependo de un jefe.', rating: 5, avatar: '👩' },
        { name: 'César Méndez', location: 'Colombia', text: 'El programa de carpintería me permitió abrir mi taller. Ya tengo pedidos para 3 meses.', rating: 5, avatar: '👨' },
        { name: 'Adriana Peña', location: 'España', text: 'Con el programa de diseño de interiores trabajo para hoteles. Ya diseñé 5 proyectos grandes.', rating: 5, avatar: '👩' },
        { name: 'Víctor Díaz', location: 'Argentina', text: 'Los programas de tecnología me permitieron trabajar para startups. Gano $6000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Silvia Castro', location: 'Chile', text: 'El programa de masajes me permitió certificarme. Ahora tengo mi propio spa y 3 terapeutas.', rating: 5, avatar: '👩' },
        { name: 'Armando Ruiz', location: 'Perú', text: 'Con el programa de jardinería trabajo para empresas. Ya tengo 20 clientes corporativos.', rating: 5, avatar: '👨' },
        { name: 'Yolanda Herrera', location: 'Ecuador', text: 'Los programas de desarrollo personal me dieron confianza. Ahora tengo mi propio negocio exitoso.', rating: 5, avatar: '👩' },
        { name: 'René Gutiérrez', location: 'Venezuela', text: 'El programa de soldadura me permitió trabajar en proyectos grandes. Ya gané $15000 este año.', rating: 5, avatar: '👨' },
        { name: 'Diana Morales', location: 'México', text: 'Con el programa de costura abrí mi taller. Ya tengo pedidos de diseñadores reconocidos.', rating: 5, avatar: '👩' },
        { name: 'Óscar Martínez', location: 'Colombia', text: 'Los programas de negocios me enseñaron a crear sistemas. Ya automatizé mi empresa completamente.', rating: 5, avatar: '👨' },
        { name: 'Rebeca Alvarado', location: 'España', text: 'El programa de nutrición me permitió trabajar online. Ya tengo 100 clientes en mi programa.', rating: 5, avatar: '👩' },
        { name: 'Iván Rojas', location: 'Argentina', text: 'Con el programa de tecnología trabajo remoto. Ya no dependo de la ubicación para ganar bien.', rating: 5, avatar: '👨' },
        { name: 'Mariana Fuentes', location: 'Chile', text: 'Los programas de marketing me permitieron trabajar freelance. Ya tengo clientes internacionales.', rating: 5, avatar: '👩' },
        { name: 'Esteban Campos', location: 'Perú', text: 'El programa de construcción me permitió iniciar mi empresa. Ya construí 10 proyectos este año.', rating: 5, avatar: '👨' },
        { name: 'Gloria Soto', location: 'Ecuador', text: 'Con el programa de estética trabajo desde casa. Ya tengo mi propio salón virtual y clientes fijos.', rating: 5, avatar: '👩' },
        { name: 'Arturo Paredes', location: 'Venezuela', text: 'Los programas de negocios me enseñaron a escalar. Ya tengo ingresos pasivos de $2000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Alicia Ríos', location: 'México', text: 'El programa de coaching me permitió certificarme. Ahora tengo mi propio negocio y 30 clientes activos.', rating: 5, avatar: '👩' },
        { name: 'Roberto Torres', location: 'Colombia', text: 'Con el programa de tecnología trabajo para empresas de Silicon Valley. Gano $8000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Carmen Herrera', location: 'España', text: 'Los programas de desarrollo personal me dieron las herramientas. Ahora tengo confianza y éxito en todo.', rating: 5, avatar: '👩' },
        { name: 'Luis Méndez', location: 'Argentina', text: 'El programa de ventas me permitió aumentar mis ingresos 400%. Ahora soy director comercial.', rating: 5, avatar: '👨' },
        { name: 'Patricia Díaz', location: 'Chile', text: 'Con el programa de diseño trabajo freelance. Ya tengo clientes en 5 países diferentes.', rating: 5, avatar: '👩' },
        { name: 'Fernando Castro', location: 'Perú', text: 'Los programas de negocios me enseñaron a crear productos. Ya vendí $30000 en productos digitales.', rating: 5, avatar: '👨' },
        { name: 'Laura Peña', location: 'Ecuador', text: 'El programa de terapia me permitió trabajar online. Ya tengo 80 clientes en mi programa mensual.', rating: 5, avatar: '👩' },
        { name: 'Javier Ruiz', location: 'Venezuela', text: 'Con el programa de tecnología trabajo remoto. Ya no dependo de un lugar fijo para ganar bien.', rating: 5, avatar: '👨' },
        { name: 'Sandra Gutiérrez', location: 'México', text: 'Los programas de marketing me permitieron trabajar freelance. Ya tengo clientes que pagan $5000 por proyecto.', rating: 5, avatar: '👩' },
        { name: 'Ricardo Alvarado', location: 'Colombia', text: 'El programa de construcción me permitió iniciar mi empresa. Ya tengo 12 empleados y facturo $50000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Mónica Campos', location: 'España', text: 'Con el programa de estética trabajo desde casa. Ya tengo mi propio salón virtual con lista de espera.', rating: 5, avatar: '👩' },
        { name: 'Carlos Paredes', location: 'Argentina', text: 'Los programas de negocios me enseñaron a escalar. Ya tengo 4 fuentes de ingresos pasivos funcionando.', rating: 5, avatar: '👨' },
        { name: 'Isabel Ríos', location: 'Chile', text: 'El programa de coaching me permitió certificarme. Ahora tengo mi propio negocio y 40 clientes activos.', rating: 5, avatar: '👩' },
        { name: 'Miguel Torres', location: 'Perú', text: 'Con el programa de tecnología trabajo para empresas internacionales. Gano $7000 mensuales desde casa.', rating: 5, avatar: '👨' },
        { name: 'Ana Herrera', location: 'Ecuador', text: 'Los programas de desarrollo personal me dieron confianza. Ahora tengo éxito en mi carrera y vida personal.', rating: 5, avatar: '👩' },
        { name: 'Roberto Méndez', location: 'Venezuela', text: 'El programa de ventas me permitió aumentar mis ingresos 500%. Ahora soy vicepresidente de ventas.', rating: 5, avatar: '👨' },
        { name: 'Lucía Díaz', location: 'México', text: 'Con el programa de diseño trabajo freelance. Ya tengo clientes en 8 países diferentes pagando en dólares.', rating: 5, avatar: '👩' },
        { name: 'Diego Castro', location: 'Colombia', text: 'Los programas de negocios me enseñaron a crear sistemas. Ya automatizé completamente mi empresa y trabajo 10 horas semanales.', rating: 5, avatar: '👨' },
        { name: 'María Peña', location: 'España', text: 'El programa de terapia me permitió trabajar online. Ya tengo 120 clientes en mi programa mensual de coaching.', rating: 5, avatar: '👩' },
        { name: 'Juan Ruiz', location: 'Argentina', text: 'Con el programa de tecnología trabajo remoto. Ya no dependo de ubicación y gano $9000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Sofía Gutiérrez', location: 'Chile', text: 'Los programas de marketing me permitieron trabajar freelance. Ya tengo clientes que pagan $6000 por proyecto.', rating: 5, avatar: '👩' },
        { name: 'Andrés Alvarado', location: 'Perú', text: 'El programa de construcción me permitió iniciar mi empresa. Ya tengo 15 empleados y facturo $60000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Carolina Campos', location: 'Ecuador', text: 'Con el programa de estética trabajo desde casa. Ya tengo mi propio salón virtual con más de 200 clientes.', rating: 5, avatar: '👩' },
        { name: 'Luis Paredes', location: 'Venezuela', text: 'Los programas de negocios me enseñaron a escalar. Ya tengo 5 fuentes de ingresos pasivos generando $3000 mensuales.', rating: 5, avatar: '👨' },
        { name: 'Valentina Ríos', location: 'México', text: 'El programa de coaching me permitió certificarme. Ahora tengo mi propio negocio y 50 clientes activos pagando mensualmente.', rating: 5, avatar: '👩' },
        { name: 'Sebastián Torres', location: 'Colombia', text: 'Con el programa de tecnología trabajo para empresas de todo el mundo. Gano $10000 mensuales desde cualquier lugar.', rating: 5, avatar: '👨' },
        { name: 'Daniela Herrera', location: 'España', text: 'Los programas de desarrollo personal transformaron mi vida completamente. Ahora tengo éxito en todo lo que hago.', rating: 5, avatar: '👩' },
        { name: 'Felipe Méndez', location: 'Argentina', text: 'El programa de ventas me permitió aumentar mis ingresos 600%. Ahora soy CEO de mi propia empresa de ventas.', rating: 5, avatar: '👨' },
        { name: 'Camila Díaz', location: 'Chile', text: 'Con el programa de diseño trabajo freelance internacional. Ya tengo clientes en 10 países pagando en euros y dólares.', rating: 5, avatar: '👩' },
        { name: 'Gabriel Castro', location: 'Perú', text: 'Los programas de negocios me enseñaron a crear productos digitales. Ya vendí $50000 en productos en los últimos 8 meses.', rating: 5, avatar: '👨' },
        { name: 'Natalia Peña', location: 'Ecuador', text: 'El programa de terapia me permitió trabajar online. Ya tengo 150 clientes en mi programa mensual de bienestar.', rating: 5, avatar: '👩' },
        { name: 'Rodrigo Ruiz', location: 'Venezuela', text: 'Con el programa de tecnología trabajo remoto para empresas globales. Gano $12000 mensuales y vivo donde quiero.', rating: 5, avatar: '👨' },
        { name: 'Andrea Gutiérrez', location: 'México', text: 'Los programas de marketing me permitieron trabajar freelance. Ya tengo clientes que pagan $7000 por proyecto de marketing completo.', rating: 5, avatar: '👩' },
        { name: 'Mauricio Alvarado', location: 'Colombia', text: 'El programa de construcción me permitió iniciar mi empresa. Ya tengo 20 empleados y facturo $80000 mensuales con proyectos en 3 ciudades.', rating: 5, avatar: '👨' },
        { name: 'Paola Campos', location: 'España', text: 'Con el programa de estética trabajo desde casa. Ya tengo mi propio salón virtual con más de 300 clientes fijos y lista de espera.', rating: 5, avatar: '👩' },
        { name: 'Cristian Paredes', location: 'Argentina', text: 'Los programas de negocios me enseñaron a crear sistemas automatizados. Ya tengo 6 fuentes de ingresos pasivos generando $4000 mensuales sin trabajar activamente.', rating: 5, avatar: '👨' },
        { name: 'Fernanda Ríos', location: 'Chile', text: 'El programa de coaching me permitió certificarme internacionalmente. Ahora tengo mi propio negocio con 60 clientes activos pagando mensualmente y trabajando desde cualquier lugar del mundo.', rating: 5, avatar: '👩' }
    ];
    
    let currentPopup = null;
    let popupInterval;
    
    function showRandomTestimonial() {
        // Remover popup anterior si existe
        if (currentPopup) {
            currentPopup.classList.remove('show');
            setTimeout(() => {
                if (currentPopup && currentPopup.parentNode) {
                    currentPopup.parentNode.removeChild(currentPopup);
                }
                currentPopup = null;
            }, 500);
        }
        
        // Seleccionar testimonio aleatorio
        const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
        
        // Crear popup
        const popup = document.createElement('div');
        popup.className = 'testimonial-popup';
        
        const stars = '⭐'.repeat(randomTestimonial.rating);
        
        popup.innerHTML = `
            <div class="testimonial-popup-header">
                <div class="testimonial-popup-avatar" style="background: linear-gradient(135deg, var(--color-accent), var(--color-highlight)); display: flex; align-items: center; justify-content: center; font-size: 24px;">${randomTestimonial.avatar}</div>
                <div class="testimonial-popup-info">
                    <p class="testimonial-popup-name">${randomTestimonial.name}</p>
                    <p class="testimonial-popup-location">${randomTestimonial.location}</p>
                </div>
            </div>
            <p class="testimonial-popup-content">"${randomTestimonial.text}"</p>
            <div class="testimonial-popup-rating">${stars}</div>
        `;
        
        // Popup fijo en la parte inferior izquierda (ya está definido en CSS)
        
        document.body.appendChild(popup);
        currentPopup = popup;
        
        // Mostrar popup
        setTimeout(() => {
            popup.classList.add('show');
        }, 100);
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            popup.classList.remove('show');
            popup.classList.add('hide');
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.parentNode.removeChild(popup);
                }
                currentPopup = null;
            }, 500);
        }, 5000);
    }
    
    // Mostrar primer testimonio después de 25 segundos
    setTimeout(() => {
        showRandomTestimonial();
        
        // Continuar mostrando cada 25 segundos
        popupInterval = setInterval(() => {
            showRandomTestimonial();
        }, 25000);
    }, 25000);
    
    // Limpiar intervalo si se sale de la página
    window.addEventListener('beforeunload', () => {
        if (popupInterval) {
            clearInterval(popupInterval);
        }
    });

// Funciones para el popup de agradecimiento del formulario de contacto
function showThankYouPopup() {
    const popup = document.getElementById('thankYouPopup');
    if (popup) {
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeThankYouPopup() {
    const popup = document.getElementById('thankYouPopup');
    if (popup) {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Hacer las funciones disponibles globalmente
window.showThankYouPopup = showThankYouPopup;
window.closeThankYouPopup = closeThankYouPopup;

// Cerrar popup al hacer clic fuera del contenido
document.addEventListener('click', (e) => {
    const popup = document.getElementById('thankYouPopup');
    if (popup && e.target === popup) {
        closeThankYouPopup();
    }
});
};