import React, { useState, useRef, useEffect } from "react";
import "./HajjAndOmrah.scss";
import ReactQuill from "react-quill";
import { modules, formats, QuillToolbar } from "../Editor/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL, MONGODB_URL } from "../../envData";
function HajjOmrah() {
  const sendForm = useRef();
  const [day, setDay] = useState([]);
  const [days, setDays] = useState([]);
  const [flyImage, setFlyImage] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [hotelOne, setHotelOne] = useState({});
  const [hotelTwo, setHotelTwo] = useState({});
  const [hotel, setHotel] = useState({
    hotel: [],
    double: "",
    triple: "",
    Quadruple: "",
    rate: "",
  });
  const [hajjOmrah, setHajjOmrah] = useState({
    title: "",
    description: "",
    rate: "",
    box6: "",
    box7: "",
    box8: "",
    box9: "",
    box10: "",
    termsAndConditions: "",
    packInclude: "",
    duration: "",
    visa: "",
    flyDetails: "",
    cancelationPolices: "",
    itenary: [],
    PackhotelsAndPrices: [],
  });
  const addNewDay = (e) => {
    e.preventDefault();
    days.push({ id: Math.floor(Math.random() * 10000000), ...day });

    console.log(days);
    setHajjOmrah({ ...hajjOmrah, itenary: days });
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
    // e.preventDefault();
    try {
      await axios
        .post(`${MONGODB_URL}/addHajjOmrah`, hajjOmrah)
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

    console.log(hajjOmrah);
  };
  const addNewHotel = async (e) => {
    e.preventDefault();
    console.log(hotelOne);
    console.log(hotelTwo);
    // setHotel({
    //   ...hotel,
    //   hotel: [
    //     { id: Math.floor(Math.random() * 1000000000000000), ...hotelOne },
    //     { id: Math.floor(Math.random() * 1000000000000000), ...hotelTwo },
    //   ],
    // });
    hotels.push({
      id: Math.floor(Math.random() * 1000000000000000),
      ...hotel,
      hotel: [
        { id: Math.floor(Math.random() * 1000000000000000), ...hotelOne },
        { id: Math.floor(Math.random() * 1000000000000000), ...hotelTwo },
      ],
    });
    console.log(hotels);
    setHajjOmrah({
      id: Math.floor(Math.random() * 1000000000000000),
      ...hajjOmrah,
      PackhotelsAndPrices: hotels,
    });
    sendForm.current.value = "";
    packageNotify();
  };
  console.log(hajjOmrah);
  console.log(hotel);

  useEffect(() => {}, []);
  const handleTermsChange = (value) => {
    setHajjOmrah({ ...hajjOmrah, termsAndConditions: value });
  };
  const handleVisaChange = (value) => {
    setHajjOmrah({ ...hajjOmrah, visa: value });
  };
  // const handleHighlightsChange = (value) => {
  //   setProgram({ ...program, highilghts: value });
  // };
  const handlePackIncludeChange = (value) => {
    setHajjOmrah({ ...hajjOmrah, packInclude: value });
  };
  const handleItenaryContentChange = (value) => {
    setDay({ ...day, dayContent: value });
  };
  const handleOtionalTourChange = (value) => {
    setDay({ ...day, optTour: value });
  };
  const handleCancelationChange = (value) => {
    setHajjOmrah({ ...hajjOmrah, cancelation: value });
  };
  // const handleVisaChange = (value) => {
  //   setDay({ ...day, visa: value });
  // };
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setHajjOmrah({ ...hajjOmrah, flyDetails: imageList });
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
      setHajjOmrah({ ...hajjOmrah, images: allImages });
      console.log(hajjOmrah);
    }
  };
  const handleFlyFileUpload = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      setHajjOmrah({ ...hajjOmrah, flyDetails: allImages });
      console.log(hajjOmrah);
    }
  };

  const packageNotify = () => toast("Package Added Successfully");
  const domesticNotify = () => toast("Demestic Added Successfully");

  return (
    <div dir="rtl">
      <h1 className="main-heading">الحج والعمرة</h1>
      <div className="form-section main-domestic">
        <Form className="main-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="full-form">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={hajjOmrah.title}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, title: e.target.value });
                  }}
                  type="text"
                  placeholder="العنوان"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  value={hajjOmrah.description}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, description: e.target.value });
                  }}
                  as="textarea"
                  placeholder="الوصف"
                  rows={3}
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <h6>اختار المدة</h6>
                <select
                  value={hajjOmrah.duration}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, duration: e.target.value });
                  }}
                  class="form-select"
                  aria-label="Select Package"
                >
                  <option selected value="10 ليالي">
                    10 ليالي
                  </option>
                  <option value="15 ليلة">15 ليلة</option>
                </select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={hajjOmrah.box6}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, box6: e.target.value });
                  }}
                  type="text"
                  placeholder="اختياري "
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={hajjOmrah.box7}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, box7: e.target.value });
                  }}
                  type="text"
                  placeholder="اختياري"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={hajjOmrah.box8}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, box8: e.target.value });
                  }}
                  type="text"
                  placeholder="اختياري"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={hajjOmrah.box9}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, box9: e.target.value });
                  }}
                  type="text"
                  placeholder="اختياري"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={hajjOmrah.box10}
                  onChange={(e) => {
                    setHajjOmrah({ ...hajjOmrah, box10: e.target.value });
                  }}
                  type="text"
                  placeholder="اختياري"
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>رفع صور البرنامج</Form.Label>
                <input
                  className="btn btn-success mx-2"
                  multiple
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>رفع تفاصيل الطيران</Form.Label>
                <input
                  className="btn btn-primary mx-2"
                  multiple
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFlyFileUpload(e)}
                />
              </Form.Group>
              {/* <div>
                <h4>Highlights</h4>
                <ReactQuill
                  onChange={handleHighlightsChange}
                />
              </div>
              <br /> */}
              <div>
                <h4>البرنامج يشمل ولا يشمل</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.packInclude}
                  onChange={handlePackIncludeChange}
                />
              </div>
              <br />
              <div>
                <h4>الفيزا</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.packInclude}
                  onChange={handleVisaChange}
                />
              </div>
              <br />
              <div>
                <h4>الشروطوالاحكام</h4>
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
                <h4>التاشيرة</h4>

                <ReactQuill onChange={handleVisaChange} />
              </div>
              <br />
              <div>
                <h4>سياسة الالغاء</h4>

                <ReactQuill onChange={handleCancelationChange} />
              </div>
              <br />
            </div>
          </div>

          <Button variant="primary" type="submit">
            اضافة برنامج
          </Button>
        </Form>
        <div className="pack-form">
          <Form className="" onSubmit={(e) => addNewHotel(e)}>
            {/* <Form.Group controlId="formFileMultiple" className="mb-3">
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
            </Form.Group> */}
            <h3>الفندق الاول</h3>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                ref={sendForm}
                value={hotelOne?.hotelName}
                onChange={(e) => {
                  setHotelOne({ ...hotelOne, hotelName: e.target.value });
                }}
                type="text"
                placeholder="اسم الفندق الاول"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                ref={sendForm}
                value={hotelOne?.hotelLocation}
                onChange={(e) => {
                  setHotelOne({ ...hotelOne, hotelLocation: e.target.value });
                }}
                type="text"
                placeholder="موقع الفندق الاول"
              />
            </Form.Group>
            <h3>الفندق الثاني</h3>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                ref={sendForm}
                value={hotelTwo?.hotelName}
                onChange={(e) => {
                  setHotelTwo({ ...hotelTwo, hotelName: e.target.value });
                }}
                type="text"
                placeholder="اسم الفندق الثاني"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                ref={sendForm}
                value={hotelTwo?.hotelLocation}
                onChange={(e) => {
                  setHotelTwo({ ...hotelTwo, hotelLocation: e.target.value });
                }}
                type="text"
                placeholder="موقع الفندق الثاني"
              />
            </Form.Group>
            <h3>التكلفه</h3>

            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                value={hotel.double}
                onChange={(e) => {
                  setHotel({ ...hotel, double: e.target.value });
                }}
                type="text"
                placeholder="ثنائي"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                value={hotel.triple}
                onChange={(e) => {
                  setHotel({ ...hotel, triple: e.target.value });
                }}
                type="text"
                placeholder="ثلاثي"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Control
                ref={sendForm}
                value={hotel.Quadruple}
                onChange={(e) => {
                  setHotel({ ...hotel, Quadruple: e.target.value });
                }}
                type="text"
                placeholder="رباعي"
              />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <h6>المستوي </h6>
              <select
                value={hajjOmrah.rate}
                onChange={(e) => {
                  setHotel({ ...hotel, rate: e.target.value });
                }}
                class="form-select"
                aria-label="اختار المستوي"
              >
                <option selected value="5 نجوم">
                  5 نجوم
                </option>
                <option value="4 نجوم">4 نجوم</option>
                <option value="اقتصادي">اقتصادي</option>
              </select>
            </Form.Group>
            <Button className="btn-warning" variant="primary" type="submit">
              اضافة فندق
            </Button>
            <ToastContainer />
          </Form>
          <div
            className="برنامج الرحلة"
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
                <Form.Label>عنوان اليوم</Form.Label>
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
                <h4>تفاصيل اليوم</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.packInclude}
                  onChange={handleItenaryContentChange}
                />
              </div>
              <br />
              <div>
                <h4>الرحلات الاختيارية</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  // value={program.packInclude}
                  onChange={handleOtionalTourChange}
                />
              </div>
              <br />
              <Button variant="primary" type="submit">
                اضافة اليوم
              </Button>
            </Form>
            <ul>{showDays}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HajjOmrah;
