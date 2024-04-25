import { useEffect } from 'react'
import { Blurhash } from 'react-blurhash'
import { useDispatch, useSelector } from 'react-redux'
import { BATTLEFIELD_BLUR_HASH } from '../../config/configs'
import {
    selectBattlefieldMode,
    selectBattlefieldMold,
    selectColumns,
    selectConnectors,
    selectFieldComponents,
    selectLines,
    selectSeparators,
    setInteractableTiles,
} from '../../redux/slices/battlefieldSlice'
import { selectAliases, selectCurrentAlias, selectIsSquareChoice, selectScope } from '../../redux/slices/turnSlice'
import styles from './Battlefield.module.css'
import { COLUMNS_ARRAY, CONNECTORS, JSX_BATTLEFIELD, LINES_ARRAY, SEPARATORS } from './utils'

const Battlefield = () => {
    const dispatch = useDispatch()

    const isSquareChoice = useSelector(selectIsSquareChoice)
    const currentAlias = useSelector(selectCurrentAlias)
    const aliases = useSelector(selectAliases)
    const scope = useSelector(selectScope)
    const connectors = useSelector(selectConnectors)
    const columns = useSelector(selectColumns)
    const lines = useSelector(selectLines)
    const separators = useSelector(selectSeparators)
    const field_components = useSelector(selectFieldComponents)
    const battlefield = useSelector(selectBattlefieldMold)
    const battlefieldMode = useSelector(selectBattlefieldMode)

    const numberOfRows = battlefield.lines.length
    const allyRowIndexes = Array.from({ length: Math.floor(numberOfRows / 2) }, (_, i) => i)
    const enemyRows = Array.from({ length: Math.floor(numberOfRows / 2) }, (_, i) => i + Math.floor(numberOfRows / 2))

    useEffect(() => {
        if (isSquareChoice) {
            const newInteractableTiles: { [key: string]: boolean } = {}
            for (const action of aliases[scope[currentAlias]]) {
                newInteractableTiles[action.id] = true
            }
            dispatch(setInteractableTiles(newInteractableTiles))
        } else if (battlefieldMode === 'selection') {
            dispatch(
                setInteractableTiles(
                    (() => {
                        const interactableTiles: { [key: string]: boolean } = {}
                        for (let i = 0; i < battlefield.field.length; i++) {
                            for (let j = 0; j < battlefield.field[i].length; j++) {
                                interactableTiles[`${i + 1}/${j + 1}`] = false
                            }
                        }
                        return interactableTiles
                    })()
                )
            )
        }
    }, [isSquareChoice])

    const columnHelpRow = (key: string) => {
        const rendered = []
        rendered.push(
            <div
                key={`column-help-${key}`}
                style={{
                    display: 'flex',
                }}
            >
                {CONNECTORS(connectors, key)}
                {COLUMNS_ARRAY(columns)}
                {CONNECTORS(connectors, key + 1)}
            </div>
        )
        return rendered
    }

    const displayRows = (rows: number[], side_type: string) => {
        const rendered = []
        const right_lines = LINES_ARRAY(lines, `${side_type}_right`)
        const left_lines = LINES_ARRAY(lines, `${side_type}_left`)
        const battlefieldJSX = JSX_BATTLEFIELD(battlefield.field, field_components)
        for (const i of rows) {
            rendered.push(
                <div
                    style={{
                        display: 'flex',
                    }}
                    key={`entity-row-${i}`}
                >
                    {right_lines[i]}
                    {battlefieldJSX[i]}
                    {left_lines[i]}
                </div>
            )
        }
        return rendered
    }

    const displaySeparators = () => {
        const rendered = []
        rendered.push(
            <div
                style={{
                    display: 'flex',
                }}
                key={'separator-row'}
            >
                {CONNECTORS(connectors, '1')}
                {[...Array(columns.length)].map((_, index) => SEPARATORS(separators, index.toString()))}
                {CONNECTORS(connectors, '2')}
            </div>
        )
        return rendered
    }

    return (
        <div className={styles.battlefield} id={'battlefield-div'}>
            {!battlefield ? (
                <Blurhash
                    hash={BATTLEFIELD_BLUR_HASH}
                    width={'80vh'}
                    height={'90vh'}
                    style={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                    }}
                />
            ) : (
                <>
                    {columnHelpRow('1')}
                    {displayRows(allyRowIndexes, 'ally')}
                    {displaySeparators()}
                    {displayRows(enemyRows, 'enemy')}
                    {columnHelpRow('2')}
                </>
            )}
        </div>
    )
}

export default Battlefield
