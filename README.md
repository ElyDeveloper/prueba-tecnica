
 # Aplicación de Gestión de Tareas

Esta aplicación web permite a los usuarios administrar sus tareas mediante una interfaz de usuario intuitiva. Utiliza Node.js, Angular y una base de datos SQL para almacenar y manipular la información de las tareas.

## Estructura de Carpetas

- `prueba-tecnica`: Carpeta principal del proyecto.
  - `backend`: Contiene el servidor Node.js y la API REST.
  - `frontend`: Contiene la interfaz de usuario desarrollada con Angular.
  - `recursos`: Contiene los archivos para configurar y restaurar la base de datos SQL.

## Configuración Inicial

1. Clona este repositorio en tu máquina local: `git clone <https://github.com/ElyDeveloper/prueba-tecnica.git>`
2. Asegúrate de tener Node.js instalado. Si no lo tienes, puedes descargarlo desde [nodejs.org](https://nodejs.org/).
3. Importa la base de datos que se encuentra en la ruta: `recursos/DB_Test`.
4. Se creo un script para crearla desde cero, pero este no tiene creado el indice de la tabla, por lo que se recomienda importar la base de datos, en caso de no querer hacerlo asi, ejecuta el script y posteriormente crea el indice en la tabla, la ruta es: `recursos/Crear BD desde cero sin índice.BAT`.
5. Script para generar toda la base de datos, en ruta: `recursos/script.sql`.

## Configuración del Servidor Node.js (Backend)

1. Navega hasta la carpeta del backend: `cd prueba-tecnica/backend`
2. Instala las dependencias: `npm install`
3. Inicia el servidor en modo de desarrollo: `npm run dev`
4. El servidor estará disponible en http://localhost:3000.

## Configurar las variables de entorno en el archivo .env
    SERVER_PORT = 3000
    DB_USER = 'xxxxxx'
    DB_PASSWORD = 'xxxxxx'
    DB_SERVER = 'localhost'
    DB_DATABASE = 'DB_Test'

    Colocar los datos de acceso a la base de datos, el usuario debe tener todos los permisos.

## API REST para Tareas (Backend)

La API REST se encarga de las operaciones CRUD para las tareas.

- **Obtener todas las tareas**
  - Método: GET
  - URL: `/tareas`

- **Obtener una tarea por ID**
  - Método: GET
  - URL: `/tareas/id/:id`

- **Crear una nueva tarea**
  - Método: POST
  - URL: `/tareas`
  - Cuerpo de la solicitud: 
    ```json
    {
      "Nombre": "Título de la tarea",
      "DescripcionTarea": "Descripción de la tarea",
      "Prioridad": "Prioridad de la tarea"
    }
    ```

- **Actualizar una tarea existente**
  - Método: PUT
  - URL: `/tareas/:id`
  - Cuerpo de la solicitud:
    ```json
    {
      "Nombre": "Nuevo título",
      "DescripcionTarea": "Nueva descripción",
      "Prioridad": "Nueva prioridad"
    }
    ```

- **Eliminar una tarea**
  - Método: DELETE
  - URL: `/tareas/:id`

## Interfaz de Usuario con Angular (Frontend)

1. Navega hasta la carpeta del frontend: `cd prueba-tecnica/frontend`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm start`
4. Accede a la aplicación en tu navegador: http://localhost:4200.

La interfaz de usuario te permite:

- Ver la lista de tareas existentes.
- Agregar nuevas tareas con un título, descripción y prioridad.
- Editar tareas existentes.
- Completar tareas existentes.
- Eliminar tareas existentes.
- Hacer busqueda de tareas por Descripcion.

La aplicación realiza llamadas HTTP a la API REST para administrar las tareas en la base de datos.

## ¡Listo!

Ahora tiene una aplicación de gestión de tareas completamente funcional. Si tienes alguna pregunta o encuentras algún problema, no dude en contactarme.

