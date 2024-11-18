import React, { useEffect, useRef } from "react";

const ImageContainer = ({ currentImageIndex }) => {
    // Create an array of refs outside the callback
    let numImages = 5;

    const canvasRefs = useRef([]);
    // Initialize the refs array
    if (canvasRefs.current.length === 0) {
        canvasRefs.current = Array(numImages)
            .fill()
            .map(() => React.createRef());
    }

    const generatePattern = (canvas, colors) => {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, w, h);

        for (let i = 0; i < numImages; i++) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            const shapeType = Math.floor(Math.random() * 3);

            switch (shapeType) {
                case 0:
                    ctx.beginPath();
                    ctx.arc(
                        Math.random() * w,
                        Math.random() * h,
                        Math.random() * 50 + 20,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                    break;
                case 1:
                    ctx.fillRect(
                        Math.random() * w,
                        Math.random() * h,
                        Math.random() * 80 + 20,
                        Math.random() * 80 + 20
                    );
                    break;
                case 2:
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * w, Math.random() * h);
                    ctx.lineTo(Math.random() * w, Math.random() * h);
                    ctx.lineTo(Math.random() * w, Math.random() * h);
                    ctx.closePath();
                    ctx.fill();
                    break;
                default:
                    break;
            }
        }
    };

    const colorSets = [
        ["#FF9999", "#FF5555", "#FF0000", "#CC0000"],
        ["#99FF99", "#55FF55", "#00FF00", "#00CC00"],
        ["#9999FF", "#5555FF", "#0000FF", "#0000CC"],
        ["#FFFF99", "#FFFF55", "#FFFF00", "#CCCC00"],
        ["#FF99FF", "#FF55FF", "#FF00FF", "#CC00CC"],
    ];

    useEffect(() => {
        canvasRefs.current.forEach((ref, index) => {
            if (ref.current) {
                const canvasHeight = window.innerHeight;
                ref.current.height = canvasHeight;
                generatePattern(
                    ref.current,
                    colorSets[index % colorSets.length]
                );
            }
        });
    }, []);

    return (
        <div className="images-container">
            {Array(numImages)
                .fill()
                .map((_, index) => (
                    <div
                        key={index}
                        className={`image-box ${
                            currentImageIndex === index ? "highlight" : ""
                        }`}
                    >
                        <canvas
                            ref={canvasRefs.current[index]}
                            width={200}
                            height={150}
                        />
                    </div>
                ))}
        </div>
    );
};

export default ImageContainer;
