import axios from 'axios'
import { REACT_APP_BACKEND_URL } from '../config/configs'
import { ActionInput } from '../models/ActionInput'
import { Battlefield } from '../models/Battlefield'
import authManager from './AuthManager'

/*

These services are used to make API calls to the server and receive responses.

In plans:
- Make GET requests.
- Make POST requests to the server.

- GET requests:
    - Create game using provided game_id.
    - Add entity to the game by descriptor.
    - Get possible actions for the active player.
    - Get game state.
- POST requests:
    - Send action to the server.

*/

export const getTranslations = async (language: string, dlc: string): Promise<{ [key: string]: string }> => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/translation?dlc=${dlc}&language=${language}`)
        return await response.json()
    } catch (e) {
        console.log(e)
        return {}
    }
}

export const getGameField = async (game_id: string): Promise<Battlefield> => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/${game_id}/game_field`)
        return await response.json()
    } catch (e) {
        console.log(e)
        return {
            field: [],
            columns: [],
            lines: [],
            connectors: '',
            separators: '',
            field_pawns: {},
        }
    }
}

export const getGameState = async (game_id: string): Promise<{ [key: string]: string }> => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/${game_id}/game_state`)
        return await response.json()
    } catch (e) {
        console.log(e)
        return {}
    }
}

export const getActions = async (game_id: string, entity_id: string): Promise<ActionInput> => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/${game_id}/action_options/${entity_id}`)
        return await response.json()
    } catch (e) {
        console.log(e)
        return {
            action: [
                {
                    id: 'builtins:skip',
                    translation_info: {
                        descriptor: 'builtins:skip',
                        co_descriptor: null,
                    },
                    available: true,
                    requires: null,
                },
            ],
            aliases: {},
            alias_translations: {},
        }
    }
}

export const getMemoryCell = async (
    game_id: string,
    memory_cell: string
): Promise<{
    [key: string]: Array<[string, string[]]>
}> => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/${game_id}/memory_cell/${memory_cell}`)
        return await response.json()
    } catch (e) {
        console.log(e)
        return {}
    }
}

export const getAllMessages = async (game_id: string): Promise<{ [key: string]: Array<[string, string[]]> }> => {
    try {
        const response = await fetch(`${REACT_APP_BACKEND_URL}/${game_id}/all_messages`)
        return await response.json()
    } catch (e) {
        console.log(e)
        return {}
    }
}

export const login = async (handle: string, password: string) => {
    const response = await axios.post(`${REACT_APP_BACKEND_URL}/login`, { handle, password })
    const { accessToken, refreshToken } = response.data
    authManager.login({ accessToken, refreshToken })
}

export const createAccount = async (handle: string, password: string) => {
    await axios.post(`${REACT_APP_BACKEND_URL}/register`, { handle, password })
    await login(handle, password)
}
