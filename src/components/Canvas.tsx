import React, { useEffect, useRef, useState } from 'react';

interface CanvasProps {
    selectedColor: string;
    imageSrc: string | null; // Image source URL
}

export const Canvas: React.FC<CanvasProps> = ({ selectedColor, imageSrc }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        if (imageSrc && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                canvas.width = image.width;
                canvas.height = image.height;
                ctx?.drawImage(image, 0, 0);
            };
        }
    }, [imageSrc]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');

        if (ctx) {
            setIsDrawing(true);
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, 10, 0, Math.PI * 2); // Circle of radius 10
            ctx.fillStyle = selectedColor;
            ctx.fill();
        }
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');

        if (ctx) {
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, 10, 0, Math.PI * 2); // Circle of radius 10
            ctx.fillStyle = selectedColor;
            ctx.fill();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseOut={stopDrawing}
        />
    );
};
