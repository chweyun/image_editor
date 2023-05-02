import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import './Paintfunc.css';
import { GithubPicker } from 'react-color';

import { ReactComponent as BoldIcon } from "../Image/bold.svg";
import { ReactComponent as ShapeCircleIcon } from "../Image/shapeCircle.svg"


function Paintfunc ( {canvas, ctx, context, image, updateURL, canvasRef, brush, getData, setImage, setSelectPaint, setClickPaint, selectPaint} ) {

    if(updateURL != null) {
        image = updateURL; //image변수값 최초 임포트 URL말고 편집된 updateURL로 재할당
    }

    let [paintColor, setPaintColor] = useState();

    function ondrawImg (canvas, context, image) { // 회전툴이나 반전툴을 사용한 이후 페인트 툴을 사용할 경우 캔버스 축이 돌아가 있어서 reset안해주면 브러쉬가 회전&반전된 축 기준으로 좌우반전 혹은 상하반전, 90도 회전되어 그려짐 -> 최초에 reset해서 축을 원래대로 돌린 다음 가장 최근 업데이트 된 이미지를 캔버스에 그려주는 함수
        context.reset();
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( hRatio, vRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
        context.clearRect(0,0,canvasArea.width, canvasArea.height);
        context.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
    };

    const [colorPicker, setcolorPicker] = useState(false);
    const [colorweight, setcolorWeight] = useState(false);

    const [selectedColor, setSelectedColor] = useState('#00000000');
    const [onPaint, setOnPaint] = useState(true);
    
    // 색상 변경 후 호출 및 적용할 함수(onChange로 대체 가능하다)
    const handleChangeComplete = (color) => {
        ondrawImg(canvas, context, image); // drawTool함수를 사용해 브러쉬를 직접적으로 사용하기 직전에만 배치해서 reset으로 인해 워크보드가 초기화된 모습이 드러나지 않고 바로 [축 원상복귀된 이미지 draw - 브러쉬 사용]이 이루어지도록 함
        drawTool(canvas, context, color.hex, 4);
        // getData_lineColor(color.hex);
        setcolorPicker((prev) => !prev);
        setPaintColor(color.hex);
    };
    

    const onClickcolor = () => {
        setcolorPicker((prev) => !prev);
    }

    const onClickweight = () => {
        setcolorWeight((prev) => !prev);
    }

    const onClickend = () => {
        ondrawImg(canvas, context, image); // (마찬가지) drawTool함수를 사용해 브러쉬를 직접적으로 사용하기 직전에만 배치해서 reset으로 인해 워크보드가 초기화된 모습이 드러나지 않고 바로 [축 원상복귀된 이미지 draw - 브러쉬 사용]이 이루어지도록 함
        drawTool(canvas, context, '#0000000', 0.001); // 여기서 아예 안보이게끔 어케 조치를 취해야겠음

        setClickPaint(false);
        setSelectPaint(false);
    }

    const onClickthin = () => {
        context.lineWidth = 2;
        setcolorWeight((prev) => !prev);
    }

    const onClicknomal = () => {
        context.lineWidth = 4;
        setcolorWeight((prev) => !prev);
    }

    const onClickbold = () => {
        context.lineWidth = 6;
        setcolorWeight((prev) => !prev);
    }

    function drawTool (canvas, context, lineColor, lineWidth) {
        context.filter = 'none' // 필터 씌웠을 경우 브러쉬는 필터 적용을 받지 않아야 함 

        let drawing = false;

        canvas.addEventListener("mousemove", function(e){ mouseMove(e) });
        canvas.addEventListener("mousedown", function(e){ mouseDown(e) });
        canvas.addEventListener("mouseup", function(e){ mouseUp(e) });
        canvas.addEventListener("mouseout", function(e){ mouseOut(e) });
        
        let startX = 0;
        let startY = 0;

        context.lineWidth = lineWidth;
        context.strokeStyle = lineColor;


        function draw(curX, curY) {  
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(curX, curY);
            context.stroke();
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
            <div className='sideline'>
                { colorPicker ? <GithubPicker className="colorpicker" color={selectedColor} onChangeComplete={ handleChangeComplete }/> : null } 
                {/* <div className="paintOption1-1" onClick={onClickcolor}><p className="paintOption1">색상</p></div> */}

                <div className="paintDiv1" onClick={onClickcolor}>
                    <ShapeCircleIcon className="paintIconStyle1 paintOption1" style={{fill: paintColor}}/>
                    <div><p className="paintOption1Text">색상</p></div>
                </div>

                <div className="paintDiv2" onClick={onClickweight}>
                    <BoldIcon className="paintIconStyle2 paintOption2" />
                    <div><p className="paintOption2Text">두께</p></div>
                </div>

                <div className="paintOption3-1" onClick={onClickend}><p className="paintOption3">종료</p></div>
                
                { colorweight ? <div className="brushWeight">
                    <div className="paintOption4-1" onClick={onClickthin}><p className="lineOption">얇게</p></div>
                    <div className="paintOption5-1" onClick={onClicknomal}><p className="lineOption">기본</p></div>
                    <div className="paintOption6-1" onClick={onClickbold}><p className="lineOption">두껍게</p></div>
                </div> : null }
            </div>
        </div>
    );
}

export default Paintfunc;