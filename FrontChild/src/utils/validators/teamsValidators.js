export function validateTeamFields(team) {
    const errors = { name: '', course: '' };
    let isValid = true;

    if (!team.name.trim()) {
        errors.name = 'El nombre del equipo es obligatorio.';
        isValid = false;
    }
    if (!team.course.trim()) {
        errors.course = 'El curso es obligatorio.';
        isValid = false;
    }

    return { isValid, errors };
}

export function validateStudentInputs(newStudent, students) {
    const errors = { fullName: '', studentCod: '' };
    let isValid = true;

    if (!newStudent.fullName.trim()) {
        errors.fullName = 'El nombre no puede estar vacío.';
        isValid = false;
    }

    if (!newStudent.studentCod.trim()) {
        errors.studentCod = 'El código no puede estar vacío.';
        isValid = false;
    } else if (!/^\d+$/.test(newStudent.studentCod)) {
        errors.studentCod = 'El código debe ser numérico.';
        isValid = false;
    } else if (students.some(s => s.studentCod === newStudent.studentCod.trim())) {
        errors.studentCod = 'Este código ya está registrado.';
        isValid = false;
    }

    return { isValid, errors };
}