---
title: 2. Control de versiones con Git
id: 8160a453d7
lastUpdated: 2025-04-01T10:48:06.000Z
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

```sh

sudo apt update

sudo apt install git

```

### En Windows

1. Descarga el instalador desde: [https://git-scm.com](https://git-scm.com)
2. Ejecuta el instalador y sigue los pasos.
### 2.4 Verifica la instalación

```sh

git --version

```


## 2.5 Configuración inicial

Después de instalar Git, necesitas configurarlo con tu nombre y correo. Esto se usa para identificar quién hace los cambios.

```sh

git config --global user.name "Tu Nombre"

git config --global user.email "tu@email.com"

```

Puedes comprobar la configuración con:

```sh

git config --list

```

## 2.6 Comandos básicos de Git

### Crear un nuevo repositorio

```sh

git init

```

Esto crea un repositorio vacío en tu carpeta actual (con una carpeta `.git` oculta).

### Añadir archivos al área de preparación

```sh

git add archivo.txt # Añade un archivo

git add . # Añade todos los archivos modificados

```

### Guardar los cambios (commit)

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

1. Ve a [https://github.com](https://github.com)

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

#### Subir un proyecto ya existente

```sh

git remote add origin https://github.com/tuusuario/mi-proyecto.git

git branch -M main

git push -u origin main

```


## 2.8 ¿Qué es `origin`?

`origin` es simplemente el **nombre que Git da por defecto al repositorio remoto**. Puedes tener varios remotos si lo necesitas, pero `origin` suele ser el principal.
  
Cuando haces:

```sh

git push origin main

```


Estás diciendo: "sube mi rama `main` al repositorio remoto llamado `origin`".

## 2.9 Clonar un repositorio desde GitHub

Si quieres copiar un proyecto de GitHub a tu equipo:

  

```sh

git clone https://github.com/usuario/repositorio.git

```

Esto crea una copia local del repositorio.

## 2.10 Trabajar con ramas

Las ramas permiten desarrollar nuevas características sin afectar la versión principal del proyecto.

### Crear una rama

```sh

git branch nueva-rama

```

### Cambiar de rama

```sh

git checkout nueva-rama

```

### Crear y cambiar en un solo paso

```sh

git checkout -b nueva-rama

```

### Fusionar una rama con `main`

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


## 2.13 Ver los remotos configurados


```sh

git remote -v

```

  

## 2.14 Eliminar un remoto

```sh

git remote remove origin

```

## 2.15 Buenas prácticas

  

- Usa `git status` frecuentemente.

- Haz commits pequeños y descriptivos.

- Usa ramas para nuevas funcionalidades o experimentos.

- Sincroniza tu repositorio con `git pull` antes de empezar a trabajar.

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

- [Guía de GitHub para principiantes](https://docs.github.com/es/get-started)
