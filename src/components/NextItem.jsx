import React from "react";
import './GeneralStyling.css';

const NextItem = ( {onClickToFinish, onClickToNext} ) => {
    return(
    <>
        <button 
            onClick={onClickToFinish}
            className="ui right red labeled icon massive button finish-btn">
            <i className="close icon"></i>
            Finish Exam
        </button>
        <button 
            onClick={onClickToNext}
            className="ui right labeled icon massive button next-btn">
            <i className="right arrow icon"></i>
            Next Question
        </button>
    </>
    );
};

export default NextItem;
