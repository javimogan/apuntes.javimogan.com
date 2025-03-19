---
title: Servidor de archivos. Samba
id: d789c205ac
lastUpdated: 2025-03-19T16:07:06.000Z
---

## 1. Instalar el servidor Samba.

Para hacer uso de Samba como servidor de archivos, se deben serguir los siguientes pasos:
- Instalar el servidor Samba.
- Configurar el servidor según las necesidades.
- Añadir usuarios para acceder a los recursos compartidos.
- Dar los permisos a las carpetas compartidas.
- Arrancar el servidor Samba.

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
sudo chmod -R 777 /srv/samba/publica
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

```conf "/srv/samba/publica" "0775"
[Publica] <-- Asignar un nombre a la sección
   comment = Carpeta pública
   path = /srv/samba/publica
   public = yes
   browsable = yes
   writeable = yes
   printable = no
   guest ok = yes
   create mask = 0777
   directory mask = 0777

# También podemos configurar una carpeta de forma privada
[Privada]
	path = /srv/samba/privada
	browsable = yes
	writeable = yes
	create mask = 0700
	directory mask = 0700
	valid users = usuario_samba
```
Dónde:

- **[Publica]**. Nombre de la sección.
- **comment**. Descripción del contenido de la carpeta.
- **path**. Ruta absoluta del directorio que vamos a compartir.
- **browsable**. El recurso será o no accesible visualmente.
- **read only**. Para poder leer y escribir en dicha carpeta.
- **writable**. Permite que los usuarios tengan permisos de escritura en el recurso compartido, pudiendo así modificar los archivos.
- **create mask**. Permisos que van a tener dichos archivos. 
- **directory mask**. Permisos que van a tener dichas carpetas.
- **force user**. Fuerza que todos los archivos y carpetas creados en este recurso compartido pertenezcan al usuario nobody.

Para verificar la configuración se debe utilizar el siguiente comando

```bash
testparm
```

El **Master Browser** (o **Explorador Maestro**) es un rol dentro de una red local (LAN) en sistemas Windows y Samba que se encarga de **mantener y distribuir la lista de equipos y recursos compartidos**. Básicamente, es el encargado de gestionar la navegación de la red para que los equipos puedan ver qué otros dispositivos están disponibles.

Con el fin de hacer que la carpeta compartida sea detectable en la red, debemos añadir la siguiente configuración bajo la sección **[Global]**

```conf ins={2-4}
[global]
	local master = yes
	preferred master = yes
	os level = 255
```

Dónde:

- ```local master```. Indica que este servidor Samba puede participar en la elección de **Master Browser** en la red.
- ```preferred master```. Hace que Samba **intente forzar una elección de Master Browser** cuando se inicia.
- ```os level```. Define la prioridad de Samba en la elección del Master Browser. 1. **255 es el valor más alto posible**, lo que significa que **siempre** ganará la elección, excepto si hay otro servidor Samba con el mismo nivel.
### 1.5. Añadir usuarios para acceder a los usuarios
Cada usuario de Samba, necesita una cuenta en el servidor. Es muy importante registrar a los usuarios en la base de datos Samba, y aque, en caso contrario, no podrán acceder a los recursos compartidos con contraseña. Para ello, se emplea el comando:

En primer lugar, se crean las cuentas de usuarios en Linux. A continuación, se deben registrar en la base de datos de Samba:

```bash
adduser usuario_samba
smbpasswd -a usuario_samba
```
Es frecuente, que la mayoría de las cuentas de usuario que se utilizan para acceder hacia recursos compartidos en Samba no requieran acceso con el comando **passwd** y se deberá definir ``/sbin/nologin`` como intérprete de comandos para la cuenta de usuario en cuestión.

```bash
adduser --shell /sbin/nologin usuario_samba
smbpasswd -a usuario_samba
```

Si, por el contrario, sí se necesitase que las cuentas puedan acceder a otros servicios (como por ejemplo SSH), es decir, permitir acceso al intérprete de comandos, será necesario especificar ``/bin/bash`` como intérprete de comandos y, además, se deberá asignar una clave de acceso en el sistema mediante el comando **passwd**.

```bash
adduser --shell /bin/bash usuario_samba
passwd usuario_samba
smbpasswd -a usuario_samba
```

### 1.6. Reiniciar el servicio de SAMBA

```bash
sudo systemctl restart smbd
```

Verificamos el estado del servicio:

```bash
sudo systemctl status smbd

```

## 2. Configuración en Ubuntu Cliente (Desktop)

### 2.1. Instalación de paquetes necesarios

En el cliente Ubuntu, instalamos los paquetes necesarios para acceder a los recursos compartidos:

```bash
sudo apt install smbclient cifs-utils -y
```

### 2.2. Acceder a la carpeta compartida

Desde la terminal, podemos listar los recursos compartidos en el servidor:

```bash
smbclient -L IP_DEL_SERVIDOR -N
```

Para conectarnos a la carpeta compartida:

```bash
smbclient //IP_DEL_SERVIDOR/Compartido -N
```

También se puede acceder gráficamente abriendo **Archivos (Nautilus)** y escribiendo en la barra de direcciones:

```
smb://IP_DEL_SERVIDOR/Compartido
```

### 2.3. Montar el recurso compartido en el sistema de archivos

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


## 3. Pruebas y solución de problemas

### 3.1. Verificar que el servicio está corriendo

```bash
sudo systemctl status smbd
```

### 3.2. Verificar la configuración de SAMBA

```bash
testparm
```

### 3.3. Revisar logs en caso de problemas

```bash
sudo journalctl -u smbd --since "1 hour ago"
```

O revisar los logs en:

```bash
/var/log/samba/
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ3ODg1OTY4LC0xMzM0MzgyODYyLC01Nz
M2NjMxOTksLTkxMDUzNTgwOV19
-->
