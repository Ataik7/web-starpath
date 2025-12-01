Starpath RPG - Web Oficial

Descripción

Aplicación web SPA (Single Page Application) desarrollada en Angular que sirve como portal oficial, gestor de cuentas y lanzador para el videojuego de rol "Starpath". La plataforma permite a los usuarios registrarse, iniciar sesión, consultar noticias, descargar el cliente del juego y gestionar su perfil de usuario.

Características Principales

Navegación SPA: Navegación fluida entre secciones sin recargas completas gracias a Angular Router.

Autenticación Segura: Sistema completo de Login y Registro conectado a Supabase (Base de Datos en la nube), con gestión de tokens y persistencia de sesión.

Datos Dinámicos: Sección de noticias alimentada por servicios (MockDataService) y componentes reutilizables con comunicación Padre-Hijo (@Input).

Diseño Coherente: Interfaz de usuario personalizada con temática "Pixel Art Moderno", utilizando variables CSS globales y diseño responsivo (Flexbox/Grid).

Perfil de Usuario: Visualización del estado de autenticación en la barra de navegación (HUD) con avatar generado dinámicamente.

Tecnologías Utilizadas

Framework: Angular 17+ (Standalone Components)

Lenguaje: TypeScript

Styling: CSS3 (Variables, Flexbox, Grid), Fuentes Google Fonts (Lato, Press Start 2P)

Routing: Angular Router

Backend: Supabase (Auth & Database)

Instalación y configuración

Pasos necesarios para ejecutar el proyecto en local:

Prerrequisitos

Node.js 18+

npm 9+

Angular CLI 17+

Pasos de Instalación

Clonar el repositorio:

git clone [https://github.com/TU_USUARIO/web-starpath.git](https://github.com/TU_USUARIO/web-starpath.git)
cd web-starpath


Instalar dependencias:

npm install


Configurar Supabase:
Asegúrate de tener el archivo src/app/core/services/supabase.config.ts con tus credenciales de proyecto (URL y Anon Key).

Ejecutar el servidor de desarrollo:

ng serve -o


La aplicación estará disponible en http://localhost:4200.

Estructura del Proyecto

src/app/components/: Componentes reutilizables (Navbar, Footer, ArticleCard).

src/app/pages/: Componentes de página (Home, Login, Register, News, etc.).

src/app/services/: Servicios de lógica y datos (Auth, MockData, Supabase).

src/app/models/: Definiciones de tipos e interfaces (Article).

Autores

Iván Gastineau: Arquitectura Frontend, Diseño UI/UX (CSS), Integración de Componentes.

Pablo Nicolás: Lógica de Backend (Supabase), Gestión de Datos, Estructura HTML Base.

