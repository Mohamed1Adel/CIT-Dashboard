// src/components/UploadedImages.js

import React from 'react';

const UploadedImages = ({ images }) => {
  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={`/uploads/${image}`} alt={`Uploaded ${index}`} />
      ))}
    </div>
  );
};

export default UploadedImages;
