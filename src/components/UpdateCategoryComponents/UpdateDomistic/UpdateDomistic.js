import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL, MONGODB_URL } from "../../../envData";
import { Form, Button } from "react-bootstrap";
import QuillToolbar, { formats, modules } from "../../Editor/EditorToolbar";
import ReactQuill from "react-quill";
import { ToastContainer, toast } from "react-toastify";
import "./UpdateDomistic.scss";
function UpdateDomestic() {
  const { id } = useParams();
  // console.log(id);
  const [data, setData] = useState();
  const [packs, setPacks] = useState([]);
  const [newPack, setNewPack] = useState({});


  const programUpdatedNotify = () => toast("program Added Successfully");
  const packUpdatedNotify = () => toast("Pack Updated Successfully");

  const getItemById = async () => {
    try {
      // const response = await axios.get(`${API_URL}/domestics/${id}`);
      const response = await axios.get(
        `${MONGODB_URL}/getDomesticDetails/${id}`
      );
      const domData = response.data;
      console.log(domData);
      setData(domData);
      setPacks(domData.packages);
    } catch (e) {
      console.log("====================================");
      console.log(e);
      console.log("====================================");
    }

    // console.log(data);
  };
  const updatePack = async (e, packItem) => {
    e.preventDefault();
    // console.log(newPack);
    // packs.push(newPack);
    // console.log(packs);
    // console.log(packs);
    // console.log(newPack);

    // const packIndex =  packs.findIndex((pack)=>{
    //     return pack.id === packId
    // })
    // const newPacks = packs.map((pack) => (pack == packItem ? newPack : pack));
    const newPacks = packs.map((pack) => {
      // console.log(pack);
      return pack == packItem
        ? {
            id: pack.id,
            packTitle:
              newPack.packTitle === undefined
                ? packItem.packTitle
                : newPack.packTitle,
            duration:
              newPack.duration === undefined
                ? packItem.duration
                : newPack.duration,
            startDate:
              newPack.startDate === undefined
                ? packItem.startDate
                : newPack.startDate,
            endDate:
              newPack.endDate === undefined
                ? packItem.endDate
                : newPack.endDate,
            single:
              newPack.single === undefined ? packItem.single : newPack.single,
            double:
              newPack.double === undefined ? packItem.double : newPack.double,
            triple:
              newPack.triple === undefined ? packItem.triple : newPack.triple,
          }
        : pack;
    });
    console.log(newPacks);
    setData({ ...data, packages: newPacks });
    packUpdatedNotify()
    // console.log(index);
    // delete packs[packIndex]
    // console.log(packs);
    //    const splicePacks =  packs.splice(packIndex,1);
    //     const newPacks = packs.filter((pack)=> pack.id !== splicePacks.id);
    //     // packs.push(newPack);
    //     newPacks.push(newPack)
    //     console.log(newPacks);

    //   sendForm.current.value = "";
    //   packageNotify();
  };
  const deletePack = (e, packId) => {
    e.preventDefault();
    const filterPacks = data?.packages?.filter((pack) => pack.id !== packId);
    console.log(filterPacks);
    setData({ ...data, packages: filterPacks });
  };
  const addNewPack = (e) => {
    e.preventDefault();
    // console.log({ ...data, packages: packs });
    let rand = Math.floor(Math.random() * 1000000000000000);
    console.log(rand);
    packs.push({ id: rand, ...newPack });
    console.log({ id: rand, ...newPack });
    // console.log(packs);
    setData({ ...data, packages: packs });
    // sendForm.current.value = "";
    // packageNotify();
    handleSubmit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch(`${MONGODB_URL}/updateDomesticDetails/${id}`, data)
        // .patch(`${API_URL}/domestics/${id}`, data)
        .then((res) => {
          console.log(res);
          // domesticNotify();
          getItemById();
          programUpdatedNotify()
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
                    checked={data?.hotOffer}
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    checked={data?.honeyMoon}
                    value={data?.honeyMoon}
                    onChange={(e) => {
                      setData({
                        ...data,
                        honeyMoon: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Hoeny Moon"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    checked={data?.summer}
                    value={data?.summer}
                    onChange={(e) => {
                      setData({
                        ...data,
                        summer: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Summer"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    checked={data?.winter}
                    value={data?.winter}
                    onChange={(e) => {
                      setData({
                        ...data,
                        winter: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Winter"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    checked={data?.nileCruise}
                    value={data?.nileCruise}
                    onChange={(e) => {
                      setData({
                        ...data,
                        nileCruise: e.currentTarget.checked,
                      });
                    }}
                    type="checkbox"
                    label="Nile Cruise"
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
                  // value={data?.termsAndConditions}
                  onChange={handleTermsChange}
                  modules={modules}
                  formats={formats}
                />
              </div>
              <br />
              <div>
                <h4>Cancellation Polices</h4>

                <ReactQuill
                  // value={data?.cancellation}
                  onChange={handlecancellationChange}
                />
              </div>
              <br />
              <div>
                <h4>Children Polices</h4>

                <ReactQuill
                  // value={data?.childrenPolices}
                  onChange={handleChildrenChange}
                />
              </div>
              <br />
              <div>
                <h4>Required Documents</h4>

                <ReactQuill
                  // value={data?.requiredDocs}
                  onChange={handleRequiredDocsChange}
                />
              </div>
              <br />
            </div>
          </div>
        </Form>
        {/* <Form className="pack-form" onSubmit={(e) => addNewPack(e)}>
          <Form.Group controlId="formFileMultiple" className="mb-3">
            <h6>Select package</h6>
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
              // value={domestic.packages.duration}
              // onChange={(e) =>
              //   setDomestic({
              //     ...domestic,
              //     packages: [{
              //       duration: e.target.value,
              //     }],
              //   })
              // }
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
        </Form> */}
        <Form className="update-pack">
          <table class="table ">
            <thead>
              <tr>
                <th scope="col">Package</th>
                <th scope="col">Duration</th>
                <th scope="col">Start data</th>
                <th scope="col">End data</th>
                <th scope="col">Single</th>
                <th scope="col">Double</th>
                <th scope="col">Triple</th>
                <th scope="col">Update</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.packages?.map((pack) => {
                return (
                  <tr key={pack.id}>
                    <th scope="row">
                      {" "}
                      <Form.Group controlId="formFileMultiple" className="mb-3">
                        <select
                          // value={pack.packTitle}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              packTitle: e.target.value,
                            });
                          }}
                          class="form-select"
                          aria-label="Select Package"
                          placeholder={pack.packTitle}
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
                          // value={pack.duration}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              duration: e.target.value,
                            });
                          }}
                          class="form-select"
                          aria-label="Select Package"
                          placeholder={pack.duration}
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
                          //   value={pack.startDate}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              startDate: e.target.value,
                            });
                          }}
                          type="date"
                          placeholder={pack.startDate}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.endDate}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              endDate: e.target.value,
                            });
                          }}
                          type="date"
                          placeholder={pack.endDate}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.single}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              single: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={pack.single}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.double}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              double: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={pack.double}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Form.Group className="mb-3" controlId="formBasic">
                        <Form.Control
                          //   value={pack.triple}
                          onChange={(e) => {
                            setNewPack({
                              ...newPack,
                              triple: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder={pack.triple}
                        />
                      </Form.Group>
                    </td>
                    <td>
                      <Button
                        className="btn btn-warning"
                        type="submit"
                        onClick={(e) => updatePack(e, pack)}
                      >
                        Update Pack
                      </Button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={(e) => deletePack(e, pack.id)}
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
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdateDomestic;
