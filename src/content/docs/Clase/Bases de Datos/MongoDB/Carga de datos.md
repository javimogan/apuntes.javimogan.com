---
id: 0e0153e76d
lastUpdated: 2025-03-11T19:18:44.000Z
title: Carga de datos
---
## Introducción

Este documento explica cómo conectar una aplicación en Python a una base de datos **MongoDB** y cargar datos desde un archivo JSON a una colección específica. Se utilizará la librería `pymongo` para la conexión y manipulación de datos.

## Requisitos

Antes de ejecutar el script, es necesario:

1.  Tener **MongoDB** instalado y en ejecución en `localhost` o en un servidor accesible.
2.  Instalar la librería `pymongo` si no está instalada:
    
    ```bash
    pip install pymongo
    ```
    
3.  Disponer de un archivo JSON válido (`output.json`) con la estructura de datos a cargar.

## Explicación del Código

El código sigue estos pasos para cargar los datos en MongoDB:

### 1. Importación de librerías

```python
import json
from pymongo import MongoClient
```

Se importan las librerías necesarias: `json` para leer el archivo JSON y `MongoClient` de `pymongo` para la conexión con la base de datos.

### 2. Configuración de MongoDB

```python
MONGO_URI = "mongodb://localhost:27017/"
DATABASE_NAME = "gasolineras_db"
COLLECTION_NAME = "estaciones"
JSON_FILE = "output.json"
```

Se define la configuración de conexión a MongoDB:

-   **MONGO_URI**: Dirección del servidor MongoDB (por defecto, en local `localhost:27017`).
-   **DATABASE_NAME**: Nombre de la base de datos donde se almacenarán los datos.
-   **COLLECTION_NAME**: Nombre de la colección en la que se insertarán los documentos.
-   **JSON_FILE**: Ruta del archivo JSON que se va a cargar.

### 3. Conexión a MongoDB

```python
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]
```

Se establece la conexión con MongoDB y se accede a la base de datos y colección especificadas.

### 4. Carga del JSON

```python
with open(JSON_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)
```

Se abre el archivo JSON y se carga su contenido en la variable `data`.

### 5. Inserción de los datos en MongoDB

```python
if isinstance(data, list):
    collection.insert_many(data)
    print(f"{len(data)} documentos insertados en la colección '{COLLECTION_NAME}' de la base de datos '{DATABASE_NAME}'")
else:
    collection.insert_one(data)
    print(f"Un solo documento insertado en la colección '{COLLECTION_NAME}' de la base de datos '{DATABASE_NAME}'")
```

Se verifica si `data` es una lista de documentos o un único documento:

-   Si es una lista, se insertan múltiples documentos con `insert_many()`.
-   Si es un solo documento, se usa `insert_one()`.

### 6. Cierre de conexión

```python
client.close()
```

Finalmente, se cierra la conexión con MongoDB para liberar recursos.
<!--stackedit_data:
eyJoaXN0b3J5IjpbODE2OTk5MjM0XX0=
-->
