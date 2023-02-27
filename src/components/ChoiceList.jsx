import React from "react";
import ChoiceItem from "./ChoiceItem";

const ChoiceList = ( { choices, onChoiceSelect, choiceColors } ) => {
    // Array.map ile questionchoice leri listeleyecek
    // O listi return edecek
    const choicesToRender = choices.map(
        (choice, index) => {
            return(
                <ChoiceItem text={choice} key={choice} 
                onChoiceSelect={onChoiceSelect}
                color={choiceColors[index] } />
            );
        }
    );
    return(
        <div className="four ui buttons">
            {choicesToRender}
        </div>
    );
};

export default ChoiceList;