import React from "react";
import { useState, useEffect, useRef } from "react";

import './Turnfunc.css';
import { ReactComponent as TurnIcon } from "../Image/turn.svg"

function Turnfunc ( {canvas, ctx, image, updateURL, getData_turn, setSelectTurn, setClickTurn, getImageUrl} ) {

    //ctx.save(); // 얘 쓰면 회전이 하나만 되고 멈춤 뭘까

    const [rotate, setRotate] = useState(true);

    const [rCnt, setRCnt] = useState(0);

    if(updateURL != null) {
        image = updateURL;
    }

    const onClickimageLeftRotate = () => {
        console.log('LeftRotate');

        var canvasId = document.getElementById('canvasID');
        const tmp1 = canvasId.width;
        canvasId.width = canvasId.height; //todo
        canvasId.height = tmp1; // todo
        console.log(tmp1, canvasId.width, canvasId.height);
        canvasId.style.width = `${canvasId.width}px`;
        canvasId.style.height = `${canvasId.height}px`;

        setRCnt(prev => prev - 90);
        setRotate((prev) => !prev);
        //회전했을때 방향이 일반적인 방향일때랑 좌우로 90만 돌려서 사진이 약간 서있는 상태일때랑 이미지 비율 계산을 다르게 해야해서 회전함수를 두개 사용했습니다
        { rotate ?  drawimageRotate_h(ctx, image, -90) : drawimageRotate_v(ctx, image, -90)};
        // { rotate ?  (image==updateURL ? drawimageRotate_h_ratio(ctx, importURL, updateURL, -90) : drawimageRotate_h(ctx, image, -90)) : drawimageRotate_v(ctx, image, -90)};
        
        const turnImg = canvas.toDataURL('image/png');
        getData_turn(turnImg);
    }

    const onClickimageRightRotate = () => {
        console.log('RightRotate');
        var canvasId = document.getElementById('canvasID');
        const tmp1 = canvasId.width;
        canvasId.width = canvasId.height; //todo
        canvasId.height = tmp1; // todo
        console.log(tmp1, canvasId.width, canvasId.height);
        canvasId.style.width = `${canvasId.width}px`;
        canvasId.style.height = `${canvasId.height}px`;

        setRCnt(prev => prev + 90);
        setRotate((prev) => !prev);
        { rotate ?  drawimageRotate_h(ctx, image, 90) : drawimageRotate_v(ctx, image, 90)};
        // { rotate ?  (image==updateURL ? drawimageRotate_h_ratio(ctx, importURL, updateURL, 90) : drawimageRotate_h(ctx, image, 90)) : drawimageRotate_v(ctx, image, 90)};

        const turnImg = canvas.toDataURL('image/png');
        getData_turn(turnImg);
    }

    const onClickEndTurn = () => { // 이미지 회전 할때마다 이미지 URL로 빼내면.. 워크보드까지 같이 캡쳐되는 문제가 아직 해결되지 않아서 무한정 사진이 작아지는... 무한함수같은 문제가 생기기때문에.. 종료버튼 누를때의 상태만 캡쳐되도록 종료버튼 클릭시 함수에 toDataURL함수 사용
        console.log('onClickEndTurn 시작');

        ctx.rotate(rCnt * Math.PI/180);

        const turnImg = canvas.toDataURL('image/png');
        getData_turn(turnImg);

        // 종료 버튼 누르면 사이드 바 닫히게
        setSelectTurn(false);
        setClickTurn(false);
        getImageUrl();

        setRotate(true);
        setRCnt(0);
    }

    function drawimageRotate_h(ctx, image, degrees) {
        console.log('drawimageRotate_h');
        var filterType = ctx.filter; // 여기서 현재필터 인식하고 밑에서 회전 후 다시 씌워주는데 paint 쓰고 오면 얘도 인식이 안됨
        var canvasArea = ctx.canvas ;
        var hRatio = canvasArea.width  / image.height    ;
        var vRatio =  canvasArea.height / image.width  ;
        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        // 회전시켜서 캔버스 리렌더링됨 -> 뒤에 캔버스 백그라운드에는 필터 제거하고 회색 컬러 채워주기
        // 이미지에는 앞서 입혀준 필터값이 있으면 해당 필터 다시 입혀주기 
        ctx.filter = 'none';
        ctx.clearRect(0 ,0, document.getElementById('canvasID').width, document.getElementById('canvasID').height);
        ctx.translate(canvasArea.width/2, canvasArea.height/2); 
        ctx.rotate(degrees * Math.PI/180);
        ctx.translate(-canvasArea.width/2, -canvasArea.height/2); // 회전후 - 붙여서 회전 축 다시 리셋해줘야 동일한 축 중심으로 회전 계속 함
        ctx.filter = filterType;
        ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        ctx.restore();
    };

    function drawimageRotate_v( ctx, image, degrees) {
        console.log('drawimageRotate_v');
        var filterType = ctx.filter;
        var canvasArea = ctx.canvas ;

        // var hRatio = canvasArea.width  / image.width    ;
        // var vRatio =  canvasArea.height / image.height  ;
        var hRatio = canvasArea.width  / image.height    ;
        var vRatio =  canvasArea.height / image.width  ;

        var ratio  = Math.min ( vRatio, hRatio );
        var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
        var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;
        ctx.filter = 'none';
        // ctx.fillStyle = "#D3D3D3";
        // 세로가 더 긴 이미지의 경우 이유를 모르겠지만... fillRect시 캔버스 크기가 작은지 이전 이미지가 완전히 가려지지 않음.
        // 그래서 clearRect를 주고 임의의 좌표.. 크기로 캔버스를 지워줬는데..되긴됨.. 근데 이제 왜 되는지는 모르는...
        // ctx.clearRect(0,-(image.width)*2,canvasArea.width*5, canvasArea.height*5);
        // ctx.fillRect(0,0,canvasArea.width, canvasArea.height);  
        ctx.clearRect(0,0,document.getElementById('canvasID').width, document.getElementById('canvasID').height);
        ctx.translate(canvasArea.width/2, canvasArea.height/2); 
        ctx.rotate(degrees * Math.PI/180);
        ctx.translate(-canvasArea.width/2, -canvasArea.height/2);
        ctx.filter = filterType;
        ctx.drawImage(image, 0, 0, image.width, image.height, centerShift_x, centerShift_y, image.width*ratio, image.height*ratio);
        ctx.restore();
    };

    return (
        <div>
            <div className="sideline">
                <div className="turnDiv1" onClick={onClickimageLeftRotate}>
                    <TurnIcon className="iconStyle turnOption1" />
                    <div><p className="turnOption1Text">왼쪽</p></div>
                </div>
                <div className="turnDiv2" onClick={onClickimageRightRotate}>
                    <TurnIcon className="iconStyle turnOption2" />
                    <div><p className="turnOption2Text">오른쪽</p></div>
                </div>
                <div onClick={onClickEndTurn}><p className="turnOption3Text">종료</p></div>
            </div>
        </div>
    );
};

export default Turnfunc;