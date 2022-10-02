import React,{ useState } from 'react';
import axios from 'axios';
import './Modal.css';
import MainBoard from '../../MainBoard'
import App from '../../App';

const ModalImport = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  // input에 입력받는 id 값을 value에 저장
  const [value, setValue] = useState(); 
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const [imgsrc, setImgsrc] = useState([]);

  const getIdfetch = () => {
    axios.get('http://localhost:8000/find', {
      params: {
        id: value
      }
    })
      .then(function(request, response) {
        if (value == undefined) {
          alert('ID를 입력하세요!');
        }
        else if (request.data == '0') { // 해당하는 id값이 db에 없을 경우
          alert('해당 id값과 일치하는 프로젝트가 존재하지 않습니다!');
        }
        else { // 해당하는 id값이 db에 있을 경우
          imgImport(request.data);
          props.imgArray(imgsrc); // 해당 값의 이미지 픽셀 데이터를 MainBoard로 보냄
          close();
        }
      })
  }

  function imgImport([imgSrc]) {
    setImgsrc([imgSrc.image][0].data.data);
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