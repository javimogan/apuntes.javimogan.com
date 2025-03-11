---
id: 0b89b24224
lastUpdated: 2025-03-11T19:16:30.000Z
title: Limpieza de datos
---
## Problema Inicial

El archivo CSV contiene información sobre estaciones de servicio en España, incluyendo ubicación, precios de combustibles y horarios de operación. Sin embargo, el formato del archivo presenta los siguientes problemas:

1.  Las primeras tres líneas contienen metadatos y no forman parte de los datos estructurados.
2.  Los nombres de los productos (precios de combustibles) no son adecuados para su uso en JSON.
3.  Las coordenadas (Latitud, Longitud) deben agruparse en un solo campo "coordinates".
4.  Los precios deben agruparse dentro de un objeto "precios", en lugar de estar dispersos en diferentes columnas.
5.  Algunos valores vienen con comas ("1,599") en lugar de puntos ("1.599"), lo que requiere conversión.

## Objetivo

Transformar el CSV en un JSON más estructurado y legible, aplicando las siguientes modificaciones:

-   Eliminar las primeras tres líneas del CSV.
-   Utilizar la cuarta línea como encabezado real.
-   Reestructurar los precios en un objeto "precios", asignando nombres más intuitivos.
-   Agrupar Latitud y Longitud en un array "coordinates".
-   Renombrar ciertas columnas para mejorar la claridad.
-   Convertir los valores numéricos correctamente (comas a puntos).

## Solución paso a paso

### 1. Lectura del CSV

Se abre el archivo y se omiten las primeras tres líneas para asegurarse de que el encabezado correcto se usa como referencia.

```python
with open(csv_file, newline='', encoding='utf-8') as f:
    reader = csv.reader(f)
    next(itertools.islice(reader, 3, 3), None)  # Saltamos las primeras 3 líneas
    headers = next(reader)  # La cuarta línea es la cabecera real
    headers = [col.strip() for col in headers]  # Eliminamos espacios adicionales

```

### 2. Procesamiento de los datos

Una vez configurado el lector `DictReader`, se iteran las filas y se realizan las transformaciones necesarias.

```python
reader = csv.DictReader(f, fieldnames=headers)
```

### 3. Transformación de coordenadas

Las coordenadas `Latitud` y `Longitud` deben estar en formato decimal correcto y agrupadas en un array:

```python
latitude = float(row.pop("Latitud", "0").replace(",", "."))
longitude = float(row.pop("Longitud", "0").replace(",", "."))
coordinates = [latitude, longitude]
```

### 4. Agrupación de precios

Los precios de los combustibles están en distintas columnas y deben agruparse bajo "precios", con nombres más adecuados:

```python
# Extraer y mapear los precios
precios = {
# Mapeo de nombres y conversión de coma a punto
precio_columns[key]: float(row.pop(key).replace(",", "."))
for  key  in  precio_columns  if  key  in  row  and  row[key]
}
```

### 5. Renombrado de campos de interés

Para mejorar la claridad del JSON, se renombran ciertas columnas según `mapeo_nombres`:

```python
for campo in campos_interes:
    if campo in row:
        item[mapeo_nombres[campo]] = row[campo]
```

### 6. Guardado en JSON

Finalmente, se guarda el resultado en un archivo JSON con formato legible:

```python
with open(json_file, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
```

## Código Final

```python
#!/bin/python3

import  csv

import  json

import  itertools

  

# Nombre de los archivos

csv_file = "GasolinerasSpain.csv"  # Reemplázalo por el nombre real de tu archivo

json_file = "output.json"

  

# Definir los campos de interés y cómo renombrarlos en el JSON

campos_interes = ["Provincia", "Municipio", "Localidad", "Código postal", "Dirección",

"Rótulo", "Tipo venta", "Rem.", "Horario", "Tipo servicio"]

  

mapeo_nombres = {

"Provincia": "provincia",

"Municipio": "municipio",

"Localidad": "localidad",

"Código postal": "codigo_postal",

"Dirección": "direccion",

"Rótulo": "rotulo",

"Tipo venta": "tipo_venta",

"Rem.": "rem",

"Horario": "horario",

"Tipo servicio": "tipo_servicio"

}

  

# Columnas de precios a agrupar y su mapeo de nombres

precio_columns = {

"Precio gasolina 95 E5": "gasolina_95_e5",

"Precio gasolina 95 E10": "gasolina_95_e10",

"Precio gasolina 95 E5 Premium": "gasolina_95_e5_premium",

"Precio gasolina 98 E5": "gasolina_98_e5",

"Precio gasolina 98 E10": "gasolina_98_e10",

"Precio gasóleo A": "gasoil_a",

"Precio gasóleo Premium": "gasoil_premium",

"Precio gasóleo B": "gasoil_b",

"Precio gasóleo C": "gasoil_c",

"Precio bioetanol": "bioetanol",

"% bioalcohol": "porcentaje_bioalcohol",

"Precio biodiésel": "biodiesel",

"% éster metílico": "porcentaje_ester_metilico",

"Precio gases licuados del petróleo": "gases_licuados_petroleo",

"Precio gas natural comprimido": "gas_natural_comprimido",

"Precio gas natural licuado": "gas_natural_licuado",

"Precio hidrógeno": "hidrogeno"

}

  

# Leer el CSV y procesar los datos

with  open(csv_file, newline='', encoding='utf-8') as  f:

# Saltamos las 3 primeras líneas

reader = csv.reader(f)

next(itertools.islice(reader, 3, 3), None) # Salta 3 líneas

headers = next(reader) # Usa la cuarta línea como cabecera

headers = [col.strip() for  col  in  headers] # Limpia espacios

  

# Cargar los datos con las cabeceras corregidas

reader = csv.DictReader(f, fieldnames=headers)

data = []

  

for  row  in  reader:

row = {key.strip(): value  for  key, value  in  row.items()} # Limpia claves

  

# Extraer las coordenadas y convertirlas a tipo numérico

latitude = float(row.pop("Latitud", "0").replace(",", "."))

longitude = float(row.pop("Longitud", "0").replace(",", "."))

coordinates = [latitude, longitude]

  

# Extraer y mapear los precios

precios = {

# Mapeo de nombres y conversión de coma a punto

precio_columns[key]: float(row.pop(key).replace(",", "."))

for  key  in  precio_columns  if  key  in  row  and  row[key]

}

  

# Crear el diccionario final con los campos renombrados

item = {

"coordinates": coordinates,

"precios": precios

}

  

# Agregar los campos de interés con nombres personalizados

for  campo  in  campos_interes:

if  campo  in  row:

item[mapeo_nombres[campo]] = row[campo]

  

data.append(item)

  

# Guardar en un archivo JSON

with  open(json_file, "w", encoding="utf-8") as  f:

json.dump(data, f, indent=4, ensure_ascii=False)

  

print(f"Conversión completada. Archivo guardado como {json_file}")
```
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg4NjUyNDA2NV19
-->
