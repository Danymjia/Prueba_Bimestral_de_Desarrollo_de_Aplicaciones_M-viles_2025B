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

![IMG-20251020-WA0010](https://github.com/user-attachments/assets/5c0cf80f-a66f-4e41-a888-81eae8319738)

![IMG-20251020-WA0009](https://github.com/user-attachments/assets/3f2e87ec-24f4-4082-8d03-9092f3933b2d)

![IMG-20251020-WA0011](https://github.com/user-attachments/assets/a4323b34-df55-4b0e-9435-a92db9d8ac18)

![IMG-20251020-WA0012](https://github.com/user-attachments/assets/ef635b2c-33c2-4faa-9ff6-aed204f656e5)

![IMG-20251020-WA0013](https://github.com/user-attachments/assets/5b8372b6-497b-4e9e-bf44-cbbbfe59e6d2)

![IMG-20251020-WA0014](https://github.com/user-attachments/assets/72df663d-c746-4fb2-a9c2-46eb7219c945)

![IMG-20251020-WA0015](https://github.com/user-attachments/assets/57857588-7a9d-4510-a179-d22f64a22aaf)

![IMG-20251020-WA0016](https://github.com/user-attachments/assets/928d2b6f-902f-451e-92a5-8e04687615b2)

![IMG-20251020-WA0017](https://github.com/user-attachments/assets/d3591336-4e14-4753-bb32-c29d9260e8d3)
