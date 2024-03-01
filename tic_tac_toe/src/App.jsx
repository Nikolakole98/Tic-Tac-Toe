import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning_combinations.js";


const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null]
];

function deriveActivePlayer(gameTurns){

  let curentPlayer='X';
 
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    curentPlayer='O';
  }
return curentPlayer;

}

function App() {
  const [players,setPlayers]=useState({
    'X':'Player 1',
    'O':'Player 2',
  })
  const [gameTurns,setGameTurns]=useState([]);
  const activePlayer=deriveActivePlayer(gameTurns); 
 let gameBoard=[...initialGameBoard.map(array=>[...array])];

 for(const turn of gameTurns){
     const {square,player}=turn;
     const{row,col}=square;
     gameBoard[row][col]=player;
 }
 let winner=null;
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
 
  if(firstSquareSymbol && 
    firstSquareSymbol===secondSquareSymbol && 
    firstSquareSymbol===thirdSquareSymbol){
      winner="Winner:"+ players[firstSquareSymbol];
 
 
 
 
  }}
  const hasDraw=gameTurns.length===9 && !winner;
  if(hasDraw===true){
    winner="Not winner";
    console.log(hasDraw);
  }
  
 
 function handleSelectSquare(rowIndex,colIndex){
    setGameTurns((prevTurns)=>{
      const curentPlayer=deriveActivePlayer(prevTurns);
      
      const updatesTurns=[
        {square:{row:rowIndex,col:colIndex},player:curentPlayer},...prevTurns];
        return updatesTurns;
    });
}

function handleRestart(){
  setGameTurns([]);
}

function handlePlayerNameChange(symbol,newName){
  setPlayers(prevPlayer=>{
    return{
      ...prevPlayer,
      [symbol]:newName
    };
  })
}


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName="Player 1" 
            symbol="X" 
            isActive={activePlayer==='X'}
            onChangeName={handlePlayerNameChange} 
            />
          <Player 
            initialName="Player 2" 
            symbol="O" 
            isActive={activePlayer==='O'}
            onChangeName={handlePlayerNameChange}  
            />
        </ol>
        {winner && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
        onSelectSquare={handleSelectSquare} 
        board={gameBoard}/>
      </div>
     
    / <Log turns={gameTurns}/>
    </main>
   
   
  );
}

export default App;

