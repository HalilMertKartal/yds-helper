import React from "react";

const RestartBtns = ( {onClickToFreshRestart, onClickToReview, reviewBtnDisabled} ) => {


    return(
        <div>
            <button onClick={onClickToFreshRestart}
            className="ui right olive labeled icon massive button next-btn">
            <i className="redo alternate icon"></i>
                Fresh Restart
            </button>
            <button onClick={onClickToReview}
            className="ui right yellow labeled icon massive button finish-btn"
            disabled={reviewBtnDisabled}>
            <i className="edit icon"></i>
                Check Wrong Answers
            </button>
        </div>
    );
}; 

export default RestartBtns;