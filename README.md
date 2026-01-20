# KrisKNCreative - Blog Profesional de Formación Digital

Blog minimalista y profesional especializado en formación digital, negocios online, marketing digital e inteligencia artificial.

## 🚀 Características

- **Diseño Minimalista**: Colores oscuros profesionales, navegación intuitiva
- **Navegación SPA**: Experiencia fluida sin recargas de página
- **SEO Optimizado**: Artículos estructurados para máximo posicionamiento
- **Formulario de Contacto**: Integración con Gmail API para envío automático
- **Categorías Organizadas**: Programas Premium, Certificaciones, Productos Digitales
- **Responsive**: Optimizado para todos los dispositivos
- **CTAs Estratégicos**: Botones de llamada a la acción en cada artículo

## 📋 Requisitos Previos

- **Python 3.8+**
- **Navegador web moderno** (Chrome, Firefox, Edge)
- **Cuenta de Gmail** con permisos de API

## 🔧 Instalación

### 1. Instalar Dependencias de Python

```bash
pip install -r requirements.txt
```

### 2. Configurar Gmail API

Las credenciales de Gmail ya están en la carpeta `Credenciales DigitalSPM/`.

**En la primera ejecución**, el script abrirá una ventana del navegador para que autorices el acceso a Gmail. Esto solo sucede una vez.

## 🎯 Uso

### Iniciar el Servidor Backend

```bash
python server.py
```

El servidor se ejecutará en `http://localhost:5000`

### Abrir el Sitio Web

1. Abre `index.html` en tu navegador
2. O usa un servidor local (recomendado):

**Opción Python:**
```bash
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Opción Node.js (si tienes instalado):**
```bash
npx http-server -p 8000
```

## 📁 Estructura del Proyecto

```
├── index.html                  # Página principal
├── css/
│   └── styles.css             # Estilos minimalistas
├── js/
│   ├── app.js                 # Funcionalidades generales
│   ├── navigation.js          # Sistema SPA y navegación
│   └── articles.js            # Biblioteca de artículos completos
├── IMG/
│   ├── LOGO.png              # Logo del blog
│   └── SOBRE MI.png          # Imagen perfil
├── Credenciales DigitalSPM/
│   └── client_secret_...json  # Credenciales Gmail API
├── server.py                  # Backend Flask
├── requirements.txt           # Dependencias Python
└── README.md                  # Este archivo
```

## 📧 Configuración del Formulario de Contacto

El formulario envía emails automáticamente a: **solucionesworld2016@gmail.com**

### Primera Vez que Ejecutas el Servidor

1. Ejecuta `python server.py`
2. Se abrirá tu navegador pidiendo autorización de Gmail
3. Inicia sesión con la cuenta asociada a las credenciales
4. Acepta los permisos
5. Se creará un archivo `token.pickle` para futuras ejecuciones

## 🎨 Personalización

### Colores

Edita las variables CSS en `css/styles.css`:

```css
:root {
    --color-primary: #1a1a2e;
    --color-accent: #0f4c75;
    --color-highlight: #3282b8;
    /* ... más colores */
}
```

### Agregar Nuevos Artículos

Edita `js/articles.js` y añade tu artículo en el objeto `ARTICLES`:

```javascript
ARTICLES['tu-nuevo-articulo'] = {
    title: 'Título del Artículo',
    category: 'Categoría',
    date: 'Fecha',
    readTime: '10 min',
    description: 'Descripción breve',
    content: `Contenido HTML completo...`,
    ctaLink: 'https://enlace-afiliado.com'
};
```

### Cambiar Enlaces de CTAs

Los enlaces de afiliado están en cada artículo dentro de `js/articles.js`. Busca `ctaLink` y actualiza con tus enlaces.

## 📱 Páginas del Blog

### Públicas
- **Inicio**: Hero + Artículos destacados
- **Quién Soy**: Historia de Kristian
- **Blog**: Todos los artículos con filtros
- **Formaciones**: Menú desplegable con categorías
  - Programas Premium
  - Certificaciones Internacionales
  - Productos Digitales
  - Marketing Digital
  - Negocios con IA
  - Ventas Online
- **Contacto**: Formulario funcional

### Legales
- **Política de Privacidad**
- **Política de Cookies**
- **Aviso Legal**
- **Programa de Afiliados**

## 🔐 Seguridad

- Las credenciales de Gmail están en archivo local (NO subir a GitHub público)
- El token de acceso se genera localmente
- Validación de datos en el formulario de contacto
- CORS configurado para desarrollo local

## ⚡ Optimización SEO

### Meta Tags
Cada página tiene meta tags optimizados en el JavaScript que genera el contenido.

### Artículos SEO
- Títulos H1, H2, H3 bien estructurados
- Palabras clave relevantes
- Descripción meta única por artículo
- URLs semánticas
- CTAs estratégicos

### Performance
- CSS minimalista
- JavaScript modular
- Imágenes optimizadas (recomendado WebP)
- Lazy loading en imágenes (implementar si es necesario)

## 🚨 Solución de Problemas

### El formulario no envía emails

1. Verifica que el servidor Python esté ejecutándose
2. Revisa la consola del navegador por errores CORS
3. Asegúrate de haber autorizado Gmail API correctamente
4. Verifica que el archivo `token.pickle` exista

### El servidor Python da error

```bash
# Reinstalar dependencias
pip install --upgrade -r requirements.txt

# Verificar versión de Python
python --version  # Debe ser 3.8+
```

### El navegador no carga los estilos

- Verifica que estés usando un servidor web (no abrir archivo directamente)
- Limpia la caché del navegador
- Verifica rutas relativas en index.html

## 📝 Notas Importantes

1. **Primera ejecución del servidor**: Requiere autorización manual de Gmail
2. **Desarrollo local**: Usa `python -m http.server` para servir archivos
3. **Producción**: Sube a un hosting con soporte PHP/Python o usa Netlify/Vercel
4. **Enlaces de afiliado**: Recuerda actualizar todos los CTAs con tus links reales
5. **Imágenes**: Asegúrate de tener LOGO.png y SOBRE MI.png en la carpeta IMG/

## 🎉 Próximos Pasos

1. **Añade más artículos** en `js/articles.js`
2. **Personaliza los colores** según tu marca
3. **Actualiza enlaces de afiliado** en todos los CTAs
4. **Optimiza imágenes** para carga más rápida
5. **Implementa analytics** (Google Analytics, Plausible, etc.)
6. **Configura dominio propio** cuando estés listo

## 📞 Soporte

Para cualquier consulta:
- Email: solucionesworld2016@gmail.com

## 📄 Licencia

© 2026 KrisKNCreative - Todos los derechos reservados

---

**¡Listo para empezar!** 🚀

Ejecuta `python server.py` y abre `index.html` en tu navegador.
