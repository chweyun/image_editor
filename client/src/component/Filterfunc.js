import React from 'react';
import { useState } from "react";
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

    function setCanvas (canvas, ctx, image) {
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    }

    function ongrayscale (canvas, ctx, image) {
        {grayscale ? ctx.filter = 'grayscale()' : ctx.filter = 'none'};
        setCanvas(canvas, ctx, image);
    };

    function oninvert (canvas, ctx, image) {
        {invert ? ctx.filter = 'invert()' : ctx.filter = 'none'};
        setCanvas(canvas, ctx, image);
    };

    function onsepia (canvas, ctx, image) {
        {sepia ? ctx.filter = 'sepia()' : ctx.filter = 'none'};
        setCanvas(canvas, ctx, image);
    };
    function onbrightness (canvas, ctx, image) {
        {brightness ? ctx.filter = 'brightness(2)' : ctx.filter = 'none'};
        setCanvas(canvas, ctx, image);
    };

    function onsharp (canvas, ctx, image) {
        {sharp ? ctx.filter = 'contrast(230%)' : ctx.filter = 'none'};
        setCanvas(canvas, ctx, image);
    };

    function onblur (canvas, ctx, image) {
        {blur ? ctx.filter = 'blur(5px)' : ctx.filter = 'none'};
        setCanvas(canvas, ctx, image);
    };
    
    return (
        <div>
            <div className="optionverticalLine"></div>
            <div onClick={onClickgrayscale}><p className="filterOption1">회색조</p></div>
            <div onClick={onClickinvert}><p className="filterOption2">반전</p></div>
            <div onClick={onClicksepia}><p className="filterOption3">세피아</p></div>
            <div onClick={onClickbrightness}><p className="filterOption4">밝게</p></div>
            <div onClick={onClicksharp}><p className="filterOption5">선명</p></div>
            <div onClick={onClickblur}><p className="filterOption6">블러</p></div>
        </div>
    );
};

export default Filterfunc;