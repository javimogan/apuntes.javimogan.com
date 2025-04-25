---
title: 1. Desarrollo
id: a01e16bc6a
lastUpdated: 2025-04-25T17:38:23.000Z
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
    
```sh
    cd my-react-router-app
```
    
3. Inicia el servidor de desarrollo:
    
    ```sh
    npm i
    npm run dev
    ```
    
Esto abrirá una nueva pestaña en el navegador con la aplicación React en ejecución.
