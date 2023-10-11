import React, { useState } from "react";

function UploadMultiImages() {
  const [files, setFiles] = useState();
  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`images[${i}]`, files[0]);
    }
    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <input type="file" multiple onChange={handleChange} />
      <button onClick={handleUpload}> Upload</button>
    </div>
  );
}

export default UploadMultiImages;

