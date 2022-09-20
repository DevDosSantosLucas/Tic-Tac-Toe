import React, { useState } from 'react';
function getInitialState(){
  const state = {}
  for(let row = 0 ; row < 3 ; row++){
    for(let col = 0 ; col < 3 ; col ++){
      state[`${row}-${col}`] = null;
    }
  }
  console.log (state)
  return state;
}

const getKeyFromIndex = (index)=>{
  const row = Math.floor(index/3);
  const col = index % 3;
  return `${row}-${col}`
}

const getLabel = (value) => {
  if(!value){
    return null;
  }
  return value > 0 ? 'X' : 'O' ;
}

function getWinner(value){
  for(let row = 0 ; row < 3 ; row++){
    for(let col = 0 ; col < 3 ; col ++){
      const sumRow = value[`${row}-${col}`] 
                   + value[`${row}-${col+1}`] 
                   + value[`${row}-${col+2}`] 
      if(sumRow === 3 || sumRow === -3){
        return sumRow
      }
      const sumCol = value[`${row}-${col}`] 
                   + value[`${row+1}-${col}`] 
                   + value[`${row+2}-${col}`] 
      if(sumCol === 3 || sumCol === -3){
      return sumCol
      }
      const sumDiagonal = value[`${row}-${col}`] 
      + value[`${row+1}-${col+1}`] 
      + value[`${row+2}-${col+2}`] 
      if(sumDiagonal === 3 || sumDiagonal === -3){
      return sumDiagonal
      }
      const sumReverseDiagonal = value[`${row}-${col+2}`] 
      + value[`${row+1}-${col+1}`] 
      + value[`${row+2}-${col}`] 
      if(sumReverseDiagonal === 3 || sumReverseDiagonal === -3){
      return sumReverseDiagonal
      }
    }

  }
  return null;
}

export function Game(){
  const[values,setValues] = useState(getInitialState);
  const[player,setPlayer] = useState(1);
  const[winner,setWinner] = useState(null);
  const[playerX,setPlayerX] = useState(0)
  const[playerO,setPlayerO] = useState(0)

 
  function handleClick(key){
    if(winner || values[key]){return}
    
    const newValues = {
      ...values,
    [key]:player,
    };
    setValues(newValues);
    setPlayer(player * -1 );
    const newWinner = getWinner(newValues);

    if(newWinner){
      setWinner(newWinner > 0 ? 1 : -1);
      if(newWinner>0){
        setPlayerX(playerX+1)
      }
      if(newWinner<0){
        setPlayerO(playerO+1)
      }
    }
  }  
  function reset(){
    setWinner(null)
    setValues(getInitialState);
    setPlayer(1)
    setPlayerX(0)
    setPlayerO(0)
  };
  function playAgain(){
    setWinner(null)
    setValues(getInitialState);
    setPlayer(1)
  };

  const itsTie = Object
              .values(values)
              .filter(Boolean)
              .length=== 9 && !winner;
  console.log(itsTie) 
  return(
    <div className="Game">
        <h1>TIC TAC TOE</h1>
        <div className='Score'>
        <p> X : {playerX} </p>
        <strong >SCORE</strong>
        <p> O : {playerO}</p>
        </div>

      <div className='Board'>
      {Array.from({length:9}).map((_,index) => {
        const key = getKeyFromIndex(index);
        return(
          <button 
            key={index}
            type='button'
            onClick={()=>handleClick(key)}>
              {getLabel(values[key])}
          </button>
        )
      })}
      </div>
      <p className='Exchange'>CLICK ON A SQUARE TO PLAY.
          IT'S TIME TO: 
        <strong >
          { player > 0? 'X' : 'O'}
        </strong>
      </p>
      { (winner || itsTie) && (
      <div className='Menu'>
        {winner?
        <p>The Winer is: {winner > 0 ? 'X' : 'O'}</p>
        :
        <p>Tied</p>
        }
        <button onClick={playAgain}>
          Play Again
        </button>
        <button onClick={reset}>
          Reset
        </button>
      </div>
      )}
    </div>
  )
}