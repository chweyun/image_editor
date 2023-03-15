import React from 'react';
import { useState, useEffect, useRef } from "react";
import './Filterfunc.css';

function Filterfunc ( { canvas, ctx, image, updateURL, getData_filter } ) {

    if(updateURL != null) {
        image = updateURL; //image변수값 최초 임포트 URL말고 편집된 updateURL로 재할당
    }

    const [invert, setInvert] = useState(true);
    const [grayscale, setGrayscale] = useState(true);
    const [sepia, setSepia] = useState(true);
    const [brightness, setBrightness] = useState(true);
    const [sharp, setSharp] = useState(true);
    const [blur, setBlur] = useState(true);

    const onClickgrayscale = () => {
        setGrayscale((prev) => !prev);
        ongrayscale(canvas, ctx, image);
        //onPint ? ongrayscale(canvas, ctx, brush) : ongrayscale(canvas, ctx, image);
    }
    const onClickinvert = () => {
        setInvert((prev) => !prev);
        oninvert(canvas, ctx, image);
        //onPint ? oninvert(canvas, ctx, brush) : oninvert(canvas, ctx, image);
    }
    const onClicksepia = () => {
        setSepia((prev) => !prev);
        onsepia(canvas, ctx, image);
        //onPint ? onsepia(canvas, ctx, brush) : onsepia(canvas, ctx, image);
    }
    const onClickbrightness = () => {
        setBrightness((prev) => !prev);
        onbrightness(canvas, ctx, image);
        //onPint ? onbrightness(canvas, ctx, brush) : onbrightness(canvas, ctx, image);
    }
    const onClicksharp = () => {
        setSharp((prev) => !prev);
        onsharp(canvas, ctx, image);
        //onPint ? onsharp(canvas, ctx, brush) : onsharp(canvas, ctx, image);
    }
    const onClickblur = () => {
        setBlur((prev) => !prev);
        onblur(canvas, ctx, image);
        //onPint ? onblur(canvas, ctx, brush) : onblur(canvas, ctx, image);
    }
    const onClickend = () => {
        const filterImg = canvas.toDataURL('image/png');
        getData_filter(filterImg);
    }

    var loadingImg = document.getElementById("loadImage"); 


    function ongrayscale (canvas, ctx, image) {
        ctx.reset();
        ctx.save();
        {grayscale ? ctx.filter = 'grayscale()' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
        ctx.restore();
    };

    function oninvert (canvas, ctx, image) {
        ctx.reset();
        ctx.save();
        {invert ? ctx.filter = 'invert()' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
        ctx.restore();
        //ctx.drawImage(loadingImg, 0,0, loadingImg.width, loadingImg.height, centerShift_x,centerShift_y,loadingImg.width*ratio, loadingImg.height*ratio);
        //아니면 기능 하나 쓸때마다 변화가 생긴 상태의 이미지를 저장해뒀다가 그 이미지를 -> drawImage 소스로 줘서 그 이미지 자체를 그리게끔 해야할거같은데
    };
    function onsepia (canvas, ctx, image) {
        ctx.reset();
        {sepia ? ctx.filter = 'sepia()' : ctx.filter = 'none'};
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
        // ctx.restore();
    };
    function onbrightness (canvas, ctx, image) {
        ctx.reset();
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
        ctx.reset();
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
        ctx.reset();
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

    //ctx.restore()

    // console.log("Filterfunc / image", image);
    // console.log("Filterfunc / loadingImg", loadingImg);

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