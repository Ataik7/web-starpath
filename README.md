<div align="center">

  # 🚀 Starpath RPG - Web Oficial

  **Portal oficial, gestor de cuentas y lanzador para el universo Starpath.**

  [![Angular](https://img.shields.io/badge/Angular-17%2B-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
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
* **🎨 Diseño Pixel Art Moderno:** Una interfaz UI/UX única que respira la identidad del juego, utilizando **CSS Variables**, Flexbox y Grid para un diseño totalmente responsivo.
* **👤 HUD de Usuario:** Barra de navegación inteligente que muestra el estado de la sesión y el avatar del usuario en tiempo real.

---

## 🛠️ Tecnologías Utilizadas

El proyecto ha sido construido utilizando las últimas prácticas de desarrollo web moderno:

| Categoría | Tecnología |
| :--- | :--- |
| **Framework** | Angular 17+ (Standalone Components) |
| **Lenguaje** | TypeScript |
| **Estilos** | CSS3 (Variables, Flexbox, Grid), Google Fonts (Lato, Press Start 2P) |
| **Routing** | Angular Router |
| **Backend / BaaS** | Supabase (Authentication & Database) |

---

## 🚀 Instalación y Configuración

Sigue estos pasos para levantar el proyecto en tu entorno local:

### 📋 Prerrequisitos

* **Node.js:** v18 o superior
* **npm:** v9 o superior
* **Angular CLI:** v17 o superior

### 🔧 Pasos de Instalación

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/Ataik7/web-starpath.git](https://github.com/Ataik7/web-starpath.git)
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
├── components/   # Componentes reutilizables (Navbar, Footer, ArticleCard...)
├── pages/        # Vistas principales (Home, Login, Register, News...)
├── services/     # Lógica de negocio y comunicación de datos (Auth, Supabase...)
└── models/       # Interfaces y tipos TypeScript (User, Article...)
```
## 👥 Autores

Este proyecto ha sido desarrollado con ❤️ por:

* **Iván Gastineau** - *Arquitectura Frontend, UI/UX (CSS) & Integración.*
* **Pablo Nicolás** - *Lógica Backend (Supabase), Gestión de Datos & Estructura.*