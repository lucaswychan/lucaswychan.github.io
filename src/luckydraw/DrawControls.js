import React from "react";

const DrawControls = ({
    minNumber,
    maxNumber,
    setMinNumber,
    setMaxNumber,
    onDraw,
    onReset,
    error,
    disabled,
}) => {
    return (
        <div>
            <div className="input-group">
                <input
                    type="number"
                    value={minNumber}
                    onChange={(e) => setMinNumber(Number(e.target.value))}
                    placeholder="Min"
                />
                <input
                    type="number"
                    value={maxNumber}
                    onChange={(e) => setMaxNumber(Number(e.target.value))}
                    placeholder="Max"
                />
            </div>
            {error && <div className="error">{error}</div>}
            <button onClick={onDraw} disabled={disabled}>
                Draw Number
            </button>
            <button onClick={onReset}>Reset</button>
        </div>
    );
};

export default DrawControls;
