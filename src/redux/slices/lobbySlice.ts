import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LobbyState } from '../../models/Redux'
import { RootState } from '../store'

const initialState: LobbyState = {
    lobbyId: '',
    combats: [],
    players: [],
    gm: '',
    layout: 'default',
    controlledEntity: null,
}

export interface CombatInfo {
    nickname: string
    isActive: boolean
    roundCount: number
    _id: string
}

export interface LobbyPlayerInfo {
    userId: string
    nickname: string
    mainCharacter: string
}

export interface LobbyInfo {
    combats: Array<CombatInfo>
    players: Array<LobbyPlayerInfo>
    gm: string
    layout: 'default' | 'gm'
    controlledEntity: {
        name: string
        id: string
    } | null
}

const LobbySlice = createSlice({
    name: 'lobby',
    initialState,
    reducers: {
        setLobbyInfo: (state, action: PayloadAction<LobbyInfo>) => {
            return { ...state, ...action.payload }
        },
    },
})

export default LobbySlice.reducer

export const selectLobbyInfo = (state: RootState) => state.lobby
export const selectLobbyId = (state: RootState) => state.lobby.lobbyId

export const { setLobbyInfo } = LobbySlice.actions
