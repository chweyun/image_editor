import React from "react";
import { useState, useEffect, useRef } from "react";
import ReactCrop from 'react-image-crop';
import MainBoard from "./MainBoard";
import './App.css';
import 'react-image-crop/dist/ReactCrop.css';
import ModalImport from "./component/Modals/ModalImport";

/*여기서부터 이미지 업로더 InputFile.js에 있던 코드 옮겨논거*/

/*여기까지 밑에 페이지뷰에서 Prac컴포넌트도 얘 안쓸거면 지우기*/

function App() {
  return (
    <div className='editor'>
      <MainBoard />
    </div>
  );
}

export default App;
