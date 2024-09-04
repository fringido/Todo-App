# Aplicación de Productividad

**Autor:** Santiago Sinisterra

## Descripción

Esta aplicación de productividad permite a los usuarios gestionar y filtrar una lista de tareas, así como registrar el tiempo que les toma ejecutarlas. Incluye un temporizador que cuenta hacia cero con la duración de la tarea en cuestión, mostrando el tiempo restante en todo momento. Los usuarios pueden ver un histórico de las tareas completadas y una gráfica que representa su productividad en la última semana.

## Requerimientos del Usuario

Los usuarios pueden realizar las siguientes acciones:

- Crear una tarea
- Modificar una tarea (descripción y duración)
- Eliminar una tarea
- Reordenar la lista de tareas
- Comenzar con la tarea en curso
- Pausar, detener o reiniciar el temporizador
- Marcar la tarea en curso como finalizada
- Ver el historial de tareas completadas
- Ver una gráfica del historial de tareas en la última semana
- Filtrar la lista de tareas pendientes según su duración:
  - Corto: 30 min o menos
  - Medio: de 30 min a 1h
  - Largo: más de 1h

## Reglas de Negocio

- La tarea en curso es la tarea que está al inicio de la lista.
- Al marcar la tarea en curso como completada, se debe registrar el tiempo que tomó al usuario completar la tarea.
- Al cerrar la aplicación, el temporizador siempre se pausa.
- Se manejan tres duraciones predeterminadas para una tarea: corta (30 min), media (45 min), larga (1h).
- El usuario también puede definir su propia duración en minutos y segundos para una tarea, que no puede superar las dos horas.
- Al expirar el tiempo de la tarea en curso, ésta se marca como completada.

## Especificaciones Técnicas

### Interfaz de Usuario

- Los componentes de la interfaz deben ser desarrollados en React.
- Se pueden utilizar frameworks de UI como Material-UI, React-MDL, o React-Bootstrap, y para las gráficas, React-D3 o Victory.
- Se recomienda estructurar los componentes entre contenedores y presentacionales (stateful vs stateless).
- Cuidar la responsividad de la interfaz en múltiples dispositivos.

### Aplicación

- Los componentes deben utilizar React Hooks.
- Debe existir una función para prellenar la aplicación con 50 tareas aleatorias, completadas consumiendo entre el 80% y el 100% de su duración, distribuidas en la última semana.

### Código

- Desarrollar el código utilizando la especificación más reciente de JavaScript (ES6).
- Incluir suficientes comentarios en el código.
- Manejar control de versiones.

### Opcionales

- Persistir el estado de la aplicación a través de un API.
- Desplegar la aplicación en un servicio PaaS como Heroku.
- Incluir pruebas unitarias para la manipulación del estado de la aplicación.

## Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/fringido/Todo-App
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd nombre-del-repositorio
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Inicia la aplicación:
    ```bash
    npm run dev
    ```

La aplicación debería estar disponible en `http://localhost:5173`.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, envía un pull request o abre un issue para discutir cambios o mejoras.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
