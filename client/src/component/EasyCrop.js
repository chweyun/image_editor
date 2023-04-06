import { useCallback, useState } from "react";
//import Slider from "@material-ui/core/Slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Crop";
import './EasyCrop.css';

const EasyCrop = ({ image, canvas, ctx, endCrop, getData_crop, aspect_X, aspect_Y, getData_cropSize, canvasId }) => {
  //console.log("EasyCrop안에서 image", image);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const [clickClose, setclickClose] = useState(true);

  var croppedImg = document.getElementById("loadCropImage");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClickClose = () => {
    setclickClose((prev) => !prev); // 클로즈 누르면 크롭 툴 영역 안보이게 됨
    drawCropImage(canvas, ctx, croppedImg);
    getData_crop(croppedImage); // 부모 MainBoard 컴포넌트로 크롭된 imgURL 전달해주는 getData 함수
  } 
  
  function drawCropImage (canvas, ctx, croppedImageURL) { // 크롭한 이미지 캔버스에 그리기
    //setEndCrop((prev) => !prev);
    ctx.reset();

    getData_cropSize(croppedImageURL.width, croppedImageURL.height);

    var hRatio = 1152  / croppedImageURL.width;
    var vRatio =  528 / croppedImageURL.height;
    var ratio  = Math.min ( hRatio, vRatio );
    var centerShift_x = ( 1152 - image.width*ratio ) / 2;
    var centerShift_y = ( 528 - image.height*ratio ) / 2;

    canvas.width = croppedImageURL.width*ratio;
    canvas.height = croppedImageURL.height*ratio;
    canvas.style.width = `${croppedImageURL.width*ratio}px`;
    canvas.style.height = `${croppedImageURL.height*ratio}px`;

    var canvasArea = ctx.canvas ;
    var hRatio = canvasArea.width  / croppedImageURL.width    ;
    var vRatio =  canvasArea.height / croppedImageURL.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    var centerShift_x = ( canvasArea.width - croppedImageURL.width*ratio ) / 2;
    var centerShift_y = ( canvasArea.height - croppedImageURL.height*ratio ) / 2;  
    ctx.clearRect(0,0,canvasArea.width, canvasArea.height);
    ctx.drawImage(croppedImageURL, 0,0, croppedImageURL.width, croppedImageURL.height, centerShift_x, centerShift_y, croppedImageURL.width*ratio, croppedImageURL.height*ratio);
  };

  return (
    <div>
    { clickClose ? 
    <div className="bigContainer"> {/* 크롭도구 영역 전체 */}
      <button
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
        onClick={showCroppedImage}
      > {/* 크롭 영역 사라지고 크롭한 부분만 띄우는 버튼 */}
        Crop
      </button>
      <div /* 자를영역*그외 어두운 부분 포함 */
        className="container"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block"
        }}
      >
        <div className="crop-container"> {/* 자를 영역 */}
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={aspect_X / aspect_Y}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>
      </div>
      <div className="cropped-image-container"> {/* 크롬한 이미지 보여주는 영역 */}
        {croppedImage && (
          <img className="cropped-image" src={croppedImage} alt="cropped"/>
        )}
        {croppedImage && <button onClick={onClickClose}>close</button>}
      </div>
    </div> : null }
    <img id='loadCropImage' src={croppedImage} style={{display: 'none'}}/> 
  </div>
  );
};

export default EasyCrop;