import React, { useState, useRef } from "react";
import menual from '../Image/menualFix.png';

import './MenualPopup.css';


function MenualPopup () {

    const [openPopup, setOpenPopup] = useState(true);

    const closePopup = () => {
        setOpenPopup(false);
    }

    return (
        <>
            {openPopup ?
                <div>
                    <div className="blackBox" />
                    <div className="menualPopup">
                        <img src={menual} className="popupImage"/>
                        <div className="menualCloseBtn" onClick={() => closePopup()}>닫기</div>
                    </div> 
                </div>
            : null }
        </>
    )
};

export default MenualPopup;