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
        <div className="sideline">
            <div className="colorBox">
                <button 
                className="textOption1"
                onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>
                    <div className='rect' style={{backgroundColor: 'black'}} ref={colorInfo}/>
                    <p>색상</p>
                </button>
                {showColorPicker && (
                    <div className='colorPicker'>
                    <ChromePicker
                    color={color}
                    onChange={updatedColor => {setColor(updatedColor.hex); {getIsClr(updatedColor.hex);} {setRect(updatedColor);}}}
                    /></div>
                )}
            </div>
            <div className="textDiv">
                <button className="textOption2"
                onClick={() => {setIsItalic(!isItalic); {getIsItalic(!isItalic);}}} >
                <p style={{color: isItalic ? "#004483" : "#888", fontWeight: isItalic ? "bold" : "none"}}>기울게</p>
                </button>
            </div>
            <div className="textDiv">
                <button className="textOption3"
                onClick={() => {setIsBold(!isBold); {getIsBold(!isBold);}}} >
                <p style={{color: isBold ? "#004483" : "#888", fontWeight: isBold ? "bold" : "none"}}>진하게</p>
                </button>
            </div>
            <div className="textDiv">
                <button className="textOption4"
                onClick={isSelected!=="left" ? () => {setIsSelected('left'); getIsSelected('left');} : undefined}>
                <p style={{color: isSelected==="left" ? "#004483" : "#888", fontWeight: isSelected==="left" ? "bold" : "none"}}>좌측</p>
                </button>
            </div>          
             <div className="textDiv">
                <button className="textOption5"
                onClick={isSelected!=="center" ? () => {setIsSelected('center'); getIsSelected('center');} : undefined}>
                <p style={{color: isSelected==="center" ? "#004483" : "#888", fontWeight: isSelected==="center" ? "bold" : "none"}}>중앙</p>
                </button>
            </div>
            <div className="textDiv">
                <button className="textOption6"
                onClick={isSelected!=="right" ? () => {setIsSelected('right'); getIsSelected('right');} : undefined}>
                <p style={{color: isSelected==="right" ? "#004483" : "#888", fontWeight: isSelected==="right" ? "bold" : "none"}}>우측</p>
                </button>
            </div>
            <div className="textDiv">
                <button className="textOption7"
                onClick={() => {setIsOkClicked(true); {getIsOkClicked(true);}}}
                ><p>생성</p>
                </button>
            </div>
        </div>
    )
};

export default Textfunc;