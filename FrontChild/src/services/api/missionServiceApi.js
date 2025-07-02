const API_BASE = 'http://localhost:8085/chpp_teams_proyects/api/v1'

export async function getAssignments(teamId) {
    const res = await fetch(`${API_BASE}/mission-assignments/team/${teamId}`)
    const json = await res.json()
    return json.data
}

export async function getMissionById(id) {
    const res = await fetch(`${API_BASE}/missions/${id}`)
    if (!res.ok) {
        throw new Error(`Error fetching mission with ID ${id}: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}
