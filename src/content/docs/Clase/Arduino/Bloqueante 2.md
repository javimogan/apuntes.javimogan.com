---
id: 457fbe6f41
lastUpdated: 2025-03-20T16:21:38.000Z
title: Bloqueante 2
---
Este código enciende un LED al pulsar un botón, sumando 3 segundos de encendido cada vez que se presiona. Se usa `millis()` en lugar de `delay()` para gestionar el tiempo sin bloquear la ejecución del programa.

## Material necesario

- Placa Arduino (Uno, Mega, etc.)
- LED
- Resistencia de 220 ohmios
- Botón pulsador
- Resistencia de 10k ohmios (opcional si se usa `INPUT_PULLUP`)
- Cables de conexión

## Conexiones

- El LED se conecta al pin digital 2 y a GND a través de una resistencia de 220 ohmios.
- Un extremo del botón se conecta a GND y el otro al pin digital 1.
- Si no se usa `INPUT_PULLUP`, se debe conectar una resistencia de 10k ohmios entre el pin del botón y VCC.

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
	pinMode(LED_PIN, OUTPUT);
	// Resistencia pull-up interna
	pinMode(BTN_PIN, INPUT_PULLUP);
}

void loop() {

	// Obtener el tiempo actual
	unsigned long tiempoActual = millis();
	// Si se detecta una pulsación del botón (borde de bajada)
	if (digitalRead(BTN_PIN) == LOW) {
		// Pequeño debounce
		delay(50);
		// Confirmar pulsación
		if (digitalRead(BTN_PIN) == LOW) {
		// Si el LED estaba apagado, encenderlo y ajustar el tiempo de apagado
			if (!estadoLed) {
				estadoLed = true;
				digitalWrite(LED_PIN, HIGH);
				// Ajustar correctamente
				tiempoApagado = tiempoActual;
			}
			// Sumar 3 segundos al tiempo restante
			tiempoApagado += 3000;
			// Espera a que se suelte
			while (digitalRead(BTN_PIN) == LOW);
		}
	} 
	
	// Apagar el LED cuando haya pasado el tiempo acumulado
	if (estadoLed && tiempoActual >= tiempoApagado) {
		estadoLed = false;
		digitalWrite(LED_PIN, LOW);
	}
	if(estadoLed){
		Serial.println(tiempoApagado-tiempoActual);
	}
}

```

## Explicación del código

1. Se definen las constantes para el LED y el botón.
    
2. Se usa `millis()` para gestionar el tiempo sin bloquear la ejecución.
    
3. En `setup()`, se configuran los pines. Se usa `INPUT_PULLUP` para evitar la necesidad de una resistencia externa.
    
4. En `loop()`, se obtiene el tiempo actual con `millis()`.
    
5. Si el botón está presionado, se confirma la pulsación y se ajusta el tiempo de apagado acumulando 3 segundos.
    
6. Se compara el tiempo actual con `tiempoApagado` para determinar si el LED debe estar encendido o apagado.
    

## Comportamiento esperado

- Al pulsar el botón, el LED se enciende durante 3 segundos.
    
- Si se pulsa varias veces seguidas, se suman 3 segundos adicionales por cada pulsación.
    
- Se evita que el botón sume tiempo varias veces sin soltarlo.
