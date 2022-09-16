import React from "react";
import { useState, useEffect, useRef } from "react";
import SideBar from './SideBar';
import TopBar from './TopBar';
import './App.css';

/*여기서부터 이미지 업로더 InputFile.js에 있던 코드 옮겨논거*/

/*여기까지 밑에 페이지뷰에서 Prac컴포넌트도 얘 안쓸거면 지우기*/

function App() {
  return (
    <div className='editor'>
      <SideBar />
      <TopBar />
    </div>
  );
}

export default App;
