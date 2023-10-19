import React, { useState, useEffect } from "react";
import "./AllCategories.scss";
import axios from "axios";
import { API_URL } from "../../envData";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
function AllCategories() {
  const [domestics, setDomestics] = useState({});
  const [programs, setPrograms] = useState({});
  const [outbound, setOutbound] = useState({});
  const [nileCruise, setNileCruise] = useState({});
  const [dayTours, setDayTours] = useState({});

  const deleteSuccessNotify = () => toast("Item Deleted Successfully");

  const getAllDomesticData = async () => {
    try {
      const response = await fetch(`${API_URL}/domestics`);
      const data = await response.json();
      console.log(data);
      setDomestics(data);
    } catch (e) {
      console.log(e);
    }
  };
  const getAllProgramData = async () => {
    try {
      const response = await fetch(`${API_URL}/programs`);
      const data = await response.json();
      console.log(data);
      setPrograms(data);
    } catch (e) {
      console.log(e);
    }
  };
  const getAllOutboundData = async () => {
    try {
      const response = await fetch(`${API_URL}/outbound`);
      const data = await response.json();
      console.log(data);
      setOutbound(data);
    } catch (e) {
      console.log(e);
    }
  };
  const getAllNileCruisesData = async () => {
    try {
      const response = await fetch(`${API_URL}/nileCruise`);
      const data = await response.json();
      console.log(data);
      setNileCruise(data);
    } catch (e) {
      console.log(e);
    }
  };
  const getAllDayToursData = async () => {
    try {
      const response = await fetch(`${API_URL}/dayTour`);
      const data = await response.json();
      console.log(data);
      setDayTours(data);
    } catch (e) {
      console.log(e);
    }
  };
  const updateItem = (itemData, itemId) => {};
  const deleteDomesticItem = async (itemId) => {
    await axios
      .delete(`${API_URL}/domestics/${itemId}`)
      .then((res) => {
        console.log("Delete successfully");
        deleteSuccessNotify();
        getAllDomesticData();
      })
      .catch((err) => {
        console.log("Delete Error");
      });
  };
  const deleteProgramItem = async (itemId) => {
    await axios
      .delete(`${API_URL}/programs/${itemId}`)
      .then((res) => {
        console.log("Delete successfully");
        deleteSuccessNotify();
        getAllProgramData();
      })
      .catch((err) => {
        console.log("Delete Error");
      });
  };
  const deleteOutboundItem = async (itemId) => {
    await axios
      .delete(`${API_URL}/outbound/${itemId}`)
      .then((res) => {
        console.log("Delete successfully");
        deleteSuccessNotify();
        getAllOutboundData();
      })
      .catch((err) => {
        console.log("Delete Error");
      });
  };
  const deleteNileCruiseItem = async (itemId) => {
    await axios
      .delete(`${API_URL}/nileCruise/${itemId}`)
      .then((res) => {
        console.log("Delete successfully");
        deleteSuccessNotify();
        getAllNileCruisesData();
      })
      .catch((err) => {
        console.log("Delete Error");
      });
  };
  const deleteDayToursItem = async (itemId) => {
    await axios
      .delete(`${API_URL}/dayTour/${itemId}`)
      .then((res) => {
        console.log("Delete successfully");
        deleteSuccessNotify();
        getAllDayToursData();
      })
      .catch((err) => {
        console.log("Delete Error");
      });
  };

  useEffect(() => {
    getAllDomesticData();
    getAllProgramData();
    getAllOutboundData();
    getAllNileCruisesData();
    getAllDayToursData()
  }, []);
  return (
    <div>
      <ToastContainer />
      <h3 className="main-heading">AllCategories</h3>

      <div className="domestics">
        <h3>Domestics</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Destinations</th>
              <th scope="col">Update</th>
              <th scope="col">Dalete</th>
            </tr>
          </thead>
          <tbody>
            {domestics?.length >= 1
              ? domestics?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.title}</th>
                      <td>{item.destination}</td>
                      <td>
                        <button className="btn btn-warning">
                          <Link to={`/updateDomestic/${item.id}`}>Update</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteDomesticItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Domestics Founded"}
          </tbody>
        </table>
      </div>

      <div className="programs">
        <h3>Programs</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Nights Count</th>
              <th scope="col">Update</th>
              <th scope="col">Dalete</th>
            </tr>
          </thead>
          <tbody>
            {programs?.length >= 1
              ? programs?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.title}</th>
                      <td>{item.nights} Night</td>
                      <td>
                        <button className="btn btn-warning">
                          <Link to={`/updateProgram/${item.id}`}>Update</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProgramItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Programs Founded"}
          </tbody>
        </table>
      </div>
      <div className="outbound">
        <h3>Outbound</h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              {/* <th scope="col">Nights Count</th> */}
              <th scope="col">Update</th>
              <th scope="col">Dalete</th>
            </tr>
          </thead>
          <tbody>
            {outbound?.length >= 1
              ? outbound?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.title}</th>
                      {/* <td>{item.nights} Night</td> */}
                      <td>
                        <button className="btn btn-warning">
                          <Link to={`/outboundTempUpdate/${item.id}`}>
                            Update
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteOutboundItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Programs Founded"}
          </tbody>
        </table>
      </div>
      <div className="nile-cruise">
        <h3>Nile Cruise </h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Destination</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {nileCruise?.length >= 1
              ? nileCruise?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.title}</th>
                      <td>{item.destination} </td>
                      <td>
                        <button className="btn btn-warning">
                          <Link to={`/nileCruiseTempUpdate/${item.id}`}>
                            Update
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteNileCruiseItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Programs Founded"}
          </tbody>
        </table>
      </div>
      <div className="nile-cruise">
        <h3>Nile Cruise </h3>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Destination</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {nileCruise?.length >= 1
              ? nileCruise?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <th scope="row">{item.title}</th>
                      <td>{item.destination} </td>
                      <td>
                        <button className="btn btn-warning">
                          <Link to={`/nileCruiseTempUpdate/${item.id}`}>
                            Update
                          </Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteDayToursItem(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : "No Day Tours Founded"}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllCategories;
