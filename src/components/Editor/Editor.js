import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
export const Editor = ({ getAllData }) => {
  const [state, setState] = React.useState({ value: null });
  const [dis, setDis] = React.useState(false);
  const handleChange = (value) => {
    setState({ value });
    setDis(value == "" ? true : false)
  };

  const addElemenet = (value) => {
    axios
      .post("http://localhost:8000/programs", { title: value })
      .then((res) => {
        console.log("res");
        getAllData();
      })
      .catch((err) => {
        console.log("err");
      });
  };
  return (
    <>
      <div className="text-editor">
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={state.value}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
          
        />
        {/* <div dangerouslySetInnerHTML={{ __html: state.value }} /> */}
        <button  disabled={dis} onClick={() => addElemenet(state.value)}> اعععع</button>
      </div>
    </>
  );
};

export default Editor;
