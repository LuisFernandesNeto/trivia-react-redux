import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../CSS/QuestionsCSS.css';
import { scoreAction } from '../Redux/Actions';

const CORRECT_ANSWER = 'correct-answer';

class Questions extends React.Component {
  state = {
    index: 0,
    questions: [],
    category: '',
    question: '',
    correctAnswer: '',
    allAnswers: [],
    randomizedAnswers: [],
    timer: 30,
    difficulty: '',
    btnNextVisible: false,
    btnDisabled: false,
  };

  componentDidMount() {
    this.fetchQuestionWithToken();
  }

  questionToState = (questions) => {
    this.setState({
      index: 0,
      questions: [...questions],
      category: questions[0].category,
      question: questions[0].question,
      correctAnswer: questions[0].correct_answer,
      difficulty: questions[0].difficulty,
      allAnswers: [questions[0].correct_answer, ...questions[0].incorrect_answers],
    });
    const { allAnswers } = this.state;
    const randomSort = 0.5;
    const randomizedAnswers = allAnswers.sort(() => Math.random() - randomSort);
    this.setState({
      randomizedAnswers,
    });
    const timerIntervalDelay = 1000;
    setInterval(() => {
      this.handleCheckTimer();
    }, timerIntervalDelay);
  };

  fetchQuestionWithToken = async () => {
    const errorNumber = 3;
    const { props: { history } } = this.props;
    const { token } = localStorage;
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    try {
      const fetchWithToken = await fetch(url);
      const fetchResultJson = await fetchWithToken.json();
      if (fetchResultJson.response_code === errorNumber) {
        history.push('/');
      } else {
        this.questionToState(fetchResultJson.results);
        console.log(fetchResultJson.results);
      }
    } catch (error) {
      console.log('Algo de errado aconteceu no Try');
    }
  };

  handleCheckTimer = () => {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState(() => ({
        timer: timer - 1,
      }));
    } else {
      this.setState({
        btnNextVisible: true,
        btnDisabled: true,
      });
    }
  };

  calculatePoints = () => {
    const { timer, difficulty } = this.state;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    let basePoints = 0;
    if (difficulty === 'easy') {
      basePoints = easy;
    } else if (difficulty === 'medium') {
      basePoints = medium;
    } else if (difficulty === 'hard') {
      basePoints = hard;
    }
    const ten = 10;
    const totalPoints = ten + (timer * basePoints);
    return totalPoints;
  };

  handleClick = (event) => {
    const { dispatch } = this.props;
    const { correctAnswer, btnNextVisible } = this.state;
    const answer = event.target.innerText;
    const correctButton = document.getElementById(CORRECT_ANSWER);
    const wrongButton = document.querySelectorAll('#wrong-answer');
    this.setState({ btnNextVisible: true });
    console.log(btnNextVisible);
    if (answer === correctAnswer) {
      correctButton.className = CORRECT_ANSWER;
      wrongButton.forEach((wrong) => { wrong.className = 'wrong-answer'; });
      const answerCorrectScore = this.calculatePoints();
      dispatch(scoreAction(answerCorrectScore));
    } else {
      wrongButton.forEach((wrong) => { wrong.className = 'wrong-answer'; });
      correctButton.className = CORRECT_ANSWER;
    }
  };

  renderNextQuestion = () => {
    const { index } = this.state;
    const { props: { history } } = this.props;
    const questionLimit = 4;
    if (index === questionLimit) {
      history.push('/feedback');
    } else {
      this.checkLimitQuestion();
    }
  };

  checkLimitQuestion = () => {
    const { questions } = this.state;
    this.setState((prevState) => ({
      index: prevState.index + 1,
      allAnswers: [questions[prevState.index + 1]
        .correct_answer, ...questions[prevState.index + 1].incorrect_answers],
    }), () => {
      const { index, allAnswers } = this.state;
      const randomSort = 0.5;
      const randomizedAnswers = allAnswers.sort(() => Math.random() - randomSort);
      this.setState({
        timer: 30,
        btnNextVisible: false,
        btnDisabled: false,
        category: questions[index].category,
        question: questions[index].question,
        correctAnswer: questions[index].correct_answer,
        randomizedAnswers,
      });
      const elements = document.querySelector('#answer-btn-div').childNodes;
      [...elements].forEach((button) => { button.className = ''; });
    });
  };

  render() {
    const {
      category,
      question,
      correctAnswer,
      randomizedAnswers,
      timer,
      btnNextVisible,
      btnDisabled,
      difficulty,
    } = this.state;
    return (
      <div>
        <h2>{ timer }</h2>
        <h1>Questões</h1>
        <h3 data-testid="question-category">{ category }</h3>
        <h3 data-testid="question-text">{ question }</h3>
        <h1>{ difficulty }</h1>
        { btnNextVisible
          ? (
            <button
              type="submit"
              data-testid="btn-next"
              onClick={ this.renderNextQuestion }
            >
              Next
            </button>
          ) : null }
        <div id="answer-btn-div" data-testid="answer-options">
          {randomizedAnswers.map((answer, i) => (answer === correctAnswer
            ? (
              <button
                onClick={ this.handleClick }
                id="correct-answer"
                className="answer"
                type="button"
                key={ answer }
                data-testid="correct-answer"
                disabled={ btnDisabled }
              >
                { answer }
              </button>
            )
            : (
              <button
                onClick={ this.handleClick }
                id="wrong-answer"
                className="answer"
                type="button"
                key={ answer }
                data-testid={ `wrong-answer-${i}` }
                disabled={ btnDisabled }
              >
                { answer }
              </button>
            )))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.player.score,
});

Questions.propTypes = {
  props: propTypes.func.isRequired,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }).isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Questions);
