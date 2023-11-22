import React, { useEffect, useRef, useState } from 'react';

interface CanvasProps {
    selectedColor: string;
    imageSrc: string | null; // Image source URL
    radius: number;
    lineWidth: number;
}

export const Canvas: React.FC<CanvasProps> = ({ selectedColor, imageSrc, radius, lineWidth }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        if (imageSrc && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const image = new Image();
            image.src = imageSrc;

            image.onload = () => {
                const scale = Math.min(750 / image.width, 750 / image.height);
                const width = image.width * scale;
                const height = image.height * scale;

                // Resize the canvas to the scaled dimensions
                canvas.width = width;
                canvas.height = height;

                ctx?.drawImage(image, 0, 0, width, height);
            };
        }
    }, [imageSrc]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');

        if (ctx) {
            setIsDrawing(true);
            ctx.strokeStyle = selectedColor; // Use strokeStyle for hollow circle
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, radius, 0, Math.PI * 2); // Circle of radius 10
            ctx.stroke(); // Draw hollow circle
        }
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current?.getContext('2d');

        if (ctx) {
            ctx.strokeStyle = selectedColor;
            ctx.lineWidth = lineWidth;
            ctx.beginPath();
            ctx.arc(offsetX, offsetY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <canvas
            style={{ maxWidth: '900px', maxHeight: '900px' }}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseOut={stopDrawing}
        />
    );
};
