import React from 'react';

export function LoadImageOrPlaceholder(imageSrc: string) {
    var img = new Image();
    img.src = imageSrc;
    img.onerror = () => {
        img.src = "images/all/no-car-found.jpg"
    };
    return img;
}