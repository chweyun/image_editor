import React, { useState, useRef } from "react";
import { ChromePicker } from 'react-color';

// icon 파일
import { ReactComponent as ShapeIcon } from "../Image/shapeRect.svg"
import { ReactComponent as ShapeCircleIcon } from "../Image/shapeCircle.svg"
import { ReactComponent as ShapeTriangleIcon } from "../Image/shapeTriangle.svg"

// css 파일
import './Shapefunc.css';

const Shapefunc = ( {getShapeColor, getIsShape, ctx} ) => {

    const [isSelected, setIsSelected] = useState('');
    const colorInfo1 = useRef([]);
    const colorInfo2 = useRef([]);
    const colorInfo3 = useRef([]);
    const [color, setColor] = useState('black');
    const [showColorPicker, setShowColorPicker] = useState(false);

    const setRect = (updatedColor) => {
        if (isSelected=='rect') {
            colorInfo1.current.style.fill = updatedColor.hex;
        }
        else if (isSelected=='circle') {
            colorInfo2.current.style.fill = updatedColor.hex;
        }
        else if (isSelected=='triangle') {
            colorInfo3.current.style.fill = updatedColor.hex;
        }
    }

    return (
        <div className="sideline">
            <div className="shapeDiv1">
                <ShapeIcon 
                className='shapeIcon1'
                ref={colorInfo1}
                style={isSelected=='rect' ? {stroke: '#59666F', fill: color} : {fill: '#59666F'}}
                onClick={isSelected!=='rect' ? () => {setIsSelected('rect'); getIsShape('rect'); setShowColorPicker(showColorPicker => !showColorPicker)} : () => setShowColorPicker(showColorPicker => !showColorPicker)} 
                />
            </div>
            <div className="shapeDiv2">
                <ShapeCircleIcon 
                className='shapeIcon2'
                ref={colorInfo2}
                style={isSelected=='circle' ? {stroke: '#59666F', fill: color} : {fill: '#59666F'}}
                onClick={isSelected!=='circle' ? () => {setIsSelected('circle'); getIsShape('circle'); setShowColorPicker(showColorPicker => !showColorPicker)} : () => setShowColorPicker(showColorPicker => !showColorPicker)} />
                
                {showColorPicker && (
                    <div className='colorPicker'>
                    <ChromePicker
                    color={color}
                    onChange={updatedColor => {setColor(updatedColor.hex); {getShapeColor(updatedColor.hex)} {setRect(updatedColor);}}}
                    /></div>
                )}
            </div>
            <div className="shapeDiv3">
                <ShapeTriangleIcon 
                className='shapeIcon3'
                ref={colorInfo3}
                style={isSelected=='triangle' ? {stroke: '#59666F', fill: color} : {fill: '#59666F'}}
                onClick={isSelected!=='triangle' ? () => {setIsSelected('triangle'); getIsShape('triangle'); setShowColorPicker(showColorPicker => !showColorPicker)} : () => setShowColorPicker(showColorPicker => !showColorPicker)} />
            </div>
        </div>
    )
};

export default Shapefunc;