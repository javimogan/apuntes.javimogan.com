---
id: d789c205ac
lastUpdated: 2025-03-08T16:42:45.000Z
title: 1 Servidor de archivos
---
Para hacer uso de Samba como servidor de archivos, se deben serguir los siguientes pasos:
1. Instalar el servidor Samba.
2. Configurar el servidor según las necesidades.
3. Añadir usuarios para acceder a los recursos compartidos.
4. Dar los permisos a las carpetas compartidas.
5. Arrancar el servidor Samba.

## 1. Instalar el servidor Samba.

### 1.1. Actualizar el sistema

Antes de instalar cualquier paquete, es recomendable actualizar los repositorios y paquetes del sistema:

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2. Instalar SAMBA

Para instalar el paquete de SAMBA, ejecuta:

```bash
sudo apt install samba -y
```

El paquete Samba define una configuración mínima durante la instalación inicial. No obstante, se debe adaptar dicha configuración inicial a las necesidades de la organización. Durante la instalación de Samba, se creará un archivo en ``/etc/samba/`` denominado ``smb.conf``, que contiene todas las configuraciones necesarias del servidor.

### 1.3. Crear un directorio compartido

Creamos una carpeta para compartir archivos:

```bash
sudo mkdir -p /srv/samba/compartido
```

Al crear una carpeta, los permisos por defecto del directorio son ``755`` (``rwxr-xr-x``) y que pertenecen al usuario con el que lo hayamos creado, y por tanto, ningún otro usuario (execto root) podrá escribir en ellos. Por ello, debemos modificar los permisos de dicha carpeta mediante el comando ``chmod``.

Además, si queremos compartir la carpeta de forma pública, con permisos de lectura y escritura y sin requerir contraseña para su acceso. El directorio deberá tener todos los permisos.
```bash
sudo chmod -R 777 /srv/samba/compartido
```

### 1.4. Configurar SAMBA

Una vez se ha creado la carpeta, comenzamos a modificar el fichero ``/etc/samba/smb.conf``. Este fichero sólo puede ser modificado por el usuario administrador (u otros usuarios con los mismos permisos).

El fichero **smb.conf** se divide en secciones que se identifican con títulos entre corchetes. Dentro de estas secciones, se encuentran los parámetros que se pueden activar o desactivar.

Las principales secciones son:

- **[global]** dónde se definen los parámetros del servidor.
- **[homes]** define las carpetas ``/home``de los usuarios como los recursos compartidos.
- **[printer]** define las impresoras compartidas.

Por ejemplo, para compartir una **carpeta privada**, en la cual es imprescindible el acceso con un nombre de usuario y una contraseña, la sección que se ha de añadir al fichero **smb.conf** sería:

```bash
sudo nano /etc/samba/smb.conf
```

Añadimos al final del archivo:

``` "/srv/samba/compartido" "0775"
[nombre] <-- Asignar un nombre a la sección
   comment = Carpeta Compartida
   path = /srv/samba/compartido
   browsable = yes
   read only = no
   writable = yes
   guest ok = yes
   create mask = 0775
   directory mask = 0775
```
Dónde:

- **[nombre]**
- **comment**
- **path**
- **browsable**
- **read only**
- **writable**
- **guest ok**
- **create mask** 
- ****

### 2.5. Reiniciar el servicio de SAMBA

```bash
sudo systemctl restart smbd

```

Verificamos el estado del servicio:

```bash
sudo systemctl status smbd

```

----------

## 3. Configuración en Ubuntu Cliente (Desktop)

### 3.1. Instalación de paquetes necesarios

En el cliente Ubuntu, instalamos los paquetes necesarios para acceder a los recursos compartidos:

```bash
sudo apt install smbclient cifs-utils -y

```

### 3.2. Acceder a la carpeta compartida

Desde la terminal, podemos listar los recursos compartidos en el servidor:

```bash
smbclient -L //IP_DEL_SERVIDOR -N

```

Para conectarnos a la carpeta compartida:

```bash
smbclient //IP_DEL_SERVIDOR/Compartido -N

```

También se puede acceder gráficamente abriendo **Archivos (Nautilus)** y escribiendo en la barra de direcciones:

```
smb://IP_DEL_SERVIDOR/Compartido

```

### 3.3. Montar el recurso compartido en el sistema de archivos

Creamos un punto de montaje:

```bash
mkdir -p ~/samba_compartido

```

Montamos la carpeta compartida:

```bash
sudo mount -t cifs //IP_DEL_SERVIDOR/Compartido ~/samba_compartido -o guest,uid=$(id -u),gid=$(id -g)

```

Para montar automáticamente al inicio, editamos el archivo **/etc/fstab**:

```bash
sudo nano /etc/fstab

```

Añadimos la siguiente línea al final:

```
//IP_DEL_SERVIDOR/Compartido  /home/usuario/samba_compartido  cifs  guest,uid=1000,gid=1000  0  0

```

Guardamos y aplicamos los cambios con:

```bash
sudo mount -a

```

----------

## 4. Pruebas y solución de problemas

### 4.1. Verificar que el servicio está corriendo

```bash
sudo systemctl status smbd

```

### 4.2. Verificar la configuración de SAMBA

```bash
testparm

```

### 4.3. Revisar logs en caso de problemas

```bash
sudo journalctl -u smbd --since "1 hour ago"

```

O revisar los logs en:

```bash
/var/log/samba/

```

----------

## 5. Conclusión

Con estos pasos, hemos configurado un servidor SAMBA en Ubuntu Server y accedido a sus recursos desde un cliente Ubuntu Desktop. Esta configuración permite compartir archivos de manera sencilla y eficiente en una red mixta de Linux y Windows.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTEzMjg2MDA0NDVdfQ==
-->
