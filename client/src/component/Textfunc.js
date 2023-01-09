import React, { useState, useRef } from "react";
import { ChromePicker } from 'react-color';

// css 파일
import './Textfunc.css';

const Textfunc = ( {getTxtColor, getIsItalic, getIsBold, getIsSelected, getIsClr, getIsOkClicked} ) => {

    const [isItalic, setIsItalic] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isSelected, setIsSelected] = useState("left");
    const [isOkClicked, setIsOkClicked] = useState(false);

    const colorInfo = useRef([]);
    const [color, setColor] = useState('black');
    const [showColorPicker, setShowColorPicker] = useState(false);
    const setRect = (updatedColor) => {
        colorInfo.current.style.backgroundColor = updatedColor.hex;
    }

    return (
        <div className="textBar">
            <div className="optionverticalLine"></div>
            <div className="colorBox">
                <button 
                className="textOption1"
                onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                    <div className='rect' style={{backgroundColor: 'black'}} ref={colorInfo}/>
                    색상
                </button>
                {showColorPicker && (
                    <div className='colorPicker'>
                    <ChromePicker
                    color={color}
                    onChange={updatedColor => {setColor(updatedColor.hex); {getIsClr(updatedColor.hex);} {setRect(updatedColor);}}}
                    /></div>
                )}
            </div>
            <div>
                <button className="textOption2"
                onClick={() => {setIsItalic(!isItalic); {getIsItalic(!isItalic);}}} 
                style={{backgroundColor: isItalic ? "blue" : "transparent"}}>
                기울이기
                </button>
            </div>
            <div>
                <button className="textOption3"
                onClick={() => {setIsBold(!isBold); {getIsBold(!isBold);}}} 
                style={{backgroundColor: isBold ? "blue" : "transparent"}}>
                진하게
                </button>
            </div>
            <div>
                <button className="textOption4"
                onClick={isSelected!=="left" ? () => {setIsSelected('left'); getIsSelected('left');} : undefined} 
                style={{backgroundColor: isSelected==="left" ? "blue" : "transparent"}}
                >
                좌측정렬
                </button>
            </div>          
             <div>
                <button className="textOption5"
                onClick={isSelected!=="center" ? () => {setIsSelected('center'); getIsSelected('center');} : undefined}
                style={{backgroundColor: isSelected==="center" ? "blue" : "transparent"}}
                >
                중앙정렬
                </button>
            </div>
            <div>
                <button className="textOption6"
                onClick={isSelected!=="right" ? () => {setIsSelected('right'); getIsSelected('right');} : undefined}
                style={{backgroundColor: isSelected==="right" ? "blue" : "transparent"}}
                >
                우측정렬
                </button>
            </div>
            <div>
                <button className="textOption7"
                onClick={() => {setIsOkClicked(true); {getIsOkClicked(true);}}}
                >생성
                </button>
            </div>
        </div>
    )
};

export default Textfunc;