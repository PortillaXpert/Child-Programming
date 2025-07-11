import dayjs from 'dayjs';

export function validateMissionFields(mission) {
    const errors = {};
    let isValid = true;

    if (!mission.title.trim()) {
        errors.title = 'El título es obligatorio.';
        isValid = false;
    }

    if (!mission.description.trim()) {
        errors.description = 'La descripción es obligatoria.';
        isValid = false;
    }

    if (!mission.startDate) {
        errors.startDate = 'La fecha de inicio es obligatoria.';
        isValid = false;
    }

    if (mission.endDate && mission.startDate) {
        const start = dayjs(mission.startDate);
        const end = dayjs(mission.endDate);
        if (end.isBefore(start)) {
            errors.endDate = 'La fecha de finalización no puede ser anterior a la de inicio.';
            isValid = false;
        }
    }

    if (mission.objectives.length === 0) {
        errors.objectives = 'Debe haber al menos un objetivo.';
        isValid = false;
    }

    return { isValid, errors };
}