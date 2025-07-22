import { sendRequest, API_BASE } from './apiUtils'

const TEAM_API = `${API_BASE}/teams`

export async function getAllTeams(page = 0, size = 4) {
    return sendRequest(`${TEAM_API}?page=${page}&size=${size}`)
}

export async function getActiveTeams(page = 0, size = 4) {
    return sendRequest(`${TEAM_API}/active?page=${page}&size=${size}`)
}

export async function getTeamsByCourseId(courseId, page = 0, size = 4) {
    return sendRequest(`${TEAM_API}/course/${courseId}?page=${page}&size=${size}`)
}

export async function getTeamById(teamId) {
    return sendRequest(`${TEAM_API}/${teamId}`)
}

export async function getTeamByStudentCode(studentCode) {
    return sendRequest(`${TEAM_API}/student/${studentCode}`)
}

export async function createTeam(teamData) {
    return sendRequest(TEAM_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
    })
}

export async function updateTeam(teamId, teamData) {
    return sendRequest(`${TEAM_API}/${teamId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
    })
}

export async function deleteTeam(teamId) {
    return sendRequest(`${TEAM_API}/${teamId}`, {
        method: 'DELETE',
    })
}

export async function activateTeam(teamId) {
    return sendRequest(`${TEAM_API}/${teamId}/activate`, {
        method: 'PATCH',
    })
}