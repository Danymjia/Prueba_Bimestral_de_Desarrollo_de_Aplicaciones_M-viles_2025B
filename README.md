# Aplicación de Control de Gastos con Recibos

## Características Técnicas

### Tecnologías Principales
- **Ionic Framework**: Framework de desarrollo móvil híbrido basado en Angular
- **Angular**: Framework para construir aplicaciones web progresivas
- **Capacitor**: Runtime multiplataforma para aplicaciones web nativas
- **Ionic Storage**: Para almacenamiento local de datos
- **Capacitor Camera**: Plugin para acceder a la cámara del dispositivo

### Componentes Principales

#### 1. Gestión de Gastos
- **Formulario de Gastos** (`tab2.page.html/ts`)
  - Validación de campos obligatorios
  - Selector de monto con validación numérica
  - Botón de cámara integrado

#### 2. Cámara y Almacenamiento
- **Servicio de Cámara** (`camera.service.ts`)
  - `takePicture()`: Captura fotos usando la API de Capacitor Camera
  - `convertBlobToBase64()`: Convierte la imagen a formato base64 para almacenamiento
  - Manejo de permisos de cámara

- **Almacenamiento** (`data.service.ts`)
  - `saveReceipt()`: Guarda los datos del recibo en almacenamiento local
  - `getReceipts()`: Obtiene el historial de recibos
  - `deleteReceipt()`: Elimina un recibo específico

#### 3. Interfaz de Usuario
- **Página Principal** (`tab1.page.html/ts`)
  - Muestra el total de gastos
  - Lista de últimos gastos
  - Pull-to-refresh para actualizar datos

- **Historial** (`tab3.page.html/ts`)
  - Vista detallada de todos los gastos
  - Filtrado y búsqueda
  - Visualización de imágenes de recibos

## Estructura del Proyecto

```
src/app/
├── tab1/                  # Página principal
│   ├── tab1.page.html     # Vista del dashboard
│   └── tab1.page.ts       # Lógica del dashboard
├── tab2/                  # Formulario de gastos
│   ├── tab2.page.html     # Formulario de captura
│   └── tab2.page.ts       # Lógica de captura
├── tab3/                  # Historial
│   ├── tab3.page.html     # Vista de historial
│   └── tab3.page.ts       # Lógica del historial
└── services/              # Servicios
    ├── photo.ts           # Servicio de fotografías
    
```

## Funcionalidades Clave

### 1. Captura de Imágenes
- Uso de `@capacitor/camera` para acceder a la cámara nativa
- Previsualización en tiempo real
- Almacenamiento eficiente de imágenes

### 2. Gestión de Estado
- Actualización reactiva de la interfaz
- Persistencia de datos local

### 3. Interfaz de Usuario
- Diseño responsivo con Ionic Components
- Transiciones fluidas entre pantallas
- Feedback visual para acciones del usuario

## Capturas de Pantalla

