import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import '../CSS/QuestionsCSS.css';
import { scoreAction } from '../Redux/Actions';

const CORRECT_ANSWER = 'correct-answer';

class Questions extends React.Component {
  // Como expliquei no Zoom, fiz a parte primária pra lógica de ter a ordem das questões gerenciada pelo estado local.
  // Alguns estados estão comentados para facilitar os futuros requisitos, mas inativos agora para não causar conflito.

  state = {
    // index: 0,
    // questions: [],
    category: '',
    question: '',
    correctAnswer: '',
    allAnswers: [],
    randomizedAnswers: [],
    timer: 30,
    btnNext: false,
  };

  componentDidMount() {
    this.fetchQuestionWithToken();
  }

  componentDidUpdate() {
    const { timer } = this.state;
    const number = 1;
    const second = 1000;
    const zero = 0;
    const timerTimeout = setTimeout(() => {
      this.setState({ timer: timer - number });
    }, second);
    if (timer === zero) {
      clearTimeout(timerTimeout);
    }
  }

  // Função responsável por receber as questões e popular o estado do componente
  questionToState = (questions) => {
    this.setState({
      // É o índice do array de perguntas recebidas (Ainda não está sendo usado).
      // index: 0,

      // É o array com as questões, que vai ser usado como base para os outros estados locais (Ainda não está sendo usado).
      // questions: [...questions],

      // Category, question, correctAnswer e difficulty vão usar como base o index e o questions.
      category: questions[0].category,
      question: questions[0].question,
      correctAnswer: questions[0].correct_answer,

      // Difficulty será usada em requisitos futuros.
      // difficulty: questions[0].difficulty,

      // Esse estado vai contar todas as perguntas, tanto as certas quanto erradas.
      allAnswers: [questions[0].correct_answer, ...questions[0].incorrect_answers],
    });
    const { allAnswers } = this.state;
    const randomSort = 0.5;
    // Função responsável por tornar aleatória a ordem das respostas certas e erradas.
    const randomizedAnswers = allAnswers.sort(() => Math.random() - randomSort);
    // E então, insere o valor em outro estado.
    this.setState({
      randomizedAnswers,
    });
  };

  // Função responsável por passar o token do localstorage para o endpoint,
  // verificar se foi bem sucedido e passar o parâmetro para outra função.
  fetchQuestionWithToken = async () => {
    // response_code esperado em caso de erro, para evitar magic-number
    const errorNumber = 3;
    const { props: { history } } = this.props;
    const { token } = localStorage;
    // Endpoint para receber as questões com o token do localstorage
    const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
    // O Try executa o fetch e retorna o usuário para a página inicial caso o response_code seja 3.
    // Caso seja qualquer outra response (normalmente o retorno é 0 ou 3), vai passar o resultado para outra função.
    try {
      const fetchWithToken = await fetch(url);
      // Recebe o resultado do fetch e transforma em JSON
      const fetchResultJson = await fetchWithToken.json();
      if (fetchResultJson.response_code === errorNumber) {
        history.push('/');
      } else {
        this.questionToState(fetchResultJson.results);
        console.log(fetchResultJson.results);
      }
    } catch (error) {
      console.log('Algo de errado aconteceu no Try');
      // localStorage.setItem('token', 'INVALID_TOKEN');
    }
  };

  handleClick = (event) => {
    const { score, dispatch } = this.props;
    const { correctAnswer, btnNext } = this.state;
    const answer = event.target.innerText;
    const correctButton = document.getElementById(CORRECT_ANSWER);
    const wrongtButton = document.querySelectorAll('#wrong-answer');
    this.setState({ btnNext: true });
    console.log(btnNext);
    if (answer === correctAnswer) {
      correctButton.className = CORRECT_ANSWER;
      wrongtButton.forEach((wrong) => { wrong.className = 'wrong-answer'; });
      const answerCorrectScore = score + 1;
      dispatch(scoreAction(answerCorrectScore));
    } else {
      wrongtButton.forEach((wrong) => { wrong.className = 'wrong-answer'; });
      correctButton.className = CORRECT_ANSWER;
    }
  };

  btnNextChange = () => {
    this.setState({ timer: 30 });
  };

  render() {
    const {
      category,
      question,
      correctAnswer,
      randomizedAnswers,
      timer,
      btnNext,
    } = this.state;
    return (
      // O map vai percorrer o array de perguntas que já foi embaralhado (Linha 41),
      // e renderizar elas em tela de acordo com as especificações do requisito,
      // verificando a resposta correta e atribuindo o id e data-testid de resposta correta.
      <div>
        {/* { this.scoreTimer() } */}
        <span>{ timer }</span>
        <h1>Questões</h1>
        <h3 data-testid="question-category">{ category }</h3>
        <h3 data-testid="question-text">{ question }</h3>
        { btnNext
          ? (
            <button
              type="submit"
              data-testid="btn-next"
              onClick={ this.btnNextChange }
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
                disabled={ timer === 0 / true }
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
                disabled={ timer === 0 / true }
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
  score: propTypes.number.isRequired,
  dispatch: propTypes.func.isRequired,
};

export default connect(mapStateToProps)(Questions);
