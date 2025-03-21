import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, MONGODB_URL } from "../../../envData";
import { Form, Button } from "react-bootstrap";
import QuillToolbar, { formats, modules } from "../../Editor/EditorToolbar";
import ReactQuill from "react-quill";
import "./HistorecalTampUpdate.scss";
import { ToastContainer, toast } from "react-toastify";
function HistorecalTampUpdate() {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState();
  const [hotels, setHotels] = useState([]);
  const [newDay, setNewDay] = useState();
  const [newDays, setNewDays] = useState([]);
  const [i, setI] = useState(0);
  const [newHotel, setNewHotel] = useState({

  });
  const dayUpdatedNotify = () => toast("Day Updated Successfully");
  const programUpdatedNotify = () => toast("Program Added Successfully");
  const packUpdatedNotify = () => toast("Pack Updated Successfully");

  const getItemById = async () => {
    try {
      // const response = await axios.get(`${API_URL}/programs/${id}`);
      const response = await axios.get(
        `${MONGODB_URL}/getProgramDetails/${id}`
      );
      const domData = response.data;
      // console.log(domData);
      setData(domData);
      setHotels(domData?.hotels);
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }
    console.log(data);
  };
  const updateHotel = async (e, HotelItem) => {
    e.preventDefault();
    const newHotels = hotels.map((hotel) => {
      console.log(hotel);
      console.log(HotelItem);
      return hotel == HotelItem
        ? {
            id: hotel.id,
            _id: hotel._id,
            startingFrom:
              newHotel.startingFrom === undefined
                ? HotelItem.startingFrom
                : newHotel.startingFrom,
            from: newHotel.from === undefined ? HotelItem.from : newHotel.from,
            to: newHotel.to === undefined ? HotelItem.to : newHotel.to,
            hotelTitle:
              newHotel.hotelTitle === undefined
                ? HotelItem.hotelTitle
                : newHotel.hotelTitle,
          }
        : hotel;
    });
    console.log(newHotels);
    setData({ ...data, hotels: newHotels });
    packUpdatedNotify()
  };

  // console.log(data);
  const deleteHotel = (e, hotelId) => {
    e.preventDefault();
    const filterHotels = data?.hotels?.filter((hotel) => hotel.id !== hotelId);
    console.log(filterHotels);
    setData({ ...data, hotels: filterHotels });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        // .patch(`${API_URL}/programs/${id}`, data)
        .patch(`${MONGODB_URL}/updateProgramDetails/${id}`, data)
        .then((res) => {
          console.log(res);
          // domesticNotify();
          getItemById();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(data);
      programUpdatedNotify();
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }
  };

  const updatedDays = () => {
    // setData({ ...data, itenary: newDays });
  };
  // console.log(data);
  // console.log(newDays);

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
      setData({ ...data, images: allImages });
      console.log(data);
    }
  };

  const updatedDaysF = (id) => {
    let updatedDaysArr = data?.itenary?.map((day) =>
    day.id === id
    ? {
        id: day.id,
        dayTitle:
          newDay.dayTitle === undefined ? day.dayTitle : newDay.dayTitle,
        dayContent:
          newDay.dayContent === undefined ? day.dayContent : newDay.dayContent,
        optTour:
          newDay.optTour === undefined ? day.optTour : newDay.optTour,
      }
    : day
    );
    setData({ ...data, itenary: updatedDaysArr });
    // console.log(updatedDaysArr);
    console.log(data);
    dayUpdatedNotify();
  };
  const handleTermsChange = (value) => {
    setData({ ...data, termsAndConditions: value });
  };
  const handleCancelationChange = (value) => {
    setData({ ...data, cancelationPolices: value });
  };
  const handleHighlightsChange = (value) => {
    setData({ ...data, highilghts: value });
  };
  const handlePackIncludeChange = (value) => {
    setData({ ...data, packInclude: value });
  };
  // const handleItenaryContentChange = (value) => {
  //   setNewDay({ ...day, dayContent: value });
  // };
  // const handleOtionalTourChange = (value) => {
  //   setNewDay({ ...day, optTour: value });
  // };

  useEffect(() => {
    getItemById();
  }, []);

  return (
    <div>
      <h1 className="main-heading">Domestics</h1>
      <div className="form-section main-domestic">
        <Form className="main-update-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="full-form ">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, title: e.target.value });
                  }}
                  type="text"
                  placeholder={data?.title}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                  as="textarea"
                  placeholder={data?.description}
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, nights: e.target.value });
                  }}
                  type="text"
                  placeholder={data?.nights}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, box6: e.target.value });
                  }}
                  type="text"
                  placeholder={data?.box6}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, box7: e.target.value });
                  }}
                  type="text"
                  placeholder={data?.box7}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, box8: e.target.value });
                  }}
                  type="text"
                  placeholder={data?.box8}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, box9: e.target.value });
                  }}
                  type="text"
                  placeholder={data?.box9}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  onChange={(e) => {
                    setData({ ...data, box10: e.target.value });
                  }}
                  type="text"
                  placeholder={data?.box10}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  value={data?.hotOffer}
                  onChange={(e) => {
                    setData({
                      ...data,
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
            </div>
            <div className="right-form">
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
                <h4>Package Excludes</h4>
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
              <Button variant="primary" type="submit">
                Add New
              </Button>
            </div>
          </div>
        </Form>

        <Form className="update-pack">
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">Hotel</th>
                <th scope="col">Start data</th>
                <th scope="col">End data</th>
                <th scope="col">Starting From</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.hotels?.map((hotel) => {
                return (
                  <tr key={hotel.id}>
                    <th scope="row">
                      {" "}
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <select
                          value={hotel.hotelTitle}
                          onChange={(e) => {
                            setNewHotel({
                              ...newHotel,
                              hotelTitle: e.target.value,
                            });
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
                    </th>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.startDate}
                          onChange={(e) => {
                            setNewHotel({
                              ...newHotel,
                              from: e.target.value,
                            });
                          }}
                          type="date"
                          placeholder={hotel.from}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.endDate}
                          onChange={(e) => {
                            setNewHotel({
                              ...newHotel,
                              to: e.target.value,
                            });
                          }}
                          type="date"
                          placeholder={hotel.to}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.single}
                          onChange={(e) => {
                            setNewHotel({
                              ...newHotel,
                              startingFrom: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={hotel.startingFrom}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Button
                        className="btn btn-warning"
                        type="submit"
                        onClick={(e) => updateHotel(e, hotel)}
                      >
                        Update Hotel
                      </Button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => deleteHotel(e, hotel.id)}
                      >
                        Delete Hotel
                      </button>
                    </td>
                  </tr>
                );
              })}
              {/* <tr>
                <th scope="row">
                  {" "}
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <select
                      //   value={newPack.packTitle}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          packTitle: e.target.value,
                        });
                      }}
                      class="form-select"
                      aria-label="Select Package"
                    >
                      <option selected value="4 Days / 3 Nights">
                        4 Days / 3 Nights
                      </option>
                      <option value="5 Days / 4 Nights">
                        5 Days / 4 Nights
                      </option>
                      <option value="6 Days / 5 Nights">
                        6 Days / 5 Nights
                      </option>
                    </select>
                  </Form.Group>
                </th>
                <td>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <select
                      //   value={newPack.duration}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          duration: e.target.value,
                        });
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
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Control
                      //   value={newPack.startDate}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          startDate: e.target.value,
                        });
                      }}
                      type="date"
                      placeholder=""
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Control
                      //   value={newPack.endDate}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          endDate: e.target.value,
                        });
                      }}
                      type="date"
                      placeholder=""
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Control
                      //   value={newPack.single}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          single: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder=""
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Control
                      //   value={newPack.double}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          double: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder=""
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Control
                      //   value={newPack.triple}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          triple: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder=""
                    />
                  </Form.Group>
                </td>
                <td>
                  <Button
                    className="btn btn-success"
                    type="submit"
                    onClick={(e) => addNewPack(e)}
                  >
                    Add New
                  </Button>
                </td>
              </tr> */}
            </tbody>
          </table>
        </Form>
      </div>
      <div className="d-flex" style={{ width: "" }}>
        <ul
          className="d-flex"
          style={{ flexWrap: "wrap", justifyContent: "space-between" }}
        >
          {data?.itenary?.map((day, index) => {
            return (
              <div
                className=""
                style={{
                  width: "45%",
                  minWidth: "450px",
                  border: "1px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  flexDirection: "column",
                  marginBottom: "50px",
                  borderRadius: "20px",
                  padding: "20px",
                }}
              >
                <Form.Group className="mb-3" controlId="formBasic">
                  <h4>Update Day Title</h4>
                  <Form.Control
                    onChange={(e) => {
                      setNewDay({ ...newDay, dayTitle: e.target.value });
                    }}
                    as="textarea"
                    placeholder={day.dayTitle}
                    style={{ width: "400px" }}
                  />
                </Form.Group>
                <h4>Update day {index + 1}</h4>
                <ReactQuill
                  onChange={(e) => {
                    setNewDay({ ...newDay, dayContent: e });
                  }}
                  style={{ width: "400px" }}
                />
                <h4>update Tour</h4>
                <ReactQuill
                  onChange={(e) => setNewDay({ ...newDay, optTour: e })}
                  style={{ width: "400px" }}
                />
                <button
                  className="btn btn-primary m-5"
                  onClick={
                    () => updatedDaysF(day.id)
                    
                  }
                >
                  Update Day
                </button>
              </div>
            );
          })}

        </ul>
      </div>
      <ToastContainer />
    </div>
  );
}

export default HistorecalTampUpdate;
