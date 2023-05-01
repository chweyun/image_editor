import React from 'react';
import { useState, useEffect, useRef } from "react";
import './Filterfunc.css';

function Filterfunc ( { canvas, ctx, context, image, updateURL, getData_filter, setSelectFilter, setClickFilter } ) {
    context.lineWidth = 0.01;

    if(updateURL != null) {
        image = updateURL; //image변수값 최초 임포트 URL말고 편집된 updateURL로 재할당
        console.log(image.width, image.height);
    }

    const [invert, setInvert] = useState(true);
    const [grayscale, setGrayscale] = useState(true);
    const [sepia, setSepia] = useState(true);
    const [brightness, setBrightness] = useState(true);
    const [sharp, setSharp] = useState(true);
    const [blur, setBlur] = useState(true);

    const onClickgrayscale = () => {
        setGrayscale((prev) => !prev);
        ongrayscale(canvas, context, image);
        //onPint ? ongrayscale(canvas, ctx, brush) : ongrayscale(canvas, ctx, image);
    }
    const onClickinvert = () => {
        setInvert((prev) => !prev);
        oninvert(canvas, context, image);
        //onPint ? oninvert(canvas, ctx, brush) : oninvert(canvas, ctx, image);
    }
    const onClicksepia = () => {
        setSepia((prev) => !prev);
        onsepia(canvas, context, image);
        //onPint ? onsepia(canvas, ctx, brush) : onsepia(canvas, ctx, image);
    }
    const onClickbrightness = () => {
        setBrightness((prev) => !prev);
        onbrightness(canvas, context, image);
        //onPint ? onbrightness(canvas, ctx, brush) : onbrightness(canvas, ctx, image);
    }
    const onClicksharp = () => {
        setSharp((prev) => !prev);
        onsharp(canvas, context, image);
        //onPint ? onsharp(canvas, ctx, brush) : onsharp(canvas, ctx, image);
    }
    const onClickblur = () => {
        setBlur((prev) => !prev);
        onblur(canvas, context, image);
        //onPint ? onblur(canvas, ctx, brush) : onblur(canvas, ctx, image);
    }
    const onClickend = () => {
        context.filter = 'none';
        const filterImg = canvas.toDataURL('image/png');
        console.log(image.width, image.height);
        console.log(filterImg);
        getData_filter(filterImg);
        setSelectFilter(false);
        setClickFilter(false);
    }

    var loadingImg = document.getElementById("loadImage"); 

    function ongrayscale (canvas, context, image) {
        console.log(image.width, image.height);
        context.reset();
        context.save();
        {grayscale ? context.filter = 'grayscale()' : context.filter = 'none'};
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        context.clearRect(0,0,canvasArea.width, canvasArea.height);
        context.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
        context.restore();
    };

    function oninvert (canvas, context, image) {
        context.reset();
        context.save();
        {invert ? context.filter = 'invert()' : context.filter = 'none'};
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        context.clearRect(0,0,canvasArea.width, canvasArea.height);
        context.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
        context.restore();
        //ctx.drawImage(loadingImg, 0,0, loadingImg.width, loadingImg.height, centerShift_x,centerShift_y,loadingImg.width*ratio, loadingImg.height*ratio);
        //아니면 기능 하나 쓸때마다 변화가 생긴 상태의 이미지를 저장해뒀다가 그 이미지를 -> drawImage 소스로 줘서 그 이미지 자체를 그리게끔 해야할거같은데
    };
    function onsepia (canvas, context, image) {
        context.reset();
        {sepia ? context.filter = 'sepia()' : context.filter = 'none'};
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        context.clearRect(0,0,canvasArea.width, canvasArea.height);
        context.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
        // ctx.restore();
    };
    function onbrightness (canvas, context, image) {
        context.reset();
        {brightness ? context.filter = 'brightness(2)' : context.filter = 'none'};
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        context.clearRect(0,0,canvasArea.width, canvasArea.height);
        context.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };
    function onsharp (canvas, context, image) {
        context.reset();
        {sharp ? context.filter = 'contrast(230%)' : context.filter = 'none'};
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        context.clearRect(0,0,canvasArea.width, canvasArea.height);
        context.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };
    function onblur (canvas, context, image) {
        context.reset();
        {blur ? context.filter = 'blur(5px)' : context.filter = 'none'};
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        context.clearRect(0,0,canvasArea.width, canvasArea.height);
        context.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };

    return (
        <div>
            <div className='sideline'>
                <div className="filterOption1-1" onClick={onClickgrayscale}><p className="filterOption1">회색조</p></div>
                <div className="filterOption2-1" onClick={onClickinvert}><p className="filterOption2">반전</p></div>
                <div className="filterOption3-1" onClick={onClicksepia}><p className="filterOption3">세피아</p></div>
                <div className="filterOption4-1" onClick={onClickbrightness}><p className="filterOption4">밝게</p></div>
                <div className="filterOption5-1" onClick={onClicksharp}><p className="filterOption5">선명</p></div>
                <div className="filterOption6-1" onClick={onClickblur}><p className="filterOption6">블러</p></div>
                <div className="filterOption7-1" onClick={onClickend}><p className="filterOption7">종료</p></div>
            </div>
        </div>
    );
};

export default Filterfunc;