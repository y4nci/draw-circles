import { Button } from '@blueprintjs/core';
import React, { useState } from 'react';

import { Canvas } from './components/Canvas';
import { ColourPalette } from './components/ColourPalette';
import { ImageUpload } from './components/ImageUpload';
import { getActiveImageURL } from './services/imageService';

const App = () => {
    const [activeImage, setActiveImage] = useState<string>(getActiveImageURL());
    const [selectedColor, setSelectedColor] = useState<string>('#000000');

    return (
        <div className='flex-center'>
            {activeImage === ''
                ? <ImageUpload onImageUpload={setActiveImage}/>
                : <div>
                    <Canvas selectedColor={selectedColor} imageSrc={activeImage} />
                    <ColourPalette onColourSelect={setSelectedColor} />
                    <div>
                        <Button
                            onClick={() => {
                                setActiveImage('');
                            }}
                            text="Remove the active image"
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
                            minimal
                        />
                    </div>
                </div>
            }
        </div>
    );
};

export default App;
