// src/pages/LuckyDraw.jsx
import React, { useState, useRef } from "react";
import NumberDisplay from "./NumberDisplay";
import DrawControls from "./DrawControls";
import "./LuckyDraw.css";
import drawingSound from "./drum-roll-2-228358.mp3";
import revealSound from "./winning-218995.mp3";

function LuckyDraw() {
    const [drawnNumbers, setDrawnNumbers] = useState(new Set());
    const [currentNum, setCurrentNum] = useState(null);
    const [previousNum, setPreviousNum] = useState(null);
    const [minNumber, setMinNumber] = useState(1);
    const [maxNumber, setMaxNumber] = useState(50);
    const [error, setError] = useState("");
    const [isDrawing, setIsDrawing] = useState(false);

    const drawingSoundRef = useRef(new Audio(drawingSound));
    const revealSoundRef = useRef(new Audio(revealSound));

    // Add sound control state
    const [isSoundEnabled, setIsSoundEnabled] = useState(true);

    const validateInputs = () => {
        if (isNaN(minNumber) || isNaN(maxNumber)) {
            setError("Please enter valid numbers");
            return false;
        }

        if (minNumber >= maxNumber) {
            setError("Maximum number must be greater than minimum number");
            return false;
        }

        setError("");
        return true;
    };

    const draw = () => {
        if (!validateInputs()) return;

        const totalNumbers = maxNumber - minNumber + 1;
        if (drawnNumbers.size >= totalNumbers) {
            setError("All numbers have been drawn!");
            return;
        }

        setIsDrawing(true);
        setPreviousNum(currentNum);
        setCurrentNum(null);

        // Play drawing sound
        if (isSoundEnabled) {
            revealSoundRef.current.pause();
            revealSoundRef.current.currentTime = 0;
            drawingSoundRef.current.currentTime = 0; // Reset sound to start
            drawingSoundRef.current.play();
        }

        // Generate random number that hasn't been drawn yet
        let newNumber;
        do {
            newNumber =
                Math.floor(Math.random() * (maxNumber - minNumber + 1)) +
                minNumber;
        } while (drawnNumbers.has(newNumber));

        // Simulate drawing animation
        setTimeout(() => {
            if (isSoundEnabled) {
                drawingSoundRef.current.pause();
                drawingSoundRef.current.currentTime = 0;
                revealSoundRef.current.currentTime = 0;
                revealSoundRef.current.play();
            }
            setCurrentNum(newNumber);
            setDrawnNumbers((prev) => new Set([...prev, newNumber]));
            setIsDrawing(false);
        }, 2000);
    };

    const reset = () => {
        setDrawnNumbers(new Set());
        setCurrentNum(null);
        setPreviousNum(null);
        setError("");

        // Stop any playing sounds
        drawingSoundRef.current.pause();
        drawingSoundRef.current.currentTime = 0;
        revealSoundRef.current.pause();
        revealSoundRef.current.currentTime = 0;
    };

    // Add sound toggle function
    const toggleSound = () => {
        setIsSoundEnabled(!isSoundEnabled);
    };

    return (
        <div className="luckydraw">
            <div className="lucky-draw-page">
                <div className="page-container">
                    <div className="draw-container">
                        <h1>ECE Annual Dinner 2024 Lucky Draw</h1>

                        <DrawControls
                            minNumber={minNumber}
                            maxNumber={maxNumber}
                            setMinNumber={setMinNumber}
                            setMaxNumber={setMaxNumber}
                            onDraw={draw}
                            onReset={reset}
                            error={error}
                            disabled={isDrawing}
                        />

                        <NumberDisplay
                            currentNum={currentNum}
                            previousNum={previousNum}
                            isDrawing={isDrawing}
                            drawnNumbers={drawnNumbers}
                        />
                        {/* Add sound toggle button */}
                        <button
                            className="sound-toggle-btn"
                            onClick={toggleSound}
                        >
                            {isSoundEnabled ? "🔊" : "🔇"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LuckyDraw;
