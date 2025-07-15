const API_URL = 'http://localhost:8085/chpp_teams_proyects/api/v1'

export async function getAllAssignments() {
    const res = await fetch(`${API_URL}/mission-assignments`)
    if (!res.ok) {
        throw new Error(`Error fetching assignments: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}

export async function getAssignmentsByTeam(teamId) {
    const res = await fetch(`${API_URL}/mission-assignments/team/${teamId}`)
    const json = await res.json()
    return json.data
}


export async function getAssignmentById(assignmentId) {
    const res = await fetch(`${API_URL}/mission-assignments/${assignmentId}`)
    if (!res.ok) {
        throw new Error(`Error fetching assignment: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}

export async function deleteAssignment(assignmentId) {
    const res = await fetch(`${API_URL}/mission-assignments/${assignmentId}`, {
        method: 'DELETE'
    })
    if (!res.ok) {
        throw new Error(`Error deleting assignment: ${res.statusText}`)
    }
}

export async function createAssignment(assignmentData) {
    const res = await fetch(`${API_URL}/mission-assignments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentData)
    })
    if (!res.ok) {
        throw new Error(`Error creating assignment: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}

export async function updateAssignment(assignmentId, assignmentData) {
    const res = await fetch(`${API_URL}/mission-assignments/${assignmentId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(assignmentData)
    })
    if (!res.ok) {
        throw new Error(`Error updating assignment: ${res.statusText}`)
    }
    const json = await res.json()
    return json.data
}
