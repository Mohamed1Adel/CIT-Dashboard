import React ,{useState} from 'react'
import "./Domistics.scss";
import Editor from "../Editor/Editor.js";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import {Form , Button,Dropdown,DropdownButton,ButtonGroup} from "react-bootstrap";
function Domistics() {
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("");
  const [location,setLocation] = useState("");
  const [images,setImages] = useState("");
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [one,setOne] = useState({value:null});
  const [two,setTwo] = useState({value:null});
  const [three,setThree] = useState({value:null});
  // const [state, setState] = React.useState({ value: null });
  const handleOneChange = (value) => {
    setOne({ value });
    // setOne({value})
  };
  const handleTwoChange = (value) => {
    setTwo({ value });
    // setOne({value})
  };
  const handleThreeChange = (value) => {
    setThree({ value });
    // setOne({value})
  };
  return (
    <div>
     <h1 className="main-heading">
       Domestics
      </h1>
      <div className="form-section">
      <Form>
        <div className="full-form">
        <div className="left-form">
        <Form.Group className="mb-3" controlId="formBasic">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="text" placeholder="Title" />
      </Form.Group>
        <Form.Group className="mb-3" controlId="formBasic">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="text" placeholder="Category" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        {/* <Form.Label>Example textarea</Form.Label> */}
        <Form.Control as="textarea" placeholder='Description' rows={3} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="text" placeholder="Stars Count" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date"  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label>End date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>
        </div>
        <div className="right-form">
        <Form.Group className="mb-3" controlId="formBasic">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="text" placeholder="Location" />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasic">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="text" placeholder="" />
      </Form.Group>
      {/* <Editor /> */}
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Upload Images</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
      <div className="checks">

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Hot Deal" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Hoeny Moon" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Summer" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Winter" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Nile Cruise" />
      </Form.Group>
      </div>

        </div>
        </div>
        <div className="editor-area">
        <h4>Terms And Conditions</h4>
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={one.value}
          onChange={handleOneChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
          
        />
        </div>
        {/* <div className="editor-area">
        <h4>Terms And Conditions</h4>
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={two.value}
          onChange={handleTwoChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
          
        />
        </div>
        <div className="editor-area">
        <h4>Terms And Conditions</h4>
        <EditorToolbar />
        <ReactQuill
          theme="snow"
          value={three.value}
          onChange={handleThreeChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
          
        />
        </div> */}
        {/* <div className="editor-area">
        <h4>Terms And Conditions</h4>
        <Editor setTwo={setTwo}/>
        </div>
        <div className="editor-area">
        <h4>Terms And Conditions</h4>
        <Editor setThree={setThree}/>
        </div> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

      </div>
      </div>
  )
}

export default Domistics







// import React from "react";
// import "./styles.css";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";

// class App extends React.Component {
//   state = {
//     editor: ""
//   };

//   handleChange = value => {
//     this.setState({
//       ...this.state.editor,
//       editor: value
//     });
//   };

//   handleSubmit = () => {
//     console.log(this.state);
//   };
//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div>
//           <ReactQuill value={this.state.editor} onChange={this.handleChange} />
//         </div>
//         <br />
//         <div>
//           <ReactQuill value={this.state.editor} onChange={this.handleChange} />
//         </div>
//         <br />
//         <div>
//           <ReactQuill value={this.state.editor} onChange={this.handleChange} />
//         </div>
//         <br />
//         <div>
//           <ReactQuill value={this.state.editor} onChange={this.handleChange} />
//         </div>
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     );
//   }
// }

// export default App;