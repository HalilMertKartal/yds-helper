import React from "react";

const ChoiceItem = ( { text, onChoiceSelect, color } ) => {
    let cName = "massive ui button";
    let classNm = `${cName} ${color}`;
    let stylesheet = "choiceBtn";
    return(
        <button 
            style={{border:"0.5px solid white"}}
            className={classNm}
            onClick={() => onChoiceSelect(text)}>
            {text}
        </button>
    );
};

export default ChoiceItem;