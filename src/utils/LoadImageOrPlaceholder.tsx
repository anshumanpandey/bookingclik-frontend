import React, {useState} from 'react';

type Props = {src: string, alt: string | undefined, style: React.CSSProperties}

export const LoadImageOrPlaceholder: React.FC<Props> = ({ src, alt, style}) => {
    const [currentSrc, setCurrentSrc] = useState(src);
    const [flipImage, setFlipImage] = useState(true);

    var img = new Image();
    img.src = currentSrc;
    img.onerror = () => {
        setCurrentSrc("images/all/no-car-found.jpg")
        setFlipImage(false)
    };
    let innerStyle = {}
    if (flipImage === false) {
        innerStyle = { transform: 'unset' }
    }
    return <img
        style={{...style, ...innerStyle}}
        src={currentSrc}
        alt={alt}
    />    
}