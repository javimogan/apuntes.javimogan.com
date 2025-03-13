---
id: 457fbe6f41
lastUpdated: 2025-03-13T17:12:21.000Z
title: Bloqueante 2
---


Este código enciende un LED al pulsar un botón, sumando 3 segundos de encendido cada vez que se presiona. Se usa `millis()` en lugar de `delay()` para gestionar el tiempo sin bloquear la ejecución del programa.

## Material necesario

-   Placa Arduino (Uno, Mega, etc.)
-   LED
-   Resistencia de 220 ohmios
-   Botón pulsador
-   Resistencia de 10k ohmios (opcional si se usa `INPUT_PULLUP`)
-   Cables de conexión

## Conexiones

-   El LED se conecta al pin digital 13 y a GND a través de una resistencia de 220 ohmios.
-   Un extremo del botón se conecta a GND y el otro al pin digital 2.
-   Si no se usa `INPUT_PULLUP`, se debe conectar una resistencia de 10k ohmios entre el pin del botón y VCC.

## Código fuente

```cpp
const int pinLed = 13;       // Pin del LED
const int pinBoton = 2;      // Pin del botón
unsigned long tiempoApagadoLed = 0; // Momento en que el LED debe apagarse
unsigned long ultimaPulsacion = 0;  // Tiempo de la última pulsación
const int esperaBoton = 500;  // 500 ms de espera entre pulsaciones

void setup() {
    pinMode(pinLed, OUTPUT);
    pinMode(pinBoton, INPUT_PULLUP); // Botón con resistencia interna de pull-up
}

void loop() {
    unsigned long tiempoActual = millis();

    // Leer el estado del botón (LOW cuando se pulsa)
    if (digitalRead(pinBoton) == LOW) {
        if (tiempoActual - ultimaPulsacion >= esperaBoton) { // Evitar rebotes
            tiempoApagadoLed = max(tiempoApagadoLed, tiempoActual) + 3000; // Sumar 3 seg
            ultimaPulsacion = tiempoActual; // Actualizar el tiempo de la última pulsación
        }
    }

    // Encender o apagar el LED según el tiempo
    if (tiempoActual < tiempoApagadoLed) {
        digitalWrite(pinLed, HIGH);
    } else {
        digitalWrite(pinLed, LOW);
    }
}

```

## Explicación del código

1.  Se definen las constantes para el LED y el botón.
2.  Se usan variables `unsigned long` para almacenar los tiempos de encendido y de la última pulsación.
3.  En `setup()`, se configuran los pines. Se usa `INPUT_PULLUP` para evitar la necesidad de una resistencia externa.
4.  En `loop()`, se obtiene el tiempo actual con `millis()`.
5.  Si el botón está presionado y han pasado al menos 500 ms desde la última pulsación, se actualiza el tiempo de apagado del LED sumando 3 segundos.
6.  Se compara el tiempo actual con `tiempoApagadoLed` para determinar si el LED debe estar encendido o apagado.

## Comportamiento esperado

-   Al pulsar el botón, el LED se enciende durante 3 segundos.
-   Si se pulsa varias veces seguidas, se suman 3 segundos adicionales por cada pulsación.
-   Existe un tiempo mínimo de 500 ms entre pulsaciones para evitar múltiples lecturas no deseadas debido al rebote del botón.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTI4NTk5OTM3NF19
-->
