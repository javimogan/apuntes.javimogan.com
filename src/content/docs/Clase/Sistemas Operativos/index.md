---
title: DHCP y DNS
id: 042f53de40
lastUpdated: 2025-03-07T21:26:23.000Z
pagefind: false
---
# _Configuración e instalación de un servidor DHCP y la odisea del servidor DNS._

### Consideraciones previas
#### 1. Fichero resolved.conf

El fichero ``/etc/systemd/resolved.conf``, debería verse algo similar a esto:

``
DNS=DIRECCIÓN IP DEL SERVIDOR, (192.168.1.1, o 127.0.0.1 (loopback))
``

Las demás líneas, pueden estar comentadas.

**Contenedores en Docker**
No afecta en nada, pero podemos limpiar TODOS los contenedores de Docker con
```bash
docker container stop $(docker container ls -aq)
docker container prune
```

#### 2. DHCP y DNS

**DHCP**

**Dynamic Host Configuration Protocol (DHCP)** es un **protocolo de red** que permite asignar automáticamente **direcciones IP y otros parámetros de configuración** a los dispositivos en una red. Su objetivo principal es simplificar la gestión de direcciones IP en redes de cualquier tamaño.

**DNS**
Tanto **BIND9** como **systemd-resolved** son herramientas para la resolución de nombres en Linux, pero tienen diferencias significativas en su propósito y funcionalidades.

**BIND9 (Berkeley Internet Name Domain)** es un servidor DNS completo que permite:
- Actuar como servidor autoritativo, recursivo o de caché.  
- Soporte de zonas directas e inversas.  
- Funcionalidades avanzadas como DNSSEC, vistas, ACLs, y forwarders.

**¿Qué es systemd-resolved?**
**systemd-resolved** es un **servicio de resolución de nombres integrado en systemd**, diseñado para entornos locales y simples.

- Se encarga de la resolución de nombres de host mediante `/etc/resolv.conf`.  
- Soporta DNS sobre TLS (DoT) para mayor seguridad.  
- Puede usar `/etc/hosts`, servidores DNS locales o multicast (mDNS) para la resolución.


## Manual de Instalación y configuración

### **1. Instalación del Servidor DHCP**

1.  **Actualizar los paquetes**:
    
    ```bash
    sudo apt update && sudo apt upgrade -y
    
    ```
    
2.  **Instalar el servidor DHCP**:
    
    ```bash
    sudo apt install isc-dhcp-server -y
    
    ```
    
3.  **Configurar el servicio DHCP**: Editar el archivo de configuración:
    
    ```bash
    sudo nano /etc/dhcp/dhcpd.conf
    
    ```
    
    Añadir la siguiente configuración:
    
    ```conf
    subnet 192.168.1.0 netmask 255.255.255.0 {
        range 192.168.1.10 192.168.1.254;
        option routers 192.168.1.1;
        option domain-name-servers 192.168.1.1;
        option domain-name "augus.local";
    }
    
    ```
    
4.  **Configurar la interfaz de red**: Editar el archivo:
    
    ```bash
    sudo nano /etc/default/isc-dhcp-server
    
    ```
    
    Buscar la línea `INTERFACESv4` y configurarla:
    
    ```bash
    INTERFACESv4="eth0"
    
    ```
    
5.  **Reiniciar y habilitar el servicio DHCP**:
    
    ```bash
    sudo systemctl restart isc-dhcp-server
    sudo systemctl enable isc-dhcp-server
    
    ```
    

----------

### **2. Instalación de BIND9 servidor DNS**
**Usos típicos**:

-   Resolución de nombres en sistemas locales sin necesidad de un servidor DNS completo.
-   Integración con NetworkManager en distribuciones modernas.
-   Dispositivos que solo requieren consultas a servidores DNS externos.

**Usos típicos**:

-   Proveedores de Internet (ISP).
-   Redes empresariales con gestión avanzada de DNS.
-   Configuración de servidores DNS internos o públicos.
- 
Una **zona** en BIND es una porción del espacio de nombres de dominio administrada por un servidor DNS. Contiene los registros DNS necesarios para resolver nombres de dominio en direcciones IP y viceversa.

Se definen en archivos de zona que contienen registros DNS como:

-   **A** (IPv4)
-   **AAAA** (IPv6)
-   **CNAME** (alias)
-   **MX** (correo)
-   **NS** (servidor de nombres)
-   **PTR** (resolución inversa)

1.  **Instalar BIND9**:
    
    ```bash
    sudo apt install bind9 -y
    
    ```
    
2.  **Configurar BIND9**: Editar el archivo de configuración:
    
    ```bash
    sudo nano /etc/bind/named.conf.local
    
    ```
    
    Añadir las zonas:
    
    ```conf
    zone "augus.local" {
        type master;
        file "/etc/bind/db.augus.local";
    };
    
    zone "1.168.192.in-addr.arpa" {
        type master;
        file "/etc/bind/db.192";
    };
    
    ```
    
3.  **Zona directa**
Es la configuración estándar de DNS, que traduce nombres de dominio a direcciones IP.

	Crear la zona directa

    
    ```bash
    sudo cp /etc/bind/db.local /etc/bind/db.augus.local
    
    ```
    
    Editarlo:
    
    ```bash
    sudo nano /etc/bind/db.augus.local
    
    ```
    
    Modificarlo:
    
    ```conf
    $TTL    604800
    @       IN      SOA     servidor.augus.local. root.augus.local. (
                            2         ; Serial
                            604800    ; Refresh
                            86400     ; Retry
                            2419200   ; Expire
                            604800 )  ; Negative Cache TTL
    ;
    @       IN      NS      servidor.augus.local.
    servidor IN      A       192.168.1.1
    
    ```
    Comprobar la zona:
    ```bash
    sudo named-checkzone augus.local /etc/bind9/db.augus.local
    ```    
4.  **Zona inversa**:
    Realiza la traducción inversa: de direcciones IP a nombres de dominio. Se usa para validaciones en correo electrónico y autenticaciones.
    
    Crear la zona inversa
    ```bash
    sudo cp /etc/bind/db.127 /etc/bind/db.192
    
    ```
    
    Editarla:
    
    ```bash
    sudo nano /etc/bind/db.192
    
    ```
    
    Modificarla:
    
    ```conf
    $TTL    604800
    @       IN      SOA     servidor.augus.local. root.augus.local. (
                            2         ; Serial
                            604800    ; Refresh
                            86400     ; Retry
                            2419200   ; Expire
                            604800 )  ; Negative Cache TTL
    ;
    @       IN      NS      servidor.augus.local.
    1       IN      PTR     servidor.augus.local.
    
    
5.  **Configurar el reenviador de DNS**: Editar el archivo:
    
    ```bash
    sudo nano /etc/bind/named.conf.options
    
    ```
    
    Añadir en `forwarders`:
    
    ```conf
    forwarders {
        8.8.8.8;
        8.8.4.4;
    };
    
    ```
    
6.  **Reiniciar y habilitar BIND9**:
    
    ```bash
    sudo systemctl restart bind9
    sudo systemctl enable bind9
    
    ```
7.  **Pruebas**:
    
    ```bash
    nslookup servidor.augus.local
    
    ```
    ```bash
    ping -c1 servidor.augus.local
    ```


----------

### 3. ComprobacionesConfigurar el Cliente Ubuntu Desktop

1.  **Asignar IP mediante DHCP**: Configurar la interfaz de red para usar DHCP en Ubuntu Desktop. Esto también proporcionará automáticamente el servidor DNS configurado en el DHCP.
2.  **Comprobar conectividad**:
    -   Verificar IP obtenida:
	```bash
	ip a
	```
    -   Comprobar resolución de DNS:
	```bash
	nslookup servidor.augus.local
	```
    -   Hacer ping al servidor:
    ```bash
	ping servidor.augus.local
	```
----------

### **4. Habilitar de acceso a internet a la interfaz de la red local**

Para ello, debemos habilitar el reenvío de paquetes.
1.  **Reenvío de paquetes**:

	El **reenvío de paquetes** permite que el servidor funcione como router, reenviando tráfico entre la red interna y la red externa.

	Ejecuta el siguiente comando para habilitarlo temporalmente:
	```bash
	echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
	```
	Para hacerlo permanente, edita el archivo de configuración:
	```bash
	sudo nano /etc/sysctl.conf
	```
	Descomenta la línea: 
	```net.ipv4.ip_forward=1```
	Aplica los cambios con:
	```bash
	sudo sysctl -p
	```
2. **Configurar NAT**

	Configurar NAT permite que los dispositivos en la red interna accedan a Internet utilizando la IP del servidor. Ejecuta el siguiente comando para habilitar NAT:

	```bash
	sudo iptables -t nat -A POSTROUTING -o enp0s3 -j MASQUERADE
	```

	Luego, permite el reenvío de tráfico con:
	```bash
	sudo iptables -A FORWARD -i enp0s8 -o enp0s3 -m state --state RELATED,ESTABLISHED -j ACCEPT
	```

	Podemos crear un fichero de configuración para que se ejecute al inicio del sistema y aplique los comandos anteriores de manera automática.

	Para ello, debemos crear el siguiente fichero
	```bash
	sudo nano /etc/rc.local
	```
	Y añadir los dos comandos anteriores.
----------
### SSH

SSH (**Secure Shell**) es un protocolo que permite acceder de manera remota y segura a un servidor o máquina mediante una conexión cifrada. Se utiliza para administrar servidores, ejecutar comandos y transferir archivos de forma segura.

SSH permite transferir archivos de manera segura mediante herramientas como SCP y SFTP.

1. **ConexiónSSH**
Antes de nada, se debe instalar las aplicaciones que nos permitan utilizar este protocolo de comunicación.

	[OpenSSH (**Open Secure Shell**)](https://www.openssh.com/) es un conjunto de herramientas que permite conectarse a un servidor de forma segura utilizando SSH. Se compone de dos partes: 
-   **Cliente SSH**: Se usa para conectarse a servidores remotos.
-   **Servidor SSH (`openssh-server`)**: Permite aceptar conexiones entrantes a un sistema.

	La instalación de **`openssh-server`**, se realiza mediante el siguiente comando:
	```bash
	sudo apt update
	sudo apt install openssh-server -y
	```
	Podemos verificar su estado mediante:
	```bash
	sudo systemctl status ssh
	```
	El **cliente** en el sistema operativo **Ubuntu**, se encuentra disponible por defecto. En entornos **Windows**, podemos utilizar el cliente [**PuTTY**](https://www.putty.org/).
	
3. **Métodos para subir y descargar archivos mediante SSH**
	`scp` permite copiar archivos entre un sistema local y un servidor remoto de forma segura.
	
	**Subir un archivo:**
	```bash
	scp archivo_local.txt usuario@servidor:/ruta/destino/
	```
	**Descargar un archivo:**
	```bash
	scp usuario@servidor:/ruta/al/archivo_remoto.txt /ruta/local/
	```


----------

### Otras herramientas
DHCP y DNS, son protocolos y sistemas que pueden ser implementados mediante varias herramientas.

En este tema, hemos configurado un servidor DHCP mediante la aplicación ``isc-dhcp-server``y un servidor DNS configurado con ``bind9``. Pero existen una gran multitud de alternativas.

Entre ellas, tenemos ``AdguardHome``. AdGuard Home es un **software a nivel de red** para bloqueo de anuncios y rastreadores.

La instalación de AdGuard Home, la podemos instalar de muchas formas. La más rápida y sencilla, es mediante Docker. Se puede localizar el contenedor y la guía de instalación en el [repositorio oficial de Docker Hub](https://hub.docker.com/r/adguard/adguardhome).

AdGuard Home, también permite la configuración de un servidor DHCP.

Pero debemos tener en cuenta, que si tenemos iniciado el servicio (demonio) ``resolved`` (que lo tenemos). La ejecución del contenedor Docker fallará. Esto se debe a que el servicio `resolved` está escuchando en el puerto `127.0.0.53:53`.

Podemos deshabilitar `DNSStubListener` modificando el fichero ``/etc/systemd/resolved.conf``, para que sea algo similar a:
```none
[Resolve]
DNS=127.0.0.1 <- Aquí va la dirección IP del servidor
DNSStubListener=no
```
Esta configuración, también se puede añadir en un nuevo fichero denominado, por ejemplo, ``/etc/systemd/resolved.conf.d/adguardhome.conf``

Si hemos creado un nuevo fichero, se debe enlazar este nuevo fichero con la configuración de ``systemd-resolve``
```bash
mv /etc/resolv.conf /etc/resolv.conf.backup
ln -s /run/systemd/resolve/resolv.conf /etc/resolv.conf
```

Por último, aplicamos los cambios en systemd-resolve
```bash
sudo systemctl reload-or-restart systemd-resolved
```


La instalación de Ad Guard Home en docker, es recomendable seguirla desde el repositorio oficial. Pero la configuración estándar, es algo similar a:
```bash
docker run --name adguardhome\
    --restart unless-stopped\
    -v /my/own/workdir:/opt/adguardhome/work\
    -v /my/own/confdir:/opt/adguardhome/conf\
    -p 53:53/tcp -p 53:53/udp\
    -p 67:67/udp -p 68:68/udp\
    -p 80:80/tcp -p 443:443/tcp -p 443:443/udp -p 3000:3000/tcp\
    -p 853:853/tcp\
    -p 784:784/udp -p 853:853/udp -p 8853:8853/udp\
    -p 5443:5443/tcp -p 5443:5443/udp\
    -d adguard/adguardhome

```

Obviamente, necesitamos [instalar ``Docker``](https://docs.docker.com/engine/install/) en nuestro equipo.

Una vez instalado AdGuard Home, se accede a la página de configuración desde el puerto ``3000``. Una vez se ha establecido el usuario administrador y ha finalizado la configuración inicial, accedemos a la plataforma mediante el puerto ``80``.SSOO título
description: >-
  Here is a sample of some basic Markdown syntax that can be used when writing
  Markdown content in Astro.
updatedDate: '16/02/2025 01:29'
pubDate: '16/02/2025 01:29'
---
# Sistemas Operativos
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjA4MDY2MTc5MV19
-->
