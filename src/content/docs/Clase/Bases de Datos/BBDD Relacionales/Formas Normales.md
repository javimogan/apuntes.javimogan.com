---
updatedDate: '26/02/2025 11:03'
title: Formas Normales
pubDate: '26/02/2025 11:03'
heroImage: /images/default/bg-4.jpg
id: 4139f2f95b
lastUpdated: 2025-03-10T16:36:18.000Z
---

# Explicación de Formas Normales con Ejemplo de Biblioteca

## Introducción  
La **normalización** es un proceso de diseño de bases de datos que organiza los datos para minimizar la redundancia y evitar problemas de inconsistencias. Consiste en dividir los datos en **tablas** bien estructuradas siguiendo reglas llamadas **formas normales**. Al normalizar una base de datos, se eliminan anomalías de actualización (por ejemplo, tener que cambiar el mismo dato en varios lugares), de inserción (dificultad para agregar datos por dependencias innecesarias) y de eliminación (pérdida de información útil al borrar otros datos). A continuación, explicaremos las principales formas normales (1FN, 2FN, 3FN, FNBC, 4FN, 5FN y 6FN) usando un ejemplo sencillo de una biblioteca con libros y alquileres.

Supongamos una biblioteca que lleva el registro de sus **préstamos** (alquileres de libros a socios). Comenzaremos con un diseño no normalizado y lo iremos refinando paso a paso mediante cada forma normal.

## Primera Forma Normal (1FN)  
La **Primera Forma Normal (1FN)** exige que **todos los campos (columnas) de una tabla tengan valores atómicos**, es decir, **un solo valor por campo**. No debe haber **grupos repetitivos ni listas de valores** en una sola columna. Cada columna representa una única pieza de información. 

**Ejemplo:**  
Imaginemos una tabla **Alquileres** inicial (sin normalizar) donde cada fila registra un préstamo: incluye datos del socio que alquila el libro, datos del libro y las fechas de préstamo. 

### Tabla: Alquileres (sin normalizar)  
| SocioID | Nombre Socio | Dirección | LibroID | Título | Autores | FechaAlquiler | FechaDevolución |
|---------|--------------|------------|---------|---------|--------|--------------|----------------|
| 1 | Juan Pérez | C/ Mayor 10 | 100 | Los Tres Mosqueteros | Alejandro Dumas, Auguste Maquet | 2025-02-01 | 2025-02-10 |
| 1 | Juan Pérez | C/ Mayor 10 | 101 | Cien Años de Soledad | Gabriel García Márquez | 2025-02-05 | *(En préstamo)* |
| 2 | María López | Av. del Sol 123 | 101 | Cien Años de Soledad | Gabriel García Márquez | 2025-02-07 | 2025-02-20 |

El campo **Autores** contiene varios valores en una sola celda, lo que viola 1FN. 

**Aplicando 1FN:**  
Separamos los autores en registros distintos:

### Tabla: Alquileres (en 1FN)  
| SocioID | Nombre Socio | Dirección | LibroID | Título | Autor | FechaAlquiler | FechaDevolución |
|---------|--------------|------------|---------|---------|-------|--------------|----------------|
| 1 | Juan Pérez | C/ Mayor 10 | 100 | Los Tres Mosqueteros | Alejandro Dumas | 2025-02-01 | 2025-02-10 |
| 1 | Juan Pérez | C/ Mayor 10 | 100 | Los Tres Mosqueteros | Auguste Maquet | 2025-02-01 | 2025-02-10 |
| 1 | Juan Pérez | C/ Mayor 10 | 101 | Cien Años de Soledad | Gabriel García Márquez | 2025-02-05 | *(En préstamo)* |
| 2 | María López | Av. del Sol 123 | 101 | Cien Años de Soledad | Gabriel García Márquez | 2025-02-07 | 2025-02-20 |

---

Este proceso continuará detallando 2FN, 3FN, FNBC, 4FN, 5FN y 6FN con ejemplos y tablas hasta llegar a una estructura completamente normalizada de la base de datos de la biblioteca.

## Sexta Forma Normal (6FN)  
La **Sexta Forma Normal (6FN)** se aplica en bases de datos de series temporales o sistemas donde los datos cambian con el tiempo. Requiere que cada relación sea descompuesta en su unidad más fundamental sin depender de datos históricos combinados.

**Ejemplo:**  
Si una biblioteca almacena información de alquileres que cambia con el tiempo (por ejemplo, modificaciones de disponibilidad de libros o cambios en las direcciones de socios), 6FN sugiere dividir cada cambio en su propio registro separado para evitar inconsistencias y mantener la trazabilidad total de los datos.

## Conclusión  
A través de este ejemplo de una biblioteca hemos visto cómo las formas normales ayudan a mejorar la estructura de una base de datos paso a paso. La **1FN** garantiza valores atómicos, la **2FN** elimina dependencias parciales, la **3FN** elimina dependencias transitivas, la **FNBC** refina 3FN, la **4FN** aborda dependencias multivaluadas, la **5FN** maneja dependencias de unión y la **6FN** se aplica en bases de datos temporales asegurando trazabilidad total.

La normalización mejora la consistencia y minimiza errores, facilitando la actualización y mantenimiento de bases de datos. Es crucial para diseños bien organizados y confiables.

<!--stackedit_data:
eyJoaXN0b3J5IjpbNzQ3NzE1MzY0XX0=
-->
