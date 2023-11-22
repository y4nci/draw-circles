import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { setActiveImageURL } from '../services/imageService';

export const ImageUpload: React.FC<{ onImageUpload: (url: string) => void }> = ({ onImageUpload }) => {
    const [preview, setPreview] = useState<string>('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
    // Assuming only image is uploaded
        const file = acceptedFiles[0];

        // Create a URL for the file
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);

        // Pass the file URL to the parent component
        onImageUpload(fileUrl);
        setActiveImageURL(fileUrl);
    }, [onImageUpload]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        // accept: 'image/*',
        multiple: false,
    });

    return (
        <div {...getRootProps()} className='image-upload'>
            <input {...getInputProps()} />
            <p>Drag 'n' drop an image here, or click to select an image</p>
            {preview && <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '400px' }} />}
        </div>
    );
};
