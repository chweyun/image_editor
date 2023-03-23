import React from "react";
import { useState, useEffect, useRef } from "react";
//import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
import EasyCrop from "./EasyCrop";
import Cropper from 'react-easy-crop';

import './Cropfunc.css';
import { ReactComponent as CropIcon } from "../Image/crop.svg"

function Cropfunc ( {canvas, ctx, imageUrl, canvasRef, endCrop, getData_crop, cropURLstr, getData_cropSize, canvasId} ) { // image 밑에서 중복이라 일단 지워놨음 

    if(cropURLstr != null) {
        imageUrl = cropURLstr;
    }

    const [crop1, setCrop1] = useState(false);
    const [crop2, setCrop2] = useState(false);
    const [crop3, setCrop3] = useState(false);
    const [draw, setDraw] = useState(false); // 아 근데 당장 필요 없을거같은데

    const onClickCrop = () => {
        setCrop1((prev) => !prev);
    }

    const onClickCrop2 = () => {
        setCrop2((prev) => !prev);
    }

    const onClickCrop3 = () => {
        setCrop3((prev) => !prev);
    }



    return (
        <div>
            <div className="sideline"> 
                <div className="cropOption1-1" onClick={onClickCrop}><CropIcon className="iconStyle cropOption1" /></div>
                <div className="cropOption2-1"><p className="cropOption1Text">정방형</p></div>
                <div className="cropOption3-1" onClick={onClickCrop2}><CropIcon className="iconStyle cropOption2" /></div>
                <div className="cropOption4-1"><p className="cropOption2Text">4 : 3</p></div>
                <div className="cropOption5-1" onClick={onClickCrop3}><CropIcon className="iconStyle cropOption3" /></div>
                <div className="cropOption6-1"><p className="cropOption3Text">16 : 9</p></div>
            </div>
            {crop1 == true
            ? <div className="App"> {/* 이 App클래스 가진 div때문에 아래 영역 넓어짐 */}
                <header>
                    <EasyCrop image={imageUrl} canvas={canvas} ctx={ctx} endCrop={endCrop} getData_crop={getData_crop} aspect_X={1} aspect_Y={1} getData_cropSize={getData_cropSize} canvasId={canvasId}/>
                    {/* EasyCrop - Cropfunc - MainBoard - Turnfunc
                        (자식)  -  (부모)  -   (부모)  -  (자식) */}
                </header>
            </div>
            :
            null
            }
            {crop2 == true
            ? <div className="App">
                <header>
                    <EasyCrop image={imageUrl} canvas={canvas} ctx={ctx} endCrop={endCrop} getData_crop={getData_crop} aspect_X={4} aspect_Y={3} getData_cropSize={getData_cropSize} canvasId={canvasId}/>
                    {/* EasyCrop - Cropfunc - MainBoard - Turnfunc
                        (자식)  -  (부모)  -   (부모)  -  (자식) */}
                </header>
            </div>
            :
            null
            }
            {crop3 == true
            ? <div className="App">
                <header>
                    <EasyCrop image={imageUrl} canvas={canvas} ctx={ctx} endCrop={endCrop} getData_crop={getData_crop} aspect_X={16} aspect_Y={9} getData_cropSize={getData_cropSize} canvasId={canvasId}/>
                    {/* EasyCrop - Cropfunc - MainBoard - Turnfunc
                        (자식)  -  (부모)  -   (부모)  -  (자식) */}
                </header>
            </div>
            :
            null
            }
        </div>
    );
};

export default Cropfunc;