# 🍫 Oompa Loompa Crew Manager 🍫

¡Bienvenido al **Oompa Loompa Crew Manager**.
Con esta aplicación, los recursos humanos de la fábrica de chocolate podrán gestionar a los Oompa Loompas de forma sencilla, ¡filtra, busca y explora a los trabajadores!

## 🎯 Características

- **Vista Principal**: Desplázate por la lista infinita de Oompa Loompas y filtra por nombre o profesión.
- **Vista de Detalle**: Explora el perfil detallado de cada Oompa Loompa.

## 🚀 Instalación

¡Sigue estos sencillos pasos para poner en marcha la aplicación! 🍬

### 1. Clona el repositorio

Primero, necesitas clonar el proyecto a tu máquina local. Abre tu terminal y ejecuta:

```bash
git clone https://github.com/zeke80/loompa-hub.git
```

<!-- ### 2. Instala las dependencias -->

Una vez dentro del directorio del proyecto, asegúrate de tener todas las dependencias listas. Ejecuta:

```bash
cd loompa-hub
npm install
```

### 3. Inicia la app

Ahora que las dependencias están listas, es momento de iniciar la app. Ejecuta el siguiente comando:

```bash
npm start
```

Esto abrirá la aplicación en tu navegador predeterminado http://localhost:5173.

## 🛠️ Tecnologías utilizadas

- **ReactJS** ⚛️ - Para la estructura y componentes de la aplicación.
- **Redux** 🗃️ - Para manejar el estado global de los Oompa Loompas.
- **React-Router** 🔀 - Para la navegación entre vistas sin recargar la página.
- **CSS** 💅 - Para darle estilo a la app.

## Solución técnica

### 1. Organización del Proyecto

En este proyecto he utilizado una estructura basada en el **tipo de fichero**, que es ideal para proyectos pequeños y escalables. Esta estructura divide el proyecto entre **componentes compartidos** y **páginas**, lo cual facilita la organización y el mantenimiento a medida que el proyecto crece.

1. **Carpeta `components`**: Contiene los **componentes reutilizables** que se podrian usar en varias páginas, como el `SearchBar`.
2. **Carpeta `pages`**: Cada página tiene su propio conjunto de **componentes específicos** que solo se usan en esa vista, como `LoompaList` o `LoompaDetail`.

### Ventajas

- **Escalabilidad**: La estructura es fácil de ampliar a medida que el proyecto crece.
- **Mantenimiento**: Es fácil encontrar y actualizar componentes, ya que están organizados por su uso.
- **Modularidad**: Los componentes reutilizables están separados de los específicos de cada página.

### 2. Gestión del Estado Global con Redux

El manejo del estado global en el proyecto se realiza utilizando **Redux Toolkit**, una solución moderna y eficiente para gestionar el estado compartido en aplicaciones React. 

#### ¿Por qué Redux?

Dado que la lista de "Oompa Loompas" se comparte entre varias vistas de la aplicación, es necesario tener un mecanismo que permita actualizar y sincronizar los datos entre diferentes partes de la aplicación, sin necesidad de pasar props manualmente entre componentes. Además, la lista puede actualizarse de múltiples formas, como al cargar más datos desde la API o al acceder a los detalles de un Loompa, por lo que un estado centralizado garantiza que los componentes tengan siempre la información más actual.

#### Estructura del Estado

En el archivo `loompaDataSlice.ts`, se define el estado global que contiene dos propiedades clave:
- **`loompas`**: Una lista de objetos "Oompa Loompas" que es actualizada con los datos traídos de la API. Esta lista puede ir creciendo conforme se obtienen más elementos.
- **`page`**: Un número que indica la página actual de la API, usado para gestionar la paginación.

#### Acciones para Gestionar el Estado

Se han definido varias **acciones** dentro del slice que permiten interactuar con el estado:
- **`setLoompas`**: Esta acción reemplaza el estado de la lista de "Oompa Loompas" con nuevos datos, asegurando que el estado siempre refleje la información más actual. Por ejemplo, cuando se carga la lista inicial o se obtienen más resultados de la API.
- **`setPage`**: Permite actualizar la página actual, que es importante para controlar la paginación al hacer nuevas solicitudes a la API.
- **`addLoompa`**: Añade un nuevo "Loompa" a la lista, de manera que el estado se actualiza sin necesidad de volver a cargar todos los datos.

#### Beneficios de Redux en este Caso

1. **Centralización del Estado**: Redux permite que el estado de la lista de "Oompa Loompas" y la página actual estén disponibles globalmente para todos los componentes, eliminando la necesidad de pasar datos a través de props entre componentes o realizar múltiples solicitudes API.
  
2. **Consistencia en la UI**: Al tener un único lugar donde se guarda el estado, es más fácil garantizar que la UI siempre esté sincronizada con la información más reciente.

3. **Mejor Escalabilidad**: La estructura de Redux es especialmente útil cuando la aplicación crece. Por ejemplo, al agregar más componentes o páginas que interactúan con los datos de los "Oompa Loompas", Redux garantiza que el estado sea consistente sin tener que gestionar múltiples estados locales.


### 4. **Persistencia Local para Mejorar la Experiencia del Usuario**

El uso del `localStorage` para almacenar la lista de Oompa Loompas y el número de página es una decisión técnica que permite:

- **Mejorar la UX**: Si el usuario recarga la página o vuelve a la aplicación después de un tiempo, los datos previos se mantienen almacenados localmente, evitando hacer nuevas llamadas a la API innecesariamente.
- **Optimización de la carga**: Al evitar la repetición de peticiones a la API para datos ya recuperados, se reduce la carga en el servidor y se optimiza el rendimiento.

La lógica que resetea la data en caso de que los datos sean antiguos (más de un día), usando `luxon`, asegura que el almacenamiento no se quede desactualizado:

```typescript
if (now.diff(date, "days").days >= 1) reset();
```

### 5. **Uso de Bootstrap para un Diseño Responsivo**

Se ha utilizado **Bootstrap** para garantizar un diseño **responsive** y una experiencia de usuario coherente en distintos dispositivos. Las clases de Bootstrap como `d-flex`, `gap`, `input-group`, entre otras, se integran para alinear los elementos correctamente, lo que permite mantener el código CSS limpio y fácilmente mantenible.

Ejemplo en la representación de el detalle de los Loompas por columna según las dimensiones de la pantalla:

```tsx
<div className="row text-start">
  {loompas.map((loompa: Loompa) => (
      <div
        key={loompa.id}
        className="loompa-detail col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 p-4"
        onClick={() => navigate(`/${loompa.id}`)}
      >
        <LoompaSimpleDetail {...loompa} />
      </div>
    ))}
</div>
```

### 6. **Manejo de Datos con Axios**

El servicio `LoompaService` encapsula las llamadas HTTP usando `axios`, lo que permite una gestión clara de las peticiones a la API y facilita la manipulación de los datos antes de devolverlos a los componentes. Este patrón de servicio asegura que cualquier cambio en la API o en la forma en que se manejan los datos esté centralizado en un solo lugar.

### 7. **Uso de Funciones de Paginación para Cargar los Oompa Loompas**

Se implementó un control de paginación que se mantiene en el estado global mediante Redux. Esto permite que la lista de Oompa Loompas pueda crecer de manera incremental, evitando sobrecargar la interfaz de usuario con demasiados datos al mismo tiempo.

### 8. Uso de `React.memo`

En el proyecto, utilicé `React.memo` para optimizar el rendimiento de dos componentes clave: `LoompaSimpleDetail` y `SearchBar`.

#### `LoompaSimpleDetail`

El componente `LoompaSimpleDetail` muestra información estática de un "Loompa". Al usar `React.memo`, prevenimos la re-renderización innecesaria de este componente si sus props no cambian. Dado que los datos del Loompa no suelen cambiar durante la navegación, `React.memo` ayuda a evitar renders innecesarios, mejorando la eficiencia del componente.

#### `SearchBar`

El componente `SearchBar` maneja la entrada del usuario en tiempo real. Usar `React.memo` aquí evita que el componente se vuelva a renderizar en cada cambio de estado, a menos que las props, como el valor del input, cambien. Esto es especialmente útil cuando se interactúa con el campo de búsqueda, ya que mejora el rendimiento al evitar renders innecesarios mientras se escribe.

#### Beneficios Generales

- **Previene renders innecesarios**: Los componentes solo se renderizan cuando sus props cambian.
- **Mejora el rendimiento**: Al reducir el número de renders, la aplicación puede manejar mejor los cambios de estado y las interacciones del usuario.

## ¡Gracias por usar Oompa Loompa Crew Manager!

Esperamos que disfrutes la experiencia tanto como los Oompa Loompas disfrutan hacer chocolate 🍫. ¡Feliz gestión!