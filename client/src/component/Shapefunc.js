import React, { useState, useRef } from "react";
import { ChromePicker } from 'react-color';

// css 파일
import './Shapefunc.css';

const Shapefunc = ( {getShapeColor, getIsShape} ) => {

    const [isSelected, setIsSelected] = useState('rect');
    const colorInfo = useRef([]);
    const [color, setColor] = useState('black');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const setRect = (updatedColor) => {
        colorInfo.current.style.backgroundColor = updatedColor.hex;
    }


    return (
        <div className="shapeBar">
            <div className="optionverticalLine"></div>
            <div className="colorBox">
                <button 
                    className="shapeOption1"
                    onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                        <div className='rect' style={{backgroundColor: 'black'}} ref={colorInfo}/>
                        색상
                    </button>
                    {showColorPicker && (
                        <div className='colorPicker'>
                        <ChromePicker
                        color={color}
                        onChange={updatedColor => {setColor(updatedColor.hex); {getShapeColor(updatedColor.hex)} {setRect(updatedColor);}}}
                        /></div>
                    )}
            </div>
            <div>
                <button className="shapeOption2"
                onClick={isSelected!=='rect' ? () => {setIsSelected('rect'); getIsShape('rect')} : undefined}
                style={{backgroundColor: isSelected==='rect' ? 'blue' : 'transparent'}}>
                사각형
                </button>
            </div>
            <div>
                <button className="shapeOption3"
                onClick={isSelected!=='triangle' ? () => {setIsSelected('triangle'); getIsShape('triangle')} : undefined}
                style={{backgroundColor: isSelected==='triangle' ? 'blue' : 'transparent'}}>
                삼각형
                </button>
            </div>
            <div>
                <button className="shapeOption4"
                onClick={isSelected!=='circle' ? () => {setIsSelected('circle'); getIsShape('circle')} : undefined}
                style={{backgroundColor: isSelected==='circle' ? 'blue' : 'transparent'}}>
                원
                </button>
            </div>
        </div>
    )
};

export default Shapefunc;