import { Button } from '@blueprintjs/core';
import React, { useState } from 'react';

import { allColours, Colour, getSelectedColour, setSelectedColour } from '../services/colourService';

export const ColourPalette = (props: { onColourSelect: (colour: Colour) => void }) => {
    const [activeColour, setActiveColour] = useState(getSelectedColour());

    const setColour = (colour: Colour) => {
        setActiveColour(colour);
        setSelectedColour(colour);
        props.onColourSelect(colour);
    };

    return (
        <div>
            <div className="colour-palette column-flex-center margin20">
                {allColours.map((row, i) => (
                    <div key={i}>
                        {row.map((col, j) => (
                            <Button
                                minimal
                                key={j}
                                className="cardColorPickerButton"
                                style={{ background: col }}
                                onClick={() => {
                                    setColour(col);
                                }}
                                icon={col === activeColour ? 'tick' : null}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};