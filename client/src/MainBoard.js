import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './MainBoard.css';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

// import Image
import newProIcon from './Image/newPro.svg';
import callProIcon from './Image/callPro.svg';
import callImgIcon from './Image/callImg.svg';
import backIcon from './Image/back.svg';
import reIcon from './Image/re.svg';
import resetIcon from './Image/reset.svg';
import saveImgIcon from './Image/saveImg.svg';
import saveProIcon from './Image/savePro.svg';
import basicImg from './Image/profile.png';
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
import profile from './Image/profile.png';

// import Component
import OninputFile from "./component/InputFile.js";
import onnewpro from "./component/Newprofunc.js";
import oninputPro from "./component/InputPro.js";
import onback from "./component/Backfunc.js";
import onreturn from "./component/Returnfunc.js";
import onreset from "./component/Resetfunc.js";
import onsaveimg from "./component/SaveImgfunc.js";
import onsavepro from "./component/SaveProfunc.js";
import Oninvert from "./component/Filterfunc.js";
import ModalStore from "./component/Modals/ModalStore"
import ModalImport from "./component/Modals/ModalImport.js";
import Filterfunc from "./component/Filterfunc.js";
import Cropfunc from "./component/Cropfunc.js";
import onturn from "./component/Turnfunc.js";
import onreverse from "./component/Reversefunc.js";
import ontext from "./component/Textfunc.js";
import onpaint from "./component/Paintfunc.js";
import onshape from "./component/Shapefunc.js";
import oneraser from "./component/Eraserfunc.js";
import oneraserAll from "./component/EraserAllfunc.js";
import onselect from "./component/Selectfunc.js";
import { wait } from "@testing-library/user-event/dist/utils";

function MainBoard () {
    
    // TopBar.js function
    const [imageUrl, setImageUrl] = useState(null);
    const imgRef = useRef();

    const [props, setProps] = useState({});

    let canvas = undefined;
    let ctx = undefined;
    let image = undefined;


    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];
        console.log('onChangeImage 안 file데이터',file);

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImageUrl(reader.result);
            console.log("이미지주소", reader.result);
            /*canvasRef.drawImage(file, 0, 0)*/
            
            canvas = document.getElementById('canvasID');
            ctx = canvas.getContext('2d');
            image = document.getElementById('source');
            setProps({canvas, ctx, image});
            console.log('onChangeImage 안 canvas데이터',canvas);
            console.log('onChangeImage 안 ctx데이터', ctx);
            /*ctx.filter = 'grayscale()';*/

            function drawImageData(image, ctx) { 
                console.log('drawImageData 안 canvas데이터',canvas);
                console.log('drawImageData 안 ctx데이터', ctx);
                var canvasArea = ctx.canvas ;
                var hRatio = canvasArea.width  / image.width    ;
                var vRatio =  canvasArea.height / image.height  ;
                var ratio  = Math.min ( hRatio, vRatio );
                var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
                var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
                ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
                ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
            };
            
            image.addEventListener('load', (e) => {
                console.log("addEventListener 돌아감");
                drawImageData(image, ctx);
                console.log("drawImageData 돌아감");
                console.log('test0', canvas)
                console.log('test0', ctx)
            });
        };
        console.log('test', props.canvas)
        console.log('test', props.ctx)
    };

    const [showing, setShowing] = useState(false);
    const onClick = () => {
        setShowing((prev) => !prev)
    };

    const [modalStoreOpen, setModalStoreOpen] = useState(false);
    const [modalImportOpen, setModalImportOpen] = useState(false);

    const openModalStore = () => {
    setModalStoreOpen(true);
    };
    const openModalImport = () => {
    setModalImportOpen(true);
    };
    const closeModalStore = () => {
    setModalStoreOpen(false);
    };
    const closeModalImport = () => {
    setModalImportOpen(false);
    };

    const down = () => { // (https://bit.ly/3xTsMt2)
        var canvas = document.getElementById('canvasID');
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
        window.location.href=image; 
    }

    // SideBar.js function
    const [selectFilter, setSelectFilter] = useState(false);
    const [selectCrop, setSelectCrop] = useState(false);

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
        setSelectFilter((prev) => !prev);
        setClickFilter((prev) => !prev);
    }
    const onClickCrop = () => {
        setSelectCrop((prev) => !prev);
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
        <>
            <div className="TopBar">
                <img src={newProIcon} className="toptoolIcon" onClick={() => onnewpro()} />
                <img src={callProIcon} className="toptoolIcon" onClick={() => openModalImport()} />
                <ModalImport open={modalImportOpen} close={closeModalImport} header="Modal heading"></ModalImport> 
                    {/* <input type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
                    <Button label="이미지 업로드" onClick={onUploadImageButtonClick} /> */}
                <label for="input-file"><img src={callImgIcon} className="toptoolIcon" id="callImg"/></label>
                <div className="TopCenterTool">
                    <img src={backIcon} className="toptoolIcon" onClick={() => onback()}/>
                    <img src={reIcon} className="toptoolIcon" onClick={() => onreturn()} />
                    <img src={resetIcon} className="toptoolIcon" onClick={() => onreset()} />
                </div>
                <div className="ToprightTool">
                    <img src={saveImgIcon} className="toptoolIcon" onClick={() => {onsaveimg(); down()}} />
                    <img src={saveProIcon} className="toptoolIcon" onClick={() => {onsavepro(); openModalStore(); }}  />
                    <ModalStore open={modalStoreOpen} close={closeModalStore} header="Modal heading"></ModalStore> 
                </div>
                <div>
                    {showing ? <OninputFile /> : null}
                </div>
                <React.Fragment>
                    {/* TODO */}
                <img src={imageUrl ? imageUrl : profile} alt="편집이미지" id="source" className="imgSizeControl" style={{display: 'none'}}/> 
                <canvas className="canvas" id="canvasID" width="1920" height="1080" style= {{width:'1200px', height:'550px', backgroundColor:'red'}} 
                /* 컴퓨터 해상도로 기존 사이즈 맞춰주고 스타일로 캔버스 크기 조정해줘야 화질 안깨짐 */ /> 
                <input type="file" ref={imgRef} onChange={onChangeImage} id="input-file" style={{display: 'none'}}></input>
                </React.Fragment>
            </div>
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
                    {console.log('test2', props.canvas)}
                    {console.log('test2', props.ctx)}
                    {selectFilter ? <Filterfunc canvas={props.canvas} ctx={props.ctx} image={props.image}/> : null}
                    {selectCrop ? <Cropfunc canvas={props.canvas} ctx={props.ctx} image={props.image} imageURL={imageUrl}/> : null}
                </div>
            </div>
        </>
    );
};

export default MainBoard;