export async function getTeamByStudentCode(studentCode) {
    try {
        const res = await fetch(`http://localhost:8085/chpp_teams_proyects/api/v1/teams/student/${studentCode}`)
        if (!res.ok) throw new Error('Error en la respuesta del servidor')
        const data = await res.json()
        return data.data 
    } catch (error) {
        console.error('Error al obtener el equipo:', error)
        throw error
    }
}
