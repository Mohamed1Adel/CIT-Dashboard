import React, { useState, useRef, useEffect } from "react";
import "./Domistics.scss";
import ReactQuill from "react-quill";
import { modules, formats, QuillToolbar } from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, MONGODB_URL } from "../../envData";
function Domistics() {
  const sendForm = useRef();
  const [postImage, setPostImage] = useState([]);
  const [packs, setPacks] = useState([]);
  const [pack, setPack] = useState({
    packTitle: "4 Days / 3 Nights",
    duration: "summer",
    startDate: "",
    endDate: "",
    single: "",
    double: "",
    triple: "",
  });
  const [domestic, setDomestic] = useState({
    title: "",
    category: "",
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
    termsAndConditions: "",
    cancellation: "",
    childrenPolices: "",
    requiredDocs: "",
    hotOffer: false,
    summer: false,
    winter: false,
    honeyMoon: false,
    nileCruise: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:9000/domestics", {
        id: Math.floor(Math.random() * 1000000000000000),
        ...domestic,
      })
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
  };
  const addNewPack = async (e) => {
    e.preventDefault();
    console.log(pack);
    packs.push({ id: Math.floor(Math.random() * 1000000000000000), ...pack });
    console.log(packs);
    setDomestic({ ...domestic, packages: packs });
    sendForm.current.value = "";
    packageNotify();
  };

  useEffect(() => {}, []);
  const handleTermsChange = (value) => {
    setDomestic({ ...domestic, termsAndConditions: value });
  };
  const handlecancellationChange = (value) => {
    setDomestic({ ...domestic, cancellation: value });
  };
  const handleChildrenChange = (value) => {
    setDomestic({ ...domestic, childrenPolices: value });
  };
  const handleRequiredDocsChange = (value) => {
    setDomestic({ ...domestic, requiredDocs: value });
  };
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setDomestic({ ...domestic, images: imageList });
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
      setDomestic({ ...domestic, images: allImages });
      console.log(domestic);
    }
  };

  const packageNotify = () => toast("Package Added Successfully");
  const domesticNotify = () => toast("Demestic Added Successfully");

  return (
    <div>
      <h1 className="main-heading">Domestics</h1>
      <div className="form-section main-domestic">
        <Form className="main-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="full-form">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.title}
                  onChange={(e) => {
                    setDomestic({ ...domestic, title: e.target.value });
                  }}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.category}
                  onChange={(e) => {
                    setDomestic({ ...domestic, category: e.target.value });
                  }}
                  type="text"
                  placeholder="Category"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.destination}
                  onChange={(e) => {
                    setDomestic({ ...domestic, destination: e.target.value });
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
                  value={domestic.description}
                  onChange={(e) => {
                    setDomestic({ ...domestic, description: e.target.value });
                  }}
                  as="textarea"
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.stars}
                  onChange={(e) => {
                    setDomestic({ ...domestic, stars: e.target.value });
                  }}
                  type="text"
                  placeholder="Stars Count"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.box6}
                  onChange={(e) => {
                    setDomestic({ ...domestic, box6: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 6"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.box7}
                  onChange={(e) => {
                    setDomestic({ ...domestic, box7: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 7"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.box8}
                  onChange={(e) => {
                    setDomestic({ ...domestic, box8: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 8"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.box9}
                  onChange={(e) => {
                    setDomestic({ ...domestic, box9: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 9"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={domestic.box10}
                  onChange={(e) => {
                    setDomestic({ ...domestic, box10: e.target.value });
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
                    value={domestic.hotOffer}
                    onChange={(e) => {
                      setDomestic({
                        ...domestic,
                        hotOffer: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Hot Deal"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={domestic.honeyMoon}
                    onChange={(e) => {
                      setDomestic({
                        ...domestic,
                        honeyMoon: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Hoeny Moon"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
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
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={domestic.nileCruise}
                    onChange={(e) => {
                      setDomestic({
                        ...domestic,
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
                  value={domestic.termsAndConditions}
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
                  value={domestic.cancellation}
                  onChange={handlecancellationChange}
                />
              </div>
              <br />
              <div>
                <h4>Children Polices</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  value={domestic.childrenPolices}
                  onChange={handleChildrenChange}
                />
              </div>
              <br />
              <div>
                <h4>Required Documents</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  value={domestic.requiredDocs}
                  onChange={handleRequiredDocsChange}
                />
              </div>
              <br />
            </div>
          </div>

          <Button variant="primary" type="submit">
            Add New
          </Button>
        </Form>
        <Form className="pack-form" onSubmit={(e) => addNewPack(e)}>
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
            </select>
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <h6>Select Season</h6>
            <select
              value={pack.duration}
              onChange={(e) => {
                setPack({ ...pack, duration: e.target.value });
              }}
              class="form-select"
              aria-label="Select Package"
            >
              <option selected value="summer">
                Summer
              </option>
              <option value="winter">Winter</option>
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
      </div>
    </div>
  );
}

export default Domistics;
