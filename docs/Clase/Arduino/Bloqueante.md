---
updatedDate: '27/02/2025 18:14'
title: 1 Bloqueante
pubDate: '27/02/2025 18:14'
heroImage: /images/default/bg-2.jpg
---
# Problema del uso de `delay()` en Arduino y su solución

## Introducción

Uno de los errores más comunes al programar en Arduino es el uso ineficiente de la función `delay()`. Aunque `delay()` es fácil de entender y utilizar, puede generar problemas en el rendimiento del programa, especialmente cuando se necesita que el sistema responda a múltiples eventos simultáneamente.

## Problema con `delay()`

La función `delay(ms)` detiene completamente la ejecución del programa durante el tiempo especificado en milisegundos. Esto significa que, mientras el microcontrolador espera, no puede realizar otras tareas como leer sensores, manejar comunicación serie o responder a interrupciones.

Ejemplo de problema:

```cpp
const int ledPin = 13;
const int buttonPin = 2;

void setup() {
    pinMode(ledPin, OUTPUT);
    pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
    if (digitalRead(buttonPin) == LOW) {
        digitalWrite(ledPin, HIGH);
        delay(5000);  // Bloquea la ejecución durante 5 segundos
        digitalWrite(ledPin, LOW);
    }
}

```

En este código, si el usuario pulsa el botón y luego intenta presionarlo nuevamente dentro de los 5 segundos, Arduino no responderá hasta que termine el `delay()`. Esto hace que el programa sea poco interactivo.

## Solución: Uso de `millis()`

En lugar de `delay()`, se puede utilizar la función `millis()`, que devuelve el tiempo en milisegundos desde que Arduino comenzó a ejecutar el programa. De esta manera, podemos controlar el tiempo sin bloquear la ejecución.

### Código mejorado

Este código enciende el LED durante 5 segundos al pulsar el botón y, si se pulsa nuevamente dentro de esos 5 segundos, apaga el LED inmediatamente.

```cpp
const int ledPin = 13;
const int buttonPin = 2;
bool ledEncendido = false;
// Contiene el timpo, de cuando se ha encendido el LED
unsigned long tiempoEncendido = 0;
const unsigned long tiempoEspera = 5000;

void setup() {
    pinMode(ledPin, OUTPUT);
    pinMode(buttonPin, INPUT_PULLUP);
}

void loop() {
    if (digitalRead(buttonPin) == LOW) {
        if (!ledEncendido) {
            ledEncendido = true;
            tiempoEncendido = millis();
            digitalWrite(ledPin, HIGH);
        } else {
            ledEncendido = false;
            digitalWrite(ledPin, LOW);
        }
        delay(200); // Pequeño debounce
    }

    if (ledEncendido && (millis() - tiempoEncendido >= tiempoEspera)) {
        ledEncendido = false;
        digitalWrite(ledPin, LOW);
    }
}

```

### Explicación

1.  Se usa `millis()` para contar el tiempo transcurrido desde que se pulsó el botón.
2.  Si el LED está apagado y se pulsa el botón, se enciende y se guarda el tiempo de activación.
3.  Si se pulsa el botón de nuevo antes de los 5 segundos, el LED se apaga inmediatamente.
4.  Si pasan los 5 segundos sin nueva pulsación, el LED se apaga automáticamente.

### Ventajas del uso de `millis()`

-   **No bloquea la ejecución del programa**: El microcontrolador puede seguir ejecutando otras tareas mientras espera que pasen los 5 segundos.
-   **Mejor respuesta a eventos**: Permite reaccionar a eventos en cualquier momento.
-   **Mayor flexibilidad**: Se pueden manejar múltiples temporizadores y funciones concurrentemente.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ1NzM3NTU2XX0=
-->
