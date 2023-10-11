import React from "react";
import SideMenu from "./components/sideMenu/sideMenu";
import Home from "./components/Home/Home";
import "./App.scss"
import { Row, Col } from "react-bootstrap";
import UploadMultiImages from "./components/uploadMultiImages";
function App() {
  return (
    <div className="App">
      {/* <UploadMultiImages /> */}
        <Row className="p-0 m-0">
        <Col lg="2" className="p-0 m-0">
          <SideMenu />
        </Col>
        <Col lg="10" className="p-0 m-0">
          <Home />
        </Col>
        </Row>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Editor from "./components/Editor/Editor";
// import axios, { Axios } from "axios";

// // const modules = {
// //   toolbar: [
// //     [{ header: [1, 2, 3, 4, 5, 6, false] }],
// //     [{ font: [] }],
// //     [{ size: [12] }],
// //     ["bold", "italic", "underline", "strike", "blockquote"],
// //     [
// //       { list: "ordered" },
// //       { list: "bullet" },
// //       { indent: "-1" },
// //       { indent: "+1" },
// //     ],
// //     ["link","image","video" ],

// //   ],
// // };
// function App() {
//   const [data, setData] = useState([]);

//   const getAllData = async () => {
//     return await axios
//       .get("http://localhost:8000/programs")
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const addElemenet = () => {
//     axios
//       .post("http://localhost:8000/programs", { title: "third" })
//       .then((res) => {
//         console.log("res");
//         getAllData();
//       })
//       .catch((err) => {
//         console.log("err");
//       });
//   };
//   const deleteItem = (id) => {
//     axios
//       .delete(`http://localhost:8000/programs/${id}`)
//       .then((res) => {
//         console.log(res);
//         getAllData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   const updateItem = (id,val) => {
//     axios
//       .put(`http://localhost:8000/programs/${id}`, { title: val })
//       .then((res) => {
//         console.log(res);
//         getAllData();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getAllData();
//   }, []);
//   return (
//     <>
//       <Editor getAllData={getAllData} />
//     <div className="w-50 d-flex align-items-center justify-content-center">

//       <ul>
//         {data.map((item) => {
//           return (
//             <li key={item.id}>
//               <div dangerouslySetInnerHTML={{ __html: item.title }} />
//               <button onClick={() => deleteItem(item.id)}>delete</button>
//               <button onClick={() => updateItem(item.id, "new value")}>
//                 update
//               </button>
//             </li>
//           );
//         })}
//       </ul>

//       <button
//         onClick={() => {
//           addElemenet();
//         }}
//       >
//         Send Element
//       </button>
//     </div>
//     </>
//   );
// }

// export default App;
