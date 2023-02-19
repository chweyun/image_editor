import React from 'react';
import { useState, useEffect, useRef } from "react";
import './Filterfunc.css';

function Filterfunc ( {canvas, ctx, image} ) {
    const [invert, setInvert] = useState(true);
    const [grayscale, setGrayscale] = useState(true);
    const [sepia, setSepia] = useState(true);
    const [brightness, setBrightness] = useState(true);
    const [sharp, setSharp] = useState(true);
    const [blur, setBlur] = useState(true);

    const onClickgrayscale = () => {
        setGrayscale((prev) => !prev);
        ongrayscale(canvas, ctx, image);
    }
    const onClickinvert = () => {
        setInvert((prev) => !prev);
        oninvert(canvas, ctx, image);
    }
    const onClicksepia = () => {
        setSepia((prev) => !prev);
        onsepia(canvas, ctx, image);
    }
    const onClickbrightness = () => {
        setBrightness((prev) => !prev);
        onbrightness(canvas, ctx, image);
    }
    const onClicksharp = () => {
        setSharp((prev) => !prev);
        onsharp(canvas, ctx, image);
    }
    const onClickblur = () => {
        setBlur((prev) => !prev);
        onblur(canvas, ctx, image);
    }
console.log(image);

    function ongrayscale (canvas, ctx, image) {
        {grayscale ? ctx.filter = 'grayscale()' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };
    function oninvert (canvas, ctx, image) {
        {invert ? ctx.filter = 'invert()' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };
    function onsepia (canvas, ctx, image) {
        {sepia ? ctx.filter = 'sepia()' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };
    function onbrightness (canvas, ctx, image) {
        {brightness ? ctx.filter = 'brightness(2)' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };
    function onsharp (canvas, ctx, image) {
        {sharp ? ctx.filter = 'contrast(230%)' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };
    function onblur (canvas, ctx, image) {
        {blur ? ctx.filter = 'blur(5px)' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };

    console.log('Filterfunc 내에서', canvas);
    console.log('Filterfunc 내에서', ctx);

    return (
        <div>
            {/* <div className="optionverticalLine"></div>
            <div onClick={onClickgrayscale}><p className="filterOption1">회색조</p></div>
            <div onClick={onClickinvert}><p className="filterOption2">반전</p></div>
            <div onClick={onClicksepia}><p className="filterOption3">세피아</p></div>
            <div onClick={onClickbrightness}><p className="filterOption4">밝게</p></div>
            <div onClick={onClicksharp}><p className="filterOption5">선명</p></div>
            <div onClick={onClickblur}><p className="filterOption6">블러</p></div> */}
            <div className='sideline'>
                <div className="filterOption1-1" onClick={onClickgrayscale}><p className="filterOption1">회색조</p></div>
                <div className="filterOption2-1" onClick={onClickinvert}><p className="filterOption2">반전</p></div>
                <div className="filterOption3-1" onClick={onClicksepia}><p className="filterOption3">세피아</p></div>
                <div className="filterOption4-1" onClick={onClickbrightness}><p className="filterOption4">밝게</p></div>
                <div className="filterOption5-1" onClick={onClicksharp}><p className="filterOption5">선명</p></div>
                <div className="filterOption6-1" onClick={onClickblur}><p className="filterOption6">블러</p></div>
            </div>
        </div>
    );
};

export default Filterfunc;