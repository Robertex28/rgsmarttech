# CONTEXTO RGSMARTTECH — Sesión 2 (Migración a Vercel + Mejoras)

**Fecha:** 17 de mayo de 2026
**Estado:** Migrado a Vercel, pendiente cambio de nombre + 10 mejoras
**Sesión anterior:** Migración Netlify → Vercel (este chat)

---

## 📍 ESTADO ACTUAL DEL PROYECTO

### Hosting y deploy
- **URL temporal:** `contenido-five.vercel.app` (Vercel asignó "contenido" porque era el nombre de la carpeta)
- **URL objetivo:** `rgsmarttech.vercel.app` (cambio en proceso desde Vercel Dashboard → Settings → General → Project Name)
- **Plataforma anterior:** `rgsmarttech.netlify.app` (aún activa, hay que desconectar)
- **Repo:** GitHub `Robertex28/rgsmarttech` (rama `main`)
- **Auto-deploy:** ACTIVO — cualquier push a `main` despliega automático
- **Path local:** `D:\RGSmart\contenido\`

### Stack actual confirmado
- HTML/CSS/JS puro (sin frameworks)
- Sin Firebase ni backend
- Formulario: **Make.com webhook → Gmail** (operativo)
- Webhook URL: `https://hook.us2.make.com/08jnza29s3xt5o8rxlei75l29hrc4gte`
- Make Scenario: "Integration Webhooks, Gmail" — Toggle "Immediately as data arrives" ACTIVO

### Estructura limpia (9 archivos)
```
D:\RGSmart\contenido\
├── .gitignore
├── index.html
├── llms.txt
├── vercel.json
├── assets/
│   ├── video-hero.mp4
│   ├── css/style.css
│   ├── img/icono_solo.png
│   ├── img/logo.png
│   └── js/main.js
└── pages/
    └── gracias.html
```

### Headers de seguridad (vercel.json)
✅ X-Frame-Options: SAMEORIGIN
✅ X-Content-Type-Options: nosniff
✅ Referrer-Policy: strict-origin-when-cross-origin
✅ Permissions-Policy: geolocation=(), microphone=(), camera=()
✅ HSTS: max-age=31536000; includeSubDomains; preload
✅ CSP: configurado con whitelist para Make.com

---

## 🎯 AUDITORÍA — 10 MEJORAS PENDIENTES

### Prioridad ALTA 🔴

**1. Menú hamburguesa móvil**
- Problema: nav links desaparecen en pantallas <768px, no hay forma de navegar
- Solución: botón hamburguesa que despliegue menú overlay
- Archivos: `index.html` (HTML + CSS + JS inline)

**2. Servicios faltantes en producción**
- Problema: la versión live tiene 4 servicios, el código local tiene 6
- Faltan: "Páginas Web Profesionales" + "Automatizaciones con IA"
- Solución: hacer push del código local actual (ya están agregados)
- Verificar al deployar

**3. Corregir contador hero**
- Problema: dice "4 áreas de servicio" pero son 6
- Solución: cambiar texto `<div class="stat-n">4</div>` → `6` en `index.html`

**4. Rate limiting en Make.com**
- Problema: el webhook URL es visible en JS del cliente, vulnerable a spam
- Solución en Make.com:
  - Agregar módulo "Filter" después del webhook
  - Validar campos requeridos
  - Configurar throttling: máximo 5 ejecuciones por minuto del mismo IP
  - Opcional: API Key authentication (header `x-make-apikey`)
- Considerar usar el campo honeypot `bot-field` como filtro de descarte

### Prioridad MEDIA 🟡

**5. og:image para previews en redes**
- Problema: al compartir el link en WhatsApp/Facebook no aparece imagen
- Solución: crear imagen 1200×630px con branding y agregar:
  ```html
  <meta property="og:image" content="https://rgsmarttech.vercel.app/assets/img/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:url" content="https://rgsmarttech.vercel.app">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  ```

**6. sitemap.xml + robots.txt**
- Problema: SEO comprometido, bots no tienen guía
- Archivos a crear:
  - `sitemap.xml` con URL principal y secciones
  - `robots.txt` con allow general + disallow de carpetas internas si las hubiera

**7. Schema.org LocalBusiness**
- Problema: pierdes ranking en búsquedas locales de Barquisimeto
- Solución: JSON-LD en `<head>` con:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "R.G Smart Technology",
    "address": { "addressLocality": "Barquisimeto", "addressCountry": "VE" },
    "telephone": "+584120666045",
    "openingHours": "Mo-Sa",
    "priceRange": "$$"
  }
  ```

**8. Foto profesional tuya**
- Problema: servicio personal sin rostro reduce confianza
- Solución: agregar sección "Sobre el técnico" con foto + bio breve

### Prioridad BAJA 🟢

**9. Copyright año 2026**
- Cambiar `© 2025` → `© 2026` en footer

**10. Imagen fallback del video hero**
- Problema: pantalla negra mientras carga el video en conexiones lentas
- Solución: agregar atributo `poster="assets/img/hero-fallback.jpg"` al `<video>`

---

## 🔄 FLUJO DE TRABAJO ESTABLECIDO (Roberto + Claude.ai)

**Recordatorio de las leyes vigentes:**

- **LEY FLUJO EQUIPO:** Claude.ai = CEREBRO (plan, MCP, vision, CVs). Claude Code + DeepSeek = MANOS (construir, ejecutar). Roberto = PUENTE
- **PROTOCOLO INFRAESTRUCTURA:** SIEMPRE evaluar plataforma, límites, código privado/público, bandwidth, costo, plan B antes de deploy
- **LEYES SEGURIDAD 2026:** Zero-Trust, vercel.json con headers obligatorios, npm audit 0 High/Critical antes de deploy
- **COMPORTAMIENTO CLAUDE.AI:** No ejecutar sin preguntar primero, dar prompts copy-paste exactos para Claude Code, aprender de errores
- **PROYECTOS WEB:** Aprobar sección por sección, backup antes de cada sesión, PowerShell Replace para edición HTML — nunca FileSystem write

---

## 📋 PLAN DE EJECUCIÓN POR SESIÓN

### Sesión 1 — Bloqueadores críticos (30-45 min)
**Objetivo:** Resolver lo que afecta funcionalidad y experiencia del usuario móvil

1. ✅ Cambiar nombre de proyecto en Vercel (manual desde dashboard) — Roberto confirma
2. 🔧 Push del código local con los 6 servicios (deploy automático)
3. 🔧 Corregir contador "4" → "6" en hero stats
4. 🔧 Implementar menú hamburguesa móvil
5. 🔧 Cambiar copyright 2025 → 2026

**Resultado esperado:** Sitio operativo con todos los servicios visibles y navegable en móvil

### Sesión 2 — Seguridad y anti-spam (20-30 min)
**Objetivo:** Proteger el formulario y prevenir abuso

1. 🔧 Configurar filtro en Make.com (validación de campos)
2. 🔧 Configurar rate limiting / throttling en Make.com
3. 🔧 Reforzar honeypot en el formulario
4. 🔧 Probar con submission válida + simulada de spam

**Resultado esperado:** Formulario protegido contra spam y abuso del webhook

### Sesión 3 — SEO y visibilidad (30-40 min)
**Objetivo:** Mejorar posicionamiento local

1. 🔧 Crear `sitemap.xml`
2. 🔧 Crear `robots.txt`
3. 🔧 Implementar Schema.org LocalBusiness
4. 🔧 Crear y agregar og:image (1200×630)
5. 🔧 Agregar meta tags Twitter Card

**Resultado esperado:** Mejor indexación, preview profesional al compartir el link

### Sesión 4 — Contenido y confianza (45-60 min)
**Objetivo:** Humanizar la marca

1. 🔧 Diseñar sección "Sobre el técnico" con foto
2. 🔧 Considerar agregar testimonios reales
3. 🔧 Agregar imagen fallback del video hero
4. 🔧 Revisar `gracias.html` y darle diseño coherente

**Resultado esperado:** Sitio con identidad personal clara, mayor conversión

### Sesión 5 — Cierre y limpieza (15-20 min)
**Objetivo:** Cerrar la migración completa

1. 🔧 Desconectar GitHub del proyecto en Netlify (cuenta vieja)
2. 🔧 Eliminar sitio de Netlify
3. 🔧 Actualizar enlaces en Instagram/Facebook/redes
4. 🔧 Notificar el cambio de URL si aplica (probablemente no, ya que era poco difundida)
5. 🔧 Verificar que todo funciona desde dispositivos diferentes

**Resultado esperado:** Migración 100% cerrada, sin dependencias de Netlify

---

## 🚨 RECORDATORIOS CRÍTICOS

### Antes de cada sesión
- Verificar que el nombre de proyecto Vercel ya cambió a `rgsmarttech`
- Confirmar que la URL final es `rgsmarttech.vercel.app`
- Hacer commit del estado actual antes de tocar nada (backup en main)

### Durante las modificaciones
- Editar SOLO en el código local (`D:\RGSmart\contenido\`)
- Probar cambios visualmente antes de push
- Hacer commits descriptivos: `fix: menu hamburguesa movil`, `feat: schema localbusiness`
- Después de cada push, esperar 30s y verificar el deploy en Vercel

### Validación final por sección
- Probar en móvil real (no solo DevTools)
- Verificar formulario llenando y enviando
- Confirmar que el email llega a Gmail vía Make
- Verificar headers de seguridad en `securityheaders.com`

---

## 🎬 PROMPT INICIAL PARA NUEVO CHAT

```
Hola, voy a continuar el trabajo en mi página rgsmarttech.

Estado:
- Ya migré de Netlify a Vercel
- Nombre actual del proyecto: contenido-five.vercel.app
- Estoy cambiando manualmente a rgsmarttech.vercel.app desde el dashboard
- Repo: github.com/Robertex28/rgsmarttech (rama main, auto-deploy activo)
- Path local: D:\RGSmart\contenido\
- Formulario funcional vía Make.com webhook → Gmail

Tengo un plan de trabajo guardado en:
D:\RGSmart\contenido\CONTEXTO_RGSMARTTECH_SESION2.md

Léelo y arrancamos por la Sesión 1 del plan.
Aplica el skill seguridad-web y constructor-proyectos-web.
Respeta las leyes establecidas: protocolo infraestructura, leyes seguridad 2026, ley flujo equipo.
```

---

## 📊 MÉTRICAS DE ÉXITO

Al cerrar las 5 sesiones, debe cumplirse:

- ✅ Sitio en `rgsmarttech.vercel.app` (no `contenido-five`)
- ✅ Navegable en móvil con menú funcional
- ✅ 6 servicios visibles
- ✅ Formulario protegido con rate limiting
- ✅ Schema.org + sitemap + robots = listos
- ✅ og:image apareciendo al compartir
- ✅ Headers A+ en securityheaders.com
- ✅ Netlify completamente desconectado
- ✅ Cero archivos basura en el repo

---

## 📌 NOTAS FINALES

- El cliente (uso propio) no necesita aviso formal de cambio de URL — es tu propia página
- La cuenta vieja de Netlify aún tiene `offset-hermanos` listo para eliminar
- Make.com plan gratuito: 1000 operaciones/mes — más que suficiente
- Vercel plan Hobby: 100GB bandwidth/mes — suficiente para tráfico actual y proyectado
- Considerar a futuro: comprar dominio propio `rgsmarttech.com` o similar (~$10/año)

**Recordatorio del error aprendido hoy:**
> Antes de cualquier deploy de cliente, SIEMPRE evaluar: plataforma, límites del plan gratuito vs tráfico esperado, código privado/público, bandwidth, costo a mediano plazo, plan B si falla. Si el cliente pide "gratis", plantear limitantes honestamente antes de proceder.
