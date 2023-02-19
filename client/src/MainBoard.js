import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './MainBoard.css';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { fabric } from "fabric";
import 'fabric-history';

// 아이콘 파일
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

import filterIcon from './Image/filter.svg';

// 컴포넌트 파일
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
import onturn from "./component/Turnfunc.js";
import onreverse from "./component/Reversefunc.js";
import Textfunc from "./component/Textfunc.js";
import onpaint from "./component/Paintfunc.js";
import onshape from "./component/Shapefunc.js";
import oneraser from "./component/Eraserfunc.js";
import oneraserAll from "./component/EraserAllfunc.js";
import onselect from "./component/Selectfunc.js";
import { wait } from "@testing-library/user-event/dist/utils";
import Shapefunc from "./component/Shapefunc.js";


const MainBoard = () => {

    // 이미지 GET
    const [imgId, setImgId] = useState('');
    const getImgId = (imgId) => {
        setImgId(imgId);
    } 

    if (imgId != '') {
        const canvas = document.getElementById('canvasID');
        const ctx = canvas.getContext('2d');

        const addImage = function(file) {
            const image = new Image;
            image.onload = function() {
                var canvasArea = ctx.canvas ;
                var hRatio = canvasArea.width  / image.width    ;
                var vRatio =  canvasArea.height / image.height  ;
                var ratio  = Math.min ( hRatio, vRatio );
                var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
                var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
                ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
                ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
            }
            image.src = URL.createObjectURL(file);
        }

        const getOneImage = async () => {
            const container = document.getElementById('source');

            const response = await fetch (`http://localhost:5000/api/gallery/${imgId}`, {
                method : "GET"
            });
            const blobImg = await response.blob();
            const imgUrl = URL.createObjectURL(blobImg);
            addImage(blobImg);
        }
        getOneImage();
    }

    // 이미지 POST 
    const down = () => {
        var canvas = document.getElementById('canvasID');
        var image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");  

        const $link = document.createElement("a");
        $link.download = `${rand}.png`;
        $link.href = canvas.toDataURL("image/png");
        $link.click();
    }

    // const [rand, setRand] = useState(Math.floor((Math.random()*(100000000-10000000))+10000000));
    const rand = Math.floor((Math.random()*(100000000-10000000))+10000000);

    const handleSubmit = async (e) => {
        e.preventDefault();
        var canvas = document.getElementById('canvasID');
        const API_URL = 'http://localhost:5000/api/gallery';

        await axios.post(API_URL, {
            id: rand,
            imageFile: imageFile,
        }, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        }).catch (error => {
            setModalImportOpen(false);
            alert('빈 프로젝트입니다.');
        })
    }

    // Modal 기능
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

    // TopBar.js
    const [imageUrl, setImageUrl] = useState(null);
    const [props, setProps] = useState({});
    const [imageFile, setImageFile] = useState(null);
    const imgRef = useRef();

    let canvas, ctx, image = undefined;

    const onChangeImage = (e) => {
        console.log('here');
        const reader = new FileReader();
        const file = imgRef.current.files[0];
        const imgFile = (e.target.files[0]);
        setImageFile(imgFile);

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            
            setImageUrl(reader.result);
            canvas = document.getElementById('canvasID');
            ctx = canvas.getContext('2d');
            image = document.getElementById('source');
            setProps({canvas, ctx, image});

            function drawImageData(image, ctx) { 
                var canvasArea = ctx.canvas ;
                var hRatio = canvasArea.width  / image.width    ;
                var vRatio =  canvasArea.height / image.height  ;
                var ratio  = Math.min ( hRatio, vRatio );
                var centerShift_x = ( canvasArea.width - image.width*ratio ) / 2;
                var centerShift_y = ( canvasArea.height - image.height*ratio ) / 2;  
                ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
                ctx.drawImage(image, 0,0, image.width, image.height, centerShift_x,centerShift_y,image.width*ratio, image.height*ratio);
                console.log(cPushArray.length);
                console.log(image.src);
            };
            
            image.addEventListener('load', (e) => {
                drawImageData(image, ctx);
            });
        };
        cPush();
    };

    // SideBar.js
    const [selectFilter, setSelectFilter] = useState(false);
    const [selectCrop, setSelectCrop] = useState(false);
    const [selectTurn, setSelectTurn] = useState(false);
    const [selectText, setSelectText] = useState(false);
    const [selectShape, setSelectShape] = useState(false);

    const [clickFilter, setClickFilter] = useState(false);
    const [clickCrop, setClickCrop] = useState(false);
    const [clickTurn, setClickTurn] = useState(false);
    const [clickReverse, setClickReverse] = useState(false);
    const [clickText, setClickText] = useState(false);
    const [clickPaint, setClickPaint] = useState(false);
    const [clickShape, setClickShape] = useState(false);
    const [clickEraser, setClickEraser] = useState(false);
    const [clickEraserAll, setClickEraserAll] = useState(false);

    const clickControl = (btn, clickVar, setClickVar, setSelectVar) => {

        if (clickVar) {
            setClickVar(false);
            setSelectVar(false);
            return;
        }

        setClickFilter(false);
        setClickCrop(false);
        setClickTurn(false);
        setClickReverse(false);
        setClickText(false);
        setClickPaint(false);
        setClickShape(false);
        setClickEraser(false);
        setClickEraserAll(false);

        setSelectFilter(false);
        setSelectCrop(false);
        setSelectTurn(false);
        setSelectText(false);
        setSelectShape(false);

        setClickVar((prev) => !(prev));
        if (setSelectVar) {
            setSelectVar((prev) => !(prev));
        }
    }

    // text button 기능
    const [txtColor, setTxtColor] = useState("");
    const [isItalic, setIsItalic] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isSelected, setIsSelected] = useState('left');
    const [isClr, setIsClr] = useState("");
    const [isOkClicked, setIsOkClicked] = useState(false);

    const getTxtColor = (txtColor) => {
        setTxtColor(txtColor);
    }
    const getIsItalic = (isItalic) => {
        setIsItalic(isItalic);
    }
    const getIsBold = (isBold) => {
        setIsBold(isBold);
    }
    const getIsSelected = (isSelected) => {
        setIsSelected(isSelected);
    }
    const getIsClr = (isClr) => {
        setIsClr(isClr);
    };
    const getIsOkClicked = (isOkClicked) => {
        setIsOkClicked(isOkClicked);
      };

    // text 기능
    var hasInput = false;
    const canvasId = React.useRef(null);

    const createText = (e) => {
      if (hasInput) return;
      addInput(60, 40);
    };
  
    if (isOkClicked) {
        createText();
    }
  
    function addInput(x, y) {

      hasInput = true;

      var textbox = document.createElement("div");
      textbox.id = "textbox";
      var inputList = document.getElementById('inputList');
      inputList.appendChild(textbox);
  
      var input = document.createElement("textarea");
      input.id = "inputbox";
      textbox.appendChild(input);

      var listId = document.getElementById('inputList');
      if (listId.children[1] != null) { // DOM 중복 생성 에러 방지
        listId.removeChild(listId.children[0]);
      }

      input.style.textAlign = isSelected;
      input.style.position = "absolute";
      input.style.left = x - 4 + "%";
      input.style.top = y - 4 + "%";
      input.style.fontSize = '14px';
      input.style.color = isClr;
      input.style.width = "150px";
      input.style.height = "80px";
      input.style.resize = "none";
      if (isItalic) { input.style.fontStyle = "italic"; }
      if (isBold) { input.style.fontWeight = "bold"; }

      input.onkeydown = handleEnter;
    }
  
    function handleEnter(e) {
      var keyCode = e.keyCode;
      let posX = 0;
      let posY = 0;

      // 텍스트 입력 후 엔터 > 다른 위치 클릭 > inputbox 한번 더 클릭하면 draw 됨
      if (keyCode === 13) {
        var inputbox = document.getElementById("inputbox");
        var textbox = document.getElementById("textbox");
        var canvas = canvasId.current;

        inputbox.readOnly = true;
        textbox.readOnly = true;
  
        function move(e) {
          // 클릭한 위치로 textarea 이동
          posX = e.clientX;
          posY = e.clientY;
          console.log(posX, posY);
          inputbox.style.left = posX - 75 + "px";
          inputbox.style.top = posY - 40 + "px";
        }
  
        function fix(e) {
          // (http://www.soen.kr/html5/html3/4-2-4.htm)
  
          if (posX == 0 && posY == 0) {
            posX = inputbox.getBoundingClientRect().left + 75;
            posY = inputbox.getBoundingClientRect().top + 40;
          }
          const tmp = canvas.getBoundingClientRect();
          const tmpX = (posX - tmp.left) * (canvas.width / tmp.width);
          const tmpY = (posY - tmp.top) * (canvas.height / tmp.height);
  
          drawText(this.value, tmpX - 220, tmpY - 105);
  
          document.body.removeChild(textbox);
          hasInput = false;
        }
        canvas.onmousedown = move;
        inputbox.onclick = fix;
      }
    }
  
    function drawText(txt, x, y) {
      var canvas = canvasId.current;
      var ctx = canvas.getContext("2d");
      var fontStyle = [];
  
      ctx.textBaseline = "top";
      ctx.textAlign = isSelected;
  
      if (isItalic) {
        fontStyle.push("italic ");
      }
      if (isBold) {
        fontStyle.push("bold ");
      }
      fontStyle.push("26px Courier");
      fontStyle = fontStyle.join("");
      ctx.font = fontStyle;
      ctx.fillStyle = isClr;

      if (isSelected == 'left') {
        x += 106;
      }
      else if (isSelected == 'center') {
        x += 234;
      }
      else if (isSelected == 'right') {
        x += 340;
      }
  
      ctx.fillText(txt, x, y - 4 + 30);
      setIsOkClicked(false);

      var listId = document.getElementById('inputList');
      var textbox = document.getElementById('textbox');
      listId.removeChild(textbox);
      cPush();
    }

    // Shape 기능
    const context = useRef(null);
    const [shapeColor, setShapeColor] = useState("");
    const [isShape, setIsShape] = useState("rect");

    const getShapeColor = (shapeColor) => {
        setShapeColor(shapeColor);
    }
    const getIsShape = (isShape) => {
        setIsShape(isShape);
    }

    useEffect(() => { 
        /* ctx 가 null or undefined로 뜨는 오류 해결 (임시로 ctx 변수 대신 context.current 사용) */
        if (canvasId.current) { 
            context.current = canvasId.current.getContext("2d"); 
        } 
    }, []);

    const [pos, setPos] = useState([]); // 시작 좌표
    const [isDraw, setIsDraw] = useState(false);


    function drawStart(e) {
        setIsDraw(true);
        var bound = canvasId.current.getBoundingClientRect();
        setPos([(e.clientX - bound.left) * (canvasId.current.width / bound.width), (e.clientY - bound.top) * (canvasId.current.height / bound.height)]);
    }

    function drawSquare(e) {
        if (!isDraw) {
            return;
        }
        context.current.strokeStyle = shapeColor; 
        context.current.fillStyle = shapeColor; 
        var bound = canvasId.current.getBoundingClientRect();

        if (isShape == 'rect') {
            context.current.fillRect(pos[0], pos[1], (e.clientX - bound.left) * (canvasId.current.width / bound.width) - pos[0], (e.clientY - bound.top) * (canvasId.current.height / bound.height) - pos[1]);
        }
        else if (isShape == 'triangle') {
            var endX = (e.clientX - bound.left) * (canvasId.current.width / bound.width) - pos[0];
            var endY = (e.clientY - bound.top) * (canvasId.current.height / bound.height) - pos[1];
            context.current.beginPath();
            context.current.moveTo(pos[0], pos[1]);
            context.current.lineTo(pos[0]-150, pos[1]+150);
            context.current.lineTo(pos[0]+150, pos[1]+150);
            context.current.closePath();
            context.current.fill();
        }
        else if (isShape == 'circle') {
            var radiusX = (e.clientX - bound.left) * (canvasId.current.width / bound.width) - pos[0];
            var radiusY = (e.clientY - bound.top) * (canvasId.current.height / bound.height) - pos[1];

            context.current.beginPath();
            context.current.ellipse(pos[0], pos[1], radiusX, radiusY, 0, 0, Math.PI*2);
            context.current.fill();
        }
    }

    function drawEnd(e) {
        setIsDraw(false);
        cPush();
    }

    // undo, redo 기능
    const [cPushArray, setCPushArray] = useState([]);
    const [cStep, setCStep] = useState(-1);
    const [cPushStep, setCPushStep] = useState(-1);

    useEffect(() => {
        console.log('cStep',cStep);
        console.log('cPushArray.length',cPushArray.length);

        if (cStep < cPushArray.length && cStep !== -1) {
            // console.log('괄호 안으로 들어감');
            setCStep(cPushArray.length);
        }
        setImageUrl(canvasId.current.toDataURL());
        cPushArray.push(imageUrl); // 이미지 데이터
    }, [cPushStep]);
    
    const cPush = () => {
        console.log('push');
        setCStep(prev => prev+1);
        setCPushStep(prev => prev+1);
    }

    const cUndo = () => {
        console.log('undo');

        if (cStep<cPushArray.length) { 
            // 마지막이 push가 안 되는 에러를 위한 조건문
            setImageUrl(canvasId.current.toDataURL());
            cPushArray.push(imageUrl);
        }

        if (cStep >= 0) {
            setCStep(cStep-1);
            var canvasPic = new Image();
            canvasPic.src = cPushArray[cStep];
            canvasPic.onload = function() {
                context.current.clearRect(0,0,canvasId.current.width, canvasId.current.height);
                context.current.drawImage(canvasPic, 0,0, canvasId.current.width, canvasId.current.height);
            }
        }
    }

    const cRedo = () => {
        console.log('redo');

        if (cStep < cPushArray.length) {
            console.log('redo if');
            setCStep(cStep+1);

            var canvasPic = new Image();
            canvasPic.src = cPushArray[cStep+2];
            canvasPic.onload = function() {
                context.current.clearRect(0,0,canvasId.current.width, canvasId.current.height);
                context.current.drawImage(canvasPic, 0,0, canvasId.current.width, canvasId.current.height);
            }
        }
    }

    const cReset = () => {
        console.log('reset');

        var canvasPic = new Image();
        canvasPic.src = cPushArray[2];
        canvasPic.onload = function() {
            var canvasArea = context.current.canvas ;
            var hRatio = canvasArea.width  / canvasPic.width    ;
            var vRatio =  canvasArea.height / canvasPic.height  ;
            var ratio  = Math.min ( hRatio, vRatio );
            var centerShift_x = ( canvasArea.width - canvasPic.width*ratio ) / 2;
            var centerShift_y = ( canvasArea.height - canvasPic.height*ratio ) / 2;  

            context.current.clearRect(0,0,canvasId.current.width, canvasId.current.height);
            context.current.drawImage(canvasPic, 0,0, canvasPic.width, canvasPic.height, centerShift_x,centerShift_y,canvasPic.width*ratio, canvasPic.height*ratio);
        }

        setCStep(0);
        cPushArray.length = 1;
    }

    // 새 프로젝트 기능
    const newProject = () => {
        // canvas 초기화
        context.current.clearRect(0,0,canvasId.current.width, canvasId.current.height);

        // cPushArray 배열 초기화 (undo, redo, reset 용)
        setCPushArray([]);
        setCStep(-1);
        setCPushStep(-1);
    }
    
    return (
        <>
            <div className="TopBar">
                <div className="LeftTop">
                    <img src={hyuIcon} className="lefttop1" />
                    <img src={newProIcon} className="lefttop2" onClick={() => newProject()} />
                    <img src={callProIcon} className="lefttop3" onClick={() => openModalImport()} />
                    <ModalImport open={modalImportOpen} close={closeModalImport} imgId={imgId} getImgId={getImgId}></ModalImport> 
                    <label for="input-file">
                        <img src={callImgIcon} className="lefttop4" id="callImg"/>
                    </label>
                </div>
                <div className="CenterTop">
                    <img src={backIcon} className="centertop1" onClick={() => {cUndo()} } />
                    <img src={reIcon} className="centertop2" onClick={() => {cRedo()}}/>
                    <img src={resetIcon} className="centertop3" onClick={() => {cReset()}} />
                </div>
                <div className="RightTop">
                    <form onSubmit={handleSubmit}>
                            <input type='image' src={saveProIcon} className="righttop2" onClick={() => {onsavepro(); openModalStore(); }}  />
                            <img src={saveImgIcon} className="righttop1" onClick={() => {onsaveimg(); down();}} />
                    </form>
                    <ModalStore open={modalStoreOpen} close={closeModalStore} rand={rand}></ModalStore> 
                </div>
            </div>

            <div className="SideBar">
                <div className="side1">
                    <FilterIcon className={clickFilter ? ("iconStyle", "icon_select1") : ("iconStyle", "icon_noneselect1")} onClick={() => clickControl('Filter', clickFilter, setClickFilter, setSelectFilter)}/>
                </div>
                <div className="side2">
                    <CropIcon className={clickCrop ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={() => clickControl("Crop", clickCrop, setClickCrop, setSelectCrop)}/>
                    <TurnIcon className={clickTurn ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={() => clickControl('Turn', clickTurn, setClickTurn, setSelectTurn)}/>
                    <ReverseIcon className={clickReverse ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={() => clickControl('Reverse', clickReverse, setClickReverse)}/>
                </div>
                <div className="side3">
                    <TextIcon className={clickText ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={() => clickControl('Text', clickText, setClickText, setSelectText)}/>
                    <PaintIcon className={clickPaint ? ("iconStyle", "icon_select") : ("iconStyle", "icon_noneselect")} onClick={() => clickControl('Paint', clickPaint, setClickPaint)}/>
                    <ShapeIcon className={clickShape ? ("iconStyle", "shape_select") : ("iconStyle", "shape_noneselect")} onClick={() => clickControl('Shape', clickShape, setClickShape, setSelectShape)}/>
                </div>
                <div className="side4">
                    <EraserIcon className={clickEraser ? ("iconStyle", "eraser_select") : ("iconStyle", "eraser_noneselect")} onClick={() => clickControl('Eraser', clickEraser, setClickEraser)}/>
                    <EraserAllIcon className={clickEraserAll ? ("iconStyle", "eraser_select") : ("iconStyle", "eraser_noneselect")} onClick={() => clickControl('EraserAll', clickEraserAll, setClickEraserAll)}/>
                    <img src={selectIcon} className="side4-3" onClick={() => onselect()} />
                </div>
                <div>
                    {selectFilter ? <Filterfunc canvas={props.canvas} ctx={props.ctx} image={props.image}/> : null}
                    {selectCrop ? <Cropfunc canvas={props.canvas} ctx={props.ctx} image={props.image} imageURL={imageUrl}/> : null}
                    {selectTurn ? <Turnfunc canvas={props.canvas} ctx={props.ctx} image={props.image} /> : null}
                    {selectText ? <Textfunc 
                                        getTxtColor={getTxtColor}
                                        getIsItalic={getIsItalic}
                                        getIsBold={getIsBold}
                                        getIsSelected={getIsSelected}
                                        getIsClr={getIsClr}
                                        getIsOkClicked={getIsOkClicked}
                                    /> : null }
                    {selectShape ? <Shapefunc 
                                        getShapeColor={getShapeColor}
                                        getIsShape={getIsShape}
                                    /> : null}
                </div>
            </div>

            <React.Fragment>
            <div className="CanvasArea">
                <img src={imageUrl ? imageUrl : profile} alt="편집이미지" id="source" className="imgSizeControl" style={{display: 'none'}}/> 
                <canvas className="canvas" id="canvasID" ref={canvasId} width="1920" height="1080" style= {{width:'960px', height:'440px'}} type='file' name='imageFile' accept='image/jpeg, image/jp, image/png'
                    onMouseDown={selectShape ? drawStart : null}
                    onMouseMove={selectShape ? drawSquare : null}
                    onMouseUp={selectShape ? drawEnd : null} /> 
                    {/* 컴퓨터 해상도로 기존 사이즈 맞춰주고 스타일로 캔버스 크기 조정해줘야 화질 안깨짐   */}
                <input type="file" ref={imgRef} onChange={onChangeImage} id="input-file" style={{display: 'none'}}></input>
            </div>
            </React.Fragment>
            <div id="inputList"></div> 
        </>
    );
};

export default MainBoard;