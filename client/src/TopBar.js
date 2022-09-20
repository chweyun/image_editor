import React from "react";
import { useState, useEffect, useRef } from "react";
import OninputFile from "./component/InputFile.js";
import onnewpro from "./component/Newprofunc.js";
import oninputPro from "./component/InputPro.js";
import onback from "./component/Backfunc.js";
import onreturn from "./component/Returnfunc.js";
import onreset from "./component/Resetfunc.js";
import onsaveimg from "./component/SaveImgfunc.js";
import onsavepro from "./component/SaveProfunc.js";
import Filterfunc from "./component/Filterfunc.js";
import './SideBar.css';
import './TopBar.css';
import newProIcon from './Image/newPro.svg';
import callProIcon from './Image/callPro.svg';
import callImgIcon from './Image/callImg.svg';
import backIcon from './Image/back.svg';
import reIcon from './Image/re.svg';
import resetIcon from './Image/reset.svg';
import saveImgIcon from './Image/saveImg.svg';
import saveProIcon from './Image/savePro.svg';
import basicImg from './Image/profile.png';

const Prac = (props) => {
  const [imageUrl, setImageUrl] = useState(null);
  const imgRef = useRef();

  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    console.log(file);

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
      console.log("이미지주소", reader.result);
      /*canvasRef.drawImage(file, 0, 0)*/
  
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const image = document.getElementById('source');
    console.log(ctx.getImageData(0,0, canvas.width, canvas.height));
    
    function drawImageData(image, ctx) { 
      var canvasArea = ctx.canvas ;
      var hRatio = canvasArea.width  / image.width    ;
      var vRatio =  canvasArea.height / image.height  ;
      var ratio  = Math.min ( hRatio, vRatio );
      var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
      var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
      ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
      ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);  
    }

    image.addEventListener('load', (e) => {
      console.log("이미지태그 업로드 확인시점 돌아감");
      image.onload = function() {
        drawImageData(image, ctx);
      };
      console.log("drawImageData 돌아감");
    });
    };
  };

  return (
    <React.Fragment>
      <img src={imageUrl ? imageUrl : basicImg} alt="편집이미지" id="source" className="imgSizeControl" style={{display: 'none'}} />
      <canvas className="canvas" id="canvas" width="1920" height="1080" style= { {width:'1200px', height:'550px'} } 
      /* 컴퓨터 해상도로 기존 사이즈 맞춰주고 스타일로 캔버스 크기 조정해줘야 화질 안깨짐 *//> 
      <input type="file" ref={imgRef} onChange={onChangeImage} id="input-file" style={{display: 'none'}}></input>
    </React.Fragment>
  );
};

function TopBar () {
    const [showing, setShowing] = useState(false);
    const onClick = () => {
        setShowing((prev) => !prev)
    };
    

    return (
        <div className="TopBar">
            <img src={newProIcon} className="toptoolIcon" onClick={() => onnewpro()} />
            <img src={callProIcon} className="toptoolIcon" onClick={() => onnewpro()} >
                {/* <input type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
                <Button label="이미지 업로드" onClick={onUploadImageButtonClick} /> */}
            </img>
            <label for="input-file"><img src={callImgIcon} className="toptoolIcon"/></label>
            <div className="TopCenterTool">
                <img src={backIcon} className="toptoolIcon" onClick={() => onback()}/>
                <img src={reIcon} className="toptoolIcon" onClick={() => onreturn()} />
                <img src={resetIcon} className="toptoolIcon" onClick={() => onreset()} />
            </div>
            <div className="ToprightTool">
                <img src={saveImgIcon} className="toptoolIcon" onClick={() => onsaveimg()} />
                <img src={saveProIcon} className="toptoolIcon" onClick={() => onsavepro()} />
            </div>
            <div>
                {showing ? <OninputFile /> : null}
            </div>
            <Prac />
        </div>
    );
}

export default TopBar;