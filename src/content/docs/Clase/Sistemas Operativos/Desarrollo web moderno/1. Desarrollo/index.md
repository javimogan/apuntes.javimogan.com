---
title: 1. Desarrollo
id: a01e16bc6a
lastUpdated: 2025-10-27T12:02:46.000Z
pagefind: false
---

En esta primera parte, aprenderemos los fundamentos del desarrollo web y construiremos nuestra primera página web utilizando **React.js** y **TailwindCSS**. Empezaremos desde lo más básico:

## 1.1 Instalación de Node.js y configuración del entorno

Antes de empezar con React, necesitamos instalar **Node.js**, que es un entorno de ejecución para JavaScript en el servidor. También instalaremos **npm (Node Package Manager)**, que nos permitirá gestionar las dependencias de nuestro proyecto.

### Instalación de Node.js

1. Ve al sitio oficial de [Node.js](https://nodejs.org/) y descarga la versión estable (LTS).
2. Instala el archivo descargado siguiendo las instrucciones del instalador.
3. Para verificar que la instalación fue correcta, abre una terminal y ejecuta:
    ```sh
    node -v
    ```
	Esto mostrará la versión de Node instalada.
4. También verifica la instalación de npm con:
    ```sh
    npm -v
    ```

## 1.2 Introducción a React.js y TypeScript

Ahora que tenemos Node.js instalado, es momento de conocer **React.js** y **TypeScript**.

**React.js** es una biblioteca de JavaScript para construir interfaces de usuario interactivas y reutilizables. **TypeScript** es un superconjunto de JavaScript que nos permite trabajar con tipado estático, lo que hace que nuestro código sea más seguro y fácil de mantener.

### Creación de nuestro primer proyecto en React con TypeScript

Para crear un proyecto en React con TypeScript, seguimos estos pasos:

1. Abre una terminal y ejecuta el siguiente comando para crear un nuevo proyecto:
    
    ```sh
	    npx create-react-router@latest my-react-router-app
```

Donde `my-react-router-app` es el nombre del proyecto.

2. Ingresa a la carpeta del proyecto:
    
app mi-proyecto --template typescript
    ```
    
2. Ingresa a la carpeta del proyecto:
    
    ```sh
    cd my-react-router-appi-proyecto
    ```
    
3. Inicia el servidor de desarrollo:
    
    ```sh
    npm i
    npm run devstart
    ```
    
    Esto abrirá una nueva pestaña en el navegador con la aplicación React en ejecución.

## 1.3 Instalación y configuración de TailwindCSS

**TailwindCSS** es un framework de estilos basado en clases utilitarias que nos permite diseñar páginas web de manera rápida y eficiente.

Para instalar TailwindCSS en nuestro proyecto, seguimos estos pasos:

1. Instalar Tailwind y sus dependencias:
    
    ```sh
	    cd my-react-router-app
npm install -D tailwindcss @tailwindcss/vite
    ```
    
2. Añadir el plugin ``@tailwindcss/vite`` en el fichero de configuración de Vite ``vitepostcss autoprefixer
    ```
    
32. Inicia el servidor de desarrollo:
    lizar Tailwind en el proyecto:
    
    ```sh
    npx tailwindcss init -p
    ```
    
3. Configurar Tailwind en el archivo `tailwind.config.tjs``.:
    
    ```typescript ins={7}
    import { reactRouter } from "@react-router/dev/vite";
	import { defineConfig } from "vite";
	import tsconfigPaths from "vite-tsconfig-paths";
	import tailwindcss from "@tailwindcss/vite";
	export default defineConfig({
	plugins: [
		tailwindcss(),
		reactRouter(),
		tsconfigPaths(),
	],
	})js
    module.exports = {
      content: ["./src/**/*.{js,jsx,ts,tsx}"],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    ```sh
    npm i
    npm run dev
    ```
    
Esto abrirá una nueva pestaña en el navegador con la aplicación React en ejecución
34. Agregar Tailwind a los estilos globales en `./app/appsrc/index.css`:
    
    ```css
    @import "tailwindcss"tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```
    

Ahora podemos usar clases de TailwindCSS en nuestros componentes de React para diseñar nuestra primera página web.

## 1.4 Creación de nuestra primera página web

Con la configuración lista, crearemos una página sencilla con React y TailwindCSS. Editaremos `src/App.tsx` para mostrar un diseño básico:

```tsx
import React from 'react';

export default function Home()const App: React.FC = () => {
	  return (
	
		    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-34xl font-bold underline">
		
		Hello world!
		
		</h1>
	
	)
}text-blue-500">¡Hola, mundo en React con TailwindCSS!</h1>
    </div>
  );
};

export default App;
```

Con esta base, ya hemos configurado nuestro entorno de desarrollo y hemos construido nuestra primera página web con React, TypeScript y TailwindCSS. En la siguiente fase, aprenderemos sobre **Git y control de versiones** para gestionar nuestro código de manera eficiente.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMTE2NDk4NzNdfQ==
-->
