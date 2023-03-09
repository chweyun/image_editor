import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import './Paintfunc.css';
import { GithubPicker } from 'react-color';


function Paintfunc ( {canvas, ctx, image, updateURL, canvasRef, brush, getData, setImage} ) {

    if(updateURL != null) {
        image = updateURL; //image변수값 최초 임포트 URL말고 편집된 updateURL로 재할당
    }

    function ondrawImg (canvas, ctx, image) { // 회전툴이나 반전툴을 사용한 이후 페인트 툴을 사용할 경우 캔버스 축이 돌아가 있어서 reset안해주면 브러쉬가 회전&반전된 축 기준으로 좌우반전 혹은 상하반전, 90도 회전되어 그려짐 -> 최초에 reset해서 축을 원래대로 돌린 다음 가장 최근 업데이트 된 이미지를 캔버스에 그려주는 함수
        ctx.reset();
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
        ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };

    const [colorPicker, setcolorPicker] = useState(false);
    const [colorweight, setcolorWeight] = useState(false);

    const [selectedColor, setSelectedColor] = useState('#00000000');
    const [onPaint, setOnPaint] = useState(true);
    
    // 색상 변경 후 호출 및 적용할 함수(onChange로 대체 가능하다)
    const handleChangeComplete = (color) => {
        ondrawImg(canvas, ctx, image); // drawTool함수를 사용해 브러쉬를 직접적으로 사용하기 직전에만 배치해서 reset으로 인해 워크보드가 초기화된 모습이 드러나지 않고 바로 [축 원상복귀된 이미지 draw - 브러쉬 사용]이 이루어지도록 함
        drawTool(canvas, ctx, color.hex);
        setcolorPicker((prev) => !prev);
    };

    const onClickcolor = () => {
        setcolorPicker((prev) => !prev);
    }

    const onClickweight = () => {
        setcolorWeight((prev) => !prev);
    }

    const onClickend = () => {
        ondrawImg(canvas, ctx, image); // (마찬가지) drawTool함수를 사용해 브러쉬를 직접적으로 사용하기 직전에만 배치해서 reset으로 인해 워크보드가 초기화된 모습이 드러나지 않고 바로 [축 원상복귀된 이미지 draw - 브러쉬 사용]이 이루어지도록 함
        drawTool(canvas, ctx, '#00000000');
    }

    const onClickthin = () => {
        ctx.lineWidth = 2;
        setcolorWeight((prev) => !prev);
    }

    const onClicknomal = () => {
        ctx.lineWidth = 4;
        setcolorWeight((prev) => !prev);
    }

    const onClickbold = () => {
        ctx.lineWidth = 6;
        setcolorWeight((prev) => !prev);
    }

    function drawTool (canvas, ctx, lineColor) {
        ctx.filter = 'none' // 필터 씌웠을 경우 브러쉬는 필터 적용을 받지 않아야 함 

        let drawing = false;

        canvas.addEventListener("mousemove", function(e){ mouseMove(e) });
        canvas.addEventListener("mousedown", function(e){ mouseDown(e) });
        canvas.addEventListener("mouseup", function(e){ mouseUp(e) });
        canvas.addEventListener("mouseout", function(e){ mouseOut(e) });
        
        let startX = 0;
        let startY = 0;

        ctx.lineWidth = 4;
        ctx.strokeStyle = lineColor;


        function draw(curX, curY) {  
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(curX, curY);
            ctx.stroke();
        }

        function mouseDown(e) {
            drawing = true;
            startX = e.offsetX;
            startY = e.offsetY;
        }
        
        function mouseMove(e) {
            let curX = e.offsetX;
            let curY = e.offsetY;
            if (drawing == true) {
                draw(curX, curY);
            }
            startX = curX;
            startY = curY;
        }
        
        function mouseUp(e) {
            drawing = false;
            const imageData = canvas.toDataURL('image/png');
            getData(imageData);
        }
        
        function mouseOut(e) {
            drawing = false;

        }

    };

    return (
        <div>
            <div className="optionverticalLine_paint"></div>
    
            { colorPicker ? <GithubPicker className="colorpicker" color={selectedColor} onChangeComplete={ handleChangeComplete }/> : null }

            <div onClick={onClickcolor}><p className="paintOption1">색상</p></div>
            <div onClick={onClickweight}><p className="paintOption2">두께</p></div>
            <div onClick={onClickend}><p className="paintOption3">종료</p></div>

            { colorweight ? <div className="brushWeight">
            <div onClick={onClickthin}><p className="lineOption">얇게</p></div>
            <div onClick={onClicknomal}><p className="lineOption">기본</p></div>
            <div onClick={onClickbold}><p className="lineOption">두껍게</p></div>
            </div> : null }
        </div>
    );
}

export default Paintfunc;