import { Slider } from '@blueprintjs/core';
import React, { useState } from 'react';

import { getCurrentLineWidth, getCurrentRadius, setCurrentRadius } from '../services/circlePropService';

export const CirclePropSelector = (props: { onRadiusSelect: (radius: number) => void, onLineWidthSelect: (lineWidth: number) => void }) => {
    const [activeRadius, setActiveRadius] = useState(getCurrentRadius());
    const [activeLineWidth, setActiveLineWidth] = useState(getCurrentLineWidth());

    const setRadius = (radius: number) => {
        setActiveRadius(radius);
        setCurrentRadius(radius);
        props.onRadiusSelect(radius);
    };

    const setLineWidth = (lineWidth: number) => {
        setActiveLineWidth(lineWidth);
        setCurrentRadius(lineWidth);
        props.onLineWidthSelect(lineWidth);
    };

    return (
        <div className='margin20'>
            <div className='flex-center'>
                <p className='slider-title'>Set Circle Radius</p>
                <Slider
                    min={0}
                    max={100}
                    stepSize={1}
                    labelStepSize={10}
                    onChange={setRadius}
                    value={activeRadius}
                    // labelRenderer={false}
                    intent='primary'
                />
            </div>

            <div className='flex-center'>
                <p className='slider-title'>Set Line Width</p>
                <Slider
                    min={1}
                    max={20}
                    stepSize={0.1}
                    labelStepSize={1}
                    onChange={setLineWidth}
                    value={activeLineWidth}
                    // labelRenderer={false}
                    intent='primary'
                />
            </div>
        </div>
    );
};
