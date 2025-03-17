---
title: Control de versiones con Git
id: 8160a453d7
lastUpdated: 2025-03-17T19:08:45.000Z
pagefind: false
---
El control de versiones es una parte fundamental del desarrollo de software. Nos permite gestionar los cambios en el código, colaborar con otros desarrolladores y mantener un historial de modificaciones. En esta sección aprenderemos desde cero qué es **Git**, cómo instalarlo y cómo utilizar **GitHub** para gestionar nuestros proyectos.

## 2.1 ¿Qué es Git?

**Git** es un sistema de control de versiones distribuido que permite registrar cambios en el código y coordinar el trabajo entre varios desarrolladores. Con Git podemos:

- Hacer un seguimiento de los cambios en los archivos.
- Volver a versiones anteriores del código si es necesario.
- Trabajar en paralelo con otros desarrolladores sin conflictos.
- Guardar nuestro código en repositorios remotos como **GitHub**.

## 2.2 Instalación de Git

Para comenzar a usar Git, primero debemos instalarlo en nuestro sistema.


### Linux (Ubuntu/Debian)

1. Ejecuta en la terminal:
    
    ```sh
    sudo apt update
    sudo apt install git
    ```
    
2. Verifica la instalación con:
    
    ```sh
    git --version
    ```

## 2.3 Configuración inicial de Git

Después de instalar Git, debemos configurarlo con nuestro nombre y correo electrónico. Esto es necesario para registrar correctamente nuestras contribuciones.

```sh
 git config --global user.name "Tu Nombre"
 git config --global user.email "tuemail@example.com"
```

Para verificar la configuración:

```sh
 git config --list
```

## 2.4 Primeros pasos con Git

### Crear un nuevo repositorio

Para comenzar a usar Git en nuestro proyecto, debemos inicializar un repositorio dentro de la carpeta del proyecto:

```sh
cd mi-proyecto
 git init
```

Este comando creará una carpeta oculta `.git`, que contiene toda la información del control de versiones.

### Añadir archivos al repositorio

Para agregar archivos al control de versiones, usamos:

```sh
 git add .
```

Esto añade todos los archivos nuevos o modificados al área de preparación.

### Guardar cambios en Git

Para guardar los cambios en el historial de Git, realizamos un **commit**:

```sh
 git commit -m "Primer commit"
```

Cada commit guarda un punto en la historia del proyecto al que podemos volver en el futuro.

## 2.5 Uso de GitHub

### Crear una cuenta en GitHub

Para subir nuestro código a un repositorio remoto, primero necesitamos una cuenta en [GitHub](https://github.com/).

### Crear un repositorio en GitHub

1. Inicia sesión en GitHub.
2. Haz clic en **New Repository**.
3. Asigna un nombre al repositorio y selecciona si será público o privado.
4. Copia la URL del repositorio remoto.

### Subir nuestro proyecto a GitHub

Una vez creado el repositorio en GitHub, debemos conectarlo con nuestro proyecto local:

```sh
 git remote add origin https://github.com/tuusuario/tu-repositorio.git
 git branch -M main
 git push -u origin main
```

Esto enviará nuestro código al repositorio remoto en GitHub.

## 2.6 Clonar un repositorio existente

Si queremos descargar un proyecto desde GitHub, usamos:

```sh
 git clone https://github.com/usuario/repositorio.git
```

Esto creará una copia local del repositorio en nuestro equipo.

## 2.7 Ramas en Git

Las **ramas** permiten trabajar en diferentes versiones del código sin afectar la rama principal.

### Crear una nueva rama

```sh
 git branch nueva-rama
```

### Cambiar a una rama

```sh
 git checkout nueva-rama
```

### Fusionar una rama con la principal

```sh
 git checkout main
 git merge nueva-rama
```

## 2.8 Resolución de conflictos

A veces, al fusionar ramas, pueden ocurrir conflictos. Git nos pedirá que editemos los archivos afectados y luego confirmemos los cambios:

```sh
 git add .
 git commit -m "Resolviendo conflictos"
```

## 2.9 Buenas prácticas en Git

- Realizar commits pequeños y descriptivos.
- Usar ramas para cada nueva funcionalidad.
- Mantener el repositorio actualizado con `git pull` antes de hacer cambios.
- Escribir mensajes de commit claros y concisos.
