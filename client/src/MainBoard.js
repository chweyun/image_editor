import React from "react";
import { useState, useEffect, useRef } from "react";
import './MainBoard.css';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import EasyCrop from "./component/EasyCrop";
import Cropper from 'react-easy-crop';
import getCroppedImg from "./component/Crop";

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
import Turnfunc from "./component/Turnfunc.js";
import Reversefunc from "./component/Reversefunc.js";
import onturn from "./component/Turnfunc.js";
import onreverse from "./component/Reversefunc.js";
import ontext from "./component/Textfunc.js";
import Paintfunc from "./component/Paintfunc.js";
import onshape from "./component/Shapefunc.js";
import oneraser from "./component/Eraserfunc.js";
import oneraserAll from "./component/EraserAllfunc.js";
import onselect from "./component/Selectfunc.js";
import { wait } from "@testing-library/user-event/dist/utils";

function MainBoard () {
    
    // TopBar.js function
    const [imageUrl, setImageUrl] = useState(null);
    const imgRef = useRef();
    const canvasRef = useRef(null);

    const [props, setProps] = useState({});

    //Paintfunc과 props 전달용
    const [brush, setBrush] = useState();
    const [endCrop, setEndCrop] = useState();
    const [endFilter, setEndFilter] = useState();
    const [endReverse, setEndReverse] = useState();
    const [endTurn, setEndTurn] = useState();

    const [updateURL, setUpdateURL] = useState();
    const [cropURLstr, setCropURLstr] = useState();

    let canvas = undefined;
    let ctx = undefined;  
    let image = undefined;

    let orgImage = undefined;

    const getData = (brush) => {
        setBrush(brush);
        setCropURLstr(brush);
        setUpdateURL(loadingImg);
    }
    const getData_crop = (endCrop) => { // 예외처리때문에 자식 props 전달용 
        setEndCrop(endCrop);  
        setCropURLstr(endCrop);  
        setUpdateURL(loadingImg2);  
    }
    const getData_filter = (endFilter) => {
        setEndFilter(endFilter);
        setUpdateURL(loadingImg3);
        setCropURLstr(endFilter);
    }
    const getData_reverse = (endReverse) => {
        setEndReverse(endReverse);
        setUpdateURL(loadingImg4);
        setCropURLstr(endReverse);
    }
    const getData_turn = (endTurn) => {
        setEndTurn(endTurn);
        setUpdateURL(loadingImg5);
        setCropURLstr(endTurn);
    }

    console.log("페인트함수 사용하고 나서 cropURLstr변수값", cropURLstr);


    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
            setCropURLstr(reader.result);

            canvas = document.getElementById('canvasID');
            ctx = canvas.getContext('2d');
            image = document.getElementById('source');
            orgImage = image;
            setUpdateURL(image);

            setProps({canvas, ctx, image, imageUrl, canvasRef});

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

            console.log("MainBoard에서 image state값", image);
            image.addEventListener('load', (e) => {
                drawImageData(image, ctx);
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
    const [selectTurn, setSelectTurn] = useState(false);
    const [selectReverse, setSelectReverse] = useState(false);
    const [selectPaint, setSelectPaint] = useState(false);

    const [clickFilter, setClickFilter] = useState(false);
    const [clickCrop, setClickCrop] = useState(false);
    const [clickTurn, setClickTurn] = useState(false);
    const [clickReverse, setClickReverse] = useState(false);
    const [clickText, setClickText] = useState(false);
    const [clickPaint, setClickPaint] = useState(false);
    const [clickShape, setClickShape] = useState(false);
    const [clickEraser, setClickEraser] = useState(false);
    const [clickEraserAll, setClickEraserAll] = useState(false);

    var loadingImg = document.getElementById("loadImage"); 
    var loadingImg2 = document.getElementById("loadImage_crop");
    var loadingImg3 = document.getElementById("loadImage_filter");
    var loadingImg4 = document.getElementById("loadImage_reverse");
    var loadingImg5 = document.getElementById("loadImage_turn");

    const onClickFilter = () => {
        setSelectFilter((prev) => !prev);
        setClickFilter((prev) => !prev);
    }
    const onClickCrop = () => {
        setSelectCrop((prev) => !prev);
        setClickCrop((prev) => !prev);
    }
    const onClickTurn = () => {
        setSelectTurn((prev) => !prev);
        setClickTurn((prev) => !prev);
    }
    const onClickReverse = () => {
        setSelectReverse((prev) => !prev);
        setClickReverse((prev) => !prev);
    }
    const onClickText = () => {
        setClickText((prev) => !prev);
}
    const onClickPaint = () => {
        setSelectPaint((prev) => !prev);
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

    console.log("MainBoard에서 updateURL배열내용", updateURL);


    return (
        <>
            <div className="TopBar">
                <img src={newProIcon} className="toptoolIcon" onClick={() => onnewpro()} />
                <img src={callProIcon} className="toptoolIcon" onClick={() => openModalImport()} />
                <ModalImport open={modalImportOpen} close={closeModalImport} header="Modal heading"></ModalImport> 
                    {/* <input type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
                    <Button label="이미지 업로드" onClick={onUploadImageButtonClick} /> */}
                <label htmlFor="input-file"><img src={callImgIcon} className="toptoolIcon" id="callImg"/></label>
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
                <img src={imageUrl} alt="편집이미지" id="source" className="imgSizeControl" style={{display: 'none'}}/> 
                <canvas ref={canvasRef} className="canvas" id="canvasID" width="1200" height="550" style= {{width:'1200px', height:'550px'}}
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
                    {selectFilter ? <Filterfunc canvas={props.canvas} ctx={props.ctx} image={props.image} updateURL={updateURL} getData_filter={getData_filter} setUpdateURL={setUpdateURL}/> : null}
                    {selectCrop ? <Cropfunc canvas={props.canvas} ctx={props.ctx} image={props.image} imageUrl={imageUrl} canvasRef={canvasRef} endCrop={endCrop} getData_crop={getData_crop} cropURLstr={cropURLstr}/> : null}
                    {selectTurn ? <Turnfunc canvas={props.canvas} ctx={props.ctx} image={props.image} updateURL={updateURL} getData_turn={getData_turn} orgImage={orgImage}/> : null}
                    {selectReverse ? <Reversefunc canvas={props.canvas} ctx={props.ctx} image={props.image} updateURL={updateURL} getData_reverse={getData_reverse}/> : null}
                    {selectPaint ? <Paintfunc canvas={props.canvas} ctx={props.ctx} image={props.image} canvasRef={props.canvasRef} brush={brush} getData={getData} updateURL={updateURL}/> : null}
                    <img id='loadImage' src={brush} style={{display: 'none'}}/>
                    <img id='loadImage_crop' src={endCrop} style={{display: 'none'}}/> {/*여기서 위에 페인트이미지는 잘 뜨는데 크롭이미지는 하얗게 뜨고 이미지가 안뜬다. 프롭스데이터 넘어올때 뭔가 잘못된 듯. 일단 여기서 크롭이미지가 잘 뜨게 해야함*/}
                    <img id='loadImage_filter' src={endFilter} style={{display: 'none'}}/>
                    <img id='loadImage_reverse' src={endReverse} style={{display: 'none'}}/>
                    <img id='loadImage_turn' src={endTurn} style={{display: 'none'}}/>
                </div>
            </div>
            <div className="App" style={{display: 'none'}}>
                <header className="App-header">
                    Upload Image
                    {/* <EasyCrop image={imageUrl} endCrop={endCrop} getData_crop={getData_crop}/> */}
                </header>
            </div>
        </>
    );
};

export default MainBoard;