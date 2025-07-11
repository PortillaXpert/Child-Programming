const API_URL = 'http://localhost:8085/chpp_teams_proyects/api/v1'

export async function getAllAssignments() {
    const res = await fetch(`${API_URL}/mission-assignments`)
    if (!res.ok) {
        throw new Error(`Error fetching assignments: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}
