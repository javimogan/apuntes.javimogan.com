---
id: 49f16c14da
lastUpdated: 2025-11-11T09:57:25.000Z
title: index
pagefind: false
---

# Introducción a la Programación con PSeInt
Esta documentación se basa en el siguiente [manual de PSeInt](https://informaticaieslapandera.wordpress.com/wp-content/uploads/2019/02/manual_pseint.pdf)
## ¿Qué es un Programa?
Un **programa** es un conjunto de instrucciones que el ordenador puede ejecutar para resolver un problema o realizar una tarea específica.

Por ejemplo, un programa puede mostrar un mensaje en pantalla o hacer cálculos.

```pseudocode
Proceso hola_mundo
    Escribir "Hola Mundo"
FinProceso
```

**Explicación:**  
El programa anterior muestra el mensaje "Hola Mundo" en la pantalla. Todo programa en PSeInt empieza con la palabra clave `Proceso` y termina con `FinProceso`. Entre estas dos líneas se escriben las instrucciones que el programa ejecutará.

---

## ¿Qué es un Algoritmo?
Un **algoritmo** es una serie de pasos ordenados que permiten resolver un problema. Antes de programar, debemos pensar en el algoritmo.

**Ejemplo de algoritmo:**  
Para preparar un vaso de agua con limón:
1. Coger un vaso.  
2. Añadir agua.  
3. Exprimir medio limón.  
4. Mezclar y servir.

En PSeInt, este tipo de secuencia se traduce en instrucciones que el ordenador puede seguir paso a paso.

---

## ¿Qué es PSeInt?
**PSeInt** significa *Pseudocode Interpreter*. Es una herramienta que permite escribir pseudocódigo, es decir, una forma sencilla de representar algoritmos sin usar un lenguaje de programación real.

Puedes descargar PSInt desde su [página web oficial](https://pseint.sourceforge.net/).

Sirve para aprender a pensar como un programador, centrándonos en la lógica sin preocuparnos por la sintaxis de otros lenguajes.

**Ventajas:**
1. Es gratuito y fácil de instalar.  
2. Permite escribir y ejecutar pseudocódigo.  
3. Muestra los diagramas de flujo del programa.  
4. Facilita la comprensión de la lógica de programación.

---

## Flujo de Funcionamiento en PSeInt
Cuando se ejecuta un programa en PSeInt, este sigue un flujo determinado:

1. Se escribe el código entre las palabras `Proceso` y `FinProceso`.  
2. PSeInt verifica si existen errores.  
3. Si el código no tiene errores, el programa se ejecuta paso a paso.  
4. Se muestra el resultado o salida en pantalla.

**Ejemplo:**

```
Inicio → Leer datos → Calcular → Mostrar resultado → Fin
```

Esto representa el orden lógico que sigue el programa desde que empieza hasta que termina.

---

## Tipos de Datos

Los **tipos de datos** indican el tipo de información que puede guardar una variable.

| Tipo | Ejemplo | Descripción |
|------|----------|--------------|
| Entero | 5 | Números sin decimales |
| Real | 3.14 | Números con decimales |
| Cadena | "Hola" | Texto o conjunto de caracteres |
| Lógico | Verdadero / Falso | Valores booleanos |
| Caracter | 'A' | Un solo carácter |

**Ejemplo:**

```pseudocode
Definir edad Como Entero;
Definir nombre Como Cadena;
Definir nota Como Real;
Definir aprobado Como Logico;
```

**Explicación:**  
Se están declarando cuatro variables, cada una con un tipo distinto. La variable `edad` almacenará números enteros, `nombre` texto, `nota` números con decimales y `aprobado` un valor verdadero o falso.

---

## Variables

Una **variable** es un espacio en la memoria del ordenador que sirve para guardar información.  
Se puede cambiar su valor a lo largo del programa.

**Ejemplo:**

```pseudocode
Definir edad Como Entero;
Definir nombre Como Cadena;
edad <- 15;
nombre <- "Lucía";
Escribir "Hola ", nombre, " tienes ", edad, " años.";
```

**Explicación:**  
Primero se declaran las variables `edad` y `nombre`. Luego se les asignan valores. Por último, con `Escribir`, el programa muestra un mensaje en pantalla usando esas variables.

---

## Operaciones Básicas

| Operador | Función | Ejemplo | Resultado |
|-----------|----------|----------|------------|
| + | Suma | 5 + 3 | 8 |
| - | Resta | 10 - 2 | 8 |
| * | Multiplicación | 4 * 2 | 8 |
| / | División | 9 / 3 | 3 |
| ^ | Exponente | 2 ^ 3 | 8 |
| % o mod | Residuo | 10 % 3 | 1 |

**Ejemplo:**

```pseudocode
Definir a, b, c Como Enteros;
a <- 8;
b <- 3;
c <- a + b;
Escribir "El resultado de la suma es: ", c;
```

**Explicación:**  
Se declaran tres variables enteras. `a` y `b` se suman, y el resultado se guarda en `c`. Luego se muestra el resultado en pantalla.

---

## Entrada y Salida de Datos

**Leer**: sirve para que el usuario introduzca datos.  
**Escribir**: sirve para mostrar información en pantalla.

**Ejemplo:**

```pseudocode
Proceso saludo
    Escribir "Introduce tu nombre:";
    Leer nombre;
    Escribir "Hola ", nombre;
FinProceso
```

**Explicación:**  
El programa pide al usuario que escriba su nombre. Con `Leer`, se guarda el valor en la variable `nombre`. Luego, `Escribir` muestra el saludo en pantalla.

---

## Estructuras Básicas

### 1. Instrucciones Secuenciales
Se ejecutan una tras otra en orden.

```pseudocode
Proceso ejemplo_secuencial
    Definir a, b, suma Como Enteros;
    a <- 5;
    b <- 10;
    suma <- a + b;
    Escribir "La suma es ", suma;
FinProceso
```

**Explicación:**  
Las instrucciones se ejecutan de forma ordenada. Primero se asignan valores a `a` y `b`, luego se calcula su suma y se muestra el resultado.

---

### 2. Instrucciones Condicionales
Permiten que el programa tome decisiones.

```pseudocode
Si nota >= 5 Entonces
    Escribir "Aprobado";
Sino
    Escribir "Suspendido";
FinSi
```

**Explicación:**  
El programa evalúa la condición `nota >= 5`. Si es verdadera, muestra "Aprobado". Si es falsa, muestra "Suspendido".

---

### 3. Estructuras Repetitivas

#### Ciclo Mientras
Ejecuta un bloque de código mientras se cumpla una condición.

```pseudocode
contador <- 1;
Mientras contador <= 5 Hacer
    Escribir "Número: ", contador;
    contador <- contador + 1;
FinMientras
```

**Explicación:**  
El programa escribe los números del 1 al 5. La variable `contador` aumenta en uno cada vez hasta que la condición deja de cumplirse.

#### Ciclo Para
Ejecuta un número determinado de veces.

```pseudocode
Para i <- 1 Hasta 5 Hacer
    Escribir "Repetición ", i;
FinPara
```

**Explicación:**  
El ciclo se repite 5 veces. Cada vez, la variable `i` toma un valor desde 1 hasta 5.

#### Ciclo Repetir
Se ejecuta al menos una vez y se repite hasta que se cumpla la condición.

```pseudocode
Repetir
    Leer nota;
Hasta Que nota >= 0 & nota <= 10;
```

**Explicación:**  
El programa pedirá una nota hasta que el usuario introduzca un valor entre 0 y 10.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTc4OTMwMzI1XX0=
-->
