export interface CharacterInfo {
    descriptor: string
    decorations: {
        name: string
        description: string
        sprite: string
    }
    controlledBy: Array<string> | null
    level: {
        current: number
        max: number
    }
    gold: number
}
