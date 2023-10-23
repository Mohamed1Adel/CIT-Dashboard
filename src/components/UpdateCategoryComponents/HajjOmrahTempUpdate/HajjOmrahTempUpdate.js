import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, MONGODB_URL } from "../../../envData";
import { Form, Button } from "react-bootstrap";
import QuillToolbar, { formats, modules } from "../../Editor/EditorToolbar";
import ReactQuill from "react-quill";
// import "./HistorecalTampUpdate.scss";
import { toast } from "react-toastify";
function HajjOmrahTampUpdate() {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState();
  const [hotels, setHotels] = useState([]);
  const [newDay, setNewDay] = useState();
  const [newDays, setNewDays] = useState([]);
  const [i, setI] = useState(0);
  const [newHotel, setNewHotel] = useState({});
  const [hotelOne, setHotelOne] = useState({});
  const [hotelTwo, setHotelTwo] = useState({});
  const dayUpdatedNotify = () => toast("Day Updated Successfully");
  const programUpdatedNotify = () => toast("Demestic Added Successfully");
  const updateHotel = async (e, HotelItem) => {
    e.preventDefault();
    // console.log(newPack);
    // packs.push(newPack);
    // console.log(packs);
    // console.log(packs);
    // console.log(newPack);

    // const packIndex =  packs.findIndex((pack)=>{
    //     return pack.id === packId
    // })
    const newHotels = hotels.map((hotel) => {
      console.log(hotelOne);
      console.log(hotelTwo);
      return hotel == HotelItem
        ? {
            id: hotel.id,
            ...newHotel,
            hotel: [
              { id: Math.floor(Math.random() * 1000000000000000), ...hotelOne },
              { id: Math.floor(Math.random() * 1000000000000000), ...hotelTwo },
            ],
          }
        : hotel;
    });
    console.log(newHotels);
    setData({ ...data, PackhotelsAndPrices: newHotels });
  };
  const updatedDaysF = (id) => {
    let updatedDaysArr = data?.itenary?.map((day) =>
      day.id === id ? { id: day.id, ...newDay } : day
    );
    setData({ ...data, itenary: updatedDaysArr });
    // console.log(updatedDaysArr);
    console.log(data);
    dayUpdatedNotify();
  };
  // console.log(data);
  const deleteHotel = (e, hotelId) => {
    e.preventDefault();
    const filterHotels = data?.PackhotelsAndPrices?.filter(
      (hotel) => hotel.id !== hotelId
    );
    console.log(filterHotels);
    setData({ ...data, PackhotelsAndPrices: filterHotels });
  };
  //   const addNewPack = (e) => {
  //     e.preventDefault();
  //     // console.log({ ...data, packages: packs });
  //     let rand = Math.floor(Math.random() * 1000000000000000);
  //     console.log(rand);
  //     hotels.push({ id: rand, ...newHotel });
  //     console.log({ id: rand, ...newHotel });
  //     // console.log(packs);
  //     setData({ ...data, packages: hotels });
  //     // sendForm.current.value = "";
  //     // packageNotify();
  //     handleSubmit();
  //   };
  const getItemById = async () => {
    try {
      // const response = await axios.get(`${API_URL}/hajjOmrah/${id}`);
      const response = await axios.get(`${MONGODB_URL}/getHajjOmrahDetails/${id}`);
      const domData = response.data;
      console.log(domData);
      setData(domData);
      setHotels(domData.PackhotelsAndPrices);
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }

    // console.log(data);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      await axios
        // .patch(`${API_URL}/hajjOmrah/${id}`, data)
        .patch(`${MONGODB_URL}/updateHajjOmrahDetails/${id}`, data)
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
  const handleFlyFileUpload = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      setData({ ...data, flyDetails: allImages });
      console.log(data);
    }
  };

  const handleTermsChange = (value) => {
    setData({ ...data, termsAndConditions: value });
  };
  const handleCancelationChange = (value) => {
    setData({ ...data, cancelationPolices: value });
  };
  const handleVisaChange = (value) => {
    setData({ ...data, visa: value });
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
      <h1 className="main-heading">Hajj Omrah</h1>
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
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload Images</Form.Label>
                <input
                  className="btn btn-success"
                  multiple
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFileUpload(e)}
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload Images</Form.Label>
                <input
                  className="btn btn-primary"
                  multiple
                  type="file"
                  label="Image"
                  name="myFile"
                  accept=".jpeg, .png, .jpg"
                  onChange={(e) => handleFlyFileUpload(e)}
                />
              </Form.Group>
              <div>
                <h4>Visa</h4>
                {/* <EditorToolbar /> */}
                <ReactQuill
                  // value={program.highilghts}
                  onChange={handleVisaChange}
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
                <th scope="col">Rate</th>
                <th scope="col">Location</th>
                <th scope="col">Hotel</th>
                <th scope="col">Double</th>
                <th scope="col">Triple</th>
                <th scope="col">Quadruple</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {console.log(data)}
              {data?.PackhotelsAndPrices?.map((hotel) => {
                return (
                  <tr key={hotel.id}>
                    <th>
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <select
                          onChange={(e) => {
                            setNewHotel({ ...newHotel, rate: e.target.value });
                          }}
                          class="form-select"
                          aria-label=""
                        >
                          <option selected value="5 نجوم">
                            5 نجوم
                          </option>
                          <option value="4 نجوم">4 نجوم</option>
                          <option value="اقتصادي">اقتصادي</option>
                        </select>
                      </Form.Group>
                    </th>
                    <th scope="row">
                      <th className="d-block">
                        <Form.Group className="mb-3" controlId="formBasic">
                          <Form.Control
                            // value={hotel?.hotel[0]?.hotelLocation}
                            onChange={(e) => {
                              //   setNewHotel({
                              //     ...newHotel,

                              //     single: e.target.value,
                              //   });
                              setHotelOne({
                                ...hotelOne,
                                hotelLocation: e.target.value,
                              });
                            }}
                            type="text"
                            // placeholder={hotel?.hotel[0]?.hotelLocation}
                          />
                        </Form.Group>
                      </th>
                      <th>
                        <Form.Group className="mb-3" controlId="formBasic">
                          <Form.Control
                            // value={hotel?.hotel[1]?.hotelLocation}
                            onChange={(e) => {
                              //   setNewHotel({
                              //     ...newHotel,
                              //     single: e.target.value,
                              //   });
                              setHotelTwo({
                                ...hotelTwo,
                                hotelLocation: e.target.value,
                              });
                            }}
                            type="text"
                            // placeholder={hotel?.hotel[1]?.hotelLocation}
                          />
                        </Form.Group>
                      </th>
                    </th>
                    <td>
                      <th className="d-block">
                        <Form.Group className="mb-3" controlId="formBasic">
                          <Form.Control
                            // value={hotel?.hotel[0]?.hotelName}
                            onChange={(e) => {
                              //   setNewHotel({
                              //     ...newHotel,

                              //     single: e.target.value,
                              //   });
                              setHotelOne({
                                ...hotelOne,
                                hotelName: e.target.value,
                              });
                            }}
                            type="text"
                            // placeholder={hotel?.hotel[0]?.hotelName}
                          />
                        </Form.Group>
                      </th>
                      <th>
                        <Form.Group className="mb-3" controlId="formBasic">
                          <Form.Control
                            // value={hotel?.hotel[1]?.hotelName}
                            onChange={(e) => {
                              //   setNewHotel({
                              //     ...newHotel,
                              //     single: e.target.value,
                              //   });
                              setHotelTwo({
                                ...hotelTwo,
                                hotelName: e.target.value,
                              });
                            }}
                            type="text"
                            // placeholder={hotel?.hotel[1]?.hotelName}
                          />
                        </Form.Group>
                      </th>
                    </td>
                    {/* <td>
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
                    </td> */}
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.double}
                          onChange={(e) => {
                            setNewHotel({
                              ...newHotel,
                              double: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={hotel.double}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.triple}
                          onChange={(e) => {
                            setNewHotel({
                              ...newHotel,
                              triple: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={hotel.triple}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.triple}
                          onChange={(e) => {
                            setNewHotel({
                              ...newHotel,
                              Quadruple: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={hotel.Quadruple}
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
                    //   let oldDayId = day.id;
                    //   // newDays.push({
                    //   //   id: day.id,
                    //   //   ...newDay,
                    //   // });
                    //   // console.log(newDays);

                    //   let UpdatesDays = data?.itenary?.map((day) => {
                    //     console.log(day.id , oldDayId);
                    //     console.log({
                    //     id: day.id,
                    //     ...newDay,
                    //   });
                    //     if (day.id === oldDayId.id) {
                    //       return "hello";
                    //     } else {
                    //       return day;
                    //     }
                    //   });
                    //   console.log(UpdatesDays);
                    // }
                  }
                >
                  Add New Day
                </button>
              </div>
            );
          })}
          <button className="btn btn-success" onClick={updatedDays}>
            Save Update Days
          </button>
        </ul>
      </div>
    </div>
  );
}

export default HajjOmrahTampUpdate;
