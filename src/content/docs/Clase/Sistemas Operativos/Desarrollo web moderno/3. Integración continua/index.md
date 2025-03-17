---
title: 3. Integración continua. GitHub Actions y Google Firebase
id: 400409d4f6
lastUpdated: 2025-03-17T19:16:26.000Z
pagefind: false
---

La **Integración Continua (CI)** es una práctica que automatiza la validación y despliegue de código en cada cambio. Con **GitHub Actions**, podemos configurar flujos de trabajo que ejecuten pruebas, construyan y desplieguen nuestra aplicación automáticamente.

En esta sección aprenderemos a:

- Configurar **GitHub Actions** para CI/CD.
- Desplegar automáticamente nuestro proyecto en **Firebase** cuando se hagan cambios en `main`.

## 3.1 Introducción a GitHub Actions

**GitHub Actions** es una plataforma de automatización que permite definir flujos de trabajo (workflows) basados en eventos dentro de un repositorio de GitHub.

Un **workflow** en GitHub Actions consta de:

- **Eventos:** disparadores que inician el flujo de trabajo (ej. `push`, `pull_request`).
- **Jobs:** tareas ejecutadas en máquinas virtuales.
- **Steps:** pasos individuales dentro de un job.
- **Runners:** entornos donde se ejecutan los jobs.

## 3.2 Configuración de GitHub Actions para Despliegue en Firebase

Vamos a configurar un **workflow** en GitHub Actions para que, cada vez que haya cambios en la rama `main`, se despliegue automáticamente en **Firebase Hosting**.

### **Configurar Firebase en el Proyecto**

1. Instalar la CLI de Firebase:
    
    ```sh
    npm install -g firebase-tools
    ```
    
2. Iniciar sesión en Firebase:
    
    ```sh
    firebase login
    ```
    
3. Inicializar Firebase en el proyecto:
    
    ```sh
    firebase init hosting
    ```
    
    - Selecciona tu proyecto en Firebase.
    - Define la carpeta de tu app (ej. `build` para React).
    - Configura como SPA si corresponde.
4. Para probar el despliegue manualmente, ejecuta:
    
    ```sh
    firebase deploy
    ```

### **Crear un Archivo de Workflow en GitHub Actions**

Dentro de tu repositorio de GitHub, crea la carpeta `.github/workflows/` y dentro un archivo `deploy.yml` con el siguiente contenido:

```yaml
name: Deploy a Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout del código
        uses: actions/checkout@v3
      
      - name: Instalar Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Instalar dependencias
        run: npm install

      - name: Construir la aplicación
        run: npm run build

      - name: Desplegar en Firebase
        uses: w9jds/firebase-action@v12
        with:
          args: deploy --only hosting
        env:
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}
```

### **Configurar el Token de Firebase en GitHub**

Para que GitHub pueda acceder a Firebase, debemos generar un token de autenticación:

1. Ejecuta en la terminal:
    
    ```sh
    firebase login:ci
    ```
    
2. Copia el token generado.
3. En GitHub, ve a **Settings > Secrets and variables > Actions**.
4. Crea un **Secret** llamado `FIREBASE_TOKEN` y pega el token generado.

## 3.3 Explicación del Workflow

- **`on: push` en `main`**: El flujo se ejecuta cada vez que hay un `push` en la rama `main`.
- **Instala Node.js**: Usa la versión 18 para construir la app.
- **Instala dependencias**: Ejecuta `npm install`.
- **Construye la aplicación**: Ejecuta `npm run build` para generar los archivos estáticos.
- **Despliega en Firebase**: Usa `firebase-action` con el token de autenticación.

## 3.4 Verificar el Despliegue

Cada vez que hagas `git push` en `main`, GitHub Actions ejecutará el workflow. Puedes revisar el estado en la pestaña **Actions** de tu repositorio en GitHub.

Para verificar el despliegue en producción:

```sh
firebase hosting:channel:list
```

Tu sitio estará disponible en la URL proporcionada por Firebase Hosting.
