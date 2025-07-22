import { sendRequest, API_BASE } from './apiUtils'

const API_ASSIGNMENT = `${API_BASE}/mission-assignments`

export async function getAllAssignments(page = 0, size = 4) {
    return sendRequest(`${API_ASSIGNMENT}?page=${page}&size=${size}`)
}

export async function getAssignmentsByTeam(teamId) {
    return sendRequest(`${API_ASSIGNMENT}/team/${teamId}`)
}

export async function getAssignmentById(assignmentId) {
    return sendRequest(`${API_ASSIGNMENT}/${assignmentId}`)
}

export async function deleteAssignment(assignmentId) {
    return sendRequest(`${API_ASSIGNMENT}/${assignmentId}`, {
        method: 'DELETE',
    })
}

export async function createAssignment(assignmentData) {
    return sendRequest(API_ASSIGNMENT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignmentData),
    })
}

export async function updateAssignment(assignmentId, status) {
    return sendRequest(`${API_ASSIGNMENT}/${assignmentId}/status?status=${status}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}


export async function updateAssignmentTasks(assignmentId, tasks) {
    return sendRequest(`${API_ASSIGNMENT}/${assignmentId}/tasks`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
    })
}
