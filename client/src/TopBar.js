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
        console.log("이미지정보", imageUrl);
      };
    };
    
    return (
      <React.Fragment>
        <img src={imageUrl ? imageUrl : basicImg} alt="편집이미지" className="imgSizeControl" style={imageUrl ? null : {display: 'none'}} />
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
            <img src={callProIcon} className="toptoolIcon" onClick={() => oninputPro()} >
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