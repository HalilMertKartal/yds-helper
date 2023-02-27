import React from "react";
import ChoiceList from "./ChoiceList";
import './GeneralStyling.css';
import Timer from "./Timer";

const QuestionField = ( { questionNum, question, choices, onChoiceSelect, choiceColors,
     shouldRepeat, isTimerPlaying, isComplete, onClickToSettings } ) => {
    const qNum = questionNum.toString();
    const textToRender = `${qNum} - ${question}`;
    return(
        <div className="ui segment">
            <Timer 
            shouldRepeat={shouldRepeat}
            isComplete={isComplete}
            isTimerPlaying={isTimerPlaying}/>

            <button 
                onClick={onClickToSettings}
                className="ui grey icon massive button settings-btn">
            <i className="cogs icon"></i>
            </button>

            <div className="question">{textToRender}</div>

            <div className="choice-list">
            
                <ChoiceList 
                    choices={choices}
                    onChoiceSelect={onChoiceSelect}
                    choiceColors={choiceColors}/>
            </div>
            
        </div>
    );
};

export default QuestionField;