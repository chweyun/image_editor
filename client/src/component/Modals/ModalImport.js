import React,{ useState } from 'react';
import axios from 'axios';
import './Modal.css';
import MainBoard from '../../MainBoard'
import App from '../../App';

const ModalImport = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, imgId, getImgId } = props;
  // input에 입력받는 id 값을 value에 저장
  const [value, setValue] = useState(); 
  const onChangeValue = (e) => {
    setValue(e.target.value);
  };

  const [imgsrc, setImgsrc] = useState([]);
  const API_URL = 'https://image-editor-s3.s3-ap-northeast-2.amazonaws.com';

  const erase = () => {
    var el = document.getElementById('input');
    el.value = null;
  }

  const getIdfetch = async () => {

    const id = value;
    const url = `http://localhost:5000/api/gallery/${id}`;
    // const url = `https://image-editor-s3.s3.ap-northeast-2.amazonaws.com/${id}`;

    axios.get(url)
    .then(response => { 
      console.log(response);
      getImgId(id);
      close();
    })
    .catch(error => {
      if (id == '') {
        alert('ID를 입력하세요.');
      }
      else {
        alert('해당하는 id값과 일치하는 프로젝트가 존재하지 않습니다.');
        erase();
        console.error(error);
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
              <input className="inputModal" placeholder='ID를 입력하세요' id='input' onChange={onChangeValue}></input>
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