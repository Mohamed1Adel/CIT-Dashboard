import React, { useState, useRef, useEffect } from "react";
import "./DayTours.scss";
import ReactQuill from "react-quill";
import { modules, formats, QuillToolbar } from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, MONGODB_URL } from "../../envData";
function DayTours() {
  const [packs, setPacks] = useState([]);
  const [pack, setPack] = useState({
    persons: "1 - 2",
    carType: "lemousine",
    cost: "",
  });
  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);
  const [dayTour, setDayTour] = useState({
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
    itenary: [],
    termsAndConditions: "",
    cancellation: "",
    dayTour: false,
    hotOffer: false,
    rates: [
      {
        id: "",
        persons: "",
        carType: "",
        cost: "",
      },
    ],
  });

  const handleItenaryContentChange = (value) => {
    setDay({ ...day, dayContent: value });
  };
  const addNewDay = (e) => {
    e.preventDefault();
    days.push({ id: Math.floor(Math.random() * 10000000), ...day });

    console.log(days);
    setDayTour({ ...dayTour, itenary: days });
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
    e.preventDefault();
    try {
      await axios
        .post(`${MONGODB_URL}/addDayTour`, dayTour)
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

    console.log("====================================");
    console.log(dayTour);
    console.log("====================================");
  };
  const addNewPack = async (e) => {
    e.preventDefault();
    console.log(pack);
    packs.push({ id: Math.floor(Math.random() * 1000000000000000), ...pack });
    console.log(packs);
    setDayTour({ ...dayTour, rates: packs });
    // sendForm.current.value = "";
    packageNotify();
  };
  useEffect(() => {}, []);
  const handleTermsChange = (value) => {
    setDayTour({ ...dayTour, termsAndConditions: value });
  };
  const handlecancellationChange = (value) => {
    setDayTour({ ...dayTour, cancellation: value });
  };
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setDayTour({ ...dayTour, images: imageList });
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
      setDayTour({ ...dayTour, images: allImages });
      console.log(dayTour);
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
                  value={dayTour.title}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, title: e.target.value });
                  }}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={dayTour.destination}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, destination: e.target.value });
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
                  value={dayTour.description}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, description: e.target.value });
                  }}
                  as="textarea"
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={dayTour.box6}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, box6: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 6"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={dayTour.box7}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, box7: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 7"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={dayTour.box8}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, box8: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 8"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={dayTour.box9}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, box9: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 9"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={dayTour.box10}
                  onChange={(e) => {
                    setDayTour({ ...dayTour, box10: e.target.value });
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
                    value={dayTour?.dayTour}
                    onChange={(e) => {
                      setDayTour({
                        ...dayTour,
                        dayTour: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Day Tour"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    value={dayTour?.hotOffer}
                    onChange={(e) => {
                      setDayTour({
                        ...dayTour,
                        hotOffer: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Hot Deal"
                  />
                </Form.Group>
              </div>
              <div>
                <h4>Terms And Conditions</h4>
                <QuillToolbar />
                <ReactQuill
                  value={dayTour.termsAndConditions}
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
                  value={dayTour.cancellation}
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
        <Form className="pack-form" onSubmit={(e) => addNewPack(e)}>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <h6>Select persons count</h6>
            <select
              // value={domestic.packages.packTitle}
              // onChange={(e) =>
              //   setDomestic({
              //     ...domestic,
              //     packages: [{
              //       packTitle: e.target.value,
              //     }],
              //   })
              // }
              value={pack.persons}
              onChange={(e) => {
                setPack({ ...pack, persons: e.target.value });
              }}
              class="form-select"
              aria-label="Select persons"
            >
              <option selected value="1 - 2">
                1 - 2
              </option>
              <option value="3 - 6">3 - 6</option>
              <option value="7 - 10">7 - 10</option>
              <option value="11 - 15">11 - 15</option>
            </select>
          </Form.Group>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <h6>Select car Type</h6>
            <select
              value={pack.carType}
              onChange={(e) => {
                setPack({ ...pack, carType: e.target.value });
              }}
              class="form-select"
              aria-label="Select car"
            >
              <option selected value="limousine">
                limousine
              </option>
              <option value="HS">HS</option>
              <option value="Coster">Coster</option>
              <option value="Bus">Bus</option>
            </select>
          </Form.Group>
          <h6>Cost</h6>
          <Form.Group className="mb-3" controlId="formBasic">
            <Form.Control
              value={pack.costPerPerson}
              onChange={(e) => {
                setPack({ ...pack, costPerPerson: e.target.value });
              }}
              type="text"
              placeholder="cost"
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
        <Button variant="primary" type="submit">
          Add New Itenary
        </Button>
      </Form>
      <ul>{showDays}</ul>
    </div>
  );
}

export default DayTours;
