import React from 'react'
import { useEffect } from 'react'
// import * as speech from "react-speech-kit";

export default function TextToSpeech({text}) {
    //console.log(text);
    useEffect(() => {
        speechSynthesis.speak(new SpeechSynthesisUtterance(text));
        return () => {
            speechSynthesis.cancel();
        };
    },[text]);
    return (<div>{text}</div>)
}
