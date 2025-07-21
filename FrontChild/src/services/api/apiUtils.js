export const API_BASE = 'http://localhost:8085/chpp_teams_proyects/api/v1'

export async function sendRequest(url, options = {}) {
    try {
        const response = await fetch(url, options)
        if (!response.ok) throw new Error('Error en la solicitud')
        const json = await response.json()
        //console.log('Respuesta de la API:', json.data)
        return json.data
    } catch (error) {
        console.error('Error en sendRequest:', error)
        throw error
    }
}