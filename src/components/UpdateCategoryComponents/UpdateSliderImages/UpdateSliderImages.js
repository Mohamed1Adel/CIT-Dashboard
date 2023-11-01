import axios from "axios";
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { MONGODB_URL } from "../../../envData";

function UpdateSliderImages() {
  const [mainImages, setMainImages] = useState();
  const [transImages, setTransImages] = useState();
  const [hajjImages, setHajjImages] = useState();
  const [mainState, setMainState] = useState(true);
  const [transState, setTransState] = useState(true);
  const [hajjState, setHajjState] = useState(true);

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
  const handleUploadMainSlider = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);

      if (allImages.length < file.length) {
        allImages.push({ img_url: base64 });
      } else {
        await axios.post(`${MONGODB_URL}/mainSlider`, {
          images: allImages,
        });
      }
      // setPostImage([{ ...postImage, myFile: base64 }]);
      // setData({ ...data, images: allImages });
      // console.log(data);
      if (allImages.length >= file.length) {
        console.log("done");
        await axios.post(`${MONGODB_URL}/mainSlider`, {
          images: allImages,
        });
        break;
      }
      console.log(allImages, file.length);

      // await axios.post(`${MONGODB_URL}/mainSlider`, {
      //   images: allImages,
      // });
    }
  };
  const handleUploadTransportasionSlider = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      // setData({ ...data, images: allImages });
      // console.log(data);
      console.log(allImages);
      await axios.post(`${MONGODB_URL}/transportationSlider`, {
        images: allImages,
      });
    }
  };
  const handleUploadHajjOmrahSlider = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      // setData({ ...data, images: allImages });
      // console.log(data);
      console.log(allImages);
      await axios.post(`${MONGODB_URL}/hajjOmrahSlider`, {
        images: allImages,
      });
    }
  };
  const handleUpdateMainSlider = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      // setData({ ...data, images: allImages });
      // console.log(data);
      // console.log(allImages);
      // await axios.patch(`${MONGODB_URL}/updateMainSlider`, {
      //   images: allImages,
      // });
      const response = await axios.get(`${MONGODB_URL}/getMainSlider`);
      const id = await response.data[0]._id;

      if (allImages.length >= file.length) {
        console.log("done");
        await axios.patch(`${MONGODB_URL}/updateMainSlider/${id}`, {
          images: allImages,
        });
        break;
      }
      console.log(allImages, file.length);
    }
  };
  const handleUpdateTransportasionSlider = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      // setData({ ...data, images: allImages });
      // console.log(data);
      console.log(allImages);
      await axios.patch(`${MONGODB_URL}/updateTransportationSlider`, {
        images: allImages,
      });
    }
  };
  const handleUpdateHajjOmrahSlider = async (e) => {
    const file = e.target.files;
    const allImages = [];
    for (let i = 0; i < file.length; i++) {
      // console.log(file[i]);
      // console.log(postImage);
      const base64 = await convertToBase64(file[i]);
      allImages.push({ img_url: base64 });
      // setPostImage([{ ...postImage, myFile: base64 }]);
      // setData({ ...data, images: allImages });
      // console.log(data);
      console.log(allImages);
      await axios.patch(`${MONGODB_URL}/updateHajjOmrahSlider`, {
        images: allImages,
      });
    }
  };
  return (
    <Container>
      <h1>Update Sliders Images</h1>
      <div className="update-section">
        <Form>
          <h2>Upload Images</h2>
          <div className="update-btn-box">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload Images Main Slider</Form.Label>
              <input
                multiple
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleUploadMainSlider(e)}
              />
            </Form.Group>
            <button
              className="btn btn-warning"
              disabled={mainState}
              onClick={() => {}}
            >
              Upload
            </button>
          </div>
          <div className="update-btn-box">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload Images Transportation Slider</Form.Label>
              <input
                multiple
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleUploadTransportasionSlider(e)}
              />
            </Form.Group>
          </div>
          <div className="update-btn-box">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload Images Hajj Omrah Slider</Form.Label>
              <input
                multiple
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleUploadHajjOmrahSlider(e)}
              />
            </Form.Group>
          </div>

          <h2>Update Images</h2>

          <div className="update-btn-box">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Update Images Main Slider</Form.Label>
              <input
                multiple
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleUpdateMainSlider(e)}
              />
            </Form.Group>
          </div>
          <div className="update-btn-box">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Update Images Transportation Slider</Form.Label>
              <input
                multiple
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleUpdateTransportasionSlider(e)}
              />
            </Form.Group>
          </div>
          <div className="update-btn-box">
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Update Images Hajj Omrah Slider</Form.Label>
              <input
                multiple
                type="file"
                label="Image"
                name="myFile"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => handleUpdateHajjOmrahSlider(e)}
              />
            </Form.Group>
          </div>
          <button type="submit">send</button>
        </Form>
      </div>
    </Container>
  );
}

export default UpdateSliderImages;
