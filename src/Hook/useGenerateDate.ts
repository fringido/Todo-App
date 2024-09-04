export function generarTareasAleatorias() {
    const tareas = [];
    const diasDeLaSemana = 7; // Una semana tiene 7 días

    for (let i = 0; i < 50; i++) {
        // Generar una fecha aleatoria de esta semana
        const diasDesdeHoy = Math.floor(Math.random() * diasDeLaSemana);
        const fecha = new Date();
        fecha.setDate(fecha.getDate() - diasDesdeHoy); // Restar días aleatorios para obtener fechas dentro de esta semana

        tareas.push({
            id: i + 1,
            text: `Tarea ${i + 1}`,
            completed: true,
            time: { hours: 0, minutes: 0 },
            timeReset: { hours: 0, minutes: 0 },
            date: fecha,
            pausa: false,
        });
    }

    return tareas;
}
