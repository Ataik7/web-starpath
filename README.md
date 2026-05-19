<div align="center">

  # 🚀 Starpath RPG - Web Oficial

  **Portal oficial, gestor de cuentas y lanzador para el universo Starpath.**

  [![Angular](https://img.shields.io/badge/Angular-21%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)

</div>

---

## 📖 Descripción

**Starpath Web** es una aplicación SPA (Single Page Application) desarrollada en Angular que actúa como el nexo central para los jugadores de "Starpath".

Esta plataforma permite a los usuarios sumergirse en el ecosistema del juego antes de siquiera lanzarlo, ofreciendo herramientas para gestionar su identidad, mantenerse informados y acceder al cliente de juego.

## ✨ Características Principales

* **⚡ Navegación SPA:** Experiencia fluida sin recargas completas de página gracias a la potencia de **Angular Router**.
* **🔐 Autenticación Segura:** Sistema robusto de Login y Registro integrado con **Supabase** (Auth & DB), gestionando tokens y persistencia de sesión de forma transparente.
* **📡 Datos Dinámicos:** Sección de noticias viva, alimentada por servicios (`MockDataService`) y construida con una arquitectura de componentes reutilizables (Comunicación Padre-Hijo).
* **🔍 Buscador en tiempo real:** Filtrado de noticias por título y subtítulo sin recargar la página, con contador de resultados.
* **🎨 Diseño Pixel Art Moderno:** Una interfaz UI/UX única que respira la identidad del juego, utilizando **CSS Variables**, Flexbox y Grid para un diseño totalmente responsivo.
* **📱 Navbar adaptable:** Menú hamburguesa para dispositivos móviles con apertura y cierre automático al navegar.
* **♿ Accesibilidad WCAG:** Skip link, navegación completa por teclado con `:focus-visible`, atributos ARIA en formularios, emojis con `role="img"` y etiquetas `visually-hidden`.
* **❓ Centro de ayuda:** Página `/help` con preguntas frecuentes desplegables y accesos directos a las secciones principales.
* **👤 Perfiles de Usuario:** Página de perfil con edición de nombre, bio y foto de avatar. Imagen almacenada en Supabase Storage con sincronización en tiempo real entre el perfil y la barra de navegación.

---

## 🛠️ Tecnologías Utilizadas

El proyecto ha sido construido utilizando las últimas prácticas de desarrollo web moderno:

| Categoría | Tecnología |
| :--- | :--- |
| **Framework** | Angular 21+ (Standalone Components) |
| **Lenguaje** | TypeScript |
| **Estilos** | CSS3 (Variables, Flexbox, Grid), Google Fonts (Lato, Press Start 2P) |
| **Routing** | Angular Router |
| **Backend / BaaS** | Supabase (Authentication, Database & Storage) |

---

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 📋 Prerrequisitos

* **Node.js:** v18 o superior
* **npm:** v9 o superior
* **Angular CLI:** v21 o superior

### 🔧 Pasos de Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Ataik7/web-starpath.git
    cd web-starpath
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno (Supabase):**
    Asegúrate de tener el archivo `src/app/core/services/supabase.config.ts` con tus credenciales de proyecto:
    ```typescript
    export const environment = {
      production: false,
      supabaseUrl: 'TU_SUPABASE_URL',
      supabaseKey: 'TU_SUPABASE_ANON_KEY'
    };
    ```

4.  **Ejecutar el servidor de desarrollo:**
    ```bash
    ng serve -o
    ```

    La aplicación estará disponible en `http://localhost:4200`.

---

## 📂 Estructura del Proyecto

```text
src/app/
├── core/                  # Lógica central (servicios, guards, configuración)
│   └── services/          # AuthService, MockDataService, AuthGuard, supabase.config
├── features/              # Páginas de la aplicación
│   └── pages/             # Home, Login, Register, News, Contact, Download, Help, Profile...
├── shared/                # Componentes reutilizables
│   └── components/        # Navbar, Footer, ArticleCard
├── models/                # Interfaces TypeScript (Article...)
└── routes/                # Configuración de Angular Router
```
## 👥 Autores

Este proyecto ha sido desarrollado con ❤️ por:

* **Iván Gastineau** - *Arquitectura Frontend, UI/UX (CSS) & Integración de componentes.*
* **Pablo Nicolás** - *Lógica Backend (Supabase), Gestión de Datos & Estructura.*
