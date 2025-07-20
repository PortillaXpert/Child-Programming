import { sendRequest, API_BASE } from './apiUtils'

const API_MISSION = `${API_BASE}/missions`

export async function getMissionById(id) {
    return sendRequest(`${API_MISSION}/${id}`)
}

export async function getMissions() {
    return sendRequest(API_MISSION)
}

export async function getActiveMissions() {
    return sendRequest(`${API_MISSION}/active`)
}

export async function getInactiveMissions() {
    return sendRequest(`${API_MISSION}/inactive`)
}

export async function activateMission(id) {
    return sendRequest(`${API_MISSION}/${id}/activate`, {
        method: 'PATCH',
    })
}

export async function createMission(missionData) {
    return sendRequest(API_MISSION, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(missionData),
    })
}

export async function updateMission(id, missionData) {
    return sendRequest(`${API_MISSION}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(missionData),
    })
}

export async function deleteMission(id) {
    return sendRequest(`${API_MISSION}/${id}/desactivate`, {
        method: 'PATCH',
    })
}
