import React from "react";
import './Filterfunc.css';

const ongrayscale = () => {
    console.log("회색조필터기능");
};

const oninvert = () => {
    console.log("반전필터기능");
};

const onsharp = () => {
    console.log("선명필터기능");
};

function Filterfunc () {
    return (
        <div>
            <div className="optionverticalLine"></div>
            <div onClick={() => ongrayscale()}><p className="filterOption1">회색조</p></div>
            <div onClick={() => oninvert()}><p className="filterOption2">반전</p></div>
            <div onClick={() => onsharp()}><p className="filterOption3">선명</p></div>
        </div>
    );
}

export default Filterfunc;