import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, MONGODB_URL } from "../../../envData";
import { Form, Button } from "react-bootstrap";
import QuillToolbar, { formats, modules } from "../../Editor/EditorToolbar";
import ReactQuill from "react-quill";
import "./DayTourTampUpdate.scss";
import { ToastContainer, toast } from "react-toastify";
function DayTourTempUpdate() {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState();
  const [packs, setPacks] = useState([]);
  const [newPack, setNewPack] = useState({
    persons: "1 - 2",
    carType: "limousine",
    costPerPerson: "",
  });
  const getItemById = async () => {
    try {
      // const response = await axios.get(`${API_URL}/dayTour/${id}`);
      const response = await axios.get(
        `${MONGODB_URL}/getDayTourDetails/${id}`
      );
      const domData = response.data;
      // console.log(domData);
      setData(domData);
      setPacks(domData?.rates);
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }

    // console.log(data);
  };

  const addNewPack = (e) => {
    e.preventDefault();
    // console.log({ ...data, packages: packs });
    let rand = Math.floor(Math.random() * 1000000000000000);
    console.log(rand);
    console.log(newPack);
    console.log(packs);
    packs.push({ id: rand, ...newPack });
    console.log({ id: rand, ...newPack });
    // console.log(packs);
    setData({ ...data, rates: packs });
    packAddedNotify()
    // sendForm.current.value = "";
    // packageNotify();
  };

  const updatePack = async (e, packItem) => {
    e.preventDefault();
    const newPacks = packs.map((pack) =>
      pack == packItem
        ? {
            persons:
              newPack.persons === undefined
                ? packItem.persons
                : newPack.persons,
            carType:
              newPack.carType === undefined
                ? packItem.carType
                : newPack.carType,
            costPerPerson:
              newPack.costPerPerson === undefined
                ? packItem.costPerPerson
                : newPack.costPerPerson,
          }
        : pack
    );
    console.log(newPacks);
    setData({ ...data, rates: newPacks });
    packUpdatedNotify()
  };
  const deletePack = (e, packId) => {
    e.preventDefault();
    const filterPacks = data?.rates?.filter((pack) => pack.id !== packId);
    console.log(filterPacks);
    setData({ ...data, rates: filterPacks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        // .patch(`${API_URL}/dayTour/${id}`, data)
        .patch(`${MONGODB_URL}/updateDayTourDetails/${id}`, data)
        .then((res) => {
          console.log(res);
          dayTourNotify();
          getItemById();
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

  const handleTermsChange = (value) => {
    setData({ ...data, termsAndConditions: value });
  };
  const handlecancellationChange = (value) => {
    setData({ ...data, cancellation: value });
  };
  const handleChildrenChange = (value) => {
    setData({ ...data, childrenPolices: value });
  };
  const handleRequiredDocsChange = (value) => {
    setData({ ...data, requiredDocs: value });
  };
  const dayTourNotify = () => toast("Day Tour Added Successfully");
  const packAddedNotify = () => toast("Package Added Successfully");
  const packUpdatedNotify = () => toast("Package Updated Added Successfully");
  useEffect(() => {
    getItemById();
  }, []);

  return (
    <div>
      <div className="form-section update-pack">
        <Form className="main-form" onSubmit={(e) => handleSubmit(e)}>
          <div className="full-form">
            <div className="left-form">
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.title}
                  onChange={(e) => {
                    setData({ ...data, title: e.target.value });
                  }}
                  type="text"
                  placeholder="Title"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.category}
                  onChange={(e) => {
                    setData({ ...data, category: e.target.value });
                  }}
                  type="text"
                  placeholder="Category"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.destination}
                  onChange={(e) => {
                    setData({ ...data, destination: e.target.value });
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
                  value={data?.description}
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                  as="textarea"
                  placeholder="Description"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.stars}
                  onChange={(e) => {
                    setData({ ...data, stars: e.target.value });
                  }}
                  type="text"
                  placeholder="Stars Count"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.box6}
                  onChange={(e) => {
                    setData({ ...data, box6: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 6"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.box7}
                  onChange={(e) => {
                    setData({ ...data, box7: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 7"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.box8}
                  onChange={(e) => {
                    setData({ ...data, box8: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 8"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.box9}
                  onChange={(e) => {
                    setData({ ...data, box9: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 9"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasic">
                <Form.Control
                  value={data?.box10}
                  onChange={(e) => {
                    setData({ ...data, box10: e.target.value });
                  }}
                  type="text"
                  placeholder="Box 10"
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
              <div className="checks">
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    checked={data?.dayTour}
                    value={data?.dayTour}
                    onChange={(e) => {
                      setData({
                        ...data,
                        dayTour: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Day Tour"
                  />
                </Form.Group>
              </div>
              <Button variant="primary" type="submit">
                Add New
              </Button>
            </div>
            <div className="right-form">
              <div>
                <h4>Terms And Conditions</h4>
                <QuillToolbar />
                <ReactQuill
                  value={data?.termsAndConditions}
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
                  value={data?.cancellation}
                  onChange={handlecancellationChange}
                />
              </div>
              <br />
              <div>
                <h4>Children Polices</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  value={data?.childrenPolices}
                  onChange={handleChildrenChange}
                />
              </div>
              <br />
              <div>
                <h4>Required Documents</h4>
                {/* <QuillToolbar /> */}
                <ReactQuill
                  value={data?.requiredDocs}
                  onChange={handleRequiredDocsChange}
                />
              </div>
              <br />
            </div>
          </div>
        </Form>

        <Form className="update-pack">
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">Persons</th>
                <th scope="col">Car type</th>
                <th scope="col">Cost</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.rates?.map((rate) => {
                return (
                  <tr key={rate.id}>
                    <th scope="row">
                      {" "}
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <select
                          value={rate.persons}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              persons: e.target.value,
                            });
                          }}
                          class="form-select"
                          aria-label="Select Package"
                        >
                          <option selected value="1 - 2">
                            1 - 2
                          </option>
                          <option value="3 - 6">3 - 6</option>
                          <option value="7 - 10">7 - 10</option>
                          <option value="11 - 15">11 - 15</option>
                        </select>
                      </Form.Group>
                    </th>
                    <td>
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <select
                          value={rate.carType}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              carType: e.target.value,
                            });
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
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.triple}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              costPerPerson: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={rate.costPerPerson}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Button
                        className="btn btn-warning"
                        type="submit"
                        onClick={(e) => updatePack(e, rate)}
                      >
                        Update Pack
                      </Button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => deletePack(e, rate.id)}
                      >
                        Delete Pack
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th scope="row">
                  {" "}
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <select
                      //   value={newPack.packTitle}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          persons: e.target.value,
                        });
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
                </th>
                <td>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <select
                      //   value={newPack.duration}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          carType: e.target.value,
                        });
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
                </td>
                <td>
                  <Form.Group className="mb-3" controlId="formBasic">
                    <Form.Control
                      //   value={newPack.triple}
                      onChange={(e) => {
                        setNewPack({
                          ...newPack,
                          costPerPerson: e.target.value,
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
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default DayTourTempUpdate;
