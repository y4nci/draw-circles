export type Colour =
    '#FF4D4D' |
    '#FFB84D' |
    '#FFFF4D' |
    '#4DFF4D' |
    '#4DFFFF' |
    '#4D4DFF' |
    '#FF4DFF' |
    '#FFFFFF' |
    '#CC1919' |
    '#CC6519' |
    '#CCCC19' |
    '#19CC19' |
    '#19CCCC' |
    '#1919CC' |
    '#CC19CC' |
    '#888888' |
    '#990000' |
    '#994C00' |
    '#999900' |
    '#009900' |
    '#009999' |
    '#000099' |
    '#990099' |
    '#000000';


export const allColours: Colour[][] = [
    ['#FF4D4D', '#FFB84D', '#FFFF4D', '#4DFF4D', '#4DFFFF', '#4D4DFF', '#FF4DFF', '#FFFFFF'],
    ['#CC1919', '#CC6519', '#CCCC19', '#19CC19', '#19CCCC', '#1919CC', '#CC19CC', '#888888'],
    ['#990000', '#994C00', '#999900', '#009900', '#009999', '#000099', '#990099', '#000000'],
];

let selectedColour = allColours[0][0];

export const getSelectedColour = () => selectedColour;

export const setSelectedColour = (colour: Colour) => {
    selectedColour = colour;
};
