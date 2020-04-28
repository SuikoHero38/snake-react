import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Snake from './components/Snake';
import Food from './components/Food';
import Score from './components/Score';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

const initState = {
  food: getRandomCoordinates(),
  snakeDots: [
    [0, 0],
    [2, 0]
  ],
  speed: 200,  //200 ms
  direction: 'R', //Indicates right movement at start
  score: 0
}

class App extends Component {

  state = initState;

  componentDidMount(){
    setInterval(this.move, this.state.speed);//Move the snake and set the speed

    //Check keycode from keyboard
    //According to https://keycode.info/

    document.onkeydown = this.checkKeyCode;
  }

  componentDidUpdate(){
    //Clash with wall
    this.clashWall();

    //Clash with its own body
    this.clashBody();

    //After eat -> enlarge and add score
    this.afterEat();
  }

  move = () => {
    let dots = [...this.state.snakeDots];//set the snake dots
    let head = dots[dots.length - 1];

    switch (this.state.direction){
        case 'R':
          head = [head[0] + 2, head[1]];
          break;
        case 'L':
          head = [head[0] - 2, head[1]];
          break;
        case 'U':
          head = [head[0], head[1] - 2];
          break;
        case 'D':
          head = [head[0], head[1] + 2];
          break;
    }

    dots.push(head);
    dots.shift(); //Remove first item of the dots array/old tail
    this.setState({
      snakeDots: dots
    })

  }

  checkKeyCode = (e) => {
    //Check current movement, if the opposite, skip
    let lastMove = this.state.direction;

    e = e || window.event;
    switch(e.keyCode){
      case 37:
        //Left
        if(lastMove != 'R'){
          this.setState({ direction: 'L' });
          break;
        }
        else{
          this.setState({ direction: 'R' });
          break;
        }
      case 38:
        //Up
        if (lastMove != 'D') {
          this.setState({ direction: 'U' });
          break;
        }
        else {
          this.setState({ direction: 'D' });
          break;
        }
      case 39:
        //Right
        if (lastMove != 'L') {
          this.setState({ direction: 'R' });
          break;
        }
        else {
          this.setState({ direction: 'L' });
          break;
        }
      case 40:
        //Down
        if (lastMove != 'U') {
          this.setState({ direction: 'D' });
          break;
        }
        else {
          this.setState({ direction: 'U' });
          break;
        }
    }
  }

  afterEat = () => {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;

    if(head[0] == food[0] && head[1] == food[1]){
      let lastScore = this.state.score;

      //The snake eats
      this.setState({
        food  : getRandomCoordinates(),
        score : lastScore+1
      })

      //Enlarge the snake
      this.enlargeSnake();

      //Increase speed
      this.speedUp();

    }
  }

  enlargeSnake = () => {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]); //Add in the beginning of array
    this.setState({
      snakeDots: newSnake
    })
  }

  speedUp = () => {
    if(this.state.speed > 10){
      this.setState({
        speed: this.state.speed - 10
      });
    }
  }

  clashWall = () => {
    let head  = this.state.snakeDots[this.state.snakeDots.length - 1];
    if(head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0){
      this.gameOver();
    }
  }

  clashBody = () => {
    let snake = [...this.state.snakeDots];
    let head  = snake[snake.length-1];
    snake.pop();
    snake.forEach(dot => {
      if(head[0] == dot[0] && head[1] == dot[1]){
        this.gameOver();
      }
    })
  }

  gameOver = () => {
    alert(`The game is over! Your Score: ${this.state.score}`);
    this.setState(initState);
  }

  render(){
    return (
      <div>
        <Score score={this.state.score} />
        <div className="area">
          <Snake dots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
      </div>
    );
  }
}

export default App;
