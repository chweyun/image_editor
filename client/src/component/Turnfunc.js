import React from "react";
import { useState, useEffect, useRef } from "react";

import './Turnfunc.css';
import { ReactComponent as TurnIcon } from "../Image/turn.svg"

function Turnfunc ( {canvas, ctx, image} ) {

    const [rotate, setRotate] = useState(true);

    const onClickimageLeftRotate = () => {
        setRotate((prev) => !prev);
        //회전했을때 방향이 일반적인 방향일때랑 좌우로 90만 돌려서 사진이 약간 서있는 상태일때랑 이미지 비율 계산을 다르게 해야해서 회전함수를 두개 사용했습니다
        { rotate ?  drawimageRotate_h(ctx, image, -90) : drawimageRotate_v(ctx, image, -90)};
    }

    const onClickimageRightRotate = () => {
        setRotate((prev) => !prev);
        { rotate ?  drawimageRotate_h(ctx, image, 90) : drawimageRotate_v(ctx, image, 90)};
    }

    function drawimageRotate_h(ctx, image, degrees) {
        var filterType = ctx.filter;
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.height    ;
        var vRatio =  canvasArea.height / image.width  ;
        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        // 회전시켜서 캔버스 리렌더링됨 -> 뒤에 캔버스 백그라운드에는 필터 제거하고 회색 컬러 채워주기
        // 이미지에는 앞서 입혀준 필터값이 있으면 해당 필터 다시 입혀주기 
        ctx.filter = 'none';
        ctx.fillStyle = "#D3D3D3";
        ctx.fillRect(0,0,canvasArea.width, canvasArea.height);
        ctx.translate(canvasArea.width/2, canvasArea.height/2); 
        ctx.rotate(degrees * Math.PI/180);
        ctx.translate(-canvasArea.width/2, -canvasArea.height/2); // 회전후 - 붙여서 회전 축 다시 리셋해줘야 동일한 축 중심으로 회전 계속 함
        ctx.filter = filterType;
        ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        ctx.restore();
    };

    function drawimageRotate_v( ctx, image, degrees) {
        var filterType = ctx.filter;
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.width    ;
        var vRatio =  canvasArea.height / image.height  ;
        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        ctx.filter = 'none';
        ctx.fillStyle = "#D3D3D3";
        // 세로가 더 긴 이미지의 경우 이유를 모르겠지만... fillRect시 캔버스 크기가 작은지 이전 이미지가 완전히 가려지지 않음.
        // 그래서 clearRect를 주고 임의의 좌표.. 크기로 캔버스를 지워줬는데..되긴됨.. 근데 이제 왜 되는지는 모르는...
        ctx.clearRect(0,-(image.width)*2,canvasArea.width*2, canvasArea.height*2);
        ctx.fillRect(0,0,canvasArea.width, canvasArea.height);  
        ctx.translate(canvasArea.width/2, canvasArea.height/2); 
        ctx.rotate(degrees * Math.PI/180);
        ctx.translate(-canvasArea.width/2, -canvasArea.height/2);
        ctx.filter = filterType;
        ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        ctx.restore();
    };

    return (
        <div className="sideline">
            <div className="turnDiv1" onClick={onClickimageLeftRotate}>
                <TurnIcon className="iconStyle turnOption1" />
                <div><p className="turnOption1Text">왼쪽</p></div>
            </div>
            <div className="turnDiv2" onClick={onClickimageRightRotate}>
                <TurnIcon className="iconStyle turnOption2" />
                <div><p className="turnOption2Text">오른쪽</p></div>
            </div>
        </div>
    );
};

export default Turnfunc;