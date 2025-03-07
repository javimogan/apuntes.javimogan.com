---
updatedDate: '27/02/2025 18:09'
title: 2 PWM
pubDate: '27/02/2025 18:09'
heroImage: /images/default/bg-4.jpg
---
# PWM en Arduino

## ¿Qué es PWM?
PWM (Pulse Width Modulation o Modulación por Ancho de Pulso) es una técnica utilizada en electrónica para simular una señal analógica mediante una señal digital. Consiste en alternar rápidamente entre los estados alto (HIGH) y bajo (LOW), variando el tiempo que la señal permanece en estado alto en cada ciclo.

## ¿Cómo funciona PWM en Arduino?
En Arduino, PWM se implementa mediante la función `analogWrite(pin, valor)`, donde:
- `pin`: es el número del pin al que se desea aplicar la señal PWM.
- `valor`: es un número entre 0 y 255 que representa el ciclo de trabajo (duty cycle), es decir, el porcentaje de tiempo en que la señal estará en estado alto durante un ciclo.

Por ejemplo:
```cpp
int led = 9; // Pin PWM
void setup() {
  pinMode(led, OUTPUT);
}
void loop() {
  analogWrite(led, 128); // 50% de ciclo de trabajo
  delay(1000);
  analogWrite(led, 255); // 100% de ciclo de trabajo
  delay(1000);
}
```

## Pines PWM en Arduino
Los pines de Arduino que soportan PWM dependen del modelo de placa:
- **Arduino Uno/Nano**: 3, 5, 6, 9, 10, 11
- **Arduino Mega**: 2-13, 44-46

## Aplicaciones de PWM
PWM se usa en una variedad de aplicaciones, incluyendo:
- **Control de brillo de LEDs**: Variando la intensidad de la luz sin cambiar el voltaje.
- **Control de motores DC**: Regulando la velocidad mediante la variación del ciclo de trabajo.
- **Generación de señales analógicas**: Para simular voltajes intermedios.
- **Conversión de energía**: En fuentes de alimentación conmutadas.

## Frecuencia de PWM
La frecuencia por defecto de PWM en Arduino depende del temporizador asociado a cada pin:
- En **Arduino Uno**:
  - Pines 5 y 6: ~980 Hz
  - Otros pines PWM: ~490 Hz

Para cambiar la frecuencia de PWM, es necesario modificar los registros del temporizador del microcontrolador.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU5NjYyOTIwMV19
-->
