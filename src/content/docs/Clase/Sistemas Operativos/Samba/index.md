---
id: 8d71cbcaf6
lastUpdated: 2025-03-08T16:25:48.000Z
title: index
pagefind: false
---
## ¿Qué es SAMBA?

SAMBA es una implementación de código abierto del protocolo SMB/CIFS, que permite compartir archivos e impresoras entre sistemas Windows y Linux. Con SAMBA, un servidor Linux puede actuar como un servidor de archivos compatible con Windows, permitiendo a los usuarios acceder a recursos compartidos.

El uso compartido de archivos es una de las acciones más comunes e interesantes que se puede realizar en una organización.

Compartir ficheros es muy sencillo gracias al uso de Samba. Esta herramienta nos permite compartir varios recursos de un equipo  para que varios usuarios, tanto desde Windows como desde equipos GNU/Linux, puedan acceder.

Samba es una implementación libre del protocolo de archivos compartidos de Microsoft Windows (antiguamente era conocido por SMB, renombrado recientemente como CIFS) para sistemas de tipo UNIX. Con esta herramienta, es posible que ordenadores con Linux, MacOS o Unix, en general, actúen como servidores o clientes en redes de Windows.

En la actualidad, Samab permite la integración de Windows con sistemas Linux/Unix en una misma red.

Samba está formado por diferentes módulos para facilitar la configuración del protocolo SMB/CIFS. Su núcleo está compuesto por tres demonios que se ejecutan siempre en un segundo plano:

- **smbd**. Es el responsable de compartir archivos y servicios de impresión a clientes Windows. Además, es el encargado de la autenticación de usuarios, del bloqueo de recursos y de compartir datos a través del protocolo SMB. Los puertos predeterminados en los que el servidor escucha por tráfico SMB son los TCP 139 y 445. Es configurable desde **smbd.conf**.
- **nmdb**. Entiende y responde a las peticiones de servicio de nombres NetBIOS. El puerto predeterminado en el que el servidor escucha por tráfico NMB es el puerto UDP 137. Este demonio es controlado por el servicio **smb** y se configura con el archivo **smb.conf**.
 **winbindd**. Resuelve la información de grupos y usuarios en un servidor Windows NT y la hace entendible para Unix/Linux. Esto permite que los usuarios del dominio Windows NT aparezcan y operen como usuarios UNIX en una máquina UNIX.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE2NjA3Mjk1NzJdfQ==
-->
