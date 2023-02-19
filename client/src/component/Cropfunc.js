import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import './Cropfunc.css';
import { ReactComponent as CropIcon } from "../Image/crop.svg"

function Cropfunc ( {canvas, ctx, image, imageURL} ) {
    function CropDemo(imageURL) {
        const [crop, setCrop] = useState({ aspect: 16 / 9 });
        return <ReactCrop src={imageURL} crop={crop} onChange={newCrop => setCrop(newCrop)}/>;
    }

    return (
        <div>
            <div className="sideline">
                <CropIcon className="iconStyle cropOption1" />
                <div onClick={CropDemo(imageURL)}><p className="cropOption1Text">비지정</p></div>
            </div>
        </div>
    );
};

export default Cropfunc;