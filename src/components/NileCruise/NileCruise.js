import React, { useState, useRef, useEffect } from "react";
import "./NileCruise.scss";
import ReactQuill from "react-quill";
import { modules, formats, QuillToolbar } from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, MONGODB_URL } from "../../envData";
function NileCruise() {
  const sendForm = useRef();
  const [postImage, setPostImage] = useState([]);
  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);
  const [packs, setPacks] = useState([]);
  const [pack, setPack] = useState({
    packTitle: "4 Days / 3 Nights",
    startDate: "",
    endDate: "",
    single: "",
    double: "",
    triple: "",
  });
  const [nileCruise, setNileCruise] = useState({
    title: "",
    destination: "",
    description: "",
    stars: "",
    box6: "",
    box7: "",
    box8: "",
    box9: "",
    box10: "",
    images: [],
    packages: [],
    itenary: [],
    termsAndConditions: "",
    cancellation: "",
    hotOffer: false,
    nileCruise: false,
  });
  const addNewDay = (e) => {
    e.preventDefault();
    days.push({ id: Math.floor(Math.random() * 10000000), ...day });

    console.log(days);
    setNileCruise({ ...nileCruise, itenary: days });
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
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      await axios
        .post(
          `${MONGODB_URL}/addNileCruise`,

          nileCruise
        )
        .then((res) => {
          console.log(res);
          NileCruiseNotify();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }
    console.log(nileCruise);
  };
  const addNewPack = async (e) => {
    e.preventDefault();
    console.log(pack);
    packs.push({ id: Math.floor(Math.random() * 1000000000000000), ...pack });
    console.log(packs);
    setNileCruise({ ...nileCruise, packages: packs });
    sendForm.current.value = "";
    packageNotify();
  };

  useEffect(() => {}, []);
  const handleTermsChange = (value) => {
    setNileCruise({ ...nileCruise, termsAndConditions: value });
  };
  const handlecancellationChange = (value) => {
    setNileCruise({ ...nileCruise, cancellation: value });
  };
  // const handleChildrenChange = (value) => {
  //   setNileCruise({ ...nileCruise, childrenPolices: value });
  // };
  // const handleRequiredDocsChange = (value) => {
  //   setNileCruise({ ...nileCruise, requiredDocs: value });
  // };
  const handleItenaryContentChange = (value) => {
    setDay({ ...day, dayContent: value });
  };
  const handleOtionalTourChange = (value) => {
    setDay({ ...day, optTour: value });
  };
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setNileCruise({ ...nileCruise, images: imageList });
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
      console.log(allImages);
      setNileCruise({ ...nileCruise, images: allImages });
      console.log(nileCruise);
    }
  };

  const packageNotify = () => toast("Package Added Successfully");
  const NileCruiseNotify = () => toast("Nile Cruise Added Successfully");

  return (
    <div>
      <h1 className="main-heading">Nile Cruise</h1>
      <div className="form-section main-domestic">
        <Form className="main-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="full-form">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.title}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, title: e.target.value });
                  }}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.category}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, category: e.target.value });
                  }}
                  type="text"
                  placeholder="Category"
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.destination}
                  onChange={(e) => {
                    setNileCruise({
                      ...nileCruise,
                      destination: e.target.value,
                    });
                  }}
                  type="text"
                  placeholder="Destination"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  value={nileCruise.description}
                  onChange={(e) => {
                    setNileCruise({
                      ...nileCruise,
                      description: e.target.value,
                    });
                  }}
                  as="textarea"
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.stars}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, stars: e.target.value });
                  }}
                  type="text"
                  placeholder="Stars Count"
                />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.box6}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, box6: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 6"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.box7}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, box7: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 7"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.box8}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, box8: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 8"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.box9}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, box9: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 9"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={nileCruise.box10}
                  onChange={(e) => {
                    setNileCruise({ ...nileCruise, box10: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 10"
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
              <div className="checks">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={nileCruise.hotOffer}
                    onChange={(e) => {
                      setNileCruise({
                        ...nileCruise,
                        hotOffer: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Hot Deal"
                  />
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={domestic.honeyMoon}
                    onChange={(e) => {
                      setNileCruise({
                        ...domestic,
                        honeyMoon: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Hoeny Moon"
                  />
                </Form.Group> */}
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={domestic.summer}
                    onChange={(e) => {
                      setDomestic({
                        ...domestic,
                        summer: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Summer"
                  />
                </Form.Group> */}
                {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={domestic.winter}
                    onChange={(e) => {
                      setDomestic({
                        ...domestic,
                        winter: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Winter"
                  />
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={nileCruise.nileCruise}
                    onChange={(e) => {
                      setNileCruise({
                        ...nileCruise,
                        nileCruise: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Nile Cruise"
                  />
                </Form.Group>
              </div>
              <div>
                <h4>Terms And Conditions</h4>
                <QuillToolbar />
                <ReactQuill
                  value={nileCruise.termsAndConditions}
                  onChange={handleTermsChange}
                  modules={modules}
                  formats={formats}
                />
              </div>
              <br />
              <div>
                <h4>Cancellation Polices</h4>
                {/* <EditorToolbar /> */}
                <ReactQuill
                  value={nileCruise.cancellation}
                  onChange={handlecancellationChange}
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
          <Form onSubmit={(e) => addNewPack(e)}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <h6>Select package</h6>
              <select
                value={pack.packTitle}
                onChange={(e) => {
                  setPack({ ...pack, packTitle: e.target.value });
                }}
                class="form-select"
                aria-label="Select Package"
              >
                <option selected value="4 Days / 3 Nights">
                  4 Days / 3 Nights
                </option>
                <option value="5 Days / 4 Nights">5 Days / 4 Nights</option>
                <option value="6 Days / 5 Nights">6 Days / 5 Nights</option>
                <option value="7 Days / 6 Nights">7 Days / 6 Nights</option>
                <option value="8 Days / 7 Nights">8 Days / 7 Nights</option>
                <option value="9 Days / 8 Nights">9 Days / 8 Nights</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                value={pack.startDate}
                onChange={(e) => {
                  // setDomestic({ ...domestic, startDate: e.target.value });
                  setPack({ ...pack, startDate: e.target.value });
                }}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>End date</Form.Label>
              <Form.Control
                value={pack.endDate}
                onChange={(e) => {
                  // setDomestic({ ...domestic, endDate: e.target.value });
                  setPack({ ...pack, endDate: e.target.value });
                }}
                type="date"
              />
            </Form.Group>
            <h6>Package Cost</h6>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                ref={sendForm}
                value={pack.single}
                onChange={(e) => {
                  setPack({ ...pack, single: e.target.value });
                }}
                type="text"
                placeholder="Single"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                value={pack.double}
                onChange={(e) => {
                  setPack({ ...pack, double: e.target.value });
                }}
                type="text"
                placeholder="double"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                value={pack.triple}
                onChange={(e) => {
                  setPack({ ...pack, triple: e.target.value });
                }}
                type="text"
                placeholder="triple"
              />
            </Form.Group>
            <Button className="btn-warning" variant="primary" type="submit">
              Add New Pack
            </Button>
            <ToastContainer />
            <Button className="btn-warning" variant="primary" type="reset">
              Reset
            </Button>
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

export default NileCruise;
