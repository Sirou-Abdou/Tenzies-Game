import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollsNum, setRollsNum] = React.useState(0)
    
    const [time, setTime] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(true);

    let interval = null;
    React.useEffect(()=>{
        if(isRunning){
            interval = setInterval(()=>
            setTime(prevTime => prevTime + 1), 1000)
        }else{
            () => clearInterval(interval);
        }
        return () => clearInterval(interval)
    },[isRunning])
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            const bestTime = localStorage.getItem("best-time");
            if(time < bestTime){
              localStorage.setItem("best-time", time);
            }
            setTenzies(true)
            setIsRunning(false)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function rollDice() {
        if(!tenzies){
            setRollsNum(oldRollsNum => oldRollsNum += 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        }
        else {
            setDice(allNewDice())
            setTenzies(false)
            setIsRunning(true)
            setTime(0)
            setRollsNum(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    function formatTime(time) {
        const getSecondes = `0${time % 60}`.slice(-2)
        const getMinites = `0${(Math.floor(time / 60))% 60}`.slice(-2)
        return `${getMinites} : ${getSecondes}`
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <div className= "title-inst">
                <h1 className="title">Tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            </div>
            <div className= "Best-time">
                <h3>Best Time : {formatTime(localStorage.getItem("best-time"))}</h3>
            </div>
            <div className= "info">
                <h3>Roll Number : {rollsNum}</h3>
                <h3>Time : {formatTime(time)}</h3>
            </div>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice"
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}