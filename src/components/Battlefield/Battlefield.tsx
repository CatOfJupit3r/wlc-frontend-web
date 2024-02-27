import React, {useState} from 'react';
import example from "../../data/example_bf.json"
import {battlefieldStyle} from "./styles";
import {parseBattlefield, parsedToJSX} from "./utils";
import {Battlefield as BattlefieldInterface} from "../../types/Battlefield";
import {useDispatch} from "react-redux";
import {setIsTurnActive} from "../../redux/slices/turnSlice";

const Battlefield = () => {

    const [battlefield, setBattlefield] = useState(example as BattlefieldInterface)
    const dispatch = useDispatch()

    const changeBattlefield = () => {
        const new_battlefield = {...example}
        new_battlefield.game_descriptors.field_components["1"] = "builtins::enemy"
        setBattlefield(new_battlefield)
        dispatch(setIsTurnActive({value: true}))
    }

    return (
        <div style={battlefieldStyle}>
            {
                parsedToJSX(parseBattlefield(battlefield))
            }
            <button onClick={() => changeBattlefield()}>Click me</button>
        </div>
    );
};

export default Battlefield;