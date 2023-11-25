import React, { useState, useRef } from 'react'
import './TicTacToe.css'
import ex_icon from '../Assets/x.png'
import circle_icon from '../Assets/circle.png'
let board = ["", "", "", "", "", "", "", "", ""]
let firstOperand;
let secondOperand;
let operation;
let operationIndex;
const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    const displayRef = useRef(null);
    
    
    const toggle = (e, num) => {
        if (lock) {
            return 0;
        }
        if (count%2===0) {
            e.target.innerHTML = `<img src='${ex_icon}'>`;
            board[num] = "x";
            setCount(++count);
        }
        else {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            board[num] = 'o';
            setCount(++count);
        }
        console.log(board)
        checkwin();
    }  
    const checkwin = () => {
        if (board[0]===board[1] && board[1]===board [2] && board[2]!== "")
        {
            won(board[2]);
        }
        else if (board[3]===board[4] && board[4]===board[5] && board[5]!=="") 
        {
            won(board[5]);
        }
        else if (board[6]===board[7] && board[7]===board[8] && board [8]!=="") 
        {
            won(board[8]);
        }
        else if (board[0]===board[3] && board[3]===board[6] && board[6]!=="") 
        {
            won(board[6]);
        }
        else if (board[1]===board[4] && board[4]===board[7] && board[7]!=="") 
        {
            won(board[7]);
        }
        else if (board[2]===board[5] && board[5]===board[8] && board[8]!=="") 
        {
            won(board[8]);
        }
        else if (board[0]===board[4] && board[4]===board[8] && board[8]!=="") 
        {
            won(board[8]);
        }
        else if (board[0]===board[1] && board[1]===board[2] && board[2]!=="") 
        {
            won(board[2]);
        }
        else if (board[2]===board[4] && board[4]===board[6] && board[6]!=="") 
        {
            won(board[6]);
        }
    }
    const won = (winner) => {
        setLock(true);
        if (winner === 'x') {
            titleRef.current.innerHTML = `Congratulations: <img src='${ex_icon}'> wins!`
        }
        else {
            titleRef.current.innerHTML = `Congratulations: <img src='${circle_icon}'> wins!`
        }
    }
    const handleButtonClick = (buttonText) => {
        if (buttonText === 'C') {
            // Clear the display using refs
            displayRef.current.value = '';
        } else if (buttonText === '=') {
            try {
                const expression = displayRef.current.value.replace(/X/g, '*');

                secondOperand = parseInt(expression.substring(operationIndex + 1), 10)
                switch (expression[operationIndex]) {
                    case '+':
                      displayRef.current.value = firstOperand + secondOperand;
                      break;
                    case '-':
                      displayRef.current.value = firstOperand - secondOperand;
                      break;
                    case '*':
                      displayRef.current.value = firstOperand * secondOperand;
                      break;
                    case '/':
                      displayRef.current.value = firstOperand / secondOperand;
                      break;
                    default:
                      // Handle the case when the operation is not recognized
                      console.error("Invalid operation:", operation);
                      return null;
                  }
                
            } catch (error) {
                displayRef.current.value = 'Error';
            }

        }  else {
            if (buttonText === '/' || 
            buttonText === '*' ||
            buttonText === '+'||
            buttonText === '-') {
            firstOperand = parseInt(displayRef.current.value, 10)
            operationIndex = displayRef.current.value.length;
            console.log(operationIndex)
            console.log(firstOperand)
        }
            displayRef.current.value += buttonText;
        }
    };
    return (
    <div>
        <div className="container">
            <h1 className='title' ref={titleRef}>Tic Tac Toe Game In&nbsp;<span>React</span></h1>
            <div className="board">
                <div className='row1'>
                    <div className='boxes' onClick={(e) =>{toggle(e,0)}}></div>
                    <div className='boxes' onClick={(e) =>{toggle(e,1)}}></div>
                    <div className='boxes' onClick={(e) =>{toggle(e,2)}}></div>
                </div>
                <div className='row2'>
                    <div className='boxes' onClick={(e) =>{toggle(e,3)}}></div>
                    <div className='boxes' onClick={(e) =>{toggle(e,4)}}></div>
                    <div className='boxes' onClick={(e) =>{toggle(e,5)}}></div>
                </div>
                <div className='row3'>
                    <div className='boxes' onClick={(e) =>{toggle(e,6)}}></div>
                    <div className='boxes' onClick={(e) =>{toggle(e,7)}}></div>
                    <div className='boxes' onClick={(e) =>{toggle(e,8)}}></div>
                </div>
            </div>
        </div>
        
        <div className="calculator">
                {/* Use displayRef for input value */}
                <input type="text" id="display" className="display" ref={displayRef} readOnly />
                <div className="buttons">
                    {/* Handle button clicks using handleButtonClick */}
                    <button onClick={() => handleButtonClick('7')}>7</button>
                    <button onClick={() => handleButtonClick('8')}>8</button>
                    <button onClick={() => handleButtonClick('9')}>9</button>
                    <button onClick={() => handleButtonClick('+')}>+</button>
                    <button onClick={() => handleButtonClick('4')}>4</button>
                    <button onClick={() => handleButtonClick('5')}>5</button>
                    <button onClick={() => handleButtonClick('6')}>6</button>
                    <button onClick={() => handleButtonClick('-')}>-</button>
                    <button onClick={() => handleButtonClick('1')}>1</button>
                    <button onClick={() => handleButtonClick('2')}>2</button>
                    <button onClick={() => handleButtonClick('3')}>3</button>
                    <button onClick={() => handleButtonClick('*')}>x</button>
                    <button id="clearButton" onClick={() => handleButtonClick('C')}>C</button>
                    <button onClick={() => handleButtonClick('0')}>0</button>
                    <button onClick={() => handleButtonClick('=')} id="operationButton">=</button>
                    <button onClick={() => handleButtonClick('/')} id="operationButton">/</button>
                </div>
            </div>
        </div>
    
    )
}

export default TicTacToe;