import React, { useState } from "react";
import "./Domistics.scss";
// import Editor from "../Editor/Editor.js";
import ImageUploading from "react-images-uploading";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
  QuillToolbar,
} from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import axios from "axios";
function Domistics() {
  const [domestic, setDomestic] = useState({
    title: "",
    category: "",
    description: "",
    stars: "",
    images: [],
    startDate: "",
    endDate: "",
    location: "",
    termsAndConditions: "",
    cancillation: "",
    childrenPolicis: "",
  });
  // const [title, setTitle] = useState("");
  // const [category, setCategory] = useState("");
  // const [description, setDescription] = useState("");
  // const [stars, setStars] = useState("");
  // const [location, setLocation] = useState("");
  // const [images, setImages] = useState([]);
  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");
  // const [termsAndConditions, setTermsAndConditions] = useState({ value: null });
  // const [cancillation, setCancillation] = useState({ value: null });
  // const [childrenPolicis, setChildrenPolicis] = useState({ value: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(domestic);
    await axios
      .post("http://localhost:9000/domestics", domestic)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOneChange = (value) => {
    // setTermsAndConditions({ value: value });
    // // setOne({value})
    // console.log(termsAndConditions);
    domestic.termsAndConditions = value;
  };
  const handleTwoChange = (value) => {
    // setCancillation({ value: value });
    // // setOne({value})
    // console.log(cancillation);
    domestic.cancillation = value;
  };
  const handleThreeChange = (value) => {
    // setChildrenPolicis({ value: value });
    // // setOne({value})
    // console.log(childrenPolicis);
    domestic.childrenPolicis = value;
  };
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    // console.log(imageList, addUpdateIndex);
    domestic.images = imageList;
  };
  return (
    <div>
      <h1 className="main-heading">Domestics</h1>

      <div className="form-section">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <div className="full-form">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasic">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  onChange={(e) => {
                    // setTitle(e.target.value);
                    domestic.title = e.target.value;
                  }}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  onChange={(e) => {
                    domestic.category = e.target.value;
                  }}
                  type="text"
                  placeholder="Category"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                {/* <Form.Label>Example textarea</Form.Label> */}
                <Form.Control
                  onChange={(e) => {
                    domestic.description = e.target.value;
                  }}
                  as="textarea"
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  onChange={(e) => {
                    domestic.stars = e.target.value;
                  }}
                  type="text"
                  placeholder="Stars Count"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    domestic.startDate = e.target.value;
                  }}
                  type="date"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>End date</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    domestic.endDate = e.target.value;
                  }}
                  type="date"
                />
              </Form.Group>
            </div>
            <div className="right-form">
              <Form.Group className="mb-3" controlId="formBasic">
                {/* <Form.Label>Email address</Form.Label> */}
                <Form.Control
                  onChange={(e) => {
                    domestic.location = e.target.value;
                  }}
                  type="text"
                  placeholder="Location"
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="text" placeholder="" />
              </Form.Group> */}
              {/* <Editor /> */}
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload Images</Form.Label>
                {/* <Form.Control
                    multiple
                  onChange={(e) => {
                    setImages(e.target.files);
                  }}

                  type="file"
                /> */}
                <ImageUploading
                  multiple
                  value={domestic.images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    // write your building UI
                    <div className="upload__image-wrapper">
                      <button
                        style={isDragging ? { color: "red" } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        Click or Drop here
                      </button>
                      &nbsp;
                      <button onClick={onImageRemoveAll}>
                        Remove all images
                      </button>
                      {imageList.map((image, index) => (
                        <div key={index} className="image-item">
                          <img src={image["data_url"]} alt="" width="100" />
                          <div className="image-item__btn-wrapper">
                            <button onClick={() => onImageUpdate(index)}>
                              Update
                            </button>
                            <button onClick={() => onImageRemove(index)}>
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
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

          <div>
            <h4>Terms And Conditions</h4>
            <QuillToolbar />
            <ReactQuill
              value={domestic.termsAndConditions}
              onChange={handleOneChange}
              modules={modules}
              formats={formats}
            />
          </div>
          <br />
          <div>
            <h4>Cancellation Polices</h4>
            {/* <EditorToolbar /> */}
            <ReactQuill
              value={domestic.cancillation}
              onChange={handleTwoChange}
            />
          </div>
          <br />
          <div>
            <h4>Children Polices</h4>
            {/* <QuillToolbar /> */}
            <ReactQuill
              value={domestic.childrenPolicis}
              onChange={handleThreeChange}
            />
          </div>
          <br />

          {/* <div>
            <h4>Terms And Conditions</h4>
            <ReactQuill
              // value={termsAndConditions}
              onChange={(e) => {
                setTermsAndConditions(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <h4>Cancellation Polices</h4>
            <ReactQuill
              // value={cancillation}
              onChange={(e) => {
                setCancillation(e.target.value);
              }}
            />
          </div>
          <br />
          <div>
            <h4>Children Polices</h4>
            <ReactQuill
              // value={childrenPolicis}
              onChange={(e) => {
                setChildrenPolicis(e.target.value);
              }}
            />
          </div>
          <br /> */}

          {/* <div className="editor-area">
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
        </div> */}
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
            Add New
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Domistics;

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
