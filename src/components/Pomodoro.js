import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import {useContext, useEffect, useRef} from "react";
import SettingsContext from '../SettingsContext'



const red = "#f54e4e";
const green = "#4aec8c";


function Pomodoro() {

    const navigate = useNavigate();
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPause] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);


    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef=useRef(mode);

    function tick(){
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        function switchMode () {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = nextMode==='work' ? (settingsInfo.workMinutes*60) : (settingsInfo.breakMinutes*60);

            setMode(nextMode);
            modeRef.current = nextMode

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = settingsInfo.workMinutes * 60
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current){
                return;
            }
            if (secondsLeftRef.current === 0){
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [settingsInfo])

    const totalSeconds = mode==='work'? settingsInfo.workMinutes*60 : settingsInfo.breakMinutes*60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft/60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' +seconds;

    return ( 
        <div>
            <br></br>
            <div className='to-Todos'>
                <button onClick={() => {navigate("/")}}>
                    Todos List
                </button>
            </div>
            <h1>Lets do some Pomodoro</h1>

            <div className='timer'>
                <CircularProgressbar
                value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                    textColor: "#fff",
                    pathColor: mode==='work'? red : green,
                    tailColor: "rgba(255,255,255,.2)",
                })} />
            </div> 

            <div className="pomoButtons" style={{marginTop:'20px'}}>
                {isPaused ? 
                <PlayButton className='playButton' onClick={() => {setIsPause(false); isPausedRef.current = false}}/>
                : <PauseButton className='pauseButton' onClick={() => {setIsPause(true); isPausedRef.current=true; }}/> }
            
            </div>  
            
        </div>
     );
}

export default Pomodoro;