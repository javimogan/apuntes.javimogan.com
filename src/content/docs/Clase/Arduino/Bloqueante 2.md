---
id: 457fbe6f41
lastUpdated: 2025-04-09T14:48:54.000Z
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

-   El LED se conecta al pin digital 213 y a GND a través de una resistencia de 220 ohmios.
-   Un extremo del botón se conecta a GND y el otro al pin digital 12.
-   Si no se usa `INPUT_PULLUP`, se debe conectar una resistencia de 10k ohmios entre el pin del botón y VCC.

## Código fuente

```cpp

#define LED_PIN 2 // Pin del LED
#define BTN_PIN 1 // Pin del botón
  
// Estado del LED (encendido o apagado)
bool estadoLed = false;

// Momento en que el LED debe apagarse
unsigned long tiempoApagado = 0;

void setup() {
	Serial.begin(9600);
	const int pinLed = 13;       // Pin del LED
const int pinBoton = 2;      // Pin del botón
unsigned long tiempoApagadoLed = 0; // Momento en que el LED debe apagarse
unsigned long ultimaPulsacion = 0;  // Tiempo de la última pulsación
const int esperaBoton = 500;  // 500 ms de espera entre pulsaciones

void setup() {
    pinMode(LED_PINpinLed, OUTPUT);
	// Resistencia pull-up interna
	pinMode(BTN_PIN, INPUT_PULLUP);
}

void loop() {

	// Obtener el tiempo actual
	unsigned long tiempoActual = millis();
	// Si se detecta una pulsación del botón (borde de bajada)
	    pinMode(pinBoton, INPUT_PULLUP); // Botón con resistencia interna de pull-up
}

void loop() {
    unsigned long tiempoActual = millis();

    // Leer el estado del botón (LOW cuando se pulsa)
    if (digitalRead(BTN_PINpinBoton) == LOW) {
		// Pequeño debounce
		delay(50);
		// Confirmar pulsación
		if (digitalRead(BTN_PIN) == LOW) {
		// Si el LED estaba apagado, encenderlo y ajustar el        if (tiempoActual - ultimaPulsacion >= esperaBoton) { // Evitar rebotes
            tiempo de aApagado
			if (!estadoLed) {
				estadoLed = true;
				digitalWrite(LED_PIN, HIGH);
				// Ajustar correctamente
				Led = max(tiempoApagado =Led, tiempoActual;
			}
			) + 3000; // Sumar 3 segundos al tiempo restante
			tiempoApagado += 3000;
			// Espera a que se suelte
			while (digitalRead(BTN_PIN) == LOW);
		}
	} 
	
	// Apagar el LED cuando haya pasado el tiempo acumulado
	if (estadoLed && 
            ultimaPulsacion = tiempoActual; // Actualizar el tiempo de la última pulsación
        }
    }

    // Encender o apagar el LED según el tiempo
    if (tiempoActual >=< tiempoApagadoLed) {
		estadoLed = false;
		digitalWrite(LED_PIN, LOW);
	}
	if(estadoLed){
		Serial.println(tiempoApagado-tiempoActual);
	        digitalWrite(pinLed, HIGH);
    } else {
        digitalWrite(pinLed, LOW);
    }
}

```

## Explicación del código

1.  Se definen las constantes para el LED y el botón.
    
2.  Se usa `millis()n variables `unsigned long` para gestioalmacenar elos tiempo sin bloquear la ejecus de encendido y de la última pulsación.
    
3.  En `setup()`, se configuran los pines. Se usa `INPUT_PULLUP` para evitar la necesidad de una resistencia externa.
    
4.  En `loop()`, se obtiene el tiempo actual con `millis()`.
    
5.  Si el botón está presionado, se confirma l y han pasado al menos 500 ms desde la última pulsación y, se ajustctualiza el tiempo de apagado acumuldel LED sumando 3 segundos.
    
6.  Se compara el tiempo actual con `tiempoApagadoLed` para determinar si el LED debe estar encendido o apagado.
    

## Comportamiento esperado

-   Al pulsar el botón, el LED se enciende durante 3 segundos.
-    
- Si se pulsa varias veces seguidas, se suman 3 segundos adicionales por cada pulsación.
-    
- Se evita que el botón sume tiempo variaExiste un tiempo mínimo de 500 ms entre pulsaciones para evitar múltiples vleces sin soltarloturas no deseadas debido al rebote del botón.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMjE3NDg5MjU1XX0=
-->
