import React from "react";
import { useState, useEffect, useRef } from "react";

import './Reversefunc.css';
import { ReactComponent as ReverseIcon } from "../Image/reverse.svg"

function Reversefunc ( {canvas, ctx, context, image, updateURL, getData_reverse, setSelectReverse, setClickReverse, canvasId} ) {

    context.lineWidth = 0.01;

    const [reverse_h, setReverse_h] = useState(true);
    const [reverse_v, setReverse_v] = useState(true);
    const [resetCount, setResetCount] = useState(0);

    // var canvasId = document.getElementById('canvasID');

    if(updateURL != null) {
        image = updateURL;
    }

    const onClick_HReverse = () => { // 수평 기준 좌우 반전
        setReverse_h((prev) => !prev);
        drawimageReverse_h(context, image);
    }

    const onClick_VReverse = () => { // 수직 기준 상하 반전
        setReverse_v((prev) => !prev);
        drawimageReverse_v(context, image);
    }

    const onClickEndReverse = () => {

        // const reverseImg = document.getElementById('canvasID').toDataURL('image/png');
        const reverseImg = document.getElementById('source').src;

        getData_reverse(reverseImg);
        setResetCount(0); // 반전툴 사용 이후 또 다시 회전툴 사용 - 반전툴 사용 플로우로 툴 사용할 경우 reset안해주면 또 에러나니까 종료할땐 0으로 초기화시켜줘서 다시 회전툴 사용 이후 들어올때 또 최초 1회엔 reset 돌아가도록 

        setClickReverse(false);
        setSelectReverse(false);
        console.log(reverseImg);
        console.log(image);
    }

    function drawimageReverse_h(context, image){
        if(resetCount == 0) { // 회전툴을 사용하고 넘어온 경우 캔버스의 축이 회전기준으로 세팅되어있어서 회전툴 사용이후 반전툴 최초사용땐 reset으로 캔버스 세팅을 싹 지워줄것. 최초아니고 계속 툴 사용할때마다 지워지게 하면 정상적으로 이미지 draw가 안되니까 최초 1회만
            context.reset();
        }
        var filterType = context.filter;
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        context.filter = 'none';
        context.fillStyle = "#D3D3D3";
        context.fillRect(0,0,canvasArea.width, canvasArea.height);  
        context.filter = filterType;
        context.scale(-1, 1); // 좌우반전 (X축)
        context.translate(canvasArea.width*(-1), 0); // 축 바꿔주기 
        context.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        
        // 종료 후 두 번 돌아가고 꼬이는 문제가 축을 한번 더 바꿔주면 해결됨. 이유는 모르겠음 ...
        context.scale(-1, 1); // 좌우반전 (X축)
        context.translate(canvasArea.width*(-1), 0); // 축 바꿔주기 
        console.log(context);
        const reverseImg = canvasId.toDataURL('image/png');
        getData_reverse(reverseImg);
        context.restore();
        setResetCount(resetCount+1); // 최초 1회 이후엔 reset돌아가지 않게
    };

    function drawimageReverse_v(context, image){
        image.src = canvasId.toDataURL('image/png');
        console.log(image);
        console.log(canvasId.toDataURL('image/png'));
        if(resetCount == 0) {
            context.reset();
        }
        var filterType = context.filter;
        var canvasArea = context.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        context.filter = 'none';
        context.fillStyle = "#D3D3D3";
        context.fillRect(0,0,canvasArea.width, canvasArea.height);  
        context.filter = filterType;
        context.scale(1, -1); // 상하반전 (Y축)
        context.translate(0, canvasArea.height*(-1)); // 축 바꿔주기
        context.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        
        context.scale(1, -1); // 상하반전 (Y축)
        context.translate(0, canvasArea.height*(-1)); // 축 바꿔주기
        // console.log(canvasId.toDataURL('image/png'));
        const reverseImg = canvasId.toDataURL('image/png');
        getData_reverse(reverseImg);
        context.restore();
        setResetCount(resetCount+1);
    };

    return (
        <div>
            <div className='sideline'>
                <div className="reverseOption1-1"><ReverseIcon className="iconStyle reverseOption1" onClick={onClick_HReverse}/></div>
                <div className="reverseOption2-1"><ReverseIcon className="iconStyle reverseOption2" onClick={onClick_VReverse}/></div>
                <div className="reverseOption3-1" onClick={onClickEndReverse}><p className="reverseOption3">종료</p></div>
            </div>
        </div>
    );
};

export default Reversefunc;