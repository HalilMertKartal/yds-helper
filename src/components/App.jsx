import React from "react";
import QuestionField from "./QuestionField";
import NextItem from "./NextItem";
import RestartBtns from "./RestartBtns";
import PopUp from "./PopUp";
import Slider from "./Slider";
import './GeneralStyling.css';
import { QUESTIONS_ANSWERS, QUESTION_LIMIT, CHOICE_COLOR,
QUESTIONS_ANSWERS_SET_2, QUESTIONS_ANSWERS_PHRASALS, QUESTIONS_ANSWERS_PREP_CONJ } from "../constants";

// We can set this array to what constant we want to work with
const QUESTION_SET_SELECTED = QUESTIONS_ANSWERS_PREP_CONJ.concat(QUESTIONS_ANSWERS_SET_2, QUESTIONS_ANSWERS_PHRASALS, QUESTIONS_ANSWERS_PREP_CONJ, QUESTIONS_ANSWERS);

class App extends React.Component{

    INITIAL_CHOICE_COLORS = new Array(4).fill(CHOICE_COLOR);

    state = { 
        choiceColors: this.INITIAL_CHOICE_COLORS,
        answersArray:[],
        choicesArray:[],
        randomizedQuenstionsAnswers:[],
        wrongQuestionsAnswers: [], 
        currentQuestion:"", 
        currentAnswer:"",
        selectedChoice:"",
        questionLang:"English",
        finishExamClicked: false,
        isFinished: false,
        reviewBtnDisabled:false,
        selectedChoiceTruth:false,
        isTimerPlaying: false,
        swapQandAs: false,
        show: false,
        currentIndex:0,
        shouldRepeat: 0,
        questionStats: { wrongNum:0, wrongPerc:0, correctNum:0, correctPerc:0} };

    _handleKeyUp= (event) => {
        switch( event.code ) {
            case "ArrowRight":
                if(!this.state.isFinished){
                    this.onClickToNext();
                }
                break;
            case "Enter":
                if(!this.state.isFinished){
                    this.onClickToNext();
                }
                else{
                    this.onClickToFreshRestart();
                }
                break;
            case "Space":
                if(this.state.isFinished){
                    this.onClickToReview();
                }
                break;
            case "Digit1":
                if(!this.state.isFinished){
                    this.onChoiceSelect(this.state.choicesArray[0]);
                }
                break;
            case "Digit2":
                if(!this.state.isFinished){
                    this.onChoiceSelect(this.state.choicesArray[1]);
                }
                break;
            case "Digit3":
                if(!this.state.isFinished){
                    this.onChoiceSelect(this.state.choicesArray[2]);
                }
                break;
            case "Digit4":
                if(!this.state.isFinished){
                    this.onChoiceSelect(this.state.choicesArray[3]);
                }
                break;

            default: 
                break;
        }
    };
    

    componentDidMount(){
        this.initializeQuestions(QUESTION_SET_SELECTED);
        document.addEventListener("keyup", this._handleKeyUp);
    };

    initializeQuestions = (initialArr) => {
        let questionsAnswersCopy = [...initialArr];
        let randomized = this.randomizeArray(questionsAnswersCopy);

        let initialQuestion = randomized[0].question;
        let initialAnswer = randomized[0].answer;


        // If swapped
        if(this.state.swapQandAs){
            let boob = initialQuestion;
            initialQuestion = initialAnswer;
            initialAnswer = boob;
        }
  
        // Create answers array
        let answersOnly = QUESTION_SET_SELECTED.map(
            ( {answer, question} ) => {

                if (this.state.swapQandAs){
                    return question;
                }
                else{
                    return answer;
                }
                
            }
        );

        let answersOnlyCopy = [...answersOnly]

        // Remove the current answer from the array and pick 3 random elements
        let currentChoices = this.prepareChoices(answersOnlyCopy, initialAnswer);

        // Update the states
        this.setState( {
            randomizedQuenstionsAnswers: randomized,
            currentQuestion: initialQuestion,
            currentAnswer: initialAnswer,
            reviewBtnDisabled: false,
            currentIndex: 0,
            answersArray: answersOnly,
            choicesArray:currentChoices,
            isTimerPlaying:true} );
    };

    resetTimer = () => { 
        // Reset the timer
        let shouldRepeat = this.state.shouldRepeat + 1;
        this.setState( {shouldRepeat:shouldRepeat} );
    }

    timerHandler = (isComplete) => {
        if(isComplete){
            this.onClickToNext();
        }
    }

    onClickToFinish = () => {
        // Finish if user clicks on finish button
        this.setState({ finishExamClicked: true,
                        isFinished: true });
        this.onExamFinish();
    };

    onClickToNext = () => {

        this.resetTimer();

        let ind = this.state.currentIndex;
        ind++;

        // Add the question and answer to the array if it's wrong or empty
        let selectedChoice = this.state.selectedChoice;
        let wrongQAs = this.state.wrongQuestionsAnswers;
        let selectedChoiceTruth = this.state.selectedChoiceTruth;

        if(selectedChoice === "" || !selectedChoiceTruth){
            if(this.state.swapQandAs){
                wrongQAs.push(
                    {
                    answer: this.state.currentQuestion,
                    question: this.state.currentAnswer
                    }
                    );
            } 
            else{
                wrongQAs.push(
                    {
                    question: this.state.currentQuestion,
                    answer: this.state.currentAnswer
                    }
                );
            }

        }

        // Finish if all the questions are done
        if (ind >= QUESTION_LIMIT || ind >= this.state.randomizedQuenstionsAnswers.length){
            this.onExamFinish();
            return;
        }
        

        let currQuestion = this.state.randomizedQuenstionsAnswers[ind].question;
        let currAns = this.state.randomizedQuenstionsAnswers[ind].answer;
        let answersArr = this.state.answersArray;

        // If swapped
        if(this.state.swapQandAs){
            let boob = currQuestion;
            currQuestion = currAns;
            currAns = boob;
        }

        // Prapare the choices and set the state
        let answersArrCopy = [...answersArr]
        let choicesToRender = this.prepareChoices(answersArrCopy, currAns);


        this.setState( {currentIndex:ind,
                        choiceColors:this.INITIAL_CHOICE_COLORS,
                        selectedChoice: "",
                        currentQuestion: currQuestion,
                        currentAnswer: currAns,
                        choicesArray: choicesToRender,
                        wrongQuestionsAnswers: wrongQAs} );

    };


    onChoiceSelect = (selectedChoice) => {
        this.setState({ selectedChoice: selectedChoice });

        let choicesArray = this.state.choicesArray;
        let colorsArray = [];

        let currentAns = this.state.currentAnswer;

        for(let i = 0; i < 4; i++){
            if(selectedChoice === choicesArray[i]){
                if(selectedChoice === currentAns){
                    colorsArray.push("green");
                    this.setState({ selectedChoiceTruth: true });
                }
                else{
                    colorsArray.push("red");
                    this.setState( {selectedChoiceTruth: false} );
                }
            }
            else{
                colorsArray.push(CHOICE_COLOR);
            }
        }

        this.setState( {choiceColors: colorsArray} );
    };

    onExamFinish(){
        let totalNumOfQs = QUESTION_LIMIT;
        let wrongCount = this.state.wrongQuestionsAnswers.length;
        let correctCount = totalNumOfQs - wrongCount;
        let wrongPerc = (wrongCount / totalNumOfQs) * 100;
        let correctPerc = 100 - wrongPerc;   

        this.setState( 
            { 
                isFinished: true,
                reviewBtnDisabled:this.state.wrongQuestionsAnswers.length===0 ? true : false,
                isTimerPlaying: false,
                questionStats:{
                                wrongNum:wrongCount,
                                correctNum:correctCount,
                                wrongPerc:wrongPerc,
                                correctPerc:correctPerc,
                            } 
            } 
        );
        
    };

    onClickToFreshRestart = () => {
        this.resetTimer();
        this.initializeQuestions(QUESTION_SET_SELECTED);
        this.setState(
            {
                wrongQuestionsAnswers: [], 
                choiceColors: this.INITIAL_CHOICE_COLORS,
                selectedChoiceTruth:false,
                isFinished: false,
                finishExamClicked: false
            }
        );
    };

    onClickToReview = () => {
        this.resetTimer();
        if(this.state.wrongQuestionsAnswers.length <= 0){
            return;
        }
        this.initializeQuestions(this.state.wrongQuestionsAnswers);
        this.setState(
            {
                wrongQuestionsAnswers: [], 
                choiceColors: this.INITIAL_CHOICE_COLORS,
                selectedChoiceTruth:false,
                isFinished: false
            }
        );
    };

    onSliderClick = () => {
        let isSwap = this.state.swapQandAs;
        let questionLang = this.state.questionLang;
        questionLang = isSwap ? "English": "Turkish";

        this.setState( {swapQandAs: !isSwap,
                        questionLang:questionLang} );
    };

    handleShowPopUp = () => {
        this.setState( {show:true} );
    };

    handleClosePopUp = () => {
        this.setState( {show:false} );
        this.setState( {isTimerPlaying:true} );
    };
    

    onClickToSettings = () => {
        this.handleShowPopUp();
        this.setState( {isTimerPlaying:false} );
    };

    
    randomizeArray(array){
        let len = array.length;
        let result = [];

        for (let i = 0; i < len; i++){
            let indexToDelete = Math.floor(Math.random()*array.length);
            result.push(array[indexToDelete]);
            array.splice(indexToDelete, 1);
        }
        return result;
    };

    prepareChoices(array, currAns){
        let result = [];

        let mockArr = [];

        // Remove the current answer
        array = array.filter(item=> item !== currAns);

        // Add 3 choices into the array
        mockArr = this.randomizeArray(array);

        for (let i = 0; i < 3; i++){
            result.push(mockArr[i]);
        }
        // Add the current answer into the array
        result.push(currAns);

        // Shuffle again
        return this.randomizeArray(result);
        
    };

    render(){
        return(
            <>
            <div className="ui container" style={{overflow:"hidden"}}>
                <div hidden = {this.state.isFinished} className="ui segment big-container">
                    <h2 className="title">YDS HELPER</h2>
                    <QuestionField
                        questionNum={this.state.currentIndex+1}
                        question={this.state.currentQuestion}
                        choices={this.state.choicesArray}
                        onChoiceSelect={this.onChoiceSelect}
                        choiceColors={this.state.choiceColors}
                        shouldRepeat={this.state.shouldRepeat}
                        isComplete={this.timerHandler}
                        isTimerPlaying={this.state.isTimerPlaying}
                        onSliderClick={this.onSliderClick}
                        onClickToSettings={this.onClickToSettings}/>
                    <NextItem 
                        onClickToFinish={this.onClickToFinish}
                        onClickToNext={this.onClickToNext} />
                </div>
                <div hidden = {!this.state.isFinished} className="ui segment big-container"
                style={{overflow:"hidden"}}>
                    <h1 className="finished-text">
                        DONE
                    </h1>
                    <div className="finish-div">
                        <h2 className="finished-info">
                            You may restart the exam with only your wrong answers or
                            you may start over with all questions.
                            <br />
                            <div className="stats-container" hidden= {this.state.finishExamClicked}>
                                <div className="stats-correct">
                                    {this.state.questionStats.correctNum} question(s) were correct with{" "}
                                    {this.state.questionStats.correctPerc}%
                                </div>
                                <div className="stats-wrong">
                                    {this.state.questionStats.wrongNum} question(s) were wrong with{" "}
                                    {this.state.questionStats.wrongPerc}%
                                </div>
                            </div>
                            <Slider 
                                onSliderClick={this.onSliderClick}
                                questionLang={this.state.questionLang}/>
                            
                        </h2>
                        <h4>
                            
                        </h4>
                        <RestartBtns 
                            reviewBtnDisabled={this.state.reviewBtnDisabled}
                            onClickToFreshRestart={this.onClickToFreshRestart}
                            onClickToReview={this.onClickToReview}/>
                    </div>
                </div>
                
            </div>
            <PopUp
                show={this.state.show}
                onHide={this.handleClosePopUp}
            />
            </>
            
        );
        
    }
}

export default App;