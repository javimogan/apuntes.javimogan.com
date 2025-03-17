---
id: 8d5656accc
lastUpdated: 2025-03-17T16:32:18.000Z
title: Lecturas precisas
---
## Lectura de temperatura y humedad con DHT11 en Arduino

Este código permite leer la temperatura y humedad del sensor DHT11 y calcular la media de las últimas 100 mediciones para obtener valores más estables.

## Material necesario

-   Placa Arduino (Uno, Mega, etc.)
-   Sensor DHT11
-   Resistencia de 10k ohmios
-   Cables de conexión

## Conexiones

-   VCC del DHT11 a 5V de Arduino
-   GND del DHT11 a GND de Arduino
-   Data del DHT11 a un pin digital (ejemplo: 2)
-   Resistencia de 10k ohmios entre VCC y Data

## Código fuente

```cpp
#include <DHT.h>

#define PIN_DHT 2      // Pin donde está conectado el DHT11
#define TIPO_DHT DHT11 // Tipo de sensor
#define NUM_MEDICIONES 100 // Cantidad de mediciones para el promedio

DHT dht(PIN_DHT, TIPO_DHT);

float temperaturas[NUM_MEDICIONES] = {0};
float humedades[NUM_MEDICIONES] = {0};
int indice = 0;

void setup() {
    Serial.begin(9600);
    dht.begin();
}

void loop() {
    // Leer temperatura y humedad actuales
    float tempActual = dht.readTemperature();
    float humActual = dht.readHumidity();

    // Verificar si la lectura es válida
    if (!isnan(tempActual) && !isnan(humActual)) {
        temperaturas[indice] = tempActual;
        humedades[indice] = humActual;
        indice = (indice + 1) % NUM_MEDICIONES; // Mover el índice circularmente
    }

    // Calcular la media de las últimas mediciones
    float sumaTemp = 0, sumaHum = 0;
    for (int i = 0; i < NUM_MEDICIONES; i++) {
        sumaTemp += temperaturas[i];
        sumaHum += humedades[i];
    }
    float tempPromedio = sumaTemp / NUM_MEDICIONES;
    float humPromedio = sumaHum / NUM_MEDICIONES;

    // Mostrar los valores por el puerto serie
    Serial.print("Temperatura Promedio: ");
    Serial.print(tempPromedio);
    Serial.println(" °C");
    Serial.print("Humedad Promedio: ");
    Serial.print(humPromedio);
    Serial.println(" %");

    delay(2000); // Esperar 2 segundos entre lecturas
}

```

## Explicación del código

1.  Se incluye la librería `DHT.h` para manejar el sensor.
2.  Se define el pin de conexión del DHT11 y el tipo de sensor.
3.  Se crean dos arreglos para almacenar las últimas 100 mediciones de temperatura y humedad.
4.  En `setup()`, se inicia la comunicación serie y el sensor DHT.
5.  En `loop()`, se leen los valores del sensor y se almacenan en los arreglos.
6.  Se usa un índice circular para sobreescribir los valores más antiguos con nuevas mediciones.
7.  Se calcula la media de las últimas 100 mediciones y se muestra por el puerto serie.
8.  Se establece un `delay(2000)` para realizar una nueva lectura cada 2 segundos.

## Ventajas de calcular la media de las mediciones

-   Reduce fluctuaciones en las lecturas.
-   Suaviza los cambios de temperatura y humedad.
-   Proporciona valores más estables y confiables en entornos con variaciones bruscas.

Este código permite obtener datos más precisos del sensor DHT11 y es útil para aplicaciones donde la estabilidad de la medición es importante.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTUwMzk0OTM2OV19
-->
