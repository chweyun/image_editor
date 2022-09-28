import React from 'react';
import './Modal.css';

const ModalImport = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
            <div className="inputBox">
              <input placeholder='ID를 입력하세요'></input>
            </div>
            <div className='btnBox'>
              <button className='importBtn' style={{border:'1.8px solid #004483'}}>가져오기</button>
              <button className="close" style={{border:'1.8px solid #004483'}} onClick={close}>창닫기</button>
            </div>
        </section>
      ) : null}
    </div>
  );
};

export default ModalImport;