import React, { useState, useRef, useEffect } from "react";
import "./Historical.scss";
import ReactQuill from "react-quill";
import { modules, formats, QuillToolbar } from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, MONGODB_URL } from "../../envData";
function Historical() {
  const sendForm = useRef();
  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);
  const [postImage, setPostImage] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState({
    hotelTitle: "3 Stars Hotel",
    from: "",
    to: "",
    single: "",
    double: "",
    triple: "",
  });
  const [program, setProgram] = useState({
    title: "",
    nights: 0,
    description: "",
    highilghts: "",
    packInclude: "",
    termsAndConditions: "",
    cancelationPolices: "",
    images: [],
    itenary: [],
    hotels: [],
    box6: "",
    box7: "",
    box8: "",
    box9: "",
    box10: "",
    hotOffer: false,
  });
  const addNewDay = (e) => {
    e.preventDefault();
    days.push({ id: Math.floor(Math.random() * 10000000), ...day });

    console.log(days);
    setProgram({ ...program, itenary: days });
  };
  const showDays =
    days?.length >= 1
      ? days?.map((day) => {
          return (
            <li key={day.id}>
              <h3>{day.dayTitle}</h3>
              <p>{day.dayContent}</p>
            </li>
          );
        })
      : "no days founded";
  // console.log(showDays);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${MONGODB_URL}/addProgram`, program)
        .then((res) => {
          console.log(res);
          domesticNotify();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }

    console.log(program);
  };
  const addNewHotel = async (e) => {
    e.preventDefault();
    console.log(hotel);
    hotels.push({ id: Math.floor(Math.random() * 1000000000000000), ...hotel });
    console.log(hotels);
    setProgram({ ...program, hotels: hotels });
    console.log(program);
    sendForm.current.value = "";
    packageNotify();
  };

  useEffect(() => {}, []);
  const handleTermsChange = (value) => {
    setProgram({ ...program, termsAndConditions: value });
  };
  const handleCancelationChange = (value) => {
    setProgram({ ...program, cancelationPolices: value });
  };
  const handleHighlightsChange = (value) => {
    setProgram({ ...program, highilghts: value });
  };
  const handlePackIncludeChange = (value) => {
    setProgram({ ...program, packInclude: value });
  };
  const handleItenaryContentChange = (value) => {
    setDay({ ...day, dayContent: value });
  };
  const handleOtionalTourChange = (value) => {
    setDay({ ...day, optTour: value });
  };
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setProgram({ ...program, images: imageList });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      setProgram({ ...program, images: allImages });
      console.log(program);
    }
  };

  const packageNotify = () => toast("Package Added Successfully");
  const domesticNotify = () => toast("Demestic Added Successfully");

  return (
    <div>
      <h1 className="main-heading">Historical</h1>
      <div className="form-section main-domestic">
        <Form className="main-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="full-form">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={program.title}
                  onChange={(e) => {
                    setProgram({ ...program, title: e.target.value });
                  }}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  value={program.description}
                  onChange={(e) => {
                    setProgram({ ...program, description: e.target.value });
                  }}
                  as="textarea"
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={program.nights}
                  onChange={(e) => {
                    setProgram({ ...program, nights: e.target.value });
                  }}
                  type="text"
                  placeholder="Stars Count"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={program.box6}
                  onChange={(e) => {
                    setProgram({ ...program, box6: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 6"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={program.box7}
                  onChange={(e) => {
                    setProgram({ ...program, box7: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 7"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={program.box8}
                  onChange={(e) => {
                    setProgram({ ...program, box8: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 8"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={program.box9}
                  onChange={(e) => {
                    setProgram({ ...program, box9: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 9"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={program.box10}
                  onChange={(e) => {
                    setProgram({ ...program, box10: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 10"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  value={program?.hotOffer}
                  onChange={(e) => {
                    setProgram({
                      ...program,
                      hotOffer: e.currentTarget.checked,
                    });
                  }}
                  type="checkbox"
                  label="Hot Deal"
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload Images</Form.Label>
                <input
                  multiple
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                />
              </Form.Group>
              <div>
                <h4>Highlights</h4>
                {/* <EditorToolbar /> */}
                <ReactQuill
                  // value={program.highilghts}
                  onChange={handleHighlightsChange}
                />
              </div>
              <br />
              <div>
                <h4>Package Include</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.packInclude}
                  onChange={handlePackIncludeChange}
                />
              </div>
              <br />
              <div>
                <h4>Terms And Conditions</h4>
                <QuillToolbar />
                <ReactQuill
                  // value={program.termsAndConditions}
                  onChange={handleTermsChange}
                  modules={modules}
                  formats={formats}
                />
              </div>
              <br />
              <div>
                <h4>Cancelation Polices</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.cancelationPolices}
                  onChange={handleCancelationChange}
                />
              </div>
              <br />
            </div>
          </div>

          <Button variant="primary" type="submit">
            Add New
          </Button>
        </Form>
        <div className="pack-form">
          <Form className="" onSubmit={(e) => addNewHotel(e)}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <h6>Select Hotel</h6>
              <select
                // value={hotel.hotelTitle}
                onChange={(e) => {
                  setHotel({ ...hotel, hotelTitle: e.target.value });
                }}
                class="form-select"
                aria-label="Select Package"
              >
                <option selected value="3 Stars Hotel">
                  3 Stars Hotel
                </option>
                <option value="4 Stars Hotel">4 Stars Hotel</option>
                <option value="5 Stars Hotel">5 Stars Hotel</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                value={hotel.from}
                onChange={(e) => {
                  // setDomestic({ ...domestic, startDate: e.target.value });
                  setHotel({ ...hotel, from: e.target.value });
                }}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>End date</Form.Label>
              <Form.Control
                value={hotel.to}
                onChange={(e) => {
                  // setDomestic({ ...domestic, endDate: e.target.value });
                  setHotel({ ...hotel, to: e.target.value });
                }}
                type="date"
              />
            </Form.Group>
            <h6>Package Cost</h6>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                ref={sendForm}
                value={hotel.single}
                onChange={(e) => {
                  setHotel({ ...hotel, single: e.target.value });
                }}
                type="text"
                placeholder="Single"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                value={hotel.double}
                onChange={(e) => {
                  setHotel({ ...hotel, double: e.target.value });
                }}
                type="text"
                placeholder="double"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                value={hotel.triple}
                onChange={(e) => {
                  setHotel({ ...hotel, triple: e.target.value });
                }}
                type="text"
                placeholder="triple"
              />
            </Form.Group>
            <Button className="btn-warning" variant="primary" type="submit">
              Add New Pack
            </Button>
            <ToastContainer />
          </Form>
          <div
            className="itenarys"
            style={{
              border: "1px solid #000",
              borderRadius: "5px",
              marginTop: "50px",
              // width: "400px",
              padding: "20px",
            }}
          >
            <Form onSubmit={(e) => addNewDay(e)}>
              <Form.Group className="mb-3" controlId="formBasicDay">
                <Form.Label>Itenary Title</Form.Label>
                <Form.Control
                  as="textarea"
                  row={10}
                  placeholder=""
                  onChange={(e) => {
                    setDay({ ...day, dayTitle: e.target.value });
                  }}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasicDay">
                <Form.Label>Itenary Content</Form.Label>
                <Form.Control
                  as="textarea"
                  row={10}
                  placeholder=""
                  onChange={(e) => {
                    setDay({ ...day, dayContent: e.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDay">
                <Form.Label>Optional Tour</Form.Label>
                <Form.Control
                  as="textarea"
                  row={10}
                  placeholder=""
                  onChange={(e) => {
                    setDay({ ...day, optTour: e.target.value });
                  }}
                />
              </Form.Group> */}
              <div>
                <h4>Itenary Content</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.packInclude}
                  onChange={handleItenaryContentChange}
                />
              </div>
              <br />
              <div>
                <h4>Optional Tour</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.packInclude}
                  onChange={handleOtionalTourChange}
                />
              </div>
              <br />
              <Button variant="primary" type="submit">
                Add New Itenary
              </Button>
            </Form>
            <ul>{showDays}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Historical;
