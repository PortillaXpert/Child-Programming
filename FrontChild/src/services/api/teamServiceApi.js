import { sendRequest, API_BASE } from './apiUtils'

const TEAM_API = `${API_BASE}/teams`

export async function fetchData(url) {
    return sendRequest(url)
}

export async function getAllTeams() {
    return fetchData(TEAM_API)
}

export async function getActiveTeams() {
    return fetchData(`${TEAM_API}/active`)
}


export async function getTeamById(teamId) {
    return fetchData(`${TEAM_API}/${teamId}`)
}

export async function getTeamByStudentCode(studentCode) {
    return fetchData(`${TEAM_API}/student/${studentCode}`)
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