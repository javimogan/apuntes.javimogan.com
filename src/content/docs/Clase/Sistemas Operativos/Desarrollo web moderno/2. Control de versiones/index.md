---
title: 2. Control de versiones con Git
id: 8160a453d7
lastUpdated: 2025-04-09T14:48:56.000Z
pagefind: false
---
El control de versiones es una parte fundamental del desarrollo de software. Nos permite gestionar los cambios en el código, colaborar con otros desarrolladores y mantener un historial de modificaciones. En esta sección aprenderemos desde cero qué es **Git**, cómo instalarlo y cómo utilizar **GitHub** para gestionar nuestros proyectos.

## 2.1 ¿Qué es Git?

**Git** es un sistema de control de versiones distribuido que permite registrar cambios en el código y coordinar el trabajo entre varios desarrolladores. Con Git podemos:

- Hacer un seguimiento de los cambios en los archivos.
- Volver a versiones anteriores del código si es necesario.
- Trabajar en paralelo con otros desarrolladores sin conflictos.
- Guardar nuestro código en repositorios remotos como **GitHub**.

## 2.2 ¿Qué es GitHub?

**GitHub** es una plataforma que permite alojar repositorios de Git en la nube. Con GitHub puedes:

- Guardar tu código en la nube.
- Compartir tus proyectos.
- Colaborar con otras personas.
- Acceder a herramientas como seguimiento de errores, páginas web, documentación, etc.
## 2.3 Instalación de Git

Instalación de Git

Para comenzar a usar Git, primero debemos instalarlo en nuestro sistema.


### Linux (Ubuntu/Debian)

1. Ejecuta en la terminal:
    
    ```sh

    sudo apt update

    sudo apt install git

```

### En Windows

1. Descarga el instalador desde: [https://git-scm.com](https://git-scm.com)
2. Ejecuta el instalador y sigue los pasos.
###     ```
    
2.4 Verifica la instalación

 con:
    
    ```sh

    git --version

    ```


## 2.53 Configuración inicial de Git

Después de instalar Git, necesitadebemos configurarlo con tunuestro nombre y correo. Esto se usa para identificar quién hace los cambio electrónico. Esto es necesario para registrar correctamente nuestras contribuciones.

```sh

 git config --global user.name "Tu Nombre"

 git config --global user.email "tu@email@example.com"

```

Puedes comprobara verificar la configuración con:

```sh

 git config --list

```

## 2.6 Comandos básicos de4 Primeros pasos con Git

### Crear un nuevo repositorio

```sh

git init

```

EPara comenzar a usar Git en nuestro crea un repositorio vacío en tu carpeta actual (con una carpeta `.git` oculta)proyecto, debemos inicializar un repositorio dentro de la carpeta del proyecto:

```sh
cd mi-proyecto
 git init
```

Este comando creará una carpeta oculta `.git`, que contiene toda la información del control de versiones.

### Añadir archivos al área de ppositorio

Para agrepgaración

```sh

git add archivo.txt # Añade un archivo

git add . # A archivos al control de versiones, usamos:

```sh
 git add .
```

Esto añade todos los archivos nuevos o modificados

```

### Guardar los cambios ( al área de preparación.

### Guardar cambios en Git

Para guardar los cambios en el historial de Git, realizamos un **commit)**:

```sh

 git commit -m "Descripción del cambio"

```

### Ver el estado del repositorio

```sh

git status

```

### Ver historial de cambios

```sh

git log

```


## 2.7 Subir un proyecto a GitHub
### Crear un repositorio en GitHub

1. Ve a [https://gPrimer commit"
```

Cada commit guarda un punto en la historia del proyecto al que podemos volver en el futuro.

## 2.5 Uso de GitHub

### Crear una cuenta en GitHub

Para subir nuestro código a un repositorio remoto, primero necesitamos una cuenta en [GithHub.com](https://github.com)

2. Inicia sesión o crea una cuenta.

3. Haz clic en **New Repository**

4. Ponle un nombre y haz clic en **Create repository**

### Enlazar tu repositorio local con GitHub

Git usa **remotos** para referirse a los servidores externos. El más común es `origin`, que representa el repositorio en GitHub.

#### Crear un repositorio desde la línea de comandos

```sh

echo "# mi-proyecto" >> README.md

git init

git add README.md

git commit -m "primer commit"

git branch -M main

git remote add origin https://github.com/tuusuario/mi-proyecto.git

git push -u origin main

```

#### Subir un proyecto ya existente/).

### Crear un repositorio en GitHub

1. Inicia sesión en GitHub.
2. Haz clic en **New Repository**.
3. Asigna un nombre al repositorio y selecciona si será público o privado.
4. Copia la URL del repositorio remoto.

### Subir nuestro proyecto a GitHub

Una vez creado el repositorio en GitHub, debemos conectarlo con nuestro proyecto local:

```sh

 git remote add origin https://github.com/tuusuario/mi-proyecttu-repositorio.git

 git branch -M main

 git push -u origin main

```


## 2.8 ¿Qué es `origin`?

`origin` es simplemente el **nombre que Git da por defecto al repositorio remoto**. Puedes tener varios remotos si lo necesitas, pero `origin` suele ser el principal.
  
Cuando haces:

```sh

git push origin main

```


Estás diciendo: "sube mi rama `main`Esto enviará nuestro código al repositorio remoto llamado `origin`"en GitHub.

## 2.96 Clonar un repositorio desde GitHubexistente

Si quieres copimos descargar un proyecto desde GitHub a tu equipo:

  , usamos:

```sh

 git clone https://github.com/usuario/repositorio.git

```

Esto creará una copia local del repositorio.

## 2.10 Trabajar con ramas en nuestro equipo.

## 2.7 Ramas en Git

Las **ramas** permiten desarrollar nuevas característicastrabajar en diferentes versiones del código sin afectar la versiónrama principal del proyecto.

### Crear una nueva rama

```sh

 git branch nueva-rama

```

### Cambiar de rama

```sh

git checkout nueva-rama

```

### Crear y cambiar en un solo pasoa una rama

```sh

 git checkout -b nueva-rama

```

### Fusionar una rama con `main`la principal

```sh

 git checkout main

 git merge nueva-rama

```


## 2.11 Actualizar desde GitHub (pull)

```sh

git pull origin main

```


Esto trae los últimos cambios desde GitHub y los aplica en tu copia local.

## 2.12 Subir cambios a GitHub (push)

```sh

git push origin main

```


## 2.13 Ver los remotos configurad8 Resolución de conflictos

A veces, al fusionar ramas, pueden ocurrir conflictos. Git nos pedirá que editemos los archivos afectados y luego confirmemos los cambios
:

```sh

 git remote -v

```

  

## 2.14 Eliminar un remoto

```sh

git remote remove origin
add .
 git commit -m "Resolviendo conflictos"
```

## 2.159 Buenas prácticas

  

- Usa `git status` frecuentemente.

- Haz en Git

- Realizar commits pequeños y descriptivos.

- Usar ramas para cada nuevas funcionalidades o experimentos.

- Sincroniza tu.
- Mantener el repositorio actualizado con `git pull` antes de empezar a trabajar.

- No subas archivos generados o privados (usa `.gitignore`).


## 2.16 Archivos útiles

### `.gitignore`

Este archivo permite decirle a Git qué archivos no debe seguir (por ejemplo, archivos temporales, configuraciones locales, etc).


Ejemplo:

  

```

*.log

node_modules/

.env

.DS_Store

```

  
## 2.17 Recursos adicionales

- [Documentación oficial de Git](https://git-scm.com/doc)

- [Guía de GitHub para principiantes](https://docs.github.com/es/get-started)hacer cambios.
- Escribir mensajes de commit claros y concisos.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTI5MDk2MzU5OV19
-->
