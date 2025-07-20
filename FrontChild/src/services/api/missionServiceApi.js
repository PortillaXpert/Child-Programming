import { sendRequest, API_BASE } from './apiUtils'

const API_MISSION = `${API_BASE}/missions`

export async function getMissionById(id) {
    return sendRequest(`${API_MISSION}/${id}`)
}

export async function getMissions(page = 0, size = 4) {
    return sendRequest(`${API_MISSION}?page=${page}&size=${size}`);
}

export async function getActiveMissions(page = 0, size = 4) {
    return sendRequest(`${API_MISSION}/active?page=${page}&size=${size}`);
}

export async function getInactiveMissions(page = 0, size = 4) {
    return sendRequest(`${API_MISSION}/inactive?page=${page}&size=${size}`);
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
