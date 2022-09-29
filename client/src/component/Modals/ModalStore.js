import React from 'react';
import './Modal.css';

const ModalStore = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const rand = props.rand;
  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>&times;</button>
          </header>
            <h1>고유 ID : {rand}</h1>
            <h2>작업 내역을 추후 서버로부터 가져오려면 <br />고유 ID를 반드시 저장해두세요 :)</h2>
            <div className='btnBox'>
              <button className="checkBtn" onClick={close}>확인</button>
            </div>
        </section>
      ) : null}
    </div>
  );
};

export default ModalStore;