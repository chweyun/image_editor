import React from "react";
import { useState, useEffect, useRef } from "react";

import './Reversefunc.css';
import { ReactComponent as ReverseIcon } from "../Image/reverse.svg"

function Reversefunc ( {canvas, ctx, image, updateURL, getData_reverse} ) {

    const [reverse_h, setReverse_h] = useState(true);
    const [reverse_v, setReverse_v] = useState(true);
    const [resetCount, setResetCount] = useState(0);

    if(updateURL != null) {
        image = updateURL;
    }

    const onClick_HReverse = () => { // 수평 기준 좌우 반전
        setReverse_h((prev) => !prev);
        drawimageReverse_h(ctx, image);
    }

    const onClick_VReverse = () => { // 수직 기준 상하 반전
        setReverse_v((prev) => !prev);
        drawimageReverse_v(ctx, image);
    }

    const onClickEndReverse = () => {
        const reverseImg = canvas.toDataURL('image/png');
        getData_reverse(reverseImg);
        setResetCount(0); // 반전툴 사용 이후 또 다시 회전툴 사용 - 반전툴 사용 플로우로 툴 사용할 경우 reset안해주면 또 에러나니까 종료할땐 0으로 초기화시켜줘서 다시 회전툴 사용 이후 들어올때 또 최초 1회엔 reset 돌아가도록 
    }

    function drawimageReverse_h(ctx, image){
        if(resetCount == 0) { // 회전툴을 사용하고 넘어온 경우 캔버스의 축이 회전기준으로 세팅되어있어서 회전툴 사용이후 반전툴 최초사용땐 reset으로 캔버스 세팅을 싹 지워줄것. 최초아니고 계속 툴 사용할때마다 지워지게 하면 정상적으로 이미지 draw가 안되니까 최초 1회만
            ctx.reset();
        }
        var filterType = ctx.filter;
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        ctx.filter = 'none';
        ctx.fillStyle = "#D3D3D3";
        ctx.fillRect(0,0,canvasArea.width, canvasArea.height);  
        ctx.filter = filterType;
        ctx.scale(-1, 1); // 좌우반전 (X축)
        ctx.translate(canvasArea.width*(-1), 0); // 축 바꿔주기 
        ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        // const reverseImg = canvas.toDataURL('image/png');
        // getData_reverse(reverseImg);

        ctx.restore();
        setResetCount(resetCount+1); // 최초 1회 이후엔 reset돌아가지 않게
    };

    function drawimageReverse_v(ctx, image){
        if(resetCount == 0) {
            ctx.reset();
        }
        var filterType = ctx.filter;
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        ctx.filter = 'none';
        ctx.fillStyle = "#D3D3D3";
        ctx.fillRect(0,0,canvasArea.width, canvasArea.height);  
        ctx.filter = filterType;
        ctx.scale(1, -1); // 상하반전 (Y축)
        ctx.translate(0, canvasArea.height*(-1)); // 축 바꿔주기
        ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        // const reverseImg = canvas.toDataURL('image/png');
        // getData_reverse(reverseImg);
        
        ctx.restore();
        setResetCount(resetCount+1);
    };

    return (
        <div>
            <div className="optionverticalLine"></div>
            <ReverseIcon className="iconStyle reverseOption1" onClick={onClick_HReverse}/>
            <ReverseIcon className="iconStyle reverseOption2" onClick={onClick_VReverse}/>
            <div onClick={onClickEndReverse}><p className="reverseOption3">종료</p></div>
        </div>
    );
};

export default Reversefunc;