import React, { useState, useEffect } from "react";
import "./AllCategories.scss";
import axios from "axios";
import { API_URL } from "../../envData";
  import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
function AllCategories() {
  const [domestics, setDomestics] = useState({});
  const [programs, setPrograms] = useState({});


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
 const updateItem = (itemData,itemId)=>{
  
  }

  const deleteItem = async (itemId)=>{
     await axios.delete(`${API_URL}/domestics/${itemId}`).then((res)=>{
      console.log("Delete successfully");
      deleteSuccessNotify();
      getAllDomesticData();
     }).catch((err)=>{
      console.log("Delete Error");
     })

  }

  useEffect(() => {
    getAllDomesticData();
    getAllProgramData()
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
                        <button
                          className="btn btn-warning"
                          onClick={() => updateItem(item, item.id)}
                        >
                          <Link to={`/updateDomestic/${item.id}`}>Update</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteItem(item.id)}
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
                        <button
                          className="btn btn-warning"
                          onClick={() => updateItem(item, item.id)}
                        >
                          <Link to={`/updateProgram/${item.id}`}>Update</Link>
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteItem(item.id)}
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
    </div>
  );
}

export default AllCategories;
