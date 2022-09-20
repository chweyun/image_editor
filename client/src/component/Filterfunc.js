import React from 'react';
import './Filterfunc.css';
import canvas from '../TopBar';
import ctx from '../TopBar';

const ongrayscale = () => {
    console.log("회색조필터기능");
};

function InvertFilter (pixels) {
    console.log("반전필터기능");
    var d = pixels.data;    
    for(var i=0; i<pixels.data.length; i+=4 ){
        d[i] = 255 - d[i];     // R
        d[i+1] = 255 - d[i+1]; // G
        d[i+2] = 255 - d[i+2]; // B
        d[i+3] = 255;          // Alpha
    }
    return pixels;
};

const oninvert = () => {
    var pixels = ctx.getImageData(0,0, canvas.width, canvas.height);    // image processing    
    var filteredData = InvertFilter(pixels);        // Canvas에 다시 그린다.    
    ctx.putImageData(filteredData, 0 , 0);
};

const onsharp = () => {
    console.log("선명필터기능");
};

function Filterfunc () {
    return (
        <div>
            <div className="optionverticalLine"></div>
            <div onClick={() => ongrayscale()}><p className="filterOption1">회색조</p></div>
            <div onClick={oninvert}><p className="filterOption2">반전</p></div>
            <div onClick={() => onsharp()}><p className="filterOption3">선명</p></div>
        </div>
    );
}

export default Filterfunc;