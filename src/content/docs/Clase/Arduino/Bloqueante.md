---
lastUpdated: 2025-03-07T15:53:47.000Z
title: Bloqueante
---
# Uso de `millis()` en Arduino para el Control de Tiempos

En Arduino, es común utilizar `delay()` para manejar tiempos, pero esto bloquea la ejecución del programa, impidiendo que se realicen otras tareas simultáneamente. Para solucionar esto, se usa `millis()`, que permite medir el tiempo sin detener la ejecución del código.

A continuación, veremos dos ejemplos:

1.  Un LED que parpadea con tiempos predefinidos.
2.  Un LED que se enciende durante un tiempo cuando se pulsa un botón.

----------

## 1. Código bloqueante con `delay()`

Un método tradicional para hacer que un LED parpadee es usar `delay()`. Sin embargo, este código **bloquea** la ejecución del microcontrolador:

```cpp
// Pin donde está conectado el LED
const int ledPin = 13;

void setup() {
    pinMode(ledPin, OUTPUT);
}

void loop() {
    digitalWrite(ledPin, HIGH);
    // Bloquea el código 1 segundo
    delay(1000);
    digitalWrite(ledPin, LOW);
    // Bloquea el código 3 segundos
    delay(3000);
}

```

El problema con este enfoque es que **el microcontrolador no puede hacer nada más** mientras espera en `delay()`. Si quisieras realizar otra acción, tendrías que esperar a que termine el `delay()`.

----------

## 2. Código no bloqueante con `millis()`

Para solucionar este problema, usamos `millis()`, que nos permite medir el tiempo sin interrumpir el flujo del programa.

```cpp
// Pin donde está conectado el LED
const int ledPin = 13;
// 1 segundo encendido
const unsigned long tiempoEncendido = 1000;
// 3 segundos apagado
const unsigned long tiempoApagado = 3000;
//Tiempo en el que se ha pulsado el botón por última vez
unsigned long tiempoPrevio = 0;
// Estado del led (encendido --> true // apagado --> false)
bool estadoLed = false;

void setup() {
    pinMode(ledPin, OUTPUT);
}

void loop() {
	// Tiempo actual, ofrecido por la función millis
    unsigned long tiempoActual = millis();
	/*
	La variable estadoLed es true o false, indica el estado del LED
	La variable tiempoActual, tiene la "hora" actual
	La variable tiempoPrevio, tiene la última "hora" en la que se realizó una acción (encender o apagar el LED)

	tiempoActual - tiempoPrevio, es la hora actual menos la hora en la que se encendió o apagó el led por última vez.
	Es lo mismo que cúanto rato ha pasado desde que se encendió/apagó el LED por última vez.
	*/
	
	//Si el LED está encendido Y el botón se pulsó hace más de un segundo...
    if (estadoLed && tiempoActual - tiempoPrevio >= tiempoEncendido) {
	    // Apagamos el led
        estadoLed = false;
        // Actualizamos la hora del último cambio
        tiempoPrevio = tiempoActual;
        // Apagamos el LED
        digitalWrite(ledPin, LOW);
    // En cambio, si el LED está apagado (!estadoLed)
    // Y ha pasado más de 3 segundos desde su último cambio
    } else if (!estadoLed && tiempoActual - tiempoPrevio >= tiempoApagado) {
	    // Encendemos el LED
        estadoLed = true;
        // Actualizamos la hora del último cambio
        tiempoPrevio = tiempoActual;
        // Encendemos el LED
        digitalWrite(ledPin, HIGH);
    }
}

```

### 🔹 Ventajas de `millis()`

-   Permite ejecutar otras tareas en paralelo.
-   No bloquea el microcontrolador como `delay()`.
-   Se pueden gestionar múltiples eventos basados en tiempo sin interferencias.

----------

## 3. Encender un LED con un botón durante 1 segundo usando `millis()`

Ahora implementaremos un código donde un **LED se enciende durante 1 segundo cuando se pulsa un botón**. Sin `millis()`, esto requeriría `delay()`, lo que bloquearía el programa.

```cpp
const int ledPin = 13;    // Pin donde está conectado el LED
const int botonPin = 2;   // Pin donde está conectado el botón
const unsigned long tiempoEncendido = 1000; // 1 segundo encendido

unsigned long tiempoPrevio = 0;
bool estadoLed = false;

void setup() {
    pinMode(ledPin, OUTPUT);
    pinMode(botonPin, INPUT_PULLUP); // Usa la resistencia interna de pull-up
}

void loop() {
    unsigned long tiempoActual = millis();
    bool botonPresionado = digitalRead(botonPin) == LOW; // LOW significa que el botón está presionado

    if (botonPresionado) {
        estadoLed = true;
        tiempoPrevio = tiempoActual;
        digitalWrite(ledPin, HIGH);
    }

    // Apagar el LED después de 1 segundo
    if (estadoLed && tiempoActual - tiempoPrevio >= tiempoEncendido) {
        estadoLed = false;
        digitalWrite(ledPin, LOW);
    }
}

```

### 🔹 Explicación

1.  Se configura el **botón con `INPUT_PULLUP`** para evitar una resistencia externa.
2.  Se comprueba si el botón está presionado (`LOW`).
3.  Si se presiona, se enciende el LED y se almacena el tiempo actual.
4.  Cuando pasa 1 segundo, el LED se apaga automáticamente.
5.  Todo esto ocurre sin bloquear el programa.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE3OTkxMTE3MThdfQ==
-->
