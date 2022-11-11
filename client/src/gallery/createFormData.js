// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/gallery';

// const createFormData = async(formData) => {
//     const config = {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         }
//     };
//     console.log(formData.pictureId);
//     // const location = await axios.post(API_URL,formData,config);
//     const location = await axios.post(API_URL, {
//         body: formData
//     },
//     {
//         headers: {
//         'Content-Type': 'multipart/form-data',
//         },
//     })
//     return location;
// };

// export default createFormData;