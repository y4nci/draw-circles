let activeImageURL: string = '';

export const getActiveImageURL = () => activeImageURL;

export const setActiveImageURL = (url: string) => {
    activeImageURL = url;
};
