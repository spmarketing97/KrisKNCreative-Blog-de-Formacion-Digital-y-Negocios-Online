// Sistema de navegación SPA (Single Page Application)
class SPANavigator {
    constructor() {
        this.currentPage = 'home';
        this.history = ['home']; // Historial de navegación
        this.init();
    }

    init() {
        // Cargar página inicial
        this.loadPage('home');
        
        // Event listeners para navegación
        document.addEventListener('click', (e) => {
            // Botón atrás
            if (e.target.closest('.btn-back') || e.target.closest('[data-action="back"]')) {
                e.preventDefault();
                this.goBack();
                return;
            }
            
            const target = e.target.closest('[data-page]');
            if (target) {
                e.preventDefault();
                const page = target.getAttribute('data-page');
                this.loadPage(page);
                
                // Actualizar nav activo
                this.updateActiveNav(page);
                
                // Cerrar menú móvil si está abierto
                const navMenu = document.getElementById('navMenu');
                const menuToggle = document.getElementById('menuToggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle?.classList.remove('active');
                }
                
                // Scroll al top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });

        // Menu toggle mobile
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Dropdown menu
        const dropdownToggle = document.getElementById('formacionesToggle');
        const dropdown = dropdownToggle?.closest('.dropdown');
        const dropdownLinks = dropdown?.querySelectorAll('.dropdown-link');
        
        dropdownToggle?.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });

        // Cerrar dropdown al hacer click en un enlace del dropdown
        dropdownLinks?.forEach(link => {
            link.addEventListener('click', () => {
                dropdown.classList.remove('active');
            });
        });

        // Cerrar dropdown al hacer click fuera
        document.addEventListener('click', (e) => {
            if (dropdown && !dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }

    updateActiveNav(page) {
        // Remover active de todos los links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Agregar active al link actual
        const activeLink = document.querySelector(`[data-page="${page}"]`);
        if (activeLink && activeLink.classList.contains('nav-link')) {
            activeLink.classList.add('active');
        }
    }

    goBack() {
        if (this.history.length > 1) {
            this.history.pop(); // Eliminar página actual
            const previousPage = this.history[this.history.length - 1];
            this.loadPage(previousPage, false); // false = no añadir al historial
        } else {
            this.loadPage('home', false);
        }
    }

    async loadPage(page, addToHistory = true) {
        const mainContent = document.getElementById('mainContent');
        mainContent.innerHTML = '<div class="loading">Cargando...</div>';
        
        // Añadir al historial si no es navegación hacia atrás
        if (addToHistory && this.history[this.history.length - 1] !== page) {
            this.history.push(page);
        }
        
        try {
            let content = '';
            
            // Debug: log del page recibido para productos
            if (page.startsWith('producto-')) {
                console.log('loadPage - Producto recibido en switch:', page);
            }
            
            switch(page) {
                case 'home':
                    content = this.getHomePage();
                    break;
                case 'about':
                    content = this.getAboutPage();
                    break;
                case 'blog':
                    content = this.getBlogPage();
                    break;
                case 'contacto':
                    content = this.getContactPage();
                    break;
                case 'programas-premium':
                    content = this.getProgramasPremiumPage();
                    break;
                case 'certificaciones':
                    content = this.getCertificacionesPage();
                    break;
                case 'productos':
                    content = this.getProductosPage();
                    break;
                case 'todo-en-uno':
                    content = this.getTodoEnUnoPage();
                    break;
                case 'millonarios-internet-2026':
                    content = this.getMillonariosInternetPage();
                    break;
                case 'agencia':
                    content = this.getAgenciaPage();
                    break;
                case 'marketing-digital':
                    content = this.getMarketingDigitalPage();
                    break;
                case 'negocios-ia':
                    content = this.getNegociosIAPage();
                    break;
                case 'ventas-online':
                    content = this.getVentasOnlinePage();
                    break;
                case 'privacidad':
                    content = this.getPrivacidadPage();
                    break;
                case 'cookies':
                    content = this.getCookiesPage();
                    break;
                case 'aviso-legal':
                    content = this.getAvisoLegalPage();
                    break;
                case 'afiliados':
                    content = this.getAfiliadosPage();
                    break;
                case 'programa-closercamppro':
                    content = this.getArticlePage('programa-closercamppro');
                    break;
                case 'programa-agencia-ia':
                    content = this.getArticlePage('programa-agencia-ia');
                    break;
                case 'programa-expresslaunch':
                    content = this.getArticlePage('article-expresslaunch');
                    break;
                case 'programa-trafico-pago':
                    content = this.getArticlePage('programa-trafico-pago');
                    break;
                case 'programa-cafeterias-rentables':
                    content = this.getArticlePage('article-cafeterias-rentables');
                    break;
                case 'programa-funnelchat':
                    content = this.getArticlePage('article-funnelchat');
                    break;
                case 'programa-monetiza-conocimiento':
                    content = this.getArticlePage('article-monetiza-conocimiento-video');
                    break;
                case 'programa-cafeterias-rentables':
                    content = this.getArticlePage('article-cafeterias-rentables');
                    break;
                case 'programa-reto-21-ia':
                    content = this.getArticlePage('programa-reto-21-ia');
                    break;
                case 'programa-menteceo':
                    content = this.getArticlePage('programa-menteceo');
                    break;
                case 'programa-lean-six-sigma':
                    content = this.getArticlePage('programa-lean-six-sigma');
                    break;
                case 'programa-conexion-parental':
                    content = this.getArticlePage('programa-conexion-parental');
                    break;
                case 'programa-pancake-crm':
                    content = this.getArticlePage('programa-pancake-crm');
                    break;
                case 'programa-servicio-rentable':
                    content = this.getArticlePage('programa-servicio-rentable');
                    break;
                case 'programa-vuelo-fenix':
                    content = this.getArticlePage('programa-vuelo-fenix');
                    break;
                case 'programa-aprende-ingles':
                    content = this.getArticlePage('programa-aprende-ingles');
                    break;
                case 'programa-youtube-mentoring':
                    content = this.getArticlePage('programa-youtube-mentoring');
                    break;
                case 'programa-finanzas-personales':
                    content = this.getArticlePage('programa-finanzas-personales');
                    break;
                case 'programa-cosmetica-negocio':
                    content = this.getArticlePage('programa-cosmetica-negocio');
                    break;
                case 'programa-youtube-mastering':
                    content = this.getArticlePage('programa-youtube-mastering');
                    break;
                case 'programa-estudio-audio-video':
                    content = this.getArticlePage('programa-estudio-audio-video');
                    break;
                case 'programa-comunicacion-intuitiva':
                    content = this.getArticlePage('programa-comunicacion-intuitiva');
                    break;
                case 'programa-negocio-digital-ia':
                    content = this.getArticlePage('programa-negocio-digital-ia');
                    break;
                case 'programa-compra-vende-dubai':
                    content = this.getArticlePage('programa-compra-vende-dubai');
                    break;
                case 'programa-psicobranding':
                    content = this.getArticlePage('programa-psicobranding');
                    break;
                case 'programa-barista-experto':
                    content = this.getArticlePage('programa-barista-experto');
                    break;
                case 'programa-reinicio-post-nido-vacio':
                    content = this.getArticlePage('programa-reinicio-post-nido-vacio');
                    break;
                case 'programa-blacks-university':
                    content = this.getArticlePage('article-blacks-university');
                    break;
                case 'programa-bartender-profesional':
                    content = this.getArticlePage('programa-bartender-profesional');
                    break;
                case 'programa-manicurista-profesional':
                    content = this.getArticlePage('programa-manicurista-profesional');
                    break;
                case 'programa-pet-groomer-profesional':
                    content = this.getArticlePage('programa-pet-groomer-profesional');
                    break;
                case 'cert-barista-experto':
                    content = this.getArticlePage('cert-barista-experto');
                    break;
                case 'cert-pet-groomer-profesional':
                    content = this.getArticlePage('cert-pet-groomer-profesional');
                    break;
                case 'cert-atencion-y-servicio-al-cliente':
                    content = this.getArticlePage('cert-atencion-y-servicio-al-cliente');
                    break;
                case 'cert-produccion-de-contenido-digital':
                    content = this.getArticlePage('cert-produccion-de-contenido-digital');
                    break;
                case 'cert-bartender-profesional':
                    content = this.getArticlePage('cert-bartender-profesional');
                    break;
                case 'cert-closer-de-ventas-digital':
                    content = this.getArticlePage('cert-closer-de-ventas-digital');
                    break;
                case 'cert-floristería-profesional':
                    content = this.getArticlePage('cert-floristería-profesional');
                    break;
                case 'cert-manicurista-profesional':
                    content = this.getArticlePage('cert-manicurista-profesional');
                    break;
                case 'cert-marketer-profesional':
                    content = this.getArticlePage('cert-marketer-profesional');
                    break;
                case 'producto-dinero-24-7-gana-con-camaras-de-seguridad-cctv':
                case 'producto-gana-24-7-con-camaras-de-seguridad':
                case 'producto-seguridad-inteligente-protege-y-vigila':
                    console.log('Switch case encontrado para Dinero 24/7 - Cargando artículo...');
                    content = this.getArticlePage('article-producto-dinero-24-7-gana-con-camaras-de-seguridad-cctv');
                    break;
                case 'producto-costura-que-vende-aprende-y-gana-desde-casa':
                case 'producto-costura-que-vende-gana-desde-casa':
                case 'producto-costura-maestra-crea-con-excelencia':
                    console.log('Switch case encontrado para Costura que Vende');
                    content = this.getArticlePage('article-producto-costura-que-vende-aprende-y-gana-desde-casa');
                    break;
                case 'producto-metodo-garcia-con-ia':
                case 'producto-metodo-garcia-convierte-tu-experiencia-con-ia':
                case 'producto-ia-transformadora-potencia-tu-experiencia':
                case 'producto-metodo-garcia-garantia-accion-resultados-con-inteligencia-artificial':
                    content = this.getArticlePage('article-producto-metodo-garcia-con-ia');
                    break;
                case 'producto-respira-pro':
                case 'producto-respira-pro-domina-el-breathwork':
                case 'producto-respiracion-consciente-sanacion-profunda':
                    content = this.getArticlePage('article-producto-respira-pro');
                    break;
                case 'producto-trafico-10k':
                case 'producto-trafico-10k-aumenta-ventas-en-5-dias':
                case 'producto-trafico-estrategico-conquista-audiencias':
                    content = this.getArticlePage('article-producto-trafico-10k');
                    break;
                case 'producto-cejas-y-pestanas-pro-aprende-y-genera':
                case 'producto-cejas-y-pestanas-pro-genera-ingresos':
                case 'producto-belleza-de-mirada-maestria-en-cejas-y-pestanas':
                    content = this.getArticlePage('article-producto-cejas-y-pestanas-pro-aprende-y-genera');
                    break;
                case 'producto-metodo-barf-bienestar-animal-en-tus-manos':
                case 'producto-metodo-barf-bienestar-animal-real':
                case 'producto-nutricion-animal-natural-bienestar-autentico':
                    content = this.getArticlePage('article-producto-metodo-barf-bienestar-animal-en-tus-manos');
                    break;
                case 'producto-lider-master':
                case 'producto-lider-master-transforma-tu-impacto':
                case 'producto-liderazgo-autentico-inspira-y-transforma':
                    content = this.getArticlePage('article-producto-lider-master');
                    break;
                case 'producto-master-reels-crea-conquista-y-crece':
                case 'producto-master-reels-crea-y-conquista':
                case 'producto-reels-maestros-contenido-que-conquista':
                    content = this.getArticlePage('article-producto-master-reels-crea-conquista-y-crece');
                    break;
                case 'producto-capas-perfectas-tecnica-de-costura-de-extensiones':
                case 'producto-capas-perfectas-extensiones-premium':
                case 'producto-extensiones-perfectas-belleza-natural':
                    content = this.getArticlePage('article-producto-capas-perfectas-tecnica-de-costura-de-extensiones');
                    break;
                case 'producto-sushimaster-de-la-cocina-al-negocio':
                case 'producto-sushi-autentico-arte-culinario-japones':
                    content = this.getArticlePage('article-producto-sushimaster-de-la-cocina-al-negocio');
                    break;
                case 'producto-danza-arabe-terapeutica-vive-de-tu-pasion':
                case 'producto-danza-arabe-vive-de-tu-pasion':
                case 'producto-danza-transformadora-movimiento-y-sanacion':
                    content = this.getArticlePage('article-producto-danza-arabe-terapeutica-vive-de-tu-pasion');
                    break;
                case 'producto-el-arte-de-cultivar-fortuna-monetiza-lo-que-siembras':
                case 'producto-cultiva-fortuna-monetiza-tu-pasion':
                case 'producto-jardineria-consciente-cultiva-tu-pasion':
                    content = this.getArticlePage('article-producto-el-arte-de-cultivar-fortuna-monetiza-lo-que-siembras');
                    break;
                case 'producto-vestir-bien-en-el-siglo-xxi':
                case 'producto-vestir-bien-proyecta-autoridad':
                case 'producto-imagen-poderosa-proyecta-confianza':
                    content = this.getArticlePage('article-producto-vestir-bien-en-el-siglo-xxi');
                    break;
                case 'producto-airbnb-master-convierte-estancias-en-ingresos':
                case 'producto-airbnb-master-convierte-tu-propiedad':
                case 'producto-anfitrion-excepcional-experiencias-memorables':
                    content = this.getArticlePage('article-producto-airbnb-master-convierte-estancias-en-ingresos');
                    break;
                case 'producto-sazon-en-altavoz':
                case 'producto-sazon-en-altavoz-marketing-gastronomico':
                case 'producto-marketing-gastronomico-sazon-digital':
                    content = this.getArticlePage('article-producto-sazon-en-altavoz');
                    break;
                case 'producto-polarizados-para-autos':
                case 'producto-polarizados-pro-crea-tu-negocio':
                case 'producto-polarizado-profesional-tecnica-y-precision':
                    content = this.getArticlePage('article-producto-polarizados-para-autos');
                    break;
                case 'producto-tecnologia-en-endodoncia':
                case 'producto-tecnologia-endodontica-optimiza-tu-practica':
                case 'producto-endodoncia-avanzada-excelencia-clinica':
                    content = this.getArticlePage('article-producto-tecnologia-en-endodoncia');
                    break;
                case 'producto-sleeplab-la-ciencia-del-buen-dormir':
                case 'producto-sleeplab-domina-el-buen-dormir':
                case 'producto-sueno-restaurador-descanso-profundo':
                    content = this.getArticlePage('article-producto-sleeplab-la-ciencia-del-buen-dormir');
                    break;
                case 'producto-fibroblast-lifting-que-factura-conviertelo-en-tu-negocio':
                case 'producto-fibroblast-que-factura-tu-negocio':
                case 'producto-estetica-avanzada-tecnica-fibroblast':
                    content = this.getArticlePage('article-producto-fibroblast-lifting-que-factura-conviertelo-en-tu-negocio');
                    break;
                case 'producto-respira-libre-metodo-buteyko-para-rinitis-y-asma':
                case 'producto-respira-libre-supera-rinitis-y-asma':
                case 'producto-respiracion-libre-supera-limitaciones':
                    content = this.getArticlePage('article-producto-respira-libre-metodo-buteyko-para-rinitis-y-asma');
                    break;
                case 'producto-mantenimientos-pro-gana-con-aires-acondicionados':
                case 'producto-mantenimientos-pro-gana-con-aire-acondicionado':
                case 'producto-climatizacion-profesional-tecnica-especializada':
                    content = this.getArticlePage('article-producto-mantenimientos-pro-gana-con-aires-acondicionados');
                    break;
                case 'producto-capcut-express-edita-publica-y-monetiza':
                case 'producto-capcut-express-edita-y-monetiza':
                case 'producto-edicion-creativa-videos-que-impactan':
                    content = this.getArticlePage('article-producto-capcut-express-edita-publica-y-monetiza');
                    break;
                case 'producto-stop-caida-cabello-fuerte-y-sano':
                case 'producto-stop-caida-recupera-tu-cabello':
                case 'producto-recuperacion-capilar-fortaleza-natural':
                    content = this.getArticlePage('article-producto-stop-caida-cabello-fuerte-y-sano');
                    break;
                case 'producto-monetiza-con-credibilidad-comunicacion-marca-personal':
                case 'producto-monetiza-tu-credibilidad':
                case 'producto-marca-personal-autentica-tu-credibilidad':
                    content = this.getArticlePage('article-producto-monetiza-con-credibilidad-comunicacion-marca-personal');
                    break;
                case 'producto-speaker-master':
                case 'producto-speaker-master-domina-la-oratoria':
                case 'producto-oratoria-poderosa-comunica-con-impacto':
                    content = this.getArticlePage('article-producto-speaker-master');
                    break;
                case 'producto-bartender-pro-mix-de-ganancia':
                case 'producto-cocteleria-maestra-arte-en-cada-copa':
                    content = this.getArticlePage('article-producto-bartender-pro-mix-de-ganancia');
                    break;
                case 'producto-poder-que-factura-domina-la-reparacion-de-herramientas-electricas':
                case 'producto-reparacion-que-factura-herramientas-electricas':
                case 'producto-reparacion-electrica-soluciones-tecnicas':
                    content = this.getArticlePage('article-producto-poder-que-factura-domina-la-reparacion-de-herramientas-electricas');
                    break;
                case 'producto-microdosis-segura-y-efectiva-domina-los-beneficios-de-la-psilocibina':
                case 'producto-microdosis-segura-domina-los-beneficios':
                case 'producto-microdosis-consciente-bienestar-mental':
                    content = this.getArticlePage('article-producto-microdosis-segura-y-efectiva-domina-los-beneficios-de-la-psilocibina');
                    break;
                case 'producto-el-negocio-de-las-pelucas-premium':
                case 'producto-pelucas-premium-tu-negocio':
                case 'producto-pelucas-artesanales-belleza-personalizada':
                    content = this.getArticlePage('article-producto-el-negocio-de-las-pelucas-premium');
                    break;
                case 'producto-tu-marca-natural-shampoos-artesanales':
                case 'producto-tu-marca-natural-shampoos-que-venden':
                case 'producto-cosmética-natural-formulacion-artesanal':
                    content = this.getArticlePage('article-producto-tu-marca-natural-shampoos-artesanales');
                    break;
                case 'producto-comunica-con-impacto-tu-pitch-perfecto':
                case 'producto-pitch-perfecto-comunica-con-impacto':
                case 'producto-presentaciones-poderosas-comunica-con-confianza':
                    content = this.getArticlePage('article-producto-comunica-con-impacto-tu-pitch-perfecto');
                    break;
                case 'producto-cake-rolls-como-oportunidad-de-negocio':
                case 'producto-cake-rolls-pro-tu-negocio-rentable':
                case 'producto-pasteleria-artistica-creatividad-dulce':
                    content = this.getArticlePage('article-producto-cake-rolls-como-oportunidad-de-negocio');
                    break;
                case 'producto-tarot-para-sanar-el-corazon':
                case 'producto-tarot-para-sanar-transforma-tu-corazon':
                case 'producto-tarot-sanador-transformacion-emocional':
                    content = this.getArticlePage('article-producto-tarot-para-sanar-el-corazon');
                    break;
                case 'producto-kundalini-start-tu-iniciacion-en-la-energia-vital':
                case 'producto-kundalini-start-despierta-tu-energia':
                case 'producto-kundalini-despierta-energia-vital':
                    content = this.getArticlePage('article-producto-kundalini-start-tu-iniciacion-en-la-energia-vital');
                    break;
                case 'producto-la-formula-de-la-vitalidad':
                case 'producto-formula-de-la-vitalidad-alivia-el-dolor':
                case 'producto-vitalidad-restaurada-alivio-del-dolor':
                    content = this.getArticlePage('article-producto-la-formula-de-la-vitalidad');
                    break;
                case 'producto-copywriting-escritura-persuasiva-para-vender':
                case 'producto-copywriting-pro-escribe-para-vender':
                case 'producto-copywriting-estrategico-palabras-que-convierten':
                    content = this.getArticlePage('article-producto-copywriting-escritura-persuasiva-para-vender');
                    break;
                case 'producto-barre-fit-tonifica-y-moldea':
                case 'producto-barre-fit-tonifica-en-21-dias':
                case 'producto-barre-fit-transformacion-corporal':
                    content = this.getArticlePage('article-producto-barre-fit-tonifica-y-moldea');
                    break;
                case 'producto-experta-en-extensiones-de-cabello':
                    content = this.getArticlePage('article-producto-cuidado-premium-para-extensiones');
                    break;
                case 'producto-experta-en-extensiones-tu-negocio':
                    content = this.getArticlePage('article-producto-cuidado-premium-para-extensiones');
                    break;
                case 'producto-patronaje-pro-convierte-tu-talento-en-ganancias':
                case 'producto-patronaje-pro-gana-con-tu-talento':
                    content = this.getArticlePage('article-producto-patronaje-pro-convierte-tu-talento-en-ganancias');
                    break;
                case 'producto-guia-para-futuros-tripulantes-de-cabina':
                case 'producto-tripulante-de-cabina-tu-carrera':
                    content = this.getArticlePage('article-producto-guia-para-futuros-tripulantes-de-cabina');
                    break;
                case 'producto-mente-imparable':
                case 'producto-mente-imparable-transforma-tu-exito':
                    content = this.getArticlePage('article-producto-mente-imparable');
                    break;
                case 'producto-tu-marca-de-chocolate-negocio-exitoso-desde-casa':
                case 'producto-chocolate-pro-negocio-desde-casa':
                    content = this.getArticlePage('article-producto-tu-marca-de-chocolate-negocio-exitoso-desde-casa');
                    break;
                case 'producto-experto-en-design-thinking-de-pensamiento-creativo':
                case 'producto-design-thinking-innova-y-factura':
                    content = this.getArticlePage('article-producto-experto-en-design-thinking-de-pensamiento-creativo');
                    break;
                case 'producto-sweetlab-pasteleria-creativa':
                case 'producto-sweetlab-pasteleria-que-vende':
                    content = this.getArticlePage('article-producto-sweetlab-pasteleria-creativa');
                    break;
                case 'producto-guia-renacer-mujer-supera-tu-divorcio':
                case 'producto-renacer-supera-tu-divorcio':
                    content = this.getArticlePage('article-producto-guia-renacer-mujer-supera-tu-divorcio');
                    break;
                case 'producto-s-o-s-sistema-de-optimizacion-del-sueno':
                case 'producto-s-o-s-sueno-duerme-profundamente':
                    content = this.getArticlePage('article-producto-s-o-s-sistema-de-optimizacion-del-sueno');
                    break;
                case 'producto-calma-en-minutos-el-interruptor-del-estres':
                case 'producto-calma-en-minutos-elimina-el-estres':
                    content = this.getArticlePage('article-producto-calma-en-minutos-el-interruptor-del-estres');
                    break;
                case 'producto-moldearte-pro-tu-negocio-de-masajes-desde-cero':
                case 'producto-moldearte-pro-masajes-que-facturan':
                    content = this.getArticlePage('article-producto-moldearte-pro-tu-negocio-de-masajes-desde-cero');
                    break;
                case 'producto-landing-express-lanza-y-vende':
                    content = this.getArticlePage('article-producto-landing-express-lanza-y-vende');
                    break;
                case 'producto-mascotas-naturales-guia-de-alimentacion':
                case 'producto-mascotas-naturales-alimentacion-sana':
                    content = this.getArticlePage('article-producto-mascotas-naturales-guia-de-alimentacion');
                    break;
                case 'producto-tu-mejor-version-21-dias':
                    content = this.getArticlePage('article-producto-tu-mejor-version-21-dias');
                    break;
                case 'producto-lujo-nupcial-diseno-que-factura':
                    content = this.getArticlePage('article-producto-lujo-nupcial-diseno-que-factura');
                    break;
                case 'producto-la-pasteleria-pet':
                case 'producto-pasteleria-pet-snacks-naturales':
                    content = this.getArticlePage('article-producto-la-pasteleria-pet');
                    break;
                case 'producto-psico-marketing-psicologos-y-psiquiatras-que-facturan':
                case 'producto-psico-marketing-llena-tu-consulta':
                    content = this.getArticlePage('article-producto-psico-marketing-psicologos-y-psiquiatras-que-facturan');
                    break;
                case 'producto-metodo-zeren-armoniza-y-expande-tu-energia':
                case 'producto-metodo-zeren-armoniza-tu-energia':
                    content = this.getArticlePage('article-producto-metodo-zeren-armoniza-y-expande-tu-energia');
                    break;
                case 'producto-metodo-deudas-2-0-como-salir-de-deudas':
                case 'producto-deudas-2-0-sal-de-deudas':
                    content = this.getArticlePage('article-producto-metodo-deudas-2-0-como-salir-de-deudas');
                    break;
                case 'producto-sensei-de-la-meditacion':
                case 'producto-sensei-meditacion-domina-y-ensena':
                    content = this.getArticlePage('article-producto-sensei-de-la-meditacion');
                    break;
                case 'producto-vitaliza40-mujer-en-equilibrio':
                case 'producto-vitaliza40-recupera-tu-equilibrio':
                    content = this.getArticlePage('article-producto-vitaliza40-mujer-en-equilibrio');
                    break;
                case 'producto-crea-edita-y-gana-con-davinci':
                case 'producto-davinci-pro-edita-y-gana':
                    content = this.getArticlePage('article-producto-crea-edita-y-gana-con-davinci');
                    break;
                case 'producto-de-invisible-a-imprescindible':
                    content = this.getArticlePage('article-producto-de-invisible-a-imprescindible');
                    break;
                case 'producto-click-pro-conviertete-en-fotografo-profesional':
                case 'producto-click-pro-fotografo-profesional':
                    content = this.getArticlePage('article-producto-click-pro-conviertete-en-fotografo-profesional');
                    break;
                case 'producto-crea-y-vende-jabones-naturales-caninos':
                case 'producto-jabones-naturales-tu-negocio':
                    content = this.getArticlePage('article-producto-crea-y-vende-jabones-naturales-caninos');
                    break;
                case 'producto-negocio-de-la-protesis-capilar':
                case 'producto-protesis-capilar-tu-negocio':
                    content = this.getArticlePage('article-producto-negocio-de-la-protesis-capilar');
                    break;
                case 'producto-habla-bien-comunica-bien':
                    content = this.getArticlePage('article-producto-habla-bien-comunica-bien');
                    break;
                case 'producto-metodo-zeren-respira-y-conecta-con-tu-energia':
                case 'producto-metodo-zeren-respira-y-conecta':
                    content = this.getArticlePage('article-producto-metodo-zeren-respira-y-conecta-con-tu-energia');
                    break;
                case 'producto-photoshop-pro-disena-emprende-y-gana':
                case 'producto-photoshop-pro-disena-y-gana':
                    content = this.getArticlePage('article-producto-photoshop-pro-disena-emprende-y-gana');
                    break;
                case 'producto-diseno-grafico-profesional':
                case 'producto-photoshop-master':
                    content = this.getArticlePage('article-producto-diseno-grafico-profesional');
                    break;
                case 'producto-ugc-pro-crea-conquista-y-cobra':
                case 'producto-ugc-pro-crea-y-cobra':
                    content = this.getArticlePage('article-producto-ugc-pro-crea-conquista-y-cobra');
                    break;
                case 'producto-astrologia-mentor':
                case 'producto-astrologia-mentor-descubre-tu-proposito':
                    content = this.getArticlePage('article-producto-astrologia-mentor');
                    break;
                case 'producto-cuidado-premium-para-extensiones':
                case 'producto-cuidado-premium-extensiones-duraderas':
                    content = this.getArticlePage('article-producto-cuidado-premium-para-extensiones');
                    break;
                case 'producto-de-cero-a-pro-con-lightroom':
                case 'producto-lightroom-pro-de-cero-a-profesional':
                    content = this.getArticlePage('article-producto-de-cero-a-pro-con-lightroom');
                    break;
                case 'producto-mama-vitales':
                case 'producto-mama-vitales-recarga-tu-energia':
                    content = this.getArticlePage('article-producto-mama-vitales');
                    break;
                case 'producto-maquillaje-pro-foto-video':
                    content = this.getArticlePage('article-producto-maquillaje-pro-foto-video');
                    break;
                case 'producto-facturando-con-estilo':
                case 'producto-facturando-con-estilo-tu-negocio':
                    content = this.getArticlePage('article-producto-facturando-con-estilo');
                    break;
                case 'producto-hable-con-poder-en-presentaciones-impactantes':
                case 'producto-habla-con-poder-presentaciones-que-venden':
                    content = this.getArticlePage('article-producto-hable-con-poder-en-presentaciones-impactantes');
                    break;
                case 'producto-illustrator-pro-de-principiante-a-experto':
                case 'producto-illustrator-pro-de-cero-a-experto':
                    content = this.getArticlePage('article-producto-illustrator-pro-de-principiante-a-experto');
                    break;
                case 'producto-mercado-libre-desde-cero-factura-sin-limite':
                case 'producto-mercado-libre-pro-factura-sin-limite':
                    content = this.getArticlePage('article-producto-mercado-libre-desde-cero-factura-sin-limite');
                    break;
                case 'producto-maderoterapia-spa-negocio-exitoso':
                    content = this.getArticlePage('article-producto-maderoterapia-spa-negocio-exitoso');
                    break;
                case 'producto-marketing-digital-de-cero-a-click':
                    content = this.getArticlePage('article-producto-marketing-digital-de-cero-a-click');
                    break;
                case 'producto-mascotas-fit-alimentacion-sana':
                case 'producto-mascotas-fit-alimentacion-natural':
                    content = this.getArticlePage('article-producto-mascotas-fit-nutricion-natural');
                    break;
                default:
                    // Si es un producto, intentar buscar con prefijo "article-"
                    console.log('Switch default - Page recibido:', page);
                    if (page.startsWith('producto-')) {
                        console.log('Switch default - Es un producto, buscando en mapeo...');
                        // Mapeo de nuevos pageId (generados desde títulos optimizados del slider) a articleId existentes
                        const pageIdMapping = {
                            'producto-seguridad-inteligente-protege-y-vigila': 'article-producto-dinero-24-7-gana-con-camaras-de-seguridad-cctv',
                            'producto-costura-maestra-crea-con-excelencia': 'article-producto-costura-que-vende-aprende-y-gana-desde-casa',
                            'producto-ia-transformadora-potencia-tu-experiencia': 'article-producto-metodo-garcia-con-ia',
                            'producto-respiracion-consciente-sanacion-profunda': 'article-producto-respira-pro',
                            'producto-gana-24-7-con-camaras-de-seguridad': 'article-producto-dinero-24-7-gana-con-camaras-de-seguridad-cctv',
                            'producto-costura-que-vende-gana-desde-casa': 'article-producto-costura-que-vende-aprende-y-gana-desde-casa',
                            'producto-metodo-garcia-convierte-tu-experiencia-con-ia': 'article-producto-metodo-garcia-con-ia',
                            'producto-respira-pro-domina-el-breathwork': 'article-producto-respira-pro',
                            'producto-trafico-10k-aumenta-ventas-en-5-dias': 'article-producto-trafico-10k',
                            'producto-cejas-y-pestanas-pro-genera-ingresos': 'article-producto-cejas-y-pestanas-pro-aprende-y-genera',
                            'producto-metodo-barf-bienestar-animal-real': 'article-producto-metodo-barf-bienestar-animal-en-tus-manos',
                            'producto-lider-master-transforma-tu-impacto': 'article-producto-lider-master',
                            'producto-master-reels-crea-y-conquista': 'article-producto-master-reels-crea-conquista-y-crece',
                            'producto-capas-perfectas-extensiones-premium': 'article-producto-capas-perfectas-tecnica-de-costura-de-extensiones',
                            'producto-sushimaster-de-la-cocina-al-negocio': 'article-producto-sushimaster-de-la-cocina-al-negocio',
                            'producto-danza-arabe-vive-de-tu-pasion': 'article-producto-danza-arabe-terapeutica-vive-de-tu-pasion',
                            'producto-cultiva-fortuna-monetiza-tu-pasion': 'article-producto-el-arte-de-cultivar-fortuna-monetiza-lo-que-siembras',
                            'producto-vestir-bien-proyecta-autoridad': 'article-producto-vestir-bien-en-el-siglo-xxi',
                            'producto-airbnb-master-convierte-tu-propiedad': 'article-producto-airbnb-master-convierte-estancias-en-ingresos',
                            'producto-sazon-en-altavoz-marketing-gastronomico': 'article-producto-sazon-en-altavoz',
                            'producto-polarizados-pro-crea-tu-negocio': 'article-producto-polarizados-para-autos',
                            'producto-tecnologia-endodontica-optimiza-tu-practica': 'article-producto-tecnologia-en-endodoncia',
                            'producto-sleeplab-domina-el-buen-dormir': 'article-producto-sleeplab-la-ciencia-del-buen-dormir',
                            'producto-fibroblast-que-factura-tu-negocio': 'article-producto-fibroblast-lifting-que-factura-conviertelo-en-tu-negocio',
                            'producto-respira-libre-supera-rinitis-y-asma': 'article-producto-respira-libre-metodo-buteyko-para-rinitis-y-asma',
                            'producto-mantenimientos-pro-gana-con-aire-acondicionado': 'article-producto-mantenimientos-pro-gana-con-aires-acondicionados',
                            'producto-capcut-express-edita-y-monetiza': 'article-producto-capcut-express-edita-publica-y-monetiza',
                            'producto-stop-caida-recupera-tu-cabello': 'article-producto-stop-caida-cabello-fuerte-y-sano',
                            'producto-monetiza-tu-credibilidad': 'article-producto-monetiza-con-credibilidad-comunicacion-marca-personal',
                            'producto-speaker-master-domina-la-oratoria': 'article-producto-speaker-master',
                            'producto-bartender-pro-mix-de-ganancia': 'article-producto-bartender-pro-mix-de-ganancia',
                            'producto-reparacion-que-factura-herramientas-electricas': 'article-producto-poder-que-factura-domina-la-reparacion-de-herramientas-electricas',
                            'producto-microdosis-segura-domina-los-beneficios': 'article-producto-microdosis-segura-y-efectiva-domina-los-beneficios-de-la-psilocibina',
                            'producto-pelucas-premium-tu-negocio': 'article-producto-el-negocio-de-las-pelucas-premium',
                            'producto-tu-marca-natural-shampoos-que-venden': 'article-producto-tu-marca-natural-shampoos-artesanales',
                            'producto-pitch-perfecto-comunica-con-impacto': 'article-producto-comunica-con-impacto-tu-pitch-perfecto',
                            'producto-cake-rolls-pro-tu-negocio-rentable': 'article-producto-cake-rolls-como-oportunidad-de-negocio',
                            'producto-tarot-para-sanar-transforma-tu-corazon': 'article-producto-tarot-para-sanar-el-corazon',
                            'producto-kundalini-start-despierta-tu-energia': 'article-producto-kundalini-start-tu-iniciacion-en-la-energia-vital',
                            'producto-formula-de-la-vitalidad-alivia-el-dolor': 'article-producto-la-formula-de-la-vitalidad',
                            'producto-copywriting-pro-escribe-para-vender': 'article-producto-copywriting-escritura-persuasiva-para-vender',
                            'producto-barre-fit-tonifica-en-21-dias': 'article-producto-barre-fit-tonifica-y-moldea',
                            'producto-experta-en-extensiones-tu-negocio': 'article-producto-cuidado-premium-para-extensiones',
                            'producto-patronaje-pro-gana-con-tu-talento': 'article-producto-patronaje-pro-convierte-tu-talento-en-ganancias',
                            'producto-tripulante-de-cabina-tu-carrera': 'article-producto-guia-para-futuros-tripulantes-de-cabina',
                            'producto-mente-imparable-transforma-tu-exito': 'article-producto-mente-imparable',
                            'producto-chocolate-pro-negocio-desde-casa': 'article-producto-tu-marca-de-chocolate-negocio-exitoso-desde-casa',
                            'producto-design-thinking-innova-y-factura': 'article-producto-experto-en-design-thinking-de-pensamiento-creativo',
                            'producto-sweetlab-pasteleria-que-vende': 'article-producto-sweetlab-pasteleria-creativa',
                            'producto-renacer-supera-tu-divorcio': 'article-producto-guia-renacer-mujer-supera-tu-divorcio',
                            'producto-s-o-s-sueno-duerme-profundamente': 'article-producto-s-o-s-sistema-de-optimizacion-del-sueno',
                            'producto-calma-en-minutos-elimina-el-estres': 'article-producto-calma-en-minutos-el-interruptor-del-estres',
                            'producto-moldearte-pro-masajes-que-facturan': 'article-producto-moldearte-pro-tu-negocio-de-masajes-desde-cero',
                            'producto-landing-express-lanza-y-vende': 'article-producto-landing-express-lanza-y-vende',
                            'producto-mascotas-naturales-alimentacion-sana': 'article-producto-mascotas-naturales-guia-de-alimentacion',
                            'producto-tu-mejor-version-21-dias': 'article-producto-tu-mejor-version-21-dias',
                            'producto-lujo-nupcial-diseno-que-factura': 'article-producto-lujo-nupcial-diseno-que-factura',
                            'producto-pasteleria-pet-snacks-naturales': 'article-producto-la-pasteleria-pet',
                            'producto-psico-marketing-llena-tu-consulta': 'article-producto-psico-marketing-psicologos-y-psiquiatras-que-facturan',
                            'producto-metodo-zeren-armoniza-tu-energia': 'article-producto-metodo-zeren-armoniza-y-expande-tu-energia',
                            'producto-deudas-2-0-sal-de-deudas': 'article-producto-metodo-deudas-2-0-como-salir-de-deudas',
                            'producto-sensei-meditacion-domina-y-ensena': 'article-producto-sensei-de-la-meditacion',
                            'producto-despertar-espiritual-tu-transformacion': 'article-producto-despertar-espiritual',
                            'producto-familias-que-sanan': 'article-producto-familias-que-sanan',
                            'producto-restaurantes-pro-mesas-llenas': 'article-producto-guia-para-restaurantes-mesas-llenas-caja-llena',
                            'producto-mecanica-que-factura-tu-negocio': 'article-producto-mecanica-que-factura-de-aficionado-a-emprendedor',
                            'producto-vitaliza40-recupera-tu-equilibrio': 'article-producto-vitaliza40-mujer-en-equilibrio',
                            'producto-davinci-pro-edita-y-gana': 'article-producto-crea-edita-y-gana-con-davinci',
                            'producto-de-invisible-a-imprescindible': 'article-producto-de-invisible-a-imprescindible',
                            'producto-click-pro-fotografo-profesional': 'article-producto-click-pro-conviertete-en-fotografo-profesional',
                            'producto-jabones-naturales-tu-negocio': 'article-producto-crea-y-vende-jabones-naturales-caninos',
                            'producto-protesis-capilar-tu-negocio': 'article-producto-negocio-de-la-protesis-capilar',
                            'producto-habla-bien-transforma-tu-comunicacion': 'article-producto-habla-bien-comunica-bien',
                            'producto-metodo-zeren-respira-y-conecta': 'article-producto-metodo-zeren-respira-y-conecta-con-tu-energia',
                            'producto-photoshop-pro-disena-y-gana': 'article-producto-photoshop-pro-disena-emprende-y-gana',
                            'producto-photoshop-pro-disena-emprende-y-gana': 'article-producto-photoshop-pro-disena-emprende-y-gana',
                            'producto-photoshop-master': 'article-producto-diseno-grafico-profesional',
                            'producto-diseno-grafico-profesional': 'article-producto-diseno-grafico-profesional',
                            'producto-ugc-pro-crea-y-cobra': 'article-producto-ugc-pro-crea-conquista-y-cobra',
                            'producto-astrologia-mentor': 'article-producto-astrologia-mentor',
                            'producto-astrologia-mentor-descubre-tu-proposito': 'article-producto-astrologia-mentor',
                            'producto-cuidado-premium-extensiones-duraderas': 'article-producto-cuidado-premium-para-extensiones',
                            'producto-lightroom-pro-de-cero-a-profesional': 'article-producto-de-cero-a-pro-con-lightroom',
                            'producto-mama-vitales-recarga-tu-energia': 'article-producto-mama-vitales',
                            'producto-maquillaje-pro-foto-video': 'article-producto-maquillaje-pro-foto-video',
                            'producto-facturando-con-estilo-tu-negocio': 'article-producto-facturando-con-estilo',
                            'producto-habla-con-poder-presentaciones-que-venden': 'article-producto-hable-con-poder-en-presentaciones-impactantes',
                            'producto-illustrator-pro-de-cero-a-experto': 'article-producto-illustrator-pro-de-principiante-a-experto',
                            'producto-mercado-libre-pro-factura-sin-limite': 'article-producto-mercado-libre-desde-cero-factura-sin-limite',
                            'producto-maderoterapia-spa-negocio-exitoso': 'article-producto-maderoterapia-spa-negocio-exitoso',
                            'producto-marketing-digital-de-cero-a-click': 'article-producto-marketing-digital-de-cero-a-click',
                            'producto-mascotas-fit-alimentacion-natural': 'article-producto-mascotas-fit-nutricion-natural'
                        };
                        
                        // Buscar en el mapeo primero
                        let articleId = pageIdMapping[page];
                        
                        // Debug para todos los productos
                        console.log('Default case - PageId recibido:', page);
                        console.log('Default case - ArticleId del mapeo:', articleId);
                        
                        // Si no está en el mapeo, intentar con prefijo "article-"
                        if (!articleId) {
                            articleId = `article-${page}`;
                            console.log('Default case - ArticleId con prefijo:', articleId);
                        }
                        
                        // Verificar si el artículo existe antes de cargarlo
                        if (typeof ARTICLES !== 'undefined' && ARTICLES[articleId]) {
                            console.log('Default case - Artículo encontrado:', articleId);
                            content = this.getArticlePage(articleId);
                        } else if (typeof ARTICLES !== 'undefined') {
                            console.log('Default case - Artículo NO encontrado con:', articleId);
                            // Si no existe con el ID del mapeo, buscar en todas las claves de ARTICLES
                            const articleKeys = Object.keys(ARTICLES);
                            console.log('Default case - Total artículos disponibles:', articleKeys.length);
                            
                            // Buscar artículo que contenga palabras clave del pageId
                            const pageKeywords = page.replace('producto-', '').split('-').filter(k => k.length > 2);
                            console.log('Default case - Palabras clave buscadas:', pageKeywords);
                            
                            // Buscar artículo que contenga palabras clave del pageId
                            const matchingKey = articleKeys.find(key => {
                                const keyLower = key.toLowerCase();
                                // Buscar coincidencias: el key debe contener varias palabras clave del pageId
                                const matches = pageKeywords.filter(keyword => keyLower.includes(keyword)).length;
                                // Requerir al menos 2 coincidencias y que contenga "producto"
                                return matches >= 2 && keyLower.includes('producto');
                            });
                            
                            if (matchingKey && ARTICLES[matchingKey]) {
                                console.log('Default case - Artículo encontrado por búsqueda:', matchingKey);
                                content = this.getArticlePage(matchingKey);
                            } else {
                                console.log('Default case - No se encontró artículo coincidente, intentando búsqueda más flexible...');
                                // Búsqueda más flexible: buscar por coincidencia parcial
                                const flexibleMatch = articleKeys.find(key => {
                                    const keyLower = key.toLowerCase();
                                    const pageLower = page.toLowerCase().replace('producto-', '');
                                    // Buscar si el pageId contiene palabras importantes del artículo
                                    return keyLower.includes('producto') && (
                                        keyLower.includes('dinero') && pageLower.includes('gana') ||
                                        keyLower.includes('costura') && pageLower.includes('costura') ||
                                        keyLower.includes('garcia') && pageLower.includes('garcia') ||
                                        keyLower.includes('marketing') && pageLower.includes('marketing') ||
                                        keyLower.includes('barf') && pageLower.includes('barf') ||
                                        keyLower.includes('lider') && pageLower.includes('lider') ||
                                        pageKeywords.some(kw => keyLower.includes(kw) && kw.length > 4)
                                    );
                                });
                                
                                if (flexibleMatch && ARTICLES[flexibleMatch]) {
                                    console.log('Default case - Artículo encontrado por búsqueda flexible:', flexibleMatch);
                                    content = this.getArticlePage(flexibleMatch);
                                } else {
                                    console.log('Default case - No se encontró ningún artículo coincidente');
                                    // Si no existe, intentar cargar sin el prefijo (por si acaso)
                                    content = this.getArticlePage(page);
                                }
                            }
                        } else {
                            console.log('Default case - ARTICLES no está definido');
                            // Si no existe, intentar cargar sin el prefijo (por si acaso)
                            content = this.getArticlePage(page);
                        }
                    } else {
                        // Cargar artículo específico
                        content = this.getArticlePage(page);
                    }
            }
            
            mainContent.innerHTML = content;
            mainContent.classList.add('fade-in');
            
            // Re-inicializar event listeners si es necesario
            if (page === 'contacto') {
                this.initContactForm();
            }
            
            // Re-inicializar slider si es home
            if (page === 'home') {
                setTimeout(() => {
                    if (typeof initArticlesSlider === 'function') initArticlesSlider();
                }, 300);
            }
            
            // Inicializar FAQ en todas las páginas que lo contengan (home, productos, etc.)
            setTimeout(() => {
                if (typeof initFAQ === 'function') initFAQ();
            }, 300);
            
            // Siempre inicializar popups y prueba social (verifican internamente si es home)
            setTimeout(() => {
                if (typeof initFloatingTestimonials === 'function') initFloatingTestimonials();
                if (typeof initHeaderSocialProof === 'function') initHeaderSocialProof();
            }, 400);
            
            // Inicializar slider y popups para todo-en-uno
            if (page === 'todo-en-uno') {
                setTimeout(() => {
                    if (typeof initUniversidadSlider === 'function') initUniversidadSlider();
                    if (typeof initTestimonialPopups === 'function') initTestimonialPopups();
                }, 300);
            }
            
            this.currentPage = page;
            
        } catch (error) {
            mainContent.innerHTML = '<div class="error">Error al cargar el contenido</div>';
            console.error('Error loading page:', error);
        }
    }

    getHomePage() {
        return `
            <section class="hero">
                <div class="container">
                    <div class="hero-title-container">
                        <div id="heroSocialProof" class="hero-social-proof">
                            <div class="social-proof-content">
                                <div class="social-proof-avatars">
                                    <div class="social-proof-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">M</div>
                                    <div class="social-proof-avatar" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">A</div>
                                    <div class="social-proof-avatar" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">C</div>
                                    <div class="social-proof-avatar-more">+</div>
                                </div>
                                <div class="social-proof-info">
                                    <span class="social-proof-number">150,000+</span>
                                    <span class="social-proof-stars">★★★★★</span>
                                </div>
                            </div>
                        </div>
                        <h1>Transforma Tu Conocimiento en un Negocio Digital Exitoso</h1>
                    </div>
                    <p>Descubre las mejores formaciones, certificaciones y estrategias para crear tu imperio digital. Aprende de casos reales y aplica las técnicas que están revolucionando el mercado online.</p>
                    <a href="#" data-page="blog" class="btn">Explorar Blog</a>
                    <a href="#" data-page="programas-premium" class="btn btn-secondary">Ver Formaciones</a>
                </div>
            </section>

            ${this.getSliderSection('Artículos Destacados', 'artículos destacados sobre formación digital y negocios online', 'programs', this.getArticlesForSlider())}
            
            ${this.getSliderSection('Programas Premium', 'formaciones de alto nivel para transformar tu carrera digital', 'programs', this.getProgramsForSlider())}
            
            ${this.getSliderSection('Certificaciones Internacionales', 'certificaciones internacionales con reconocimiento global', 'certifications', this.getCertificationsForSlider())}
            
            ${this.getSliderSection('Más Queridos', 'cursos prácticos y accesibles que transforman habilidades en negocios rentables', 'masqueridos', this.getMasQueridosForSlider())}
            
            <!-- FAQ Section -->
            <section class="faq-section" style="padding: 80px 0; background: var(--color-bg-secondary);">
                <div class="container">
                    <div class="section-header" style="text-align: center; margin-bottom: 50px;">
                        <h2 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 16px; color: var(--color-text);">❓ Preguntas Frecuentes</h2>
                        <p style="font-size: 1.2rem; color: var(--color-text-secondary); max-width: 700px; margin: 0 auto;">Resolvemos tus dudas más comunes sobre nuestros programas y formaciones</p>
                    </div>
                    
                    <div class="faq-container" style="max-width: 900px; margin: 0 auto;">
                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Qué incluyen los programas?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>Nuestros programas incluyen acceso completo a contenido especializado, metodologías probadas paso a paso, materiales descargables, acceso permanente de por vida y actualizaciones futuras sin costo adicional. Cada programa está diseñado para que puedas aplicar lo aprendido desde el primer día y generar ingresos reales.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Puedo acceder desde cualquier dispositivo?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>Sí, todos nuestros programas son 100% accesibles desde cualquier dispositivo: ordenador, tablet o móvil. El contenido está optimizado para que puedas aprender desde donde quieras y cuando quieras, adaptándose perfectamente a tu ritmo de vida y responsabilidades.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Necesito experiencia previa para empezar?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>No, nuestros programas están diseñados para todos los niveles. Comenzamos desde lo básico y avanzamos progresivamente, por lo que puedes empezar sin experiencia previa. La metodología es clara, práctica y orientada a resultados, permitiendo que cualquier persona pueda seguir el contenido y aplicar lo aprendido inmediatamente.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Cuánto tiempo tengo acceso al contenido?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>La mayoría de nuestros programas ofrecen acceso vitalicio. Una vez que te inscribes, tendrás acceso permanente al contenido y a todas las actualizaciones futuras sin costos adicionales. Puedes revisar el material las veces que necesites y avanzar a tu propio ritmo sin presión de tiempo.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Hay garantía de reembolso?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>Sí, la mayoría de nuestros programas incluyen garantía de satisfacción. Si no estás conforme con el contenido durante los primeros días después de la compra, puedes solicitar el reembolso completo sin preguntas. Esta garantía demuestra nuestra confianza en la calidad de nuestras formaciones.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Quién es Universidad Online?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p><strong>Universidad.Online®</strong> es un ecosistema de educación online enfocado en cerrar la brecha digital, ofreciendo acceso continuo y flexible a programas y productos digitales desarrollados por expertos profesionales.</p>
                                
                                <p>Lo que hace especial a Universidad.Online® es que contamos con <strong>mentores profesionales</strong> que acompañan tu proceso de aprendizaje, <strong>comunidades activas</strong> donde puedes conectar con otros estudiantes y compartir experiencias, y un enfoque en <strong>aprendizaje práctico y acompañado</strong> que va más allá de simplemente consumir contenido.</p>
                                
                                <p><strong>Las sesiones en vivo se realizan en Telegram</strong>, donde puedes hacer preguntas directamente a los mentores y recibir feedback personalizado. Te recomendamos especialmente unirte a las comunidades para tener acompañamiento continuo durante todo tu proceso de aprendizaje.</p>
                                
                                <p>Puedes acceder a nuestras comunidades y sesiones en vivo a través de estos canales:</p>
                                
                                <div class="social-buttons-container" style="margin-top: 20px; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
                                    <a href="https://go.hotmart.com/G103064932D?ap=ac0f" target="_blank" rel="noopener noreferrer" class="social-button social-telegram">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                                        </svg>
                                        <span>Telegram</span>
                                    </a>
                                    
                                    <a href="https://go.hotmart.com/G103064932D?ap=c765" target="_blank" rel="noopener noreferrer" class="social-button social-skool">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                        </svg>
                                        <span>Skool</span>
                                    </a>
                                    
                                    <a href="https://go.hotmart.com/G103064932D?ap=d836" target="_blank" rel="noopener noreferrer" class="social-button social-zoom">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-2.8 2.8c-.4.4-.4 1.04 0 1.44l2.8 2.8c.4.4 1.04.4 1.44 0l2.8-2.8c.4-.4.4-1.04 0-1.44l-2.8-2.8c-.4-.4-1.04-.4-1.44 0z"/>
                                        </svg>
                                        <span>Zoom</span>
                                    </a>
                                    
                                    <a href="https://go.hotmart.com/G103064932D?ap=887f" target="_blank" rel="noopener noreferrer" class="social-button social-whatsapp">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                        </svg>
                                        <span>WhatsApp</span>
                                    </a>
                                </div>
                                
                                <p>Nuestros programas están certificados por el Centro de Educación y Liderazgo (CEL) y avalados por Florida Global University dentro de su Programa de Educación Continua, cumpliendo estándares internacionales de calidad educativa.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Cómo puedo contactar si tengo dudas?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>Puedes contactarnos a través de nuestra <a href="#" data-page="contacto" style="color: var(--color-accent); text-decoration: underline; font-weight: 600;">página de Contacto</a> o unirte a nuestra comunidad de WhatsApp. También puedes acceder a las sesiones en vivo en Telegram donde los mentores responden preguntas directamente. Estamos disponibles para resolver todas tus dudas y ayudarte en tu proceso de aprendizaje.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Los programas están actualizados con las últimas tendencias?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>Sí, nuestros programas se actualizan constantemente para incluir las últimas técnicas, herramientas y tendencias del mercado. Los estudiantes tienen acceso a todas las actualizaciones sin costo adicional, asegurando que siempre tengas acceso al conocimiento más actualizado y relevante para tu desarrollo profesional.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Puedo aplicar lo aprendido inmediatamente?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>Absolutamente. Nuestros programas están diseñados con un enfoque práctico y aplicable desde el primer día. Cada lección incluye ejercicios, proyectos y casos reales que puedes implementar inmediatamente. La metodología está orientada a resultados, no solo a teoría, por lo que verás resultados tangibles desde las primeras semanas.</p>
                            </div>
                        </div>

                        <div class="faq-item">
                            <div class="faq-question">
                                <span>¿Qué diferencia estos programas de otros en el mercado?</span>
                                <svg class="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M6 9l6 6 6-6"/>
                                </svg>
                            </div>
                            <div class="faq-answer">
                                <p>Lo que diferencia nuestros programas es la combinación de contenido práctico probado, acceso a mentores profesionales, comunidades activas de aprendizaje, certificaciones reconocidas internacionalmente, y un enfoque en resultados reales. No solo aprendes teoría, desarrollas habilidades aplicables que te permiten generar ingresos y transformar tu situación profesional desde el primer día.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    getAboutPage() {
        return `
            <section class="about-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="about-hero">
                        <div class="about-image">
                            <img src="IMG/SOBRE MI.png" alt="Kristian Krasimirov - Fundador de KrisKNCreative">
                        </div>
                        <div class="about-content">
                            <h1>De Repartidor a Emprendedor Digital</h1>
                            <p>Durante más de 7 años, recorrí las calles entregando paquetes, vendiendo mi tiempo por dinero. Cada día era el mismo: largas jornadas, cansancio físico y la sensación de estar atrapado en un ciclo sin salida.</p>
                            <p>Un día me pregunté: <strong>¿Y si pudiera ayudar a miles de personas sin estar limitado por las horas del día?</strong> Esa pregunta cambió todo.</p>
                            <p>Decidí dar el salto al mundo digital. No fue fácil. Invertí noches enteras aprendiendo sobre negocios online, marketing digital, formación y creación de contenido. Pero cada pequeño logro me acercaba más a mi libertad.</p>
                            <p>Hoy, a través de <strong>KrisKNCreative</strong>, ayudo a personas como tú a descubrir las mejores formaciones y estrategias para construir tu propio negocio digital, sin importar de dónde partas.</p>
                        </div>
                    </div>

                    <div class="about-mission">
                        <h2>Mi Misión</h2>
                        <p>Quiero que descubras que tu conocimiento, tu experiencia y tus habilidades tienen un valor inmenso. Mi misión es mostrarte el camino más directo hacia tu transformación digital, compartiendo las formaciones, herramientas y estrategias que realmente funcionan.</p>
                        <p>No más vender tu tiempo. Es hora de construir un negocio que te dé libertad, ingresos escalables y la vida que mereces.</p>
                        <p><strong>Si yo pude hacerlo desde cero, tú también puedes.</strong></p>
                    </div>
                </div>
            </section>
        `;
    }

    getBlogPage() {
        return `
            <section class="blog-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="blog-header">
                        <h1>📚 Blog de Formación Digital: Estrategias y Guías para Construir Tu Negocio Online</h1>
                        <p class="programs-subtitle">Descubre artículos, guías y recursos especializados sobre formación digital y negocios online. Aprende de casos reales, estrategias probadas y las técnicas que están revolucionando el mercado digital en 2026.</p>
                    </div>

                    <div class="blog-categories">
                        <button class="category-filter active" data-category="all">Todos</button>
                        <button class="category-filter" data-category="marketing">Marketing Digital</button>
                        <button class="category-filter" data-category="ia">Inteligencia Artificial</button>
                        <button class="category-filter" data-category="ventas">Ventas Online</button>
                        <button class="category-filter" data-category="certificaciones">Certificaciones</button>
                        <button class="category-filter" data-category="casos">Casos de Éxito</button>
                    </div>

                    <div class="articles-grid">
                        ${this.getAllArticlesCards()}
                    </div>
                </div>
            </section>
        `;
    }

    getAllArticlesCards() {
        // Obtener artículos automáticamente del objeto ARTICLES
        if (typeof ARTICLES === 'undefined') {
            return '';
        }

        const articles = [];
        Object.keys(ARTICLES).forEach(key => {
            const article = ARTICLES[key];
            
            // Incluir SOLO artículos del blog (guías y pasos a paso)
            // NO incluir Programas Premium ni Más Queridos en el blog
            if (article.category === 'Blog') {
                const blogCategory = article.blogCategory || 'all';
                const categoryNames = {
                    'marketing': 'Marketing Digital',
                    'ia': 'Inteligencia Artificial',
                    'ventas': 'Ventas Online',
                    'certificaciones': 'Certificaciones',
                    'casos': 'Casos de Éxito',
                    'all': 'Blog'
                };
                articles.push({
                    category: categoryNames[blogCategory] || 'Blog',
                    filterCategory: blogCategory,
                    title: article.title,
                    excerpt: article.description || article.title.substring(0, 100) + '...',
                    page: key
                });
            }
        });

        return articles.map(article => `
            <article class="article-card" data-category="${article.filterCategory}">
                <div class="article-card-header">
                    <span class="article-category">${article.category}</span>
                    <h3>${article.title}</h3>
                    <p>${article.excerpt}</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="${article.page}" class="btn">Leer Artículo</a>
                </div>
            </article>
        `).join('');
    }

    getContactPage() {
        return `
            <section class="contact-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="contact-container">
                        <div class="contact-header">
                            <h1>Contacto</h1>
                            <p>¿Tienes alguna pregunta? Estoy aquí para ayudarte</p>
                        </div>

                        <form class="contact-form" id="contactForm" action="https://formsubmit.co/solucionesworld2016@gmail.com" method="POST" target="_blank">
                            <input type="hidden" name="_subject" value="KrisKNCreativeAgency - Formulario de Contacto">
                            <input type="hidden" name="_captcha" value="false">
                            <input type="hidden" name="_template" value="table">
                            <input type="hidden" name="_next" value="">
                            <input type="hidden" name="_autoresponse" value="Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.">
                            
                            <div class="form-group">
                                <label for="nombre">Nombre y Apellidos *</label>
                                <input type="text" id="nombre" name="nombre" required>
                            </div>

                            <div class="form-group">
                                <label for="email">Su Mejor E-Mail *</label>
                                <input type="email" id="email" name="email" required>
                            </div>

                            <div class="form-group">
                                <label for="whatsapp">WhatsApp (Opcional)</label>
                                <input type="text" id="whatsapp" name="whatsapp" placeholder="Ej: +57 300 123 4567">
                            </div>

                            <div class="form-group">
                                <label for="mensaje">Mensaje para enviarnos la consulta *</label>
                                <textarea id="mensaje" name="mensaje" required></textarea>
                            </div>

                            <div class="form-submit">
                                <button type="submit" class="btn">Enviar Mensaje</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }

    initContactForm() {
        const form = document.getElementById('contactForm');

        form?.addEventListener('submit', (e) => {
            // Validar que los campos requeridos estén llenos
            const nombre = form.querySelector('#nombre').value.trim();
            const email = form.querySelector('#email').value.trim();
            const mensaje = form.querySelector('#mensaje').value.trim();
            
            if (!nombre || !email || !mensaje) {
                e.preventDefault();
                return false;
            }
            
            // Formatear el mensaje para incluir WhatsApp si está presente
            const whatsapp = form.querySelector('#whatsapp').value.trim();
            const mensajeCompleto = whatsapp 
                ? `${mensaje}\n\n---\nWhatsApp: ${whatsapp}`
                : mensaje;
            
            // Actualizar el campo de mensaje con el formato completo
            form.querySelector('#mensaje').value = mensajeCompleto;
            
            // Envío silencioso - resetear formulario sin mostrar popup
            setTimeout(() => {
                form.reset();
            }, 100);
            
            // Permitir que el formulario se envíe normalmente a FormSubmit
            return true;
        });
    }

    // Las siguientes funciones retornan el contenido de cada página
    // Continuaré con las páginas de formaciones...
    
    getProgramasPremiumPage() {
        return `
            <section class="blog-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="blog-header">
                        <h1>🚀 Programas Premium: La Ruta Directa Hacia Tu Transformación Digital</h1>
                        <p class="programs-subtitle">Descubre los mejores programas premium diseñados para transformar tu carrera digital. Metodologías probadas, certificaciones internacionales y el conocimiento que necesitas para generar ingresos elevados trabajando desde cualquier lugar del mundo.</p>
                    </div>
                    <div class="articles-grid">
                        ${this.getProgramasPremiumArticles()}
                    </div>
                </div>
            </section>
        `;
    }

    getProgramasPremiumArticles() {
        const programas = [
            { 
                subtitle: 'Factura Mínimo 300 Dólares Semanales',
                title: '⚫ Blacks.University', 
                description: 'Comienza a vender hoy mismo más de 1.500 productos digitales de Hotmart. Acceso de por vida a mentorías en vivo, estrategias probadas y franquicia de Universidad.Online.',
                page: 'programa-blacks-university' 
            },
            { 
                subtitle: 'Lanzamiento Exitoso de Productos',
                title: '🚀 ExpressLaunch', 
                description: 'Sistema completo para lanzar tu producto digital con resultados garantizados. De cero a tu primer lanzamiento exitoso.',
                page: 'programa-expresslaunch' 
            },
            { 
                subtitle: 'Monetiza Tu Experiencia',
                title: '🎥 Monetiza tu Conocimiento en Video', 
                description: 'Transforma tu conocimiento en productos digitales rentables. Crea cursos en video y genera ingresos pasivos.',
                page: 'programa-monetiza-conocimiento' 
            },
            { 
                subtitle: 'Modelo de Negocio Exitoso',
                title: '☕ Cafeterías Rentables', 
                description: 'Con Nino Scarpato. Aprende el modelo de negocio probado para crear y gestionar cafeterías altamente rentables.',
                page: 'programa-cafeterias-rentables' 
            },
            { 
                subtitle: 'Para Instituciones Educativas',
                title: '💬 Funnelchat', 
                description: 'Sistema completo de comunicación y ventas para instituciones educativas. Automatiza procesos y aumenta conversiones.',
                page: 'programa-funnelchat' 
            },
            { 
                subtitle: 'Contenido con Inteligencia Artificial',
                title: '🤖 Reto 21 Días IA', 
                description: 'Domina la creación de contenido usando inteligencia artificial. Transforma tu productividad en 21 días.',
                page: 'programa-reto-21-ia' 
            },
            { 
                subtitle: 'Liderazgo y Mentalidad',
                title: '👔 MenteCEO', 
                description: 'Con Melissa Ospina. Desarrolla la mentalidad y habilidades de liderazgo necesarias para construir un negocio exitoso.',
                page: 'programa-menteceo' 
            },
            { 
                subtitle: 'Domina el Tráfico Pagado',
                title: '📊 Tráfico de Pago', 
                description: 'Aprende a generar tráfico de calidad con Facebook Ads y Google Ads. Optimiza tus campañas y maximiza tu ROI.',
                page: 'programa-trafico-pago' 
            },
            { 
                subtitle: 'De White a Black Belt',
                title: '⚙️ Lean Six Sigma', 
                description: 'Metodología probada para mejorar procesos y aumentar la eficiencia. Certificación internacional incluida.',
                page: 'programa-lean-six-sigma' 
            },
            { 
                subtitle: 'Vínculos Fuertes y Sanos',
                title: '👨‍👩‍👧 Conexión Parental', 
                description: 'Aprende a crear vínculos fuertes y sanos con tus hijos. Estrategias prácticas para una crianza efectiva.',
                page: 'programa-conexion-parental' 
            },
            { 
                subtitle: 'Multiplataforma para Restaurantes',
                title: '🍽️ Pancake CRM', 
                description: 'Sistema CRM completo para restaurantes, bares, discotecas y cafeterías. Gestiona tu negocio de forma eficiente.',
                page: 'programa-pancake-crm' 
            },
            { 
                subtitle: 'Experiencias Memorables',
                title: '⭐ Servicio Rentable', 
                description: 'Con Carlos Julio Ramírez. Aprende a ganar dinero creando experiencias memorables para tus clientes.',
                page: 'programa-servicio-rentable' 
            },
            { 
                subtitle: 'Tranquilidad Después de Crisis',
                title: '🔥 El Vuelo Del Fénix', 
                description: 'Con Liliana Escobar. Encuentra la tranquilidad después de una crisis emocional. Herramientas de recuperación.',
                page: 'programa-vuelo-fenix' 
            },
            { 
                subtitle: 'Método Efectivo de Aprendizaje',
                title: '🌍 Aprende Inglés Engly', 
                description: 'Método innovador y efectivo para aprender inglés. Domina el idioma de forma natural y práctica.',
                page: 'programa-aprende-ingles' 
            },
            { 
                subtitle: 'Tier 1 - Con Carlos Hidalgo',
                title: '📺 YouTube Mentoring', 
                description: 'Mentoría personalizada para construir y monetizar tu canal de YouTube. Estrategias avanzadas de crecimiento.',
                page: 'programa-youtube-mentoring' 
            },
            { 
                subtitle: 'Manejo del Dinero para Mujeres',
                title: '💳 Finanzas Personales', 
                description: 'Aprende a manejar tus finanzas personales de forma efectiva. Especialmente diseñado para mujeres casadas y divorciadas.',
                page: 'programa-finanzas-personales' 
            },
            { 
                subtitle: 'Oportunidad de Trabajo y Emprendimiento',
                title: '💅 Cosmética como Negocio', 
                description: 'Descubre cómo convertir la cosmética en una oportunidad de negocio rentable. Modelo de negocio probado.',
                page: 'programa-cosmetica-negocio' 
            },
            { 
                subtitle: 'Certificación Internacional en Ventas Digitales',
                title: '💰 CloserCampPro', 
                description: 'Conviértete en un closer profesional y genera ingresos elevados trabajando de forma remota. Certificación internacional incluida.',
                page: 'programa-closercamppro' 
            },
            { 
                subtitle: 'Construye Tu Agencia Digital',
                title: '🤖 Agencia con IA', 
                description: 'Crea y escala una agencia de servicios con inteligencia artificial. Metodología probada para facturar 5 y 6 cifras.',
                page: 'programa-agencia-ia' 
            },
            { 
                subtitle: 'Con Juan Esteban Conde',
                title: '🎬 YouTube Video Mastery', 
                description: 'Estrategias avanzadas para crear videos profesionales y monetizar tu canal de YouTube de forma efectiva.',
                page: 'programa-youtube-mastering' 
            },
            { 
                subtitle: 'Profesional en Casa',
                title: '🎙️ Estudio Audio Video', 
                description: 'Con Kike Cadena. Monta tu estudio profesional de audio y video en casa. Equipamiento y técnicas profesionales.',
                page: 'programa-estudio-audio-video' 
            },
            { 
                subtitle: 'El Arte de Conectar',
                title: '🗣️ Comunicación Intuitiva', 
                description: 'Desarrolla habilidades de comunicación intuitiva para conectar mejor con tus clientes y audiencia.',
                page: 'programa-comunicacion-intuitiva' 
            },
            { 
                subtitle: 'Con Kike Cadena',
                title: '🚀 Tu Negocio Digital con IA', 
                description: 'Construye tu negocio digital utilizando inteligencia artificial. Estrategias y herramientas para automatizar y escalar.',
                page: 'programa-negocio-digital-ia' 
            },
            { 
                subtitle: 'Con Marco Serna',
                title: '🏢 Compra y Vende Dubái', 
                description: 'Aprende a comprar y vender propiedades en Dubái. Oportunidades de inversión inmobiliaria en el mercado emiratí.',
                page: 'programa-compra-vende-dubai' 
            },
            { 
                subtitle: 'Con Paulo Restrepo',
                title: '🧠 Psicobranding', 
                description: 'Combina psicología y branding para crear marcas poderosas que conecten emocionalmente con tu audiencia.',
                page: 'programa-psicobranding' 
            },
            { 
                subtitle: 'Con Antonio Naranjo',
                title: '🍸 Bartender Profesional', 
                description: 'Domina el arte de la coctelería profesional. Certificación internacional para convertirte en bartender experto.',
                page: 'programa-bartender-profesional' 
            },
            { 
                subtitle: 'Certificación Profesional',
                title: '💅 Manicurista Profesional', 
                description: 'Curso completo de manicura y pedicura profesional. Certificación internacional para destacar en el sector de belleza.',
                page: 'programa-manicurista-profesional' 
            },
            { 
                subtitle: 'Con Fabio Ernesto Gómez',
                title: '🐕 Pet Groomer Profesional', 
                description: 'Aprende técnicas profesionales de peluquería canina. Certificación internacional para trabajar con mascotas.',
                page: 'programa-pet-groomer-profesional' 
            },
            { 
                subtitle: 'Certificación Internacional',
                title: '☕ Barista Experto', 
                description: 'Domina el arte del café de especialidad. Programa integral para convertirte en barista profesional certificado.',
                page: 'programa-barista-experto' 
            },
            { 
                subtitle: 'Transición y Nuevo Proyecto de Vida',
                title: '🦋 Reinicio Post-Nido Vacío', 
                description: 'Programa de mentoría premium para mujeres 50-60 años. Redefine tu identidad y construye un proyecto de vida auténtico después de que tus hijos han dejado el hogar.',
                page: 'programa-reinicio-post-nido-vacio' 
            }
        ];

        return programas.map(p => `
            <article class="program-card">
                <div class="program-card-header">
                    <span class="program-subtitle">${p.subtitle}</span>
                    <h3>${p.title}</h3>
                    <p>${p.description}</p>
                </div>
                <div class="program-card-footer">
                    <a href="#" data-page="${p.page}" class="btn">Ver Programa</a>
                </div>
            </article>
        `).join('');
    }

    getCertificacionesPage() {
        return `
            <section class="blog-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="blog-header">
                        <h1>🎓 Certificaciones Internacionales: Tu Credencial Global para el Éxito Profesional</h1>
                        <p class="programs-subtitle">Obtén títulos reconocidos globalmente en alianza con Florida Global University. Certificaciones que abren puertas en cualquier parte del mundo y validan tu competencia profesional con estándares internacionales.</p>
                    </div>
                    <div class="articles-grid">
                        ${this.getCertificacionesArticles()}
                    </div>
                </div>
            </section>
        `;
    }

    getCertificacionesArticles() {
        const certs = [
            {
                emoji: '☕',
                title: 'Barista Experto',
                excerpt: 'Domina el arte del café de especialidad con certificación internacional',
                page: 'cert-barista-experto'
            },
            {
                emoji: '🐕',
                title: 'Pet Groomer Profesional',
                excerpt: 'Conviértete en estilista de mascotas certificado globalmente',
                page: 'cert-pet-groomer-profesional'
            },
            {
                emoji: '🎯',
                title: 'Servicio al Cliente',
                excerpt: 'La ventaja competitiva definitiva que nadie podrá copiar',
                page: 'cert-atencion-y-servicio-al-cliente'
            },
            {
                emoji: '📱',
                title: 'Contenido Digital',
                excerpt: 'Crea contenido profesional que conecta y convierte audiencias',
                page: 'cert-produccion-de-contenido-digital'
            },
            {
                emoji: '🍸',
                title: 'Bartender Profesional',
                excerpt: 'Maestro de la coctelería con reconocimiento internacional',
                page: 'cert-bartender-profesional'
            },
            {
                emoji: '💰',
                title: 'Closer de Ventas',
                excerpt: 'Vende alto ticket desde cualquier lugar del mundo',
                page: 'cert-closer-de-ventas-digital'
            },
            {
                emoji: '🌸',
                title: 'Floristería Profesional',
                excerpt: 'Arte floral profesional con validación global',
                page: 'cert-floristería-profesional'
            },
            {
                emoji: '💅',
                title: 'Manicurista Profesional',
                excerpt: 'Experto certificado en belleza y cuidado de uñas',
                page: 'cert-manicurista-profesional'
            },
            {
                emoji: '📊',
                title: 'Marketer Profesional',
                excerpt: 'Estrategias digitales probadas que generan resultados reales',
                page: 'cert-marketer-profesional'
            }
        ];

        return certs.map(cert => `
            <article class="article-card">
                <div class="article-card-header">
                    <span class="article-category">Certificación Internacional</span>
                    <h3>${cert.emoji} ${cert.title}</h3>
                    <p>${cert.excerpt}</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="${cert.page}" class="btn">Ver Certificación</a>
                </div>
            </article>
        `).join('');
    }

    getProductosPage() {
        return `
            <section class="blog-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="blog-header">
                        <h1>❤️ Más Queridos: Cursos Prácticos que Transforman Habilidades en Negocios Rentables</h1>
                        <p class="programs-subtitle">Accede a cursos prácticos y accesibles que transforman habilidades en negocios rentables. Aprende a tu ritmo con acceso de por vida y comienza a generar ingresos desde el primer día con formaciones probadas y resultados garantizados.</p>
                    </div>

                    <div class="blog-categories">
                        <button class="category-filter active" data-category="all">Todos</button>
                        <button class="category-filter" data-category="salud-bienestar">Salud y Bienestar</button>
                        <button class="category-filter" data-category="belleza-estetica">Belleza y Estética</button>
                        <button class="category-filter" data-category="gastronomia">Gastronomía</button>
                        <button class="category-filter" data-category="tecnologia-marketing">Tecnología y Marketing</button>
                        <button class="category-filter" data-category="negocios-emprendimiento">Negocios y Emprendimiento</button>
                        <button class="category-filter" data-category="arte-creatividad">Arte y Creatividad</button>
                        <button class="category-filter" data-category="mascotas">Mascotas</button>
                        <button class="category-filter" data-category="desarrollo-personal">Desarrollo Personal</button>
                        <button class="category-filter" data-category="servicios-profesionales">Servicios Profesionales</button>
                    </div>

                    <div class="articles-grid">
                        ${this.getProductosArticles()}
                    </div>
                </div>
            </section>
        `;
    }

    getProductosArticles() {
        const productos = [
            '📹 Gana 24/7 con Cámaras de Seguridad',
            '✂️ Costura que Vende: Gana desde Casa',
            '🤖 Método García: Convierte tu Experiencia con IA',
            '🌬️ Respira Pro: Domina el Breathwork',
            '📊 Tráfico 10K: Aumenta Ventas en 5 Días',
            '👁️ Cejas y Pestañas Pro: Genera Ingresos',
            '🥩 Método BARF: Bienestar Animal Real',
            '👔 Lider Master: Transforma tu Impacto',
            '📹 Master Reels: Crea y Conquista',
            '✨ Capas Perfectas: Extensiones Premium',
            '🍱 SushiMaster: De la Cocina al Negocio',
            '💃 Danza Árabe: Vive de tu Pasión',
            '🌱 Cultiva Fortuna: Monetiza tu Pasión',
            '👔 Vestir Bien: Proyecta Autoridad',
            '🏠 Airbnb Master: Convierte tu Propiedad',
            '🎙️ Sazón en Altavoz: Marketing Gastronómico',
            '🚗 Polarizados Pro: Crea tu Negocio',
            '🦷 Tecnología Endodóntica: Optimiza tu Práctica',
            '😴 SleepLab: Domina el Buen Dormir',
            '✨ Fibroblast que Factura: Tu Negocio',
            '🌬️ Respira Libre: Supera Rinitis y Asma',
            '❄️ Mantenimientos Pro: Gana con Aire Acondicionado',
            '📱 CapCut Express: Edita y Monetiza',
            '💇 Stop Caída: Recupera tu Cabello',
            '💼 Monetiza tu Credibilidad',
            '🎤 Speaker Master: Domina la Oratoria',
            '🍸 Bartender Pro: Mix de Ganancia',
            '⚡ Reparación que Factura: Herramientas Eléctricas',
            '🍄 Microdosis Segura: Domina los Beneficios',
            '💇 Pelucas Premium: Tu Negocio',
            '🧴 Tu Marca Natural: Shampoos que Venden',
            '🎤 Pitch Perfecto: Comunica con Impacto',
            '🧁 Cake Rolls Pro: Tu Negocio Rentable',
            '🔮 Tarot para Sanar: Transforma tu Corazón',
            '🧘 Kundalini Start: Despierta tu Energía',
            '⚡ Fórmula de la Vitalidad: Alivia el Dolor',
            '✍️ Copywriting Pro: Escribe para Vender',
            '💃 Barre Fit: Tonifica en 21 Días',
            '💇 Experta en Extensiones: Tu Negocio',
            '✂️ Patronaje Pro: Gana con tu Talento',
            '✈️ Tripulante de Cabina: Tu Carrera',
            '🧠 Mente Imparable: Transforma tu Éxito',
            '🍫 Chocolate Pro: Negocio desde Casa',
            '💡 Design Thinking: Innova y Factura',
            '🍰 SweetLab: Pastelería que Vende',
            '💖 RENACER: Supera tu Divorcio',
            '😴 S.O.S Sueño: Duerme Profundamente',
            '🧘 Calma en Minutos: Elimina el Estrés',
            '💆 Moldearte Pro: Masajes que Facturan',
            '🚀 Landing Express: Lanza y Vende',
            '🐕 Mascotas Naturales: Alimentación Sana',
            '✨ Tu Mejor Versión: 21 Días',
            '👰 Lujo Nupcial: Diseño que Factura',
            '🐾 Pastelería PET: Snacks Naturales',
            '🧠 PSICO-MARKETING: Llena tu Consulta',
            '🧘 Método Zeren: Armoniza tu Energía',
            '💳 Deudas 2.0: Sal de Deudas',
            '🌟 Despertar Espiritual: Tu Transformación',
            '👨‍👩‍👧 Familias que Sanan',
            '🔧 Mecánica que Factura: Tu Negocio',
            '🎬 DaVinci Pro: Edita y Gana',
            '📸 Click Pro: Fotógrafo Profesional',
            '🧼 Jabones Naturales: Tu Negocio',
            '👤 Prótesis Capilar: Tu Negocio',
            '🧘 Método Zeren: Respira y Conecta',
            '🎨 Photoshop PRO: Diseña y Gana',
            '📱 UGC PRO: Crea y Cobra',
            '⭐ Astrología Mentor: Descubre tu Propósito',
            '💁 Cuidado Premium: Extensiones Duraderas',
            '📸 Lightroom Pro: De Cero a Profesional',
            '🤰 Mamá Vitales: Recarga tu Energía',
            '💄 Maquillaje Pro: Foto & Video',
            '👗 Facturando con Estilo: Tu Negocio',
            '🎤 Habla con Poder: Presentaciones que Venden',
            '🎨 Illustrator Pro: De Cero a Experto',
            '🛒 Mercado Libre Pro: Factura Sin Límite',
            '💆 Maderoterapia Spa: Negocio Exitoso',
            '📊 Marketing Digital: De Cero a Click',
            '🐾 MASCOTAS FIT: Alimentación Natural'
        ];

        // Mapeo de títulos mejorados: más cortos, directos y persuasivos
        const titulosMejorados = {
            '📹 Gana 24/7 con Cámaras de Seguridad': '📹 Seguridad Inteligente',
            '✂️ Costura que Vende: Gana desde Casa': '✂️ Costura Maestra',
            '🤖 Método García: Convierte tu Experiencia con IA': '🤖 IA Transformadora',
            '🌬️ Respira Pro: Domina el Breathwork': '🌬️ Respiración Consciente',
            '📊 Tráfico 10K: Aumenta Ventas en 5 Días': '📊 Tráfico Estratégico',
            '👁️ Cejas y Pestañas Pro: Genera Ingresos': '👁️ Belleza de Mirada',
            '🥩 Método BARF: Bienestar Animal Real': '🥩 Nutrición Animal Natural',
            '👔 Lider Master: Transforma tu Impacto': '👔 Liderazgo Auténtico',
            '📹 Master Reels: Crea y Conquista': '📹 Reels Maestros',
            '✨ Capas Perfectas: Extensiones Premium': '✨ Extensiones Perfectas',
            '🍱 SushiMaster: De la Cocina al Negocio': '🍱 Sushi Auténtico',
            '💃 Danza Árabe: Vive de tu Pasión': '💃 Danza Transformadora',
            '🌱 Cultiva Fortuna: Monetiza tu Pasión': '🌱 Jardinería Consciente',
            '👔 Vestir Bien: Proyecta Autoridad': '👔 Imagen Poderosa',
            '🏠 Airbnb Master: Convierte tu Propiedad': '🏠 Anfitrión Excepcional',
            '🎙️ Sazón en Altavoz: Marketing Gastronómico': '🎙️ Marketing Gastronómico',
            '🚗 Polarizados Pro: Crea tu Negocio': '🚗 Polarizado Profesional',
            '🦷 Tecnología Endodóntica: Optimiza tu Práctica': '🦷 Endodoncia Avanzada',
            '😴 SleepLab: Domina el Buen Dormir': '😴 Sueño Restaurador',
            '✨ Fibroblast que Factura: Tu Negocio': '✨ Estética Avanzada',
            '🌬️ Respira Libre: Supera Rinitis y Asma': '🌬️ Respiración Libre',
            '❄️ Mantenimientos Pro: Gana con Aire Acondicionado': '❄️ Climatización Profesional',
            '📱 CapCut Express: Edita y Monetiza': '📱 Edición Creativa',
            '💇 Stop Caída: Recupera tu Cabello': '💇 Recuperación Capilar',
            '💼 Monetiza tu Credibilidad': '💼 Marca Personal Auténtica',
            '🎤 Speaker Master: Domina la Oratoria': '🎤 Oratoria Poderosa',
            '🍸 Bartender Pro: Mix de Ganancia': '🍸 Coctelería Maestra',
            '⚡ Reparación que Factura: Herramientas Eléctricas': '⚡ Reparación Eléctrica',
            '🍄 Microdosis Segura: Domina los Beneficios': '🍄 Microdosis Consciente',
            '💇 Pelucas Premium: Tu Negocio': '💇 Pelucas Artesanales',
            '🧴 Tu Marca Natural: Shampoos que Venden': '🧴 Cosmética Natural',
            '🎤 Pitch Perfecto: Comunica con Impacto': '🎤 Presentaciones Poderosas',
            '🧁 Cake Rolls Pro: Tu Negocio Rentable': '🧁 Pastelería Artística',
            '🔮 Tarot para Sanar: Transforma tu Corazón': '🔮 Tarot Sanador',
            '🧘 Kundalini Start: Despierta tu Energía': '🧘 Kundalini Despierta',
            '⚡ Fórmula de la Vitalidad: Alivia el Dolor': '⚡ Vitalidad Restaurada',
            '✍️ Copywriting Pro: Escribe para Vender': '✍️ Copywriting Estratégico',
            '💃 Barre Fit: Tonifica en 21 Días': '💃 Barre Fit',
            '💇 Experta en Extensiones: Tu Negocio': '💇 Extensiones Expertas',
            '✂️ Patronaje Pro: Gana con tu Talento': '✂️ Patronaje Profesional',
            '✈️ Tripulante de Cabina: Tu Carrera': '✈️ Tripulante de Cabina',
            '🧠 Mente Imparable: Transforma tu Éxito': '🧠 Mentalidad Ganadora',
            '🍫 Chocolate Pro: Negocio desde Casa': '🍫 Chocolatería Artesanal',
            '💡 Design Thinking: Innova y Factura': '💡 Design Thinking',
            '🍰 SweetLab: Pastelería que Vende': '🍰 Pastelería Creativa',
            '💖 RENACER: Supera tu Divorcio': '💖 Renacimiento Personal',
            '😴 S.O.S Sueño: Duerme Profundamente': '😴 Sueño Restaurado',
            '🧘 Calma en Minutos: Elimina el Estrés': '🧘 Calma Instantánea',
            '💆 Moldearte Pro: Masajes que Facturan': '💆 Masaje Moldeador',
            '🚀 Landing Express: Lanza y Vende': '🚀 Landing Pages Poderosas',
            '🐕 Mascotas Naturales: Alimentación Sana': '🐕 Nutrición Canina Natural',
            '✨ Tu Mejor Versión: 21 Días': '✨ Transformación Femenina',
            '👰 Lujo Nupcial: Diseño que Factura': '👰 Diseño Nupcial',
            '🐾 Pastelería PET: Snacks Naturales': '🐾 Pastelería para Mascotas',
            '🧠 PSICO-MARKETING: Llena tu Consulta': '🧠 Psico-Marketing',
            '🧘 Método Zeren: Armoniza tu Energía': '🧘 Armonía Energética',
            '💳 Deudas 2.0: Sal de Deudas': '💳 Libertad Financiera',
            '🌟 Despertar Espiritual: Tu Transformación': '🌟 Despertar Espiritual',
            '👨‍👩‍👧 Familias que Sanan': '👨‍👩‍👧 Sanación Familiar',
            '🔧 Mecánica que Factura: Tu Negocio': '🔧 Mecánica Profesional',
            '🎬 DaVinci Pro: Edita y Gana': '🎬 Edición Profesional',
            '📸 Click Pro: Fotógrafo Profesional': '📸 Fotografía Profesional',
            '🧼 Jabones Naturales: Tu Negocio': '🧼 Jabones Naturales',
            '👤 Prótesis Capilar: Tu Negocio': '👤 Prótesis Capilar',
            '🧘 Método Zeren: Respira y Conecta': '🧘 Conexión Energética',
            '🎨 Photoshop PRO: Diseña y Gana': '🎨 Diseño Gráfico Profesional',
            '📱 UGC PRO: Crea y Cobra': '📱 Contenido Auténtico',
            '⭐ Astrología Mentor: Descubre tu Propósito': '⭐ Astrología Consciente',
            '💁 Cuidado Premium: Extensiones Duraderas': '💁 Cuidado Premium',
            '🤰 Mamá Vitales: Recarga tu Energía': '🤰 Energía Maternal',
            '💄 Maquillaje Pro: Foto & Video': '💄 Maquillaje Profesional',
            '👗 Facturando con Estilo: Tu Negocio': '👗 Estilismo Profesional',
            '🎤 Habla con Poder: Presentaciones que Venden': '🎤 Presentaciones Poderosas',
            '🎨 Illustrator Pro: De Cero a Experto': '🎨 Illustrator Master',
            '🛒 Mercado Libre Pro: Factura Sin Límite': '🛒 E-commerce Exitoso',
            '💆 Maderoterapia Spa: Negocio Exitoso': '💆 Maderoterapia Profesional',
            '📊 Marketing Digital: De Cero a Click': '📊 Marketing Digital Estratégico',
            '🐾 MASCOTAS FIT: Alimentación Natural': '🐾 Nutrición Mascotas'
        };

        // Mapeo de categorías para cada producto
        const categoriasProductos = {
            '📹 Gana 24/7 con Cámaras de Seguridad': 'servicios-profesionales',
            '✂️ Costura que Vende: Gana desde Casa': 'arte-creatividad',
            '🤖 Método García: Convierte tu Experiencia con IA': 'tecnologia-marketing',
            '🌬️ Respira Pro: Domina el Breathwork': 'salud-bienestar',
            '📊 Tráfico 10K: Aumenta Ventas en 5 Días': 'tecnologia-marketing',
            '👁️ Cejas y Pestañas Pro: Genera Ingresos': 'belleza-estetica',
            '🥩 Método BARF: Bienestar Animal Real': 'mascotas',
            '👔 Lider Master: Transforma tu Impacto': 'negocios-emprendimiento',
            '📹 Master Reels: Crea y Conquista': 'tecnologia-marketing',
            '✨ Capas Perfectas: Extensiones Premium': 'belleza-estetica',
            '🍱 SushiMaster: De la Cocina al Negocio': 'gastronomia',
            '💃 Danza Árabe: Vive de tu Pasión': 'arte-creatividad',
            '🌱 Cultiva Fortuna: Monetiza tu Pasión': 'arte-creatividad',
            '👔 Vestir Bien: Proyecta Autoridad': 'negocios-emprendimiento',
            '🏠 Airbnb Master: Convierte tu Propiedad': 'negocios-emprendimiento',
            '🎙️ Sazón en Altavoz: Marketing Gastronómico': 'gastronomia',
            '🚗 Polarizados Pro: Crea tu Negocio': 'servicios-profesionales',
            '🦷 Tecnología Endodóntica: Optimiza tu Práctica': 'servicios-profesionales',
            '😴 SleepLab: Domina el Buen Dormir': 'salud-bienestar',
            '✨ Fibroblast que Factura: Tu Negocio': 'belleza-estetica',
            '🌬️ Respira Libre: Supera Rinitis y Asma': 'salud-bienestar',
            '❄️ Mantenimientos Pro: Gana con Aire Acondicionado': 'servicios-profesionales',
            '📱 CapCut Express: Edita y Monetiza': 'tecnologia-marketing',
            '💇 Stop Caída: Recupera tu Cabello': 'salud-bienestar',
            '💼 Monetiza tu Credibilidad': 'negocios-emprendimiento',
            '🎤 Speaker Master: Domina la Oratoria': 'negocios-emprendimiento',
            '🍸 Bartender Pro: Mix de Ganancia': 'gastronomia',
            '⚡ Reparación que Factura: Herramientas Eléctricas': 'servicios-profesionales',
            '🍄 Microdosis Segura: Domina los Beneficios': 'salud-bienestar',
            '💇 Pelucas Premium: Tu Negocio': 'belleza-estetica',
            '🧴 Tu Marca Natural: Shampoos que Venden': 'belleza-estetica',
            '🎤 Pitch Perfecto: Comunica con Impacto': 'negocios-emprendimiento',
            '🧁 Cake Rolls Pro: Tu Negocio Rentable': 'gastronomia',
            '🔮 Tarot para Sanar: Transforma tu Corazón': 'desarrollo-personal',
            '🧘 Kundalini Start: Despierta tu Energía': 'desarrollo-personal',
            '⚡ Fórmula de la Vitalidad: Alivia el Dolor': 'salud-bienestar',
            '✍️ Copywriting Pro: Escribe para Vender': 'tecnologia-marketing',
            '💃 Barre Fit: Tonifica en 21 Días': 'salud-bienestar',
            '💇 Experta en Extensiones: Tu Negocio': 'belleza-estetica',
            '✂️ Patronaje Pro: Gana con tu Talento': 'arte-creatividad',
            '✈️ Tripulante de Cabina: Tu Carrera': 'negocios-emprendimiento',
            '🧠 Mente Imparable: Transforma tu Éxito': 'desarrollo-personal',
            '🍫 Chocolate Pro: Negocio desde Casa': 'gastronomia',
            '💡 Design Thinking: Innova y Factura': 'negocios-emprendimiento',
            '🍰 SweetLab: Pastelería que Vende': 'gastronomia',
            '💖 RENACER: Supera tu Divorcio': 'desarrollo-personal',
            '😴 S.O.S Sueño: Duerme Profundamente': 'salud-bienestar',
            '🧘 Calma en Minutos: Elimina el Estrés': 'salud-bienestar',
            '💆 Moldearte Pro: Masajes que Facturan': 'salud-bienestar',
            '🚀 Landing Express: Lanza y Vende': 'tecnologia-marketing',
            '🐕 Mascotas Naturales: Alimentación Sana': 'mascotas',
            '✨ Tu Mejor Versión: 21 Días': 'desarrollo-personal',
            '👰 Lujo Nupcial: Diseño que Factura': 'arte-creatividad',
            '🐾 Pastelería PET: Snacks Naturales': 'mascotas',
            '🧠 PSICO-MARKETING: Llena tu Consulta': 'negocios-emprendimiento',
            '🧘 Método Zeren: Armoniza tu Energía': 'salud-bienestar',
            '💳 Deudas 2.0: Sal de Deudas': 'negocios-emprendimiento',
            '🌟 Despertar Espiritual: Tu Transformación': 'desarrollo-personal',
            '👨‍👩‍👧 Familias que Sanan': 'desarrollo-personal',
            '🔧 Mecánica que Factura: Tu Negocio': 'servicios-profesionales',
            '🎬 DaVinci Pro: Edita y Gana': 'tecnologia-marketing',
            '📸 Click Pro: Fotógrafo Profesional': 'arte-creatividad',
            '🧼 Jabones Naturales: Tu Negocio': 'mascotas',
            '👤 Prótesis Capilar: Tu Negocio': 'belleza-estetica',
            '🧘 Método Zeren: Respira y Conecta': 'salud-bienestar',
            '🎨 Photoshop PRO: Diseña y Gana': 'arte-creatividad',
            '📱 UGC PRO: Crea y Cobra': 'tecnologia-marketing',
            '⭐ Astrología Mentor: Descubre tu Propósito': 'desarrollo-personal',
            '💁 Cuidado Premium: Extensiones Duraderas': 'belleza-estetica',
            '📸 Lightroom Pro: De Cero a Profesional': 'arte-creatividad',
            '🤰 Mamá Vitales: Recarga tu Energía': 'salud-bienestar',
            '💄 Maquillaje Pro: Foto & Video': 'belleza-estetica',
            '👗 Facturando con Estilo: Tu Negocio': 'negocios-emprendimiento',
            '🎤 Habla con Poder: Presentaciones que Venden': 'negocios-emprendimiento',
            '🎨 Illustrator Pro: De Cero a Experto': 'arte-creatividad',
            '🛒 Mercado Libre Pro: Factura Sin Límite': 'negocios-emprendimiento',
            '💆 Maderoterapia Spa: Negocio Exitoso': 'salud-bienestar',
            '📊 Marketing Digital: De Cero a Click': 'tecnologia-marketing',
            '🐾 MASCOTAS FIT: Alimentación Natural': 'mascotas'
        };

        return productos.map(prod => {
            // Usar título mejorado si existe, sino usar el original
            const tituloMostrar = titulosMejorados[prod] || prod;
            
            // Obtener categoría del producto
            const categoria = categoriasProductos[prod] || 'negocios-emprendimiento';
            
            // Remover emoji del nombre original para generar el page ID correctamente
            const prodSinEmoji = prod.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
            // Normalizar caracteres especiales (á->a, é->e, etc.) y generar pageId
            const normalized = prodSinEmoji.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let pageId = `producto-${normalized.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            // Limpiar guiones múltiples y al final (no al inicio porque tiene prefijo "producto-")
            pageId = pageId.replace(/-+/g, '-').replace(/-$/, '');
            
            // Mapeo de descripciones persuasivas personalizadas
            const descripcionesPersuasivas = {
                '📹 Gana 24/7 con Cámaras de Seguridad': 'Domina sistemas de videovigilancia profesional y ofrece servicios de seguridad que protegen hogares y negocios las 24 horas',
                '✂️ Costura que Vende: Gana desde Casa': 'Transforma tu pasión por la costura en creaciones profesionales. Aprende técnicas avanzadas y desarrolla tu estilo único desde casa',
                '🤖 Método García: Convierte tu Experiencia con IA': 'Descubre cómo la inteligencia artificial puede amplificar tu conocimiento y crear soluciones innovadoras que transforman tu campo profesional',
                '🌬️ Respira Pro: Domina el Breathwork': 'Domina técnicas de breathwork que liberan ansiedad, reducen estrés y activan tu capacidad natural de sanación emocional y física',
                '📊 Tráfico 10K: Aumenta Ventas en 5 Días': 'Domina Facebook Ads e Instagram Ads con estrategias que conectan tu mensaje con las personas adecuadas y generan resultados medibles',
                '👁️ Cejas y Pestañas Pro: Genera Ingresos': 'Conviértete en especialista en diseño de cejas, laminado y extensiones de pestañas. Técnicas profesionales que realzan la belleza natural',
                '🥩 Método BARF: Bienestar Animal Real': 'Aprende a preparar dietas naturales y equilibradas que transforman la salud de perros y gatos mediante alimentación consciente y nutritiva',
                '👔 Lider Master: Transforma tu Impacto': 'Desarrolla tu capacidad de liderazgo estratégico e inteligencia emocional para crear impacto positivo en tu equipo y organización',
                '📹 Master Reels: Crea y Conquista': 'Crea contenido viral que domina algoritmos y conecta profundamente con tu audiencia mediante estrategias probadas de storytelling visual',
                '✨ Capas Perfectas: Extensiones Premium': 'Domina la técnica de extensiones capilares en capas que crea resultados naturales, duraderos y que realzan la belleza única de cada cliente',
                '🍱 SushiMaster: De la Cocina al Negocio': 'Sumérgete en las técnicas tradicionales japonesas para crear sushi de nivel profesional y desarrollar tu pasión gastronómica con autenticidad',
                '💃 Danza Árabe: Vive de tu Pasión': 'Fusiona el arte de la danza árabe con sanación emocional y emprendimiento consciente para crear una experiencia holística transformadora',
                '🌱 Cultiva Fortuna: Monetiza tu Pasión': 'Transforma tu amor por las plantas en conocimiento profundo que te permite crear espacios verdes que nutren el alma y el entorno',
                '👔 Vestir Bien: Proyecta Autoridad': 'Domina los secretos de la imagen profesional que proyecta autoridad y confianza, transformando cómo te perciben en el ámbito profesional',
                '🏠 Airbnb Master: Convierte tu Propiedad': 'Conviértete en anfitrión de clase mundial creando experiencias únicas que convierten tu propiedad en un destino deseado por viajeros',
                '🎙️ Sazón en Altavoz: Marketing Gastronómico': 'Domina estrategias de marketing digital diseñadas específicamente para restaurantes y negocios gastronómicos que atraen clientes fieles',
                '🚗 Polarizados Pro: Crea tu Negocio': 'Aprende la técnica profesional de polarizado automotriz y ofrece servicios especializados que protegen y embellecen vehículos',
                '🦷 Tecnología Endodóntica: Optimiza tu Práctica': 'Actualiza tu práctica endodóntica con técnicas de vanguardia, protocolos modernos y herramientas que elevan la calidad de tu atención',
                '😴 SleepLab: Domina el Buen Dormir': 'Recupera tu capacidad de dormir profundamente mediante protocolos científicos basados en neurociencia que transforman tu calidad de descanso',
                '✨ Fibroblast que Factura: Tu Negocio': 'Domina la técnica profesional con Plasma Pen que revoluciona la estética facial y corporal con resultados naturales y duraderos',
                '🌬️ Respira Libre: Supera Rinitis y Asma': 'Libera tu respiración mediante técnicas de reeducación respiratoria que reducen síntomas de rinitis y asma de forma natural y efectiva',
                '❄️ Mantenimientos Pro: Gana con Aire Acondicionado': 'Conviértete en técnico experto en sistemas de aire acondicionado y ofrece servicios especializados que garantizan confort y eficiencia',
                '📱 CapCut Express: Edita y Monetiza': 'Domina CapCut desde cero y crea contenido visual impactante que conecta con audiencias en TikTok, Instagram y YouTube',
                '💇 Stop Caída: Recupera tu Cabello': 'Aprende métodos naturales y seguros para detener la caída del cabello, fortalecer raíces y recuperar volumen desde la comodidad de tu hogar',
                '💼 Monetiza tu Credibilidad': 'Construye tu marca personal desde la autenticidad, desarrolla comunicación estratégica y posiciona tu credibilidad como tu mayor activo',
                '🎤 Speaker Master: Domina la Oratoria': 'Transforma tu comunicación en público en una herramienta de liderazgo que inspira, convence y genera conexión profunda con tu audiencia',
                '🍸 Bartender Pro: Mix de Ganancia': 'Domina el arte de la coctelería profesional desde técnicas fundamentales hasta creaciones innovadoras que sorprenden y deleitan paladares',
                '⚡ Reparación que Factura: Herramientas Eléctricas': 'Aprende a diagnosticar y reparar herramientas eléctricas con precisión profesional, ofreciendo soluciones técnicas confiables y efectivas',
                '🍄 Microdosis Segura: Domina los Beneficios': 'Explora los beneficios de la microdosis con enfoque científico y seguro para potenciar bienestar mental y desarrollo personal consciente',
                '💇 Pelucas Premium: Tu Negocio': 'Domina el arte de crear pelucas premium personalizadas que realzan la belleza natural y restauran la confianza con resultados excepcionales',
                '🧴 Tu Marca Natural: Shampoos que Venden': 'Aprende a formular y producir shampoos naturales que nutren el cabello con ingredientes puros y procesos artesanales de calidad',
                '🎤 Pitch Perfecto: Comunica con Impacto': 'Estructura y presenta ideas persuasivas que generan impacto real, transformando tu comunicación en una ventaja competitiva profesional',
                '🧁 Cake Rolls Pro: Tu Negocio Rentable': 'Domina técnicas profesionales de pastelería que te permiten crear cake rolls de calidad comercial con creatividad y precisión artística',
                '🔮 Tarot para Sanar: Transforma tu Corazón': 'Aprende a usar el tarot como herramienta de sanación emocional para cerrar ciclos, sanar heridas y desarrollar amor propio profundo',
                '🧘 Kundalini Start: Despierta tu Energía': 'Despierta tu energía vital mediante prácticas ancestrales adaptadas al mundo moderno que equilibran emociones y reconectan con tu fuerza interior',
                '⚡ Fórmula de la Vitalidad: Alivia el Dolor': 'Alivia el dolor de espalda mediante técnicas de yoga terapéutico y meditación con rutinas progresivas que restauran tu bienestar físico',
                '✍️ Copywriting Pro: Escribe para Vender': 'Domina técnicas de escritura persuasiva que conectan emocionalmente y generan acción mediante principios psicológicos y estrategias probadas',
                '💃 Barre Fit: Tonifica en 21 Días': 'Transforma tu cuerpo en 21 días mediante la fusión de ballet, pilates y yoga que tonifica y moldea desde casa con bajo impacto',
                '💇 Experta en Extensiones: Tu Negocio': 'Domina las técnicas más demandadas de extensiones capilares y aprende las tendencias actuales para crear resultados profesionales excepcionales',
                '✂️ Patronaje Pro: Gana con tu Talento': 'Aprende patronaje técnico de ropa interior desde cero hasta nivel profesional, desarrollando habilidades de diseño que transforman ideas en realidad',
                '✈️ Tripulante de Cabina: Tu Carrera': 'Prepárate para una carrera en aviación con certificación como TCP, accediendo a oportunidades de viajes internacionales y crecimiento profesional',
                '🧠 Mente Imparable: Transforma tu Éxito': 'Transforma tu mentalidad mediante reprogramación mental y técnicas de coaching que potencian tu capacidad de lograr resultados extraordinarios',
                '🍫 Chocolate Pro: Negocio desde Casa': 'Domina el arte de crear chocolate artesanal de calidad profesional desde casa, desarrollando tu marca con técnicas y sabores únicos',
                '💡 Design Thinking: Innova y Factura': 'Conviértete en consultor de innovación con la metodología Design Thinking de Stanford, facilitando procesos que generan soluciones centradas en el usuario',
                '🍰 SweetLab: Pastelería que Vende': 'Domina técnicas profesionales de pastelería temática y decoración artística que transforman ingredientes en obras de arte comestibles',
                '💖 RENACER: Supera tu Divorcio': 'Embárcate en un camino de sanación emocional de 15 días que fortalece tu autoestima y te guía hacia la reconstrucción de una vida plena',
                '😴 S.O.S Sueño: Duerme Profundamente': 'Reprograma tu descanso con protocolos basados en neurociencia que te enseñan a conciliar el sueño rápido y dormir toda la noche profundamente',
                '🧘 Calma en Minutos: Elimina el Estrés': 'Desactiva el estrés al instante con un método práctico de 5 pasos que recupera tu equilibrio y claridad mental en solo 15 minutos diarios',
                '💆 Moldearte Pro: Masajes que Facturan': 'Aprende la técnica profesional de masaje moldeador que transforma siluetas y ofrece bienestar integral mediante metodología especializada',
                '🚀 Landing Express: Lanza y Vende': 'Crea landing pages profesionales de alto impacto sin saber diseño ni código, atrayendo clientes desde el primer día con método probado',
                '🐕 Mascotas Naturales: Alimentación Sana': 'Aprende a preparar dietas naturales y equilibradas que mejoran digestión, energía y bienestar de tu perro en cada etapa de su vida',
                '✨ Tu Mejor Versión: 21 Días': 'Programa integral de 21 días diseñado específicamente para mujeres que crea hábitos sostenibles, aumenta energía y fortalece confianza',
                '👰 Lujo Nupcial: Diseño que Factura': 'Domina el arte de diseñar accesorios nupciales de alta gama que convierten momentos especiales en recuerdos inolvidables con creatividad y excelencia',
                '🐾 Pastelería PET: Snacks Naturales': 'Aprende a preparar snacks y pasteles naturales que mejoran la salud y energía de tu mascota con ingredientes frescos y nutritivos',
                '🧠 PSICO-MARKETING: Llena tu Consulta': 'Programa especializado para psicólogos y terapeutas que enseña comunicación persuasiva, marketing digital y creación de marca personal ética',
                '🧘 Método Zeren: Armoniza tu Energía': 'Aprende conciencia corporal, escaneo energético y armonización de centros vitales que transforman bloqueos en vitalidad y claridad profunda',
                '💳 Deudas 2.0: Sal de Deudas': 'Aprende un método paso a paso para organizar tus finanzas, diseñar un plan efectivo y recuperar tu tranquilidad económica de forma integral',
                '🌟 Despertar Espiritual: Tu Transformación': 'Embárcate en un viaje formativo de autodescubrimiento y conexión espiritual que transforma tu vida con propósito y prácticas guiadas',
                '👨‍👩‍👧 Familias que Sanan': 'Programa que combina sanación personal con herramientas prácticas para el hogar, formándote como facilitador de transformación familiar',
                '🔧 Mecánica que Factura: Tu Negocio': 'Transforma tu pasión por las motos en expertise profesional que convierte aficionados en mecánicos capaces de ofrecer servicios de calidad',
                '🎬 DaVinci Pro: Edita y Gana': 'Domina DaVinci Resolve desde cero y crea ediciones profesionales de video con IA que elevan tu contenido a nivel cinematográfico',
                '📸 Click Pro: Fotógrafo Profesional': 'Aprende fotografía profesional desde cero con cámara o celular, dominando técnica, composición y estilo para crear imágenes de impacto',
                '🧼 Jabones Naturales: Tu Negocio': 'Aprende a crear jabones naturales, veganos y seguros que transforman el cuidado de mascotas mediante ingredientes puros y procesos artesanales',
                '👤 Prótesis Capilar: Tu Negocio': 'Aprende desde cero colocación, mantenimiento y diseño de prótesis capilares que restauran confianza y bienestar con resultados naturales',
                '🧘 Método Zeren: Respira y Conecta': 'Reduce ansiedad y estrés mediante respiración consciente, visualización y conexión energética que logra claridad mental profunda',
                '🎨 Photoshop PRO: Diseña y Gana': 'Aprende Photoshop desde cero con más de 40 clases prácticas que te convierten en diseñador capaz de crear obras visuales impactantes',
                '📱 UGC PRO: Crea y Cobra': 'Aprende a crear contenido UGC auténtico que conecta con audiencias, construyendo portafolio profesional que refleja tu autenticidad única',
                '⭐ Astrología Mentor: Descubre tu Propósito': 'Aprende astrología desde cero para interpretar tu carta astral, descubrir tu propósito y usar esta sabiduría para autoconocimiento profundo',
                '💁 Cuidado Premium: Extensiones Duraderas': 'Aprende técnicas profesionales de lavado, mantenimiento y retirada de extensiones que preservan el cabello natural y ofrecen servicio excepcional',
                '📸 Lightroom Pro: De Cero a Profesional': 'Domina Adobe Lightroom desde cero aprendiendo edición, organización y flujo de trabajo profesional que transforma tu pasión fotográfica',
                '🤰 Mamá Vitales: Recarga tu Energía': 'Programa para madres que enseña 7 técnicas sencillas para recargar energía, reducir estrés y mejorar bienestar emocional en minutos diarios',
                '💄 Maquillaje Pro: Foto & Video': 'Curso completo de maquillaje profesional con técnicas especializadas para fotografía, video y clientas reales que transforman tu pasión en carrera',
                '👗 Facturando con Estilo: Tu Negocio': 'Curso de asesoría de imagen y estilismo que enseña colorimetría y visagismo para crear transformaciones que realzan la belleza única',
                '🎤 Habla con Poder: Presentaciones que Venden': 'Curso para hablar en público con poder, creando presentaciones persuasivas que generan conexión profunda y resultados medibles',
                '🎨 Illustrator Pro: De Cero a Experto': 'Curso de Adobe Illustrator desde cero con más de 80 lecciones que te enseñan diseño gráfico, branding e ilustración vectorial a nivel experto',
                '🛒 Mercado Libre Pro: Factura Sin Límite': 'Aprende a vender en Mercado Libre desde cero con estrategias de expertos para crear, posicionar y escalar tu cuenta con resultados constantes',
                '💆 Maderoterapia Spa: Negocio Exitoso': 'Curso de maderoterapia profesional que enseña técnicas especializadas y estrategias para crear experiencias de bienestar transformadoras',
                '📊 Marketing Digital: De Cero a Click': 'Curso práctico de marketing digital que enseña a diseñar, ejecutar y medir estrategias con IA para aumentar visibilidad y resultados',
                '🐾 MASCOTAS FIT: Alimentación Natural': 'Aprende a diseñar dietas caseras completas y personalizadas para perros y gatos que nutren como experto desde tu cocina con ingredientes naturales'
            };
            
            const descripcion = descripcionesPersuasivas[prod] || 'Transforma tu pasión en expertise profesional con formación completa y acceso de por vida a todo el contenido';
            
            return `
            <article class="article-card" data-category="${categoria}">
                <div class="article-card-header">
                    <span class="article-category">Más Queridos</span>
                    <h3>${tituloMostrar}</h3>
                    <p>${descripcion}</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="${pageId}" class="btn">Ver Producto</a>
                </div>
            </article>
        `;
        }).join('');
    }

    getMarketingDigitalPage() {
        return `
            <section class="blog-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="blog-header">
                        <h1>Marketing Digital</h1>
                        <p>Estrategias y formaciones sobre marketing online</p>
                    </div>
                    <div class="articles-grid">
                        ${this.getMarketingArticles()}
                    </div>
                </div>
            </section>
        `;
    }

    getMarketingArticles() {
        return `
            <article class="article-card">
                <div class="article-card-header">
                    <span class="article-category">Marketing</span>
                    <h3>Embudos de Venta Efectivos en 2026</h3>
                    <p>Aprende a crear embudos que convierten visitantes en clientes.</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="article-embudos-2026" class="btn">Leer Artículo</a>
                </div>
            </article>
            <article class="article-card">
                <div class="article-card-header">
                    <span class="article-category">Marketing</span>
                    <h3>Tráfico de Pago: Facebook Ads vs Google Ads</h3>
                    <p>Comparativa completa de las dos plataformas principales.</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="article-trafico-pago" class="btn">Leer Artículo</a>
                </div>
            </article>
        `;
    }

    getNegociosIAPage() {
        return `
            <section class="blog-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="blog-header">
                        <h1>Negocios con Inteligencia Artificial</h1>
                        <p>Oportunidades y estrategias con IA</p>
                    </div>
                    <div class="articles-grid">
                        ${this.getNegociosIAArticles()}
                    </div>
                </div>
            </section>
        `;
    }

    getNegociosIAArticles() {
        return `
            <article class="article-card">
                <div class="article-card-header">
                    <span class="article-category">IA</span>
                    <h3>Cómo Crear una Agencia de IA en 2026</h3>
                    <p>Guía completa para montar tu agencia de servicios con inteligencia artificial.</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="article-agencia-ia" class="btn">Leer Artículo</a>
                </div>
            </article>
            <article class="article-card">
                <div class="article-card-header">
                    <span class="article-category">IA</span>
                    <h3>IA en Marketing de Contenidos</h3>
                    <p>Cómo usar IA para crear contenido de calidad a escala.</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="article-ia-contenidos" class="btn">Leer Artículo</a>
                </div>
            </article>
        `;
    }

    getVentasOnlinePage() {
        return `
            <section class="blog-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="blog-header">
                        <h1>Ventas Online</h1>
                        <p>Técnicas y estrategias de venta digital</p>
                    </div>
                    <div class="articles-grid">
                        ${this.getVentasArticles()}
                    </div>
                </div>
            </section>
        `;
    }

    getVentasArticles() {
        return `
            <article class="article-card">
                <div class="article-card-header">
                    <span class="article-category">Ventas</span>
                    <h3>Cómo Ser un Closer Digital de Alto Ticket</h3>
                    <p>Las habilidades y estrategias para vender productos premium.</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="article-closer-alto-ticket" class="btn">Leer Artículo</a>
                </div>
            </article>
            <article class="article-card">
                <div class="article-card-header">
                    <span class="article-category">Ventas</span>
                    <h3>WhatsApp Business para Ventas</h3>
                    <p>Aprovecha WhatsApp para cerrar más ventas.</p>
                </div>
                <div class="article-card-footer">
                    <a href="#" data-page="article-whatsapp-ventas" class="btn">Leer Artículo</a>
                </div>
            </article>
        `;
    }

    getSliderSection(title, description, type, items) {
        if (!items || items.length === 0) return '';
        
        const slides = items.map(item => `
            <div class="article-slide">
                <article class="article-card">
                    <div class="article-card-header">
                        ${item.category ? `<span class="article-category">${item.category}</span>` : ''}
                        <h3>${item.title}</h3>
                        <p>${item.excerpt}</p>
                    </div>
                    <div class="article-card-footer">
                        <a href="#" data-page="${item.page}" class="btn">${item.buttonText || 'Ver Más'}</a>
                    </div>
                </article>
            </div>
        `).join('');
        
        return `
            <section class="featured-articles">
                <div class="container">
                    <div class="section-header">
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </div>
                    
                    <div class="articles-slider" data-slider-type="${type}">
                        <button class="slider-arrow slider-arrow-prev" aria-label="Anterior">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M15 18l-6-6 6-6"/>
                            </svg>
                        </button>
                        <div class="articles-slider-container">
                            ${slides}
                        </div>
                        <button class="slider-arrow slider-arrow-next" aria-label="Siguiente">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 18l6-6-6-6"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        `;
    }

    getArticlesForSlider() {
        // Obtener TODOS los artículos del blog (guías) del objeto ARTICLES
        if (typeof ARTICLES === 'undefined') {
            return [];
        }

        const articulosBlog = [];
        const todosArticulos = Object.keys(ARTICLES);
        
        // Obtener SOLO artículos con category: 'Blog' (las guías)
        todosArticulos.forEach(key => {
            const article = ARTICLES[key];
            if (article.category === 'Blog') {
                // Formato similar a getProgramsForSlider para consistencia visual
                articulosBlog.push({
                    title: article.title,
                    excerpt: article.description || article.title.substring(0, 120) + '...',
                    page: key,
                    buttonText: 'Leer Guía'
                });
            }
        });
        
        // Retornar TODOS los artículos del blog sin límite
        return articulosBlog;
    }

    getProgramsForSlider() {
        // Lista completa de todos los programas premium (29 programas)
        const programas = [
            { 
                title: '⚫ Blacks.University', 
                excerpt: 'Factura Mínimo 300 Dólares Semanales Vendiendo Productos Digitales',
                page: 'programa-blacks-university' 
            },
            { 
                title: '🚀 ExpressLaunch', 
                excerpt: 'Lanzamiento Exitoso de Productos',
                page: 'programa-expresslaunch' 
            },
            { 
                title: '🎥 Monetiza tu Conocimiento en Video', 
                excerpt: 'Monetiza Tu Experiencia',
                page: 'programa-monetiza-conocimiento' 
            },
            { 
                title: '☕ Cafeterías Rentables', 
                excerpt: 'Con Nino Scarpato - Modelo de Negocio Exitoso',
                page: 'programa-cafeterias-rentables' 
            },
            { 
                title: '💬 Funnelchat', 
                excerpt: 'Para Instituciones Educativas',
                page: 'programa-funnelchat' 
            },
            { 
                title: '🤖 Reto 21 Días IA', 
                excerpt: 'Contenido con Inteligencia Artificial',
                page: 'programa-reto-21-ia' 
            },
            { 
                title: '👔 MenteCEO', 
                excerpt: 'Con Melissa Ospina - Liderazgo y Mentalidad',
                page: 'programa-menteceo' 
            },
            { 
                title: '📊 Tráfico de Pago', 
                excerpt: 'Domina el Tráfico Pagado',
                page: 'programa-trafico-pago' 
            },
            { 
                title: '⚙️ Lean Six Sigma', 
                excerpt: 'De White a Black Belt',
                page: 'programa-lean-six-sigma' 
            },
            { 
                title: '👨‍👩‍👧 Conexión Parental', 
                excerpt: 'Vínculos Fuertes y Sanos',
                page: 'programa-conexion-parental' 
            },
            { 
                title: '🍽️ Pancake CRM', 
                excerpt: 'Multiplataforma para Restaurantes',
                page: 'programa-pancake-crm' 
            },
            { 
                title: '⭐ Servicio Rentable', 
                excerpt: 'Experiencias Memorables - Carlos Julio Ramírez',
                page: 'programa-servicio-rentable' 
            },
            { 
                title: '🔥 El Vuelo Del Fénix', 
                excerpt: 'Tranquilidad Después de Crisis - Liliana Escobar',
                page: 'programa-vuelo-fenix' 
            },
            { 
                title: '🌍 Aprende Inglés Engly', 
                excerpt: 'Método Efectivo de Aprendizaje',
                page: 'programa-aprende-ingles' 
            },
            { 
                title: '📺 YouTube Mentoring', 
                excerpt: 'Tier 1 - Con Carlos Hidalgo',
                page: 'programa-youtube-mentoring' 
            },
            { 
                title: '💳 Finanzas Personales', 
                excerpt: 'Manejo del Dinero para Mujeres',
                page: 'programa-finanzas-personales' 
            },
            { 
                title: '💅 Cosmética como Negocio', 
                excerpt: 'Oportunidad de Trabajo y Emprendimiento',
                page: 'programa-cosmetica-negocio' 
            },
            { 
                title: '💰 CloserCampPro', 
                excerpt: 'Certificación Internacional en Ventas Digitales',
                page: 'programa-closercamppro' 
            },
            { 
                title: '🤖 Agencia con IA', 
                excerpt: 'Construye Tu Agencia Digital',
                page: 'programa-agencia-ia' 
            },
            { 
                title: '🎬 YouTube Video Mastery', 
                excerpt: 'Con Juan Esteban Conde',
                page: 'programa-youtube-mastering' 
            },
            { 
                title: '🎙️ Estudio Audio Video', 
                excerpt: 'Profesional en Casa - Con Kike Cadena',
                page: 'programa-estudio-audio-video' 
            },
            { 
                title: '🗣️ Comunicación Intuitiva', 
                excerpt: 'El Arte de Conectar',
                page: 'programa-comunicacion-intuitiva' 
            },
            { 
                title: '🚀 Tu Negocio Digital con IA', 
                excerpt: 'Con Kike Cadena',
                page: 'programa-negocio-digital-ia' 
            },
            { 
                title: '🏢 Compra y Vende Dubái', 
                excerpt: 'Con Marco Serna',
                page: 'programa-compra-vende-dubai' 
            },
            { 
                title: '🧠 Psicobranding', 
                excerpt: 'Con Paulo Restrepo',
                page: 'programa-psicobranding' 
            },
            { 
                title: '🍸 Bartender Profesional', 
                excerpt: 'Con Antonio Naranjo',
                page: 'programa-bartender-profesional' 
            },
            { 
                title: '💅 Manicurista Profesional', 
                excerpt: 'Certificación Profesional',
                page: 'programa-manicurista-profesional' 
            },
            { 
                title: '🐕 Pet Groomer Profesional', 
                excerpt: 'Con Fabio Ernesto Gómez',
                page: 'programa-pet-groomer-profesional' 
            },
            { 
                title: '☕ Barista Experto', 
                excerpt: 'Certificación Internacional',
                page: 'programa-barista-experto' 
            },
            { 
                title: '🦋 Reinicio Post-Nido', 
                excerpt: 'Transición y Nuevo Proyecto',
                page: 'programa-reinicio-post-nido-vacio',
                category: 'Programas Premium'
            },
        ];

        return programas.map(p => ({
            category: 'Programa Premium',
            title: p.title,
            excerpt: p.excerpt,
            page: p.page,
            buttonText: 'Ver Programa'
        }));
    }

    getCertificationsForSlider() {
        // Certificaciones con emojis persuasivos y títulos directos
        const certs = [
            {
                emoji: '☕',
                title: 'Barista Experto',
                excerpt: 'Domina el arte del café de especialidad',
                page: 'cert-barista-experto'
            },
            {
                emoji: '🐕',
                title: 'Pet Groomer Profesional',
                excerpt: 'Estilista de mascotas certificado',
                page: 'cert-pet-groomer-profesional'
            },
            {
                emoji: '🎯',
                title: 'Servicio al Cliente',
                excerpt: 'La ventaja competitiva definitiva',
                page: 'cert-atencion-y-servicio-al-cliente'
            },
            {
                emoji: '📱',
                title: 'Contenido Digital',
                excerpt: 'Crea contenido que conecta y convierte',
                page: 'cert-produccion-de-contenido-digital'
            },
            {
                emoji: '🍸',
                title: 'Bartender Profesional',
                excerpt: 'Maestro de la coctelería internacional',
                page: 'cert-bartender-profesional'
            },
            {
                emoji: '💰',
                title: 'Closer de Ventas',
                excerpt: 'Vende alto ticket desde cualquier lugar',
                page: 'cert-closer-de-ventas-digital'
            },
            {
                emoji: '🌸',
                title: 'Floristería Profesional',
                excerpt: 'Arte floral con reconocimiento global',
                page: 'cert-floristería-profesional'
            },
            {
                emoji: '💅',
                title: 'Manicurista Profesional',
                excerpt: 'Experto certificado en belleza y cuidado de uñas',
                page: 'cert-manicurista-profesional'
            },
            {
                emoji: '📊',
                title: 'Marketer Profesional',
                excerpt: 'Estrategias digitales que generan resultados',
                page: 'cert-marketer-profesional'
            }
        ];

        return certs.map(cert => ({
            category: 'Certificación',
            title: `${cert.emoji} ${cert.title}`,
            excerpt: cert.excerpt,
            page: cert.page,
            buttonText: 'Ver Certificación'
        }));
    }

    getMasQueridosForSlider() {
        const productos = [
            { emoji: '📹', title: '📹 Seguridad Inteligente: Protege y Vigila', excerpt: 'Domina sistemas de videovigilancia profesional y ofrece servicios de seguridad que protegen hogares y negocios las 24 horas' },
            { emoji: '✂️', title: '✂️ Costura Maestra: Crea con Excelencia', excerpt: 'Transforma tu pasión por la costura en creaciones profesionales. Aprende técnicas avanzadas y desarrolla tu estilo único desde casa' },
            { emoji: '🤖', title: '🤖 IA Transformadora: Potencia tu Experiencia', excerpt: 'Descubre cómo la inteligencia artificial puede amplificar tu conocimiento y crear soluciones innovadoras que transforman tu campo profesional' },
            { emoji: '🌬️', title: '🌬️ Respiración Consciente: Sanación Profunda', excerpt: 'Domina técnicas de breathwork que liberan ansiedad, reducen estrés y activan tu capacidad natural de sanación emocional y física' },
            { emoji: '📊', title: '📊 Tráfico Estratégico: Conquista Audiencias', excerpt: 'Domina Facebook Ads e Instagram Ads con estrategias que conectan tu mensaje con las personas adecuadas y generan resultados medibles' },
            { emoji: '👁️', title: '👁️ Belleza de Mirada: Maestría en Cejas y Pestañas', excerpt: 'Conviértete en especialista en diseño de cejas, laminado y extensiones de pestañas. Técnicas profesionales que realzan la belleza natural' },
            { emoji: '🥩', title: '🥩 Nutrición Animal Natural: Bienestar Auténtico', excerpt: 'Aprende a preparar dietas naturales y equilibradas que transforman la salud de perros y gatos mediante alimentación consciente y nutritiva' },
            { emoji: '👔', title: '👔 Liderazgo Auténtico: Inspira y Transforma', excerpt: 'Desarrolla tu capacidad de liderazgo estratégico e inteligencia emocional para crear impacto positivo en tu equipo y organización' },
            { emoji: '📹', title: '📹 Reels Maestros: Contenido que Conquista', excerpt: 'Crea contenido viral que domina algoritmos y conecta profundamente con tu audiencia mediante estrategias probadas de storytelling visual' },
            { emoji: '✨', title: '✨ Extensiones Perfectas: Belleza Natural', excerpt: 'Domina la técnica de extensiones capilares en capas que crea resultados naturales, duraderos y que realzan la belleza única de cada cliente' },
            { emoji: '🍱', title: '🍱 Sushi Auténtico: Arte Culinario Japonés', excerpt: 'Sumérgete en las técnicas tradicionales japonesas para crear sushi de nivel profesional y desarrollar tu pasión gastronómica con autenticidad' },
            { emoji: '💃', title: '💃 Danza Transformadora: Movimiento y Sanación', excerpt: 'Fusiona el arte de la danza árabe con sanación emocional y emprendimiento consciente para crear una experiencia holística transformadora' },
            { emoji: '🌱', title: '🌱 Jardinería Consciente: Cultiva tu Pasión', excerpt: 'Transforma tu amor por las plantas en conocimiento profundo que te permite crear espacios verdes que nutren el alma y el entorno' },
            { emoji: '👔', title: '👔 Imagen Poderosa: Proyecta Confianza', excerpt: 'Domina los secretos de la imagen profesional que proyecta autoridad y confianza, transformando cómo te perciben en el ámbito profesional' },
            { emoji: '🏠', title: '🏠 Anfitrión Excepcional: Experiencias Memorables', excerpt: 'Conviértete en anfitrión de clase mundial creando experiencias únicas que convierten tu propiedad en un destino deseado por viajeros' },
            { emoji: '🎙️', title: '🎙️ Marketing Gastronómico: Sazón Digital', excerpt: 'Domina estrategias de marketing digital diseñadas específicamente para restaurantes y negocios gastronómicos que atraen clientes fieles' },
            { emoji: '🚗', title: '🚗 Polarizado Profesional: Técnica y Precisión', excerpt: 'Aprende la técnica profesional de polarizado automotriz y ofrece servicios especializados que protegen y embellecen vehículos' },
            { emoji: '🦷', title: '🦷 Endodoncia Avanzada: Excelencia Clínica', excerpt: 'Actualiza tu práctica endodóntica con técnicas de vanguardia, protocolos modernos y herramientas que elevan la calidad de tu atención' },
            { emoji: '😴', title: '😴 Sueño Restaurador: Descanso Profundo', excerpt: 'Recupera tu capacidad de dormir profundamente mediante protocolos científicos basados en neurociencia que transforman tu calidad de descanso' },
            { emoji: '✨', title: '✨ Estética Avanzada: Técnica Fibroblast', excerpt: 'Domina la técnica profesional con Plasma Pen que revoluciona la estética facial y corporal con resultados naturales y duraderos' },
            { emoji: '🌬️', title: '🌬️ Respiración Libre: Supera Limitaciones', excerpt: 'Libera tu respiración mediante técnicas de reeducación respiratoria que reducen síntomas de rinitis y asma de forma natural y efectiva' },
            { emoji: '❄️', title: '❄️ Climatización Profesional: Técnica Especializada', excerpt: 'Conviértete en técnico experto en sistemas de aire acondicionado y ofrece servicios especializados que garantizan confort y eficiencia' },
            { emoji: '📱', title: '📱 Edición Creativa: Videos que Impactan', excerpt: 'Domina CapCut desde cero y crea contenido visual impactante que conecta con audiencias en TikTok, Instagram y YouTube' },
            { emoji: '💇', title: '💇 Recuperación Capilar: Fortaleza Natural', excerpt: 'Aprende métodos naturales y seguros para detener la caída del cabello, fortalecer raíces y recuperar volumen desde la comodidad de tu hogar' },
            { emoji: '💼', title: '💼 Marca Personal Auténtica: Tu Credibilidad', excerpt: 'Construye tu marca personal desde la autenticidad, desarrolla comunicación estratégica y posiciona tu credibilidad como tu mayor activo' },
            { emoji: '🎤', title: '🎤 Oratoria Poderosa: Comunica con Impacto', excerpt: 'Transforma tu comunicación en público en una herramienta de liderazgo que inspira, convence y genera conexión profunda con tu audiencia' },
            { emoji: '🍸', title: '🍸 Coctelería Maestra: Arte en Cada Copa', excerpt: 'Domina el arte de la coctelería profesional desde técnicas fundamentales hasta creaciones innovadoras que sorprenden y deleitan paladares' },
            { emoji: '⚡', title: '⚡ Reparación Eléctrica: Soluciones Técnicas', excerpt: 'Aprende a diagnosticar y reparar herramientas eléctricas con precisión profesional, ofreciendo soluciones técnicas confiables y efectivas' },
            { emoji: '🍄', title: '🍄 Microdosis Consciente: Bienestar Mental', excerpt: 'Explora los beneficios de la microdosis con enfoque científico y seguro para potenciar bienestar mental y desarrollo personal consciente' },
            { emoji: '💇', title: '💇 Pelucas Artesanales: Belleza Personalizada', excerpt: 'Domina el arte de crear pelucas premium personalizadas que realzan la belleza natural y restauran la confianza con resultados excepcionales' },
            { emoji: '🧴', title: '🧴 Cosmética Natural: Formulación Artesanal', excerpt: 'Aprende a formular y producir shampoos naturales que nutren el cabello con ingredientes puros y procesos artesanales de calidad' },
            { emoji: '🎤', title: '🎤 Presentaciones Poderosas: Comunica con Confianza', excerpt: 'Estructura y presenta ideas persuasivas que generan impacto real, transformando tu comunicación en una ventaja competitiva profesional' },
            { emoji: '🧁', title: '🧁 Pastelería Artística: Creatividad Dulce', excerpt: 'Domina técnicas profesionales de pastelería que te permiten crear cake rolls de calidad comercial con creatividad y precisión artística' },
            { emoji: '🔮', title: '🔮 Tarot Sanador: Transformación Emocional', excerpt: 'Aprende a usar el tarot como herramienta de sanación emocional para cerrar ciclos, sanar heridas y desarrollar amor propio profundo' },
            { emoji: '🧘', title: '🧘 Kundalini Despierta: Energía Vital', excerpt: 'Despierta tu energía vital mediante prácticas ancestrales adaptadas al mundo moderno que equilibran emociones y reconectan con tu fuerza interior' },
            { emoji: '⚡', title: '⚡ Vitalidad Restaurada: Alivio del Dolor', excerpt: 'Alivia el dolor de espalda mediante técnicas de yoga terapéutico y meditación con rutinas progresivas que restauran tu bienestar físico' },
            { emoji: '✍️', title: '✍️ Copywriting Estratégico: Palabras que Convierten', excerpt: 'Domina técnicas de escritura persuasiva que conectan emocionalmente y generan acción mediante principios psicológicos y estrategias probadas' },
            { emoji: '💃', title: '💃 Barre Fit: Transformación Corporal', excerpt: 'Transforma tu cuerpo en 21 días mediante la fusión de ballet, pilates y yoga que tonifica y moldea desde casa con bajo impacto' },
            { emoji: '💇', title: '💇 Extensiones Expertas: Técnicas Avanzadas', excerpt: 'Domina las técnicas más demandadas de extensiones capilares y aprende las tendencias actuales para crear resultados profesionales excepcionales' },
            { emoji: '✂️', title: '✂️ Patronaje Profesional: Diseño Técnico', excerpt: 'Aprende patronaje técnico de ropa interior desde cero hasta nivel profesional, desarrollando habilidades de diseño que transforman ideas en realidad' },
            { emoji: '✈️', title: '✈️ Tripulante de Cabina: Carrera en los Cielos', excerpt: 'Prepárate para una carrera en aviación con certificación como TCP, accediendo a oportunidades de viajes internacionales y crecimiento profesional' },
            { emoji: '🧠', title: '🧠 Mentalidad Ganadora: Transforma tu Éxito', excerpt: 'Transforma tu mentalidad mediante reprogramación mental y técnicas de coaching que potencian tu capacidad de lograr resultados extraordinarios' },
            { emoji: '🍫', title: '🍫 Chocolatería Artesanal: Creación Premium', excerpt: 'Domina el arte de crear chocolate artesanal de calidad profesional desde casa, desarrollando tu marca con técnicas y sabores únicos' },
            { emoji: '💡', title: '💡 Design Thinking: Innovación Estratégica', excerpt: 'Conviértete en consultor de innovación con la metodología Design Thinking de Stanford, facilitando procesos que generan soluciones centradas en el usuario' },
            { emoji: '🍰', title: '🍰 Pastelería Creativa: Arte en Repostería', excerpt: 'Domina técnicas profesionales de pastelería temática y decoración artística que transforman ingredientes en obras de arte comestibles' },
            { emoji: '💖', title: '💖 Renacimiento Personal: Supera el Divorcio', excerpt: 'Embárcate en un camino de sanación emocional de 15 días que fortalece tu autoestima y te guía hacia la reconstrucción de una vida plena' },
            { emoji: '😴', title: '😴 Sueño Restaurado: Descanso Profundo', excerpt: 'Reprograma tu descanso con protocolos basados en neurociencia que te enseñan a conciliar el sueño rápido y dormir toda la noche profundamente' },
            { emoji: '🧘', title: '🧘 Calma Instantánea: Elimina el Estrés', excerpt: 'Desactiva el estrés al instante con un método práctico de 5 pasos que recupera tu equilibrio y claridad mental en solo 15 minutos diarios' },
            { emoji: '💆', title: '💆 Masaje Moldeador: Técnica Profesional', excerpt: 'Aprende la técnica profesional de masaje moldeador que transforma siluetas y ofrece bienestar integral mediante metodología especializada' },
            { emoji: '🚀', title: '🚀 Landing Pages Poderosas: Conversión Garantizada', excerpt: 'Crea landing pages profesionales de alto impacto sin saber diseño ni código, atrayendo clientes desde el primer día con método probado' },
            { emoji: '🐕', title: '🐕 Nutrición Canina Natural: Bienestar Integral', excerpt: 'Aprende a preparar dietas naturales y equilibradas que mejoran digestión, energía y bienestar de tu perro en cada etapa de su vida' },
            { emoji: '✨', title: '✨ Transformación Femenina: Tu Mejor Versión', excerpt: 'Programa integral de 21 días diseñado específicamente para mujeres que crea hábitos sostenibles, aumenta energía y fortalece confianza' },
            { emoji: '👰', title: '👰 Diseño Nupcial: Elegancia y Lujo', excerpt: 'Domina el arte de diseñar accesorios nupciales de alta gama que convierten momentos especiales en recuerdos inolvidables con creatividad y excelencia' },
            { emoji: '🐾', title: '🐾 Pastelería para Mascotas: Nutrición Consciente', excerpt: 'Aprende a preparar snacks y pasteles naturales que mejoran la salud y energía de tu mascota con ingredientes frescos y nutritivos' },
            { emoji: '🧠', title: '🧠 Psico-Marketing: Llena tu Consulta', excerpt: 'Programa especializado para psicólogos y terapeutas que enseña comunicación persuasiva, marketing digital y creación de marca personal ética' },
            { emoji: '🧘', title: '🧘 Armonía Energética: Método Zeren', excerpt: 'Aprende conciencia corporal, escaneo energético y armonización de centros vitales que transforman bloqueos en vitalidad y claridad profunda' },
            { emoji: '💳', title: '💳 Libertad Financiera: Sal de Deudas', excerpt: 'Aprende un método paso a paso para organizar tus finanzas, diseñar un plan efectivo y recuperar tu tranquilidad económica de forma integral' },
            { emoji: '🌟', title: '🌟 Despertar Espiritual: Transformación Consciente', excerpt: 'Embárcate en un viaje formativo de autodescubrimiento y conexión espiritual que transforma tu vida con propósito y prácticas guiadas' },
            { emoji: '👨‍👩‍👧', title: '👨‍👩‍👧 Sanación Familiar: Transformación Relacional', excerpt: 'Programa que combina sanación personal con herramientas prácticas para el hogar, formándote como facilitador de transformación familiar' },
            { emoji: '🔧', title: '🔧 Mecánica Profesional: Pasión que Transforma', excerpt: 'Transforma tu pasión por las motos en expertise profesional que convierte aficionados en mecánicos capaces de ofrecer servicios de calidad' },
            { emoji: '🎬', title: '🎬 Edición Profesional: DaVinci Resolve', excerpt: 'Domina DaVinci Resolve desde cero y crea ediciones profesionales de video con IA que elevan tu contenido a nivel cinematográfico' },
            { emoji: '📸', title: '📸 Fotografía Profesional: Captura Momentos', excerpt: 'Aprende fotografía profesional desde cero con cámara o celular, dominando técnica, composición y estilo para crear imágenes de impacto' },
            { emoji: '🧼', title: '🧼 Jabones Naturales: Cuidado Consciente', excerpt: 'Aprende a crear jabones naturales, veganos y seguros que transforman el cuidado de mascotas mediante ingredientes puros y procesos artesanales' },
            { emoji: '👤', title: '👤 Prótesis Capilar: Restauración Profesional', excerpt: 'Aprende desde cero colocación, mantenimiento y diseño de prótesis capilares que restauran confianza y bienestar con resultados naturales' },
            { emoji: '🧘', title: '🧘 Conexión Energética: Respira y Transforma', excerpt: 'Reduce ansiedad y estrés mediante respiración consciente, visualización y conexión energética que logra claridad mental profunda' },
            { emoji: '🎨', title: '🎨 Diseño Gráfico Profesional', excerpt: 'Programa integral que transforma principiantes en diseñadores profesionales. Domina diseño gráfico desde fundamentos hasta técnicas avanzadas y desarrolla un modelo de negocio para monetizar tu creatividad' },
            { emoji: '🎨', title: '🎨 Photoshop PRO: Diseña, Emprende y Gana', excerpt: 'Domina Adobe Photoshop desde cero hasta nivel profesional. Aprende más de 40 clases prácticas que te convierten en diseñador capaz de crear obras visuales impactantes y generar ingresos como freelance' },
            { emoji: '📱', title: '📱 UGC PRO: Crea, Conquista y Cobra', excerpt: 'Conviértete en creador de contenido UGC profesional y colabora con marcas. Aprende a monetizar tu autenticidad creando contenido que conecta con audiencias y genera ingresos desde cualquier lugar' },
            { emoji: '⭐', title: '⭐ Astrología Mentor', excerpt: 'Domina la interpretación de cartas astrales desde cero. Aprende astrología natal completa para descubrir tu propósito vital, comprender tus relaciones y transformar el autoconocimiento en poder personal' },
            { emoji: '💁', title: '💁 Cuidado Premium: Extensiones Duraderas', excerpt: 'Aprende técnicas profesionales de lavado, mantenimiento y retirada de extensiones que preservan el cabello natural y ofrecen servicio excepcional' },
            { emoji: '🤰', title: '🤰 Energía Maternal: Recarga Vital', excerpt: 'Programa para madres que enseña 7 técnicas sencillas para recargar energía, reducir estrés y mejorar bienestar emocional en minutos diarios' },
            { emoji: '💄', title: '💄 Maquillaje Profesional: Arte y Técnica', excerpt: 'Curso completo de maquillaje profesional con técnicas especializadas para fotografía, video y clientas reales que transforman tu pasión en carrera' },
            { emoji: '👗', title: '👗 Estilismo Profesional: Imagen que Transforma', excerpt: 'Curso de asesoría de imagen y estilismo que enseña colorimetría y visagismo para crear transformaciones que realzan la belleza única' },
            { emoji: '🎤', title: '🎤 Presentaciones Poderosas: Habla con Impacto', excerpt: 'Curso para hablar en público con poder, creando presentaciones persuasivas que generan conexión profunda y resultados medibles' },
            { emoji: '🎨', title: '🎨 Illustrator Master: Diseño Vectorial', excerpt: 'Curso de Adobe Illustrator desde cero con más de 80 lecciones que te enseñan diseño gráfico, branding e ilustración vectorial a nivel experto' },
            { emoji: '🛒', title: '🛒 E-commerce Exitoso: Mercado Libre Pro', excerpt: 'Aprende a vender en Mercado Libre desde cero con estrategias de expertos para crear, posicionar y escalar tu cuenta con resultados constantes' },
            { emoji: '💆', title: '💆 Maderoterapia Profesional: Bienestar Integral', excerpt: 'Curso de maderoterapia profesional que enseña técnicas especializadas y estrategias para crear experiencias de bienestar transformadoras' },
            { emoji: '📊', title: '📊 Marketing Digital Estratégico: De Cero a Experto', excerpt: 'Curso práctico de marketing digital que enseña a diseñar, ejecutar y medir estrategias con IA para aumentar visibilidad y resultados' },
            { emoji: '🐾', title: '🐾 Nutrición Mascotas: Alimentación Natural', excerpt: 'Aprende a diseñar dietas caseras completas y personalizadas para perros y gatos que nutren como experto desde tu cocina con ingredientes naturales' }
        ];

        return productos.map(p => {
            // Remover emoji del título para generar el page ID correctamente
            const titleSinEmoji = p.title.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
            // Normalizar caracteres especiales (á->a, é->e, etc.) y generar pageId
            const normalized = titleSinEmoji.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            let pageId = `producto-${normalized.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
            // Limpiar guiones múltiples y al final (no al inicio porque tiene prefijo "producto-")
            pageId = pageId.replace(/-+/g, '-').replace(/-$/, '');
            
            // Debug para Costura que Vende
            if (p.title.includes('Costura que Vende')) {
                console.log('Slider - Costura que Vende - Título original:', p.title);
                console.log('Slider - Costura que Vende - Sin emoji:', titleSinEmoji);
                console.log('Slider - Costura que Vende - Normalizado:', normalized);
                console.log('Slider - Costura que Vende - PageId final:', pageId);
            }
            
            return {
                category: 'Más Queridos',
                title: `${p.emoji} ${p.title}`,
                excerpt: p.excerpt,
                page: pageId,
                buttonText: 'Ver Producto'
            };
        });
    }

    getTodoEnUnoPage() {
        return this.getArticlePage('article-todo-en-uno');
    }

    getMillonariosInternetPage() {
        return this.getArticlePage('article-millonarios-internet-2026');
    }

    getAgenciaPage() {
        return this.getArticlePage('article-agencia');
    }

    getArticlePage(articleId) {
        // Verificar si el artículo existe en la biblioteca
        console.log('getArticlePage - Buscando artículo:', articleId);
        console.log('getArticlePage - ARTICLES definido?', typeof ARTICLES !== 'undefined');
        if (typeof ARTICLES !== 'undefined') {
            console.log('getArticlePage - Total artículos disponibles:', Object.keys(ARTICLES).length);
            console.log('getArticlePage - Artículo existe?', !!ARTICLES[articleId]);
        }
        
        if (typeof ARTICLES !== 'undefined' && ARTICLES[articleId]) {
            const article = ARTICLES[articleId];
            console.log('getArticlePage - Artículo encontrado y cargando:', articleId);
            // Generar esquema FAQ si existe
            const faqSchemaScript = article.faqSchema ? `
                <script type="application/ld+json">
                ${JSON.stringify(article.faqSchema, null, 2)}
                </script>
            ` : '';
            
            return `
                <article class="article-page">
                    ${faqSchemaScript}
                    <div class="container">
                        <button class="btn-back" data-action="back">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            Atrás
                        </button>
                        <div class="article-header">
                            <span class="article-category">${article.category}</span>
                            <h1>${article.title}</h1>
                            <div class="article-meta">
                                <span>📅 ${article.date}</span>
                            </div>
                        </div>
                        <div class="article-content">
                            ${article.content}
                        </div>
                    </div>
                </article>
            `;
        }
        
        // Artículo no encontrado - mostrar template genérico
        return `
            <article class="article-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <div class="article-header">
                        <h1>Artículo en Desarrollo</h1>
                        <div class="article-meta">
                            <span>Publicado el 5 de Enero, 2026</span> • <span>Lectura: 8 min</span>
                        </div>
                    </div>
                    <div class="article-content">
                        <p>Este artículo está en proceso de creación. Pronto encontrarás contenido de calidad aquí.</p>
                        
                        <div class="cta-box">
                            <h3>📚 Mientras Tanto...</h3>
                            <p>Explora nuestros artículos destacados y descubre formaciones que pueden transformar tu carrera digital.</p>
                            <a href="#" data-page="blog" class="btn">Ver Todos los Artículos</a>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    getProgramPage(programId, proximamente = false) {
        // Obtener información del programa desde getProgramsForSlider
        const programas = this.getProgramsForSlider();
        const programa = programas.find(p => p.page === programId);
        
        if (programa) {
            if (proximamente) {
                return `
                    <article class="article-page">
                        <div class="container">
                            <button class="btn-back" data-action="back">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                                </svg>
                                Atrás
                            </button>
                            <div class="article-header">
                                <span class="article-category">${programa.category}</span>
                                <h1>${programa.title}</h1>
                                <div class="article-meta">
                                    <span>📚 Programa Premium</span>
                                </div>
                            </div>
                            <div class="article-content">
                                <h2>Próximamente</h2>
                                <p>Estamos trabajando en el contenido completo de este programa premium. Pronto encontrarás una guía detallada y profesional que te ayudará a alcanzar tus objetivos.</p>
                                
                                <p>Mientras tanto, explora nuestros otros programas premium disponibles y descubre formaciones que pueden transformar tu carrera digital.</p>
                                
                                <div class="cta-box">
                                    <h3>📚 Explora Nuestros Programas Disponibles</h3>
                                    <p>Tenemos varios programas premium con contenido completo y optimizado listos para ti.</p>
                                    <a href="#" data-page="programas-premium" class="btn">Ver Todos los Programas</a>
                                </div>
                            </div>
                        </div>
                    </article>
                `;
            }
            
            return `
                <article class="article-page">
                    <div class="container">
                        <button class="btn-back" data-action="back">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            Atrás
                        </button>
                        <div class="article-header">
                            <span class="article-category">${programa.category}</span>
                            <h1>${programa.title}</h1>
                            <div class="article-meta">
                                <span>📚 Programa Premium</span>
                            </div>
                        </div>
                        <div class="article-content">
                            <h2>${programa.title}</h2>
                            <p>${programa.excerpt}</p>
                            
                            <p>Este programa premium está diseñado para transformar tu carrera y darte las herramientas necesarias para alcanzar tus objetivos profesionales.</p>
                            
                            <h2>¿Qué Incluye Este Programa?</h2>
                            <ul>
                                <li>Contenido completo y actualizado</li>
                                <li>Metodología probada paso a paso</li>
                                <li>Acceso permanente a todos los materiales</li>
                                <li>Soporte y comunidad exclusiva</li>
                            </ul>
                            
                            <div class="cta-box">
                                <h3>🚀 ¿Listo para Comenzar?</h3>
                                <p>Accede ahora a este programa premium y comienza tu transformación profesional.</p>
                                <a href="#" class="btn">Ver Programa Completo</a>
                            </div>
                        </div>
                    </div>
                </article>
            `;
        } else {
            return `
                <article class="article-page">
                    <div class="container">
                        <button class="btn-back" data-action="back">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            Atrás
                        </button>
                        <div class="article-header">
                            <h1>Programa no encontrado</h1>
                        </div>
                        <div class="article-content">
                            <p>Lo sentimos, el programa que buscas no está disponible.</p>
                        </div>
                    </div>
                </article>
            `;
        }
    }

    // Páginas legales
    getPrivacidadPage() {
        return `
            <section class="legal-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <h1>Política de Privacidad</h1>
                    <p><strong>Última actualización:</strong> 5 de Enero de 2026</p>

                    <h2>Datos del Responsable</h2>
                    <p><strong>Responsable del tratamiento:</strong> Kristian Krasimirov .N<br>
                    <strong>Blog:</strong> KrisKNCreative<br>
                    <strong>Email de contacto:</strong> solucionesworld2016@gmail.com</p>

                    <p>KrisKNCreative es un blog especializado en formación digital, negocios online, marketing digital e inteligencia artificial. El responsable del tratamiento de datos personales es Kristian Krasimirov .N, quien gestiona este sitio web con el objetivo de compartir información valiosa sobre formaciones y estrategias digitales.</p>

                    <h2>1. Información que Recopilamos</h2>
                    <p>En KrisKNCreative recopilamos la siguiente información cuando utilizas nuestro sitio web:</p>
                    <ul>
                        <li><strong>Información de contacto:</strong> nombre completo, correo electrónico y asunto cuando completas el formulario de contacto</li>
                        <li><strong>Información técnica:</strong> dirección IP, tipo de navegador, sistema operativo, páginas visitadas, tiempo de permanencia y origen del tráfico</li>
                        <li><strong>Cookies:</strong> utilizamos cookies técnicas y analíticas para mejorar tu experiencia de navegación y analizar el uso del sitio</li>
                        <li><strong>Datos de navegación:</strong> información sobre cómo interactúas con nuestro sitio web</li>
                    </ul>

                    <h2>2. Base Legal y Finalidad del Tratamiento</h2>
                    <p>Tratamos tus datos personales basándonos en:</p>
                    <ul>
                        <li><strong>Consentimiento:</strong> cuando nos proporcionas tus datos a través del formulario de contacto</li>
                        <li><strong>Interés legítimo:</strong> para mejorar nuestros servicios y analizar el uso del sitio web</li>
                        <li><strong>Cumplimiento legal:</strong> cuando sea necesario para cumplir con obligaciones legales</li>
                    </ul>

                    <p>Utilizamos la información recopilada para:</p>
                    <ul>
                        <li>Responder a tus consultas y solicitudes de información</li>
                        <li>Mejorar nuestro sitio web, servicios y experiencia de usuario</li>
                        <li>Enviarte información relevante sobre formaciones y artículos (solo si has dado tu consentimiento explícito)</li>
                        <li>Analizar el comportamiento de los usuarios para optimizar el contenido</li>
                        <li>Cumplir con obligaciones legales y normativas aplicables</li>
                    </ul>

                    <h2>3. Compartir Información</h2>
                    <p>No vendemos, alquilamos ni compartimos tu información personal con terceros para fines comerciales. Podemos compartir información únicamente en los siguientes casos:</p>
                    <ul>
                        <li><strong>Proveedores de servicios:</strong> empresas que nos ayudan a operar el sitio web (hosting, análisis, email) bajo estrictos acuerdos de confidencialidad</li>
                        <li><strong>Autoridades legales:</strong> cuando sea requerido por ley, orden judicial o proceso legal</li>
                        <li><strong>Protección de derechos:</strong> cuando sea necesario para proteger nuestros derechos, propiedad o seguridad</li>
                    </ul>

                    <h2>4. Seguridad de los Datos</h2>
                    <p>Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger tu información personal contra:</p>
                    <ul>
                        <li>Acceso no autorizado o ilegal</li>
                        <li>Pérdida, destrucción o alteración accidental</li>
                        <li>Tratamiento no autorizado</li>
                    </ul>
                    <p>Estas medidas incluyen encriptación, firewalls, controles de acceso y procedimientos de seguridad regulares. Sin embargo, ningún método de transmisión por internet es 100% seguro.</p>

                    <h2>5. Retención de Datos</h2>
                    <p>Conservamos tus datos personales solo durante el tiempo necesario para cumplir con las finalidades descritas en esta política, a menos que la ley requiera o permita un período de retención más largo.</p>
                    <ul>
                        <li><strong>Datos de contacto:</strong> se conservan mientras mantengamos una relación activa o hasta que solicites su eliminación</li>
                        <li><strong>Datos técnicos:</strong> se conservan durante el tiempo necesario para análisis y mejora del sitio</li>
                        <li><strong>Cookies:</strong> según se especifica en nuestra Política de Cookies</li>
                    </ul>

                    <h2>6. Tus Derechos</h2>
                    <p>De acuerdo con la normativa de protección de datos, tienes derecho a:</p>
                    <ul>
                        <li><strong>Acceso:</strong> obtener información sobre qué datos personales tratamos sobre ti</li>
                        <li><strong>Rectificación:</strong> corregir datos inexactos o incompletos</li>
                        <li><strong>Supresión:</strong> solicitar la eliminación de tus datos cuando ya no sean necesarios</li>
                        <li><strong>Oposición:</strong> oponerte al tratamiento de tus datos en ciertas circunstancias</li>
                        <li><strong>Limitación:</strong> solicitar la limitación del tratamiento de tus datos</li>
                        <li><strong>Portabilidad:</strong> recibir tus datos en un formato estructurado y de uso común</li>
                        <li><strong>Retirar consentimiento:</strong> retirar tu consentimiento en cualquier momento</li>
                    </ul>
                    <p>Para ejercer cualquiera de estos derechos, puedes contactarnos en: <strong>solucionesworld2016@gmail.com</strong></p>

                    <h2>7. Transferencias Internacionales</h2>
                    <p>Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del Espacio Económico Europeo. En estos casos, nos aseguramos de que existan garantías adecuadas para la protección de tus datos personales.</p>

                    <h2>8. Menores de Edad</h2>
                    <p>Nuestro sitio web no está dirigido a menores de 18 años. No recopilamos intencionalmente información personal de menores. Si descubrimos que hemos recopilado información de un menor, tomaremos medidas para eliminarla inmediatamente.</p>

                    <h2>9. Cambios en esta Política</h2>
                    <p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento. Te notificaremos de cambios significativos publicando la nueva política en esta página y actualizando la fecha de "Última actualización".</p>

                    <h2>10. Contacto</h2>
                    <p>Para cualquier consulta, solicitud o ejercicio de derechos relacionados con esta Política de Privacidad, puedes contactarnos en:</p>
                    <p><strong>Email:</strong> solucionesworld2016@gmail.com<br>
                    <strong>Asunto:</strong> Política de Privacidad - KrisKNCreative</p>
                    <p>Nos comprometemos a responder a tu solicitud en un plazo máximo de 30 días.</p>
                </div>
            </section>
        `;
    }

    getCookiesPage() {
        return `
            <section class="legal-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <h1>Política de Cookies</h1>
                    <p><strong>Última actualización:</strong> 5 de Enero de 2026</p>

                    <h2>Responsable</h2>
                    <p><strong>Responsable:</strong> Kristian Krasimirov .N<br>
                    <strong>Blog:</strong> KrisKNCreative<br>
                    <strong>Email:</strong> solucionesworld2016@gmail.com</p>

                    <h2>¿Qué son las Cookies?</h2>
                    <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo (ordenador, tablet, móvil) cuando visitas un sitio web. Estas cookies permiten que el sitio web recuerde tus acciones y preferencias durante un período de tiempo, por lo que no tienes que volver a configurarlas cada vez que regresas al sitio o navegas de una página a otra.</p>

                    <h2>Tipos de Cookies que Utilizamos</h2>
                    
                    <h3>Cookies Esenciales</h3>
                    <p>Necesarias para el funcionamiento básico del sitio web. No se pueden desactivar.</p>
                    <ul>
                        <li>Cookies de sesión para mantener tu navegación</li>
                        <li>Cookies de seguridad</li>
                    </ul>

                    <h3>Cookies Analíticas</h3>
                    <p>Nos ayudan a entender cómo los visitantes interactúan con el sitio:</p>
                    <ul>
                        <li>Páginas más visitadas</li>
                        <li>Tiempo de permanencia</li>
                        <li>Origen del tráfico</li>
                    </ul>

                    <h3>Cookies de Funcionalidad</h3>
                    <p>Permiten recordar tus preferencias:</p>
                    <ul>
                        <li>Idioma seleccionado</li>
                        <li>Configuraciones de visualización</li>
                    </ul>

                    <h2>Gestionar Cookies</h2>
                    <p>Puedes controlar y/o eliminar cookies según desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y configurar la mayoría de navegadores para evitar que se instalen.</p>

                    <p>Ten en cuenta que si desactivas las cookies, algunas funcionalidades del sitio pueden no funcionar correctamente.</p>

                    <h2>Más Información</h2>
                    <p>Para más información sobre cookies, visita: <a href="https://www.aboutcookies.org" target="_blank" style="color: var(--color-highlight);">www.aboutcookies.org</a></p>
                </div>
            </section>
        `;
    }

    getAvisoLegalPage() {
        return `
            <section class="legal-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <h1>Aviso Legal</h1>
                    <p><strong>Última actualización:</strong> 5 de Enero de 2026</p>

                    <h2>1. Datos Identificativos del Responsable</h2>
                    <p><strong>Responsable:</strong> Kristian Krasimirov .N<br>
                    <strong>Blog:</strong> KrisKNCreative<br>
                    <strong>Email de contacto:</strong> solucionesworld2016@gmail.com</p>
                    
                    <p>KrisKNCreative es un blog especializado en formación digital, negocios online, marketing digital e inteligencia artificial. El responsable y titular de este sitio web es Kristian Krasimirov .N, quien gestiona y mantiene este espacio con el objetivo de compartir información valiosa, reseñas y análisis sobre formaciones digitales y estrategias de negocio online.</p>

                    <h2>2. Objeto</h2>
                    <p>El presente aviso legal regula el uso y utilización del sitio web KrisKNCreative, del que es titular Kristian Krasimirov.</p>
                    <p>La navegación por el sitio web atribuye la condición de usuario y implica la aceptación plena de todas las disposiciones incluidas en este Aviso Legal.</p>

                    <h2>3. Propiedad Intelectual</h2>
                    <p>Todos los contenidos del sitio web, incluyendo textos, imágenes, diseño, logotipos y código fuente, son propiedad de KrisKNCreative o de terceros que han autorizado su uso.</p>
                    <p>Queda prohibida la reproducción, distribución o modificación de cualquier contenido sin autorización expresa.</p>

                    <h2>4. Responsabilidad</h2>
                    <p>KrisKNCreative no se hace responsable de:</p>
                    <ul>
                        <li>La continuidad y disponibilidad de los contenidos</li>
                        <li>Errores u omisiones en los contenidos</li>
                        <li>Daños causados por el uso inadecuado del sitio web</li>
                        <li>Enlaces a sitios web de terceros</li>
                    </ul>

                    <h2>5. Enlaces a Terceros</h2>
                    <p>El sitio web puede contener enlaces a sitios de terceros. KrisKNCreative no se responsabiliza del contenido de estos sitios externos.</p>

                    <h2>6. Modificaciones</h2>
                    <p>KrisKNCreative se reserva el derecho de modificar el presente aviso legal en cualquier momento. Los cambios serán publicados en esta página.</p>

                    <h2>7. Legislación Aplicable</h2>
                    <p>El presente aviso legal se rige por la legislación española vigente.</p>
                </div>
            </section>
        `;
    }

    getAfiliadosPage() {
        return `
            <section class="legal-page">
                <div class="container">
                    <button class="btn-back" data-action="back">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Atrás
                    </button>
                    <h1>Página de Afiliados</h1>
                    <p><strong>Última actualización:</strong> 5 de Enero de 2026</p>
                    
                    <h2>Responsable</h2>
                    <p><strong>Responsable:</strong> Kristian Krasimirov .N<br>
                    <strong>Blog:</strong> KrisKNCreative<br>
                    <strong>Email:</strong> solucionesworld2016@gmail.com</p>

                    <h2>Divulgación de Afiliación</h2>
                    <p>KrisKNCreative participa en programas de afiliación. Esto significa que podemos recibir comisiones por las compras realizadas a través de los enlaces presentes en este sitio web.</p>

                    <h2>Transparencia Total</h2>
                    <p>Creemos firmemente en la transparencia. Cuando recomendamos un producto, curso o formación, es porque:</p>
                    <ul>
                        <li>Lo hemos investigado exhaustivamente</li>
                        <li>Creemos genuinamente en su valor</li>
                        <li>Consideramos que puede ayudarte en tu desarrollo profesional</li>
                        <li>Tiene respaldo de resultados reales</li>
                    </ul>

                    <h2>Nuestra Relación con Universidad.Online</h2>
                    <p>La mayoría de las formaciones, certificaciones y productos que recomendamos en este blog provienen de <strong>Universidad.Online®</strong>, una plataforma educativa digital para la comunidad hispanohablante.</p>
                    
                    <h3>¿Qué es Universidad.Online®?</h3>
                    <p>Universidad.Online® es un ecosistema de educación online enfocado en cerrar la brecha digital, ofreciendo acceso continuo y flexible a cursos, programas y productos digitales desarrollados por expertos.</p>

                    <h3>Características de Universidad.Online®:</h3>
                    <ul>
                        <li><strong>Metodología innovadora:</strong> Aprendizaje asíncrono e inductivo, a tu propio ritmo</li>
                        <li><strong>Distribución:</strong> Los programas se comercializan a través de Hotmart®</li>
                        <li><strong>Certificación PLATA:</strong> Otorgada por el Centro de Educación y Liderazgo (CEL)</li>
                        <li><strong>Aval académico:</strong> Florida Global University (FGU) dentro de su Programa de Educación Continua</li>
                        <li><strong>Acreditación CertiProf®:</strong> Emite credenciales digitales verificables</li>
                        <li><strong>Reconocimiento mediático:</strong> Semana, Yahoo Finanzas, El Espectador, Europa Press, Agencia EFE</li>
                    </ul>

                    <h2>¿Por Qué Recomendamos Universidad.Online?</h2>
                    <p>Recomendamos Universidad.Online porque representa una alternativa real al modelo educativo tradicional:</p>
                    <ul>
                        <li>Formación práctica y aplicable al mundo real</li>
                        <li>Sin horarios obligatorios ni evaluaciones memorísticas</li>
                        <li>Acceso permanente a los contenidos</li>
                        <li>Certificaciones con reconocimiento internacional</li>
                        <li>Enfoque en habilidades para la economía digital</li>
                    </ul>

                    <h2>Comisiones de Afiliado</h2>
                    <p>Cuando haces clic en un enlace de afiliado y realizas una compra, recibimos una comisión. <strong>Esto no tiene ningún costo adicional para ti.</strong> El precio que pagas es exactamente el mismo que si accedieras directamente.</p>

                    <h2>Nuestro Compromiso Contigo</h2>
                    <p>Nuestro compromiso es siempre contigo, el lector:</p>
                    <ul>
                        <li><strong>Honestidad:</strong> Solo recomendamos lo que consideramos valioso</li>
                        <li><strong>Investigación:</strong> Analizamos cada formación antes de recomendarla</li>
                        <li><strong>Resultados reales:</strong> Nos basamos en casos de éxito verificables</li>
                        <li><strong>Tu beneficio primero:</strong> Nuestra reputación depende de tu éxito</li>
                    </ul>

                    <h2>Tu Derecho a Elegir</h2>
                    <p>Eres libre de:</p>
                    <ul>
                        <li>Usar o no usar nuestros enlaces de afiliado</li>
                        <li>Investigar por tu cuenta cualquier recomendación</li>
                        <li>Buscar alternativas</li>
                        <li>Contactarnos si tienes dudas sobre cualquier recomendación</li>
                    </ul>

                    <h2>Preguntas</h2>
                    <p>Si tienes alguna pregunta sobre nuestra página de afiliados o sobre cualquier recomendación específica, no dudes en contactarnos en: solucionesworld2016@gmail.com</p>

                    <p><strong>Gracias por tu confianza.</strong></p>

                    <div style="margin-top: 60px; padding-top: 40px; border-top: 2px solid var(--color-border);">
                        <h2 style="color: var(--color-accent); margin-bottom: 24px;">Sobre Universidad.Online®</h2>
                        <p style="font-size: 18px; line-height: 1.8; margin-bottom: 24px; color: var(--color-text);">
                            Universidad.Online® es una plataforma de educación digital disruptiva para hispanohablantes, enfocada en ofrecer formación práctica, flexible y accesible, distinta al modelo universitario tradicional.
                        </p>

                        <h3 style="margin-top: 32px; margin-bottom: 16px;">¿Qué es Universidad.Online®?</h3>
                        <p style="margin-bottom: 20px; line-height: 1.8;">
                            Es una plataforma de educación en línea orientada a reducir la brecha digital en el mundo hispanohablante mediante propuestas educativas disruptivas. Ofrece cursos, programas, seminarios, productos digitales y talleres creados por profesionales expertos en distintas áreas.
                        </p>

                        <h3 style="margin-top: 32px; margin-bottom: 16px;">Enfoque Educativo</h3>
                        <p style="margin-bottom: 20px; line-height: 1.8;">
                            Su metodología es asíncrona e inductiva, permitiendo aprender a tu propio ritmo a partir de experiencias prácticas y aplicables de inmediato. El objetivo no es memorizar para aprobar exámenes, sino desarrollar habilidades reales para transformar la vida personal, profesional y económica del estudiante.
                        </p>

                        <h3 style="margin-top: 32px; margin-bottom: 16px;">Modelo y Alianza Tecnológica</h3>
                        <p style="margin-bottom: 20px; line-height: 1.8;">
                            Promueve acceso libre, flexible y efectivo al conocimiento, sin barreras geográficas ni horarios rígidos, y alejado de modelos académicos considerados caducos. Mantiene una alianza estratégica con Hotmart® para distribuir productos digitales y garantizar una experiencia 100% online con acceso de por vida a los programas adquiridos.
                        </p>

                        <h3 style="margin-top: 32px; margin-bottom: 16px;">Reconocimientos y Avales</h3>
                        <p style="margin-bottom: 16px; line-height: 1.8;">
                            Ha sido mencionada y destacada en múltiples medios como Revista Semana, Yahoo Finanzas, El Espectador, Europa Press, Agencia EFE y otros, como referente de educación digital en Latinoamérica.
                        </p>
                        <p style="margin-bottom: 20px; line-height: 1.8;">
                            Cuenta con un certificado como aliado Plata: sus programas están certificados por el Centro de Educación y Liderazgo (CEL) y avalados por Florida Global University dentro de su Programa de Educación Continua, cumpliendo estándares del Estado de Florida.
                        </p>

                        <h3 style="margin-top: 32px; margin-bottom: 16px;">Certificaciones y Estándares</h3>
                        <p style="margin-bottom: 16px; line-height: 1.8;">
                            CertiProf® certifica que Universidad.Online® emite credenciales digitales verificables (insignias) y realiza procesos de certificación mediante evaluaciones que validan la apropiación del conocimiento.
                        </p>
                        <p style="margin-bottom: 20px; line-height: 1.8;">
                            Sus programas se declaran alineados con marcos de desarrollo de habilidades reconocidos mundialmente, como SFIA y marcos de la Oficina de Gobierno de Estados Unidos, elevando el estatus profesional de sus estudiantes.
                        </p>
                    </div>
                </div>
            </section>
        `;
    }
}

// Inicializar cuando el DOM esté listo
let globalNavigator = null;
document.addEventListener('DOMContentLoaded', () => {
    globalNavigator = new SPANavigator();
    window.navigator = globalNavigator; // Hacer accesible globalmente
});
