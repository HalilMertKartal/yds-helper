import React from "react";

const Slider = ({ onSliderClick, questionLang }) => {
    return (
        <div className="ui toggle checkbox slider">
            <input 
                type="checkbox" 
                name="public" 
                onClick={onSliderClick} />
            <label className="slider-label">
                Question language: {questionLang}
            </label>
        </div>
    );
}

export default Slider;

