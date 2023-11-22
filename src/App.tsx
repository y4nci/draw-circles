import { Button } from '@blueprintjs/core';
import React, { useState } from 'react';

import { Canvas } from './components/Canvas';
import { CirclePropSelector } from './components/CirclePropSelector';
import { ColourPalette } from './components/ColourPalette';
import { ImageUpload } from './components/ImageUpload';
import { getCurrentLineWidth, getCurrentRadius } from './services/circlePropService';
import { getActiveImageURL } from './services/imageService';

const App = () => {
    const [activeImage, setActiveImage] = useState<string>(getActiveImageURL());
    const [selectedColor, setSelectedColor] = useState<string>('#000000');
    const [radius, setRadius] = useState(getCurrentRadius()); // Radius of the circle
    const [lineWidth, setLineWidth] = useState(getCurrentLineWidth()); // Line width of the circle

    return (
        <div className='App'>
            {activeImage === ''
                ? <ImageUpload onImageUpload={setActiveImage}/>
                : <div>
                    <Canvas selectedColor={selectedColor} imageSrc={activeImage} radius={radius} lineWidth={lineWidth} />
                    <div>
                        <ColourPalette onColourSelect={setSelectedColor} />
                        <CirclePropSelector onRadiusSelect={setRadius} onLineWidthSelect={setLineWidth} />
                    </div>
                    <div className='margin20 flex-center'>
                        <Button
                            onClick={() => {
                                setActiveImage('');
                            }}
                            text="Remove the active image"
                            icon='trash'
                            minimal
                        />
                        <Button
                            onClick={() => {
                                const canvas = document.querySelector('canvas');
                                const image = canvas?.toDataURL('image/png').replace('image/png', 'image/octet-stream');
                                const link = document.createElement('a');
                                link.download = 'annotated-image.png';
                                link.href = image || '';
                                link.click();
                            }}
                            text="Download Image"
                            icon='download'
                            minimal
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default App;
