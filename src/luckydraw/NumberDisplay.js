import React from "react";

const NumberDisplay = ({
    currentNum,
    previousNum,
    isDrawing,
    drawnNumbers,
}) => {
    return (
        <div>
            <div className="number-display">
                <div className="previous-number">
                    Previous: <span>{previousNum || "-"}</span>
                </div>
                <div
                    className={`current-number ${
                        !isDrawing && currentNum ? "winner" : ""
                    }`}
                >
                    {isDrawing ? "..." : currentNum}
                </div>
            </div>

            <div className="drawn-numbers">
                <p>
                    Drawn numbers:{" "}
                    {[...drawnNumbers].sort((a, b) => a - b).join(", ")}
                </p>
            </div>
        </div>
    );
};

export default NumberDisplay;
