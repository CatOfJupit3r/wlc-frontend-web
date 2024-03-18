import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

import {
    fetchActions,
    resetTurn,
    selectChosenAction, selectCurrentActions, selectEntityInControlInfo, selectIsLoadingCurrentActions,
    selectIsTurnActive,
    selectReadyToSubmit, setCurrentActions,
    setIsTurnActive, setReadyToSubmit
} from "../../redux/slices/turnSlice";
import Battlefield from "../Battlefield/Battlefield";
import ActionInput from "../ActionInput/ActionInput";
import {REACT_APP_BACKEND_URL} from "../../config/configs";
import {selectGameId, selectIsActive, selectName, setActive} from "../../redux/slices/gameSlice";
import {GameCommand, NewMessageCommand, TakeActionCommand} from "../../models/GameCommands";
import {setNotify} from "../../redux/slices/notifySlice";
import GameStateFeed from "../GameStateFeed/GameStateFeed";
import styles from "./DebugScreen.module.css";
import {
    fetchAllEntitiesInfo,
    fetchAllMessages, fetchBattlefield, fetchTheMessage, selectEndInfo,
    selectRound, setEndInfo, setRound
} from "../../redux/slices/infoSlice";
import Overlay from "../Overlay/Overlay";
import {Spinner} from "react-bootstrap";
import {AppDispatch} from "../../redux/store";
import example from "../../data/example_action.json"


const DebugScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const {t} = useTranslation()

    const username = useSelector(selectName)
    const isActive = useSelector(selectIsActive)
    const isTurn = useSelector(selectIsTurnActive)
    const gameId = useSelector(selectGameId)
    const inputReadyToSubmit = useSelector(selectReadyToSubmit)
    const submittedInput = useSelector(selectChosenAction)
    const isLoadingActions = useSelector(selectIsLoadingCurrentActions)
    const roundCount = useSelector(selectRound)
    const activeEntityInfo = useSelector(selectEntityInControlInfo)
    const endInfo = useSelector(selectEndInfo)
    const currentAction = useSelector(selectCurrentActions)

    const setCurrentActionFromExample = () => {
        dispatch(
            setCurrentActions({
                actions: example
            })
        )
    }

    const ActiveScreen = useCallback(() => {
        return <>
             <h1 className={styles.roundHeader}>{t("local:game.round_n", {round: roundCount})}</h1>
             <div id={"game-controller"} className={styles.gameControls}>
                 <div id={"battle-info"} className={styles.battleInfo}>
                     <Battlefield />
                     <GameStateFeed />
                 </div>
                 <>
                     <h1>
                         {t("local:game.control_info", (() => {
                             const result = activeEntityInfo
                             if (result?.entity_name)
                                 result.entity_name = t(result.entity_name)
                             return result
                         })())}
                     </h1>
                     <ActionInput/>
                 </>
             </div>
         </>
     }, [roundCount, activeEntityInfo, t])

    return (
        <>
            <h1>
                Debug Screen
            </h1>
            {
                ActiveScreen()
            }
        </>
    )
}

export default DebugScreen;