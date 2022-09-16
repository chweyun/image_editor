import React from "react";
import { useState, useEffect } from "react";
import Filterfunc from "./component/Filterfunc.js";
import oncrop from "./component/Cropfunc.js";
import onturn from "./component/Turnfunc.js";
import onreverse from "./component/Reversefunc.js";
import ontext from "./component/Textfunc.js";
import onpaint from "./component/Paintfunc.js";
import onshape from "./component/Shapefunc.js";
import oneraser from "./component/Eraserfunc.js";
import oneraserAll from "./component/EraserAllfunc.js";
import onselect from "./component/Selectfunc.js";
import './SideBar.css';
import eraserAllIcon from './Image/eraserAll.svg';
import selectIcon from './Image/select.svg';
import hyuIcon from './Image/HYU_logo.png';

import { ReactComponent as FilterIcon } from "./Image/filter.svg"
import { ReactComponent as CropIcon } from "./Image/crop.svg"
import { ReactComponent as TurnIcon } from "./Image/turn.svg"
import { ReactComponent as ReverseIcon } from "./Image/reverse.svg"
import { ReactComponent as TextIcon } from "./Image/text.svg"
import { ReactComponent as PaintIcon } from "./Image/drawing.svg"
import { ReactComponent as ShapeIcon } from "./Image/shape.svg"
import { ReactComponent as EraserIcon } from "./Image/eraser.svg"
import { ReactComponent as EraserAllIcon } from "./Image/eraserAll.svg"

function SideBar () {
    const [showing, setShowing] = useState(false);

    const [clickFilter, setClickFilter] = useState(false);
    const [clickCrop, setClickCrop] = useState(false);
    const [clickTurn, setClickTurn] = useState(false);
    const [clickReverse, setClickReverse] = useState(false);
    const [clickText, setClickText] = useState(false);
    const [clickPaint, setClickPaint] = useState(false);
    const [clickShape, setClickShape] = useState(false);
    const [clickEraser, setClickEraser] = useState(false);
    const [clickEraserAll, setClickEraserAll] = useState(false);

    const onClickFilter = () => {
        setShowing((prev) => !prev);
        setClickFilter((prev) => !prev);
    }
    const onClickCrop = () => {
        setClickCrop((prev) => !prev);
    }
    const onClickTurn = () => {
        setClickTurn((prev) => !prev);
    }
    const onClickReverse = () => {
        setClickReverse((prev) => !prev);
    }
    const onClickText = () => {
        setClickText((prev) => !prev);
    }
    const onClickPaint = () => {
        setClickPaint((prev) => !prev);
    }
    const onClickShape = () => {
        setClickShape((prev) => !prev);
    }
    const onClickEraser = () => {
        setClickEraser((prev) => !prev);
    }
    const onClickEraserAll = () => {
        setClickEraserAll((prev) => !prev);
    }

    return (
        <div className="sideBar">
            <div className="verticalLine"></div>
            <img src={hyuIcon} className="toolIcon" />
            <hr className="longContour" />
            <FilterIcon className={clickFilter ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={onClickFilter}/>
            <hr className="shortContour" align="left"/>
            <div className="sideArea">
                <CropIcon className={clickCrop ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={onClickCrop}/>
                <TurnIcon className={clickTurn ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={onClickTurn}/>
                <ReverseIcon className={clickReverse ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={onClickReverse}/>
                <hr className="shortContour" align="left" />
            </div>
            <div className="sideArea">
                <TextIcon className={clickText ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={onClickText}/>
                <PaintIcon className={clickPaint ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={onClickPaint}/>
                <ShapeIcon className={clickShape ? ("iconStyle", "shape_select") : ("iconStyle", "shape_noneselect")} onClick={onClickShape}/>
                <hr className="shortContour" align="left" />
            </div>
            <div className="sideArea">
                <EraserIcon className={clickEraser ? ("iconStyle", "eraser_select") : ("iconStyle", "eraser_noneselect")} onClick={onClickEraser}/>
                <EraserAllIcon className={clickEraserAll ? ("iconStyle", "eraser_select") : ("iconStyle", "eraser_noneselect")} onClick={onClickEraserAll}/>
                <img src={selectIcon} className="toolIcon" onClick={() => onselect()} />
            </div>
            <div>
                {showing ? <Filterfunc /> : null}
            </div>
        </div>
    );
}

export default SideBar;