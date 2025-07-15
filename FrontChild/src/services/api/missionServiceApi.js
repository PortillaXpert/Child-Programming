const API_BASE = 'http://localhost:8085/chpp_teams_proyects/api/v1'

export async function getMissionById(id) {
    const res = await fetch(`${API_BASE}/missions/${id}`)
    if (!res.ok) {
        throw new Error(`Error fetching mission with ID ${id}: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}

export async function getMissions() {
    const res = await fetch(`${API_BASE}/missions`)
    if (!res.ok) {
        throw new Error(`Error fetching missions: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}

export async function createMission(missionData) {
    console.log('Creating mission with data:', missionData)
    const res = await fetch(`${API_BASE}/missions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(missionData),
    })
    if (!res.ok) {
        throw new Error(`Error creating mission: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}

export async function updateMission(id, missionData) {
    const res = await fetch(`${API_BASE}/missions/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(missionData),
    })
    if (!res.ok) {
        throw new Error(`Error updating mission with ID ${id}: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}

export async function deleteMission(id) {
    const res = await fetch(`${API_BASE}/missions/${id}/desactivate`, {
        method: 'PATCH',
    })
    if (!res.ok) {
        throw new Error(`Error deleting mission with ID ${id}: ${res.statusText}`)
    }
    return true
}
