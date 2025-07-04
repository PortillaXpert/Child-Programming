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


export async function getAllTeams() {
    try {
        const res = await fetch('http://localhost:8085/chpp_teams_proyects/api/v1/teams')
        if (!res.ok) throw new Error('Error en la respuesta del servidor')
        const data = await res.json()
        console.log('Equipos obtenidos:', data.data)
        return data.data 
    } catch (error) {
        console.error('Error al obtener los equipos:', error)
        throw error
    }
}

export async function getTeamById(teamId) {
    try {
        const res = await fetch(`http://localhost:8085/chpp_teams_proyects/api/v1/teams/${teamId}`)
        if (!res.ok) throw new Error('Error en la respuesta del servidor')
        const data = await res.json()
        return data.data 
    } catch (error) {
        console.error('Error al obtener el equipo por ID:', error)
        throw error
    }
}

export async function updateTeam(teamId, teamData) {
    try {
        const res = await fetch(`http://localhost:8085/chpp_teams_proyects/api/v1/teams/${teamId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(teamData),
        })
        if (!res.ok) throw new Error('Error al actualizar el equipo')
        const data = await res.json()
        return data.data 
    } catch (error) {
        console.error('Error al actualizar el equipo:', error)
        throw error
    }
}