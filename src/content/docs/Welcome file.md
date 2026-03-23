---
id: 85a003edd9
lastUpdated: 2026-03-23T09:54:23.000Z
title: Welcome file
---

# Calificaciones – Hito 4: Server-Driven UI

  

> Escala: cada criterio puntúa 0 / 0.625 / 1.25 / 1.875 / 2.5 pts. Total máximo: 10 pts.

  

---

  

## Alba — 7.5 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 2.5 | `transformData` correcta: renombra todas las propiedades y aplica IVA (×1.21). 50 items (2 manuales + 48 via Array.from). **Aviso:**  `RAW_BOOKS` se declara sin `export` en mocakBooks.ts, por lo que el import `{ RAW_BOOKS }` falla en compilación. |

| Adaptación SDUI | 2.5 | `getLibraryPage()` devuelve un `IScreen` perfecto con HERO + GRID y `ICard[]` bien construidas. |

| Componentes y renderizado | 1.875 | `RenderScreen` con switch correcto. Grid delega en Card con Tailwind, pero solo desestructura `elements`; ignora `title`, `space` y `columns` (grid-cols hardcodeado). |

| Integración y estado | 0.625 | `useState` y `useEffect` usados correctamente, hay return de carga. **Error crítico:** App.tsx llama a `getLibraryPageData()` pero el motor solo exporta `getLibraryPage()` — la app no muestra datos. |

  

**Total: 7.5**

  

---

  

## Gonzalo — 10 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 2.5 | `transformData` perfecta: renombra, IVA (×1.21), 50 items via Array.from. |

| Adaptación SDUI | 2.5 | `getLibraryPage()` devuelve `IScreen` correcto con HERO + GRID. |

| Componentes y renderizado | 2.5 | `RenderScreen` con switch, Grid dinámico (usa `spaceMap` y `gridTemplateColumns`), delega en Card, Tailwind responsive. |

| Integración y estado | 2.5 | `useState`, `useEffect`, return de carga, llama a la función correcta. |

  

**Total: 10**

  

---

  

## Jaime — 10 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 2.5 | `transformData` con `Number((price × 1.21).toFixed(2))` — mejor precisión decimal del grupo. |

| Adaptación SDUI | 2.5 | `getLibraryPageData()` devuelve `IScreen` completo y correcto. |

| Componentes y renderizado | 2.5 | `RenderScreen` con condicionales if/else, Grid responsive (sm/md/lg breakpoints dinámicos), delega en Card, Tailwind cuidado. |

| Integración y estado | 2.5 | `useState`, `useEffect`, return de carga, función correcta. |

  

**Total: 10**

  

---

  

## JesusGarcia — 9.375 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 2.5 | `transformData` correcta: IVA con redondeo (`Math.round(×1.21×100)/100`), 50 items definidos individualmente. |

| Adaptación SDUI | 2.5 | `getLibraryPage()` devuelve `IScreen` correcto con HERO + GRID. |

| Componentes y renderizado | 1.875 | `RenderScreen` con switch correcto. Grid delega en Card, pero la prop `columns` se desestructura y no se usa — el layout usa `md:grid-cols-4` hardcodeado; `space` se ignora. |

| Integración y estado | 2.5 | `useState`, `useEffect`, return de carga, función correcta. |

  

**Total: 9.375**

  

---

  

## JesusHumanes — 7.5 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 0.625 | `IBookClean` es idéntica a `IBookRaw` (mismo tipado, mismo nombre de campos). `transformData` no renombra ninguna propiedad (`title` en lugar de `titulo`, `author` en lugar de `autor`, `price` en lugar de `precioFinal`, etc.); solo multiplica el precio por 1.21 en el mismo campo. Los datos brutos llegan a la capa de UI casi sin procesar. |

| Adaptación SDUI | 1.875 | La estructura `IScreen` es correcta (HERO + GRID). `adaptToComponents` mapea bien a `ICard`. Penalización menor por depender de campos de `IBookRaw` en lugar de `IBookClean`. |

| Componentes y renderizado | 2.5 | `Screen` (RenderScreen) con switch completo. Grid muy elaborado: `columnsMap` y `spaceMap` para clases responsive, delega en Card. Tailwind cuidado y responsive. |

| Integración y estado | 2.5 | Default import renombrado correctamente, `useState`, `useEffect`, return de carga, prop `screen` coherente entre App y componente. |

  

**Total: 7.5**

  

---

  

## JoseMaria — 0.625 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 0 | No existe ninguna función `transformData`. No hay `IBookRaw` / `IBookClean`. |

| Adaptación SDUI | 0 | No se implementa el patrón Server-Driven UI. No hay `IScreen`, `IComponent`, ni `getLibraryPageData`. |

| Componentes y renderizado | 0 | No existe `RenderScreen`, `Grid`, `Hero` ni `Card`. Los componentes `Library.tsx` y `Book.tsx` son de un hito anterior y no siguen el patrón pedido. |

| Integración y estado | 0.625 | Usa `useState` (paginación), pero los datos están hardcodeados en el cuerpo de App.tsx y no se usa `useEffect` para cargar datos. Parece que se entregó el proyecto de un hito anterior. |

  

**Total: 0.625**

  

---

  

## LuciaGomez — 9.375 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 2.5 | `transformData` correcta: renombra todas las propiedades, IVA calculado como `price + price × 0.21`, 50 items. |

| Adaptación SDUI | 2.5 | `getLibraryPage()` devuelve `IScreen` correcto con HERO + GRID. |

| Componentes y renderizado | 1.875 | `RenderScreen` con switch, Grid delega en Card con Tailwind. Igual que Alba, Grid solo desestructura `elements`; `title`, `space` y `columns` se ignoran (layout hardcodeado a `grid-cols-3`). |

| Integración y estado | 2.5 | `useState`, `useEffect`, return de carga, función correcta. |

  

**Total: 9.375**

  

---

  

## Rafael — 9.375 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 2.5 | `transformData` correcta: `parseFloat((price × 1.21).toFixed(2))`, 50 items via Array.from con imágenes de Picsum. |

| Adaptación SDUI | 1.875 | `getLibraryPageData()` bien estructurado pero al objeto de props de GRID le falta la propiedad `space` (requerida por `IGrid`). Causaría error de TypeScript. |

| Componentes y renderizado | 2.5 | `ComponentMapper` con switch elegante, clave semántica `${screenData.id}-${index}`, Grid responsive delega en Card, Tailwind cuidado. App incluye header y footer. |

| Integración y estado | 2.5 | `useState`, `useEffect`, return de carga animado, función correcta. Extra pulido visual. |

  

**Total: 9.375**

  

---

  

## SergioCañal — 8.75 / 10

  

| Criterio | Nota | Observación |

|---|---|---|

| Transformación lógica | 1.25 | Adapta el dominio a canciones (música). `transformData` renombra correctamente `ISongRaw → ISongClean` (titulo, artista, fecha, genero, imagen), 50 items. **No hay cálculo de IVA** ya que las canciones no tienen precio — requisito específico de la tarea no cumplido. |

| Adaptación SDUI | 2.5 | `getLibraryPage()` devuelve `IScreen` perfectamente estructurado. `ICard` y `IComponent` adaptados coherentemente al dominio musical. El patrón SDUI está bien comprendido y aplicado. |

| Componentes y renderizado | 2.5 | `RenderScreen` con switch, Grid dinámico (`gapMap` + `gridTemplateColumns`), delega en Card con props explícitas. Tailwind con colores personalizados. Responsive. |

| Integración y estado | 2.5 | `useState`, `useEffect`, return de carga, función correcta. |

  

**Total: 8.75**

  

---

  

## Resumen

  

| Alumno | Transform. | SDUI | Componentes | Integración | **Total** |

|---|---|---|---|---|---|

| Gonzalo | 2.5 | 2.5 | 2.5 | 2.5 | **10** |

| Jaime | 2.5 | 2.5 | 2.5 | 2.5 | **10** |

| LuciaGomez | 2.5 | 2.5 | 1.875 | 2.5 | **9.375** |

| JesusGarcia | 2.5 | 2.5 | 1.875 | 2.5 | **9.375** |

| Rafael | 2.5 | 1.875 | 2.5 | 2.5 | **9.375** |

| SergioCañal | 1.25 | 2.5 | 2.5 | 2.5 | **8.75** |

| Alba | 2.5 | 2.5 | 1.875 | 0.625 | **7.5** |

| JesusHumanes | 0.625 | 1.875 | 2.5 | 2.5 | **7.5** |

| JoseMaria | 0 | 0 | 0 | 0.625 | **0.625** |
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTExNzQ3NTExOTFdfQ==
-->
