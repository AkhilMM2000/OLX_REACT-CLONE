import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";

import { AuthContext, Firebasecontext } from "../../store/Firebasecontext";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // To show loading spinner
  const { user } = useContext(AuthContext);
  const { db } = useContext(Firebasecontext);

const navigate=useNavigate()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const 
  handlesubmit = async () => {
    if (!name || !category || !price || !image) {
      alert("Please fill all fields and upload an image.");
      return;
    }
    const namePattern = /^[A-Za-z]+$/;

    if (!namePattern.test(name)||!namePattern.test(category)) {
      alert("Validation failed.  only letters.");
      return;
    }

    setLoading(true); 

    
    const formData = new FormData();
    
    
    formData.append("file", image);
    formData.append("upload_preset", "product_images"); 
     formData.append('cloud_name','dcoo56p7a')
    try {
      // Upload image to Cloudinary
      const response = await fetch("https://api.cloudinary.com/v1_1/dcoo56p7a/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.secure_url; 

      // Save product data to Firebase Firestore
      const productData = {
        name,
        category,
        price,
        imageUrl,
        date:Date.now(),
        userId: user?.uid, // Store user ID to know who added the product
      };
      await addDoc(collection(db, "products"), productData);

      // Clear form after submission
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);

      navigate('/')
    } catch (error) {
      console.error("Error uploading image or saving data:", error);
      alert("You must login, Please try again.");
    } finally {
      setLoading(false); // Set loading to false after the process is complete
    }
  };
const backhome=()=>{
  navigate('/')
}
  return (
    <Fragment>
      <Header />
      <div className="container">
        <div className="form-card">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
              placeholder="Enter product name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              placeholder="Enter category"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="input"
              placeholder="Enter price"
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">Upload Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              id="file"
              className="file-upload"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="image-preview"
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
          </div>
          <button
            type="submit"
            onClick={handlesubmit}
            className="upload-btn"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload and Submit"}
          </button>
        </div>
      </div>
      <div className="back-home-btn">
        <button onClick={backhome} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    </Fragment>
  );
};

export default Create;
