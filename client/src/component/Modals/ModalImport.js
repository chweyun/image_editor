import React,{ useState } from 'react';
import axios from 'axios';
import './Modal.css';

const ModalImport = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  // input에 입력받는 id 값을 value에 저장
  const [value, setValue] = useState(); 
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const getIdfetch = () => {
    axios.get('http://localhost:8000/find', {
      params: {
        id: value
      }
    })
      .then(function(request, response) { // TODO response를 화면에 띄울 것
        console.log(request); 
        if (request.data == 'nothing') { // 해당하는 id값이 db에 없을 경우
            alert('해당 id값과 일치하는 프로젝트가 존재하지 않습니다!');
        }
        else { // 해당하는 id값이 db에 있을 경우, TODO !!!

        }
      })
  }


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
              <input placeholder='ID를 입력하세요' id='input' onChange={onChangeValue}></input>
            </div>
            <div className='btnBox'>
              <button className='importBtn' style={{border:'1.8px solid #004483'}} onClick={() => getIdfetch()}>가져오기</button>
              <button className="close" style={{border:'1.8px solid #004483'}} onClick={close}>창닫기</button>
            </div>
        </section>
      ) : null}
    </div>
  );
};

export default ModalImport;