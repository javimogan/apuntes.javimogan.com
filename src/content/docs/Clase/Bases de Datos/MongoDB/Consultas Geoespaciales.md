---
updatedDate: '23/02/2025 21:01'
title: Consultas Geoespaciales
pubDate: '17/02/2025 17:47'
heroImage: /images/blog/Clase/MongoDB/images/default/bg-2.jpg
id: 7cc04fbf62
lastUpdated: 2025-03-10T17:03:21.000Z
---
# Consultas Geoespaciales en MongoDB

## 1. Introducción a los Datos Geoespaciales en MongoDB

MongoDB proporciona potentes herramientas para trabajar con datos geoespaciales, permitiendo realizar consultas eficientes para encontrar ubicaciones cercanas, calcular distancias y delimitar áreas.

### ¿Qué son los datos geoespaciales?

Los datos geoespaciales hacen referencia a información que tiene una ubicación en la Tierra. Estos datos suelen representarse mediante coordenadas de latitud y longitud.

### ¿Cómo maneja MongoDB los datos geoespaciales?

MongoDB almacena los datos geoespaciales utilizando estructuras especializadas como `GeoJSON` y `coordenadas de pares`.

## 2. Estructuración de la Base de Datos

Dependiendo del uso y la escalabilidad del sistema, existen diversas formas de estructurar la base de datos. Algunas opciones incluyen:

### Opción 1: Documento único por estación de servicio

Cada estación de servicio es un documento separado en una colección `estaciones`:

```json
{
    "provincia": "ALBACETE",
    "municipio": "ALBACETE",
    "localidad": "ALBACETE",
    "codigo_postal": "02001",
    "direccion": "CALLE PRINCIPE DE ASTURIAS",
    "coordenadas": {
        "type": "Point",
        "coordinates": [-1.832000, 39.054694]
    },
    "precios": {
        "gasolina_95": 1.609,
        "gasolina_98": 1.751,
        "gasoleo_a": 1.549
    },
    "rotulo": "BP ROMICA"
}

```

### Opción 2: Documentos Separados para Precios e Información General

```json
{
    "estacion_id": ObjectId("60d5f3e9f2a30b45c8d6a6b1"),
    "provincia": "ALBACETE",
    "municipio": "ALBACETE",
    "coordenadas": {
        "type": "Point",
        "coordinates": [-1.832000, 39.054694]
    }
}

```

```json
{
    "estacion_id": ObjectId("60d5f3e9f2a30b45c8d6a6b1"),
    "precios": {
        "gasolina_95": 1.609,
        "gasolina_98": 1.751,
        "gasoleo_a": 1.549
    },
    "fecha_actualizacion": "2025-02-11"
}

```

Cada modelo tiene ventajas y desventajas dependiendo del tipo de consultas y la escalabilidad requerida.

## 3. Limpieza de Datos

Antes de insertar datos en MongoDB, es recomendable limpiarlos y transformar el archivo original (por ejemplo, un `XLSM`) en un formato más manejable, como JSON.

### Ejemplo de Limpieza y Conversión en Node.js

Para extraer y limpiar datos desde un archivo `XLSM` en Node.js, podemos utilizar la librería `xlsx`:

```javascript
const XLSX = require('xlsx');
const fs = require('fs');

// Cargar el archivo XLSM
const workbook = XLSX.readFile('gasolineras.xlsm');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convertir a JSON
let data = XLSX.utils.sheet_to_json(sheet);

// Filtrar y transformar datos
const estaciones = data.map(row => ({
    provincia: row["Provincia"],
    municipio: row["Municipio"],
    coordenadas: {
        type: "Point",
        coordinates: [parseFloat(row["Longitud"]), parseFloat(row["Latitud"])]
    },
    precios: {
        gasolina_95: parseFloat(row["Precio gasolina 95 E5"]),
        gasolina_98: parseFloat(row["Precio gasolina 98 E5"]),
        gasoleo_a: parseFloat(row["Precio gasóleo A"])
    }
})).filter(est => est.coordenadas.coordinates[0] && est.coordenadas.coordinates[1]);

// Guardar el resultado en un archivo JSON
fs.writeFileSync('gasolineras.json', JSON.stringify(estaciones, null, 2));
console.log("Datos limpios y convertidos correctamente.");

```

Este **código de ejemplo** extrae solo los datos relevantes, los transforma y los guarda en un JSON listo para su inserción en MongoDB.

## 4. Creación del Índice Geoespacial

Para poder hacer consultas eficientes sobre la ubicación de las gasolineras, creamos un índice `2dsphere` en la propiedad `coordenadas`:

```javascript
db.estaciones.createIndex({ coordenadas: "2dsphere" });

```

## 5. Consultas Geoespaciales en MongoDB

### 5.1. Encontrar Gasolineras Cercanas

Para encontrar gasolineras cercanas a una ubicación específica, usamos `$near`:

```javascript
db.estaciones.find({
    coordenadas: {
        $near: {
            $geometry: {
                type: "Point",
                coordinates: [-1.850, 39.000]
            },
            $maxDistance: 5000  // Radio de 5 km
        }
    }
});

```

### 5.2. Encontrar Gasolineras en un Área

Para buscar gasolineras dentro de una zona determinada, usamos `$geoWithin`:

```javascript
db.estaciones.find({
    coordenadas: {
        $geoWithin: {
            $geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-1.870, 39.000],
                        [-1.830, 39.000],
                        [-1.830, 39.050],
                        [-1.870, 39.050],
                        [-1.870, 39.000]
                    ]
                ]
            }
        }
    }
});

```

## 6. Evaluación del Rendimiento en Grandes Volúmenes de Datos

Para optimizar el rendimiento:

-   Usar **índices geoespaciales** (`2dsphere`).
-   **Filtrar los datos** antes de aplicar cálculos geoespaciales.
-   **Limitar la cantidad de resultados** devueltos (`.limit(n)`).
-   **Indexar adecuadamente** las propiedades de consulta frecuentes.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTY0NjQ5NDI2OSw4Mjk0Mjg0NTVdfQ==
-->
