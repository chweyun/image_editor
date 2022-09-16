import React from "react";
import { useState, useEffect, useRef } from "react";

const Prac = (props) => {
    const [imageUrl, setImageUrl] = useState(null);
    const imgRef = useRef();
  
    const onChangeImage = () => {
      const reader = new FileReader();
      const file = imgRef.current.files[0];
      console.log(file);
  
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageUrl(reader.result);
        console.log("이미지주소", reader.result);
      };
    };
    
    return (
      <React.Fragment>
        <img src={imageUrl ? imageUrl : "../Image/profile.png"} alt="profile"></img>
        <input type="file" ref={imgRef} onChange={onChangeImage}></input>
      </React.Fragment>
    );
};
  
export default Prac ;