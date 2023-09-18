'use client'

import React, { useRef, useState } from 'react';

interface SliderProps {
    className?: string,
};

const Slider: React.FC<SliderProps> = ({ className }) => {
    const refToSlider = useRef<HTMLDivElement | null>(null);
    const [isHover, setIsHover] = useState(false);

    const handleMouseHover = () => {
        setIsHover(state => !state);
    }

    const handleOnclick = (event: React.MouseEvent<HTMLDivElement>) => {
        const widthInPercentage = ((event.nativeEvent.offsetX)/(event.currentTarget.clientWidth)) * 100;
        if(refToSlider.current) {
            refToSlider.current.style.width = `${widthInPercentage}%`;
        }
    }

    return (
        <div 
            className={`w-[80%] py-1 cursor-pointer ${className ? className : ''}`}
            onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseHover}
            onClick={handleOnclick}
        >
            <div 
                className="w-full h-1 bg-gray-600  flex flex-row
                items-center justify-start rounded-lg"
            >
                <div ref={refToSlider} className={`h-full w-0
                    ${isHover ? 'rounded-l-lg bg-green-600' : 'bg-white rounded-lg'}`} 
                />
                {isHover && <span className="h-3 w-3 rounded-full bg-white"></span>}
            </div>
        </div>
    )
}

export default Slider;