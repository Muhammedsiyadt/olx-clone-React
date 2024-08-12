import React, { useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../../firebase/config"; // Ensure this path is correct
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  
  const navigate = useNavigate();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  const validateForm = () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!category.trim()) {
      toast.error("Category is required");
      return false;
    }
    if (!price.trim() || isNaN(price) || parseFloat(price) <= 0) {
      toast.error("Price must be a valid positive number");
      return false;
    }
    if (!image) {
      toast.error("Image is required");
      return false;
    }
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      let imageUrl = "";

      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "products"), {
        name: name.trim(),
        category: category.trim(),
        price: parseFloat(price),
        imageUrl,
      });

      toast.success("Product added successfully!");
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);

      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      toast.error("Error adding product: " + error.message);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="centerDiv">
        <form onSubmit={submitForm}>
          <label htmlFor="name">Name</label>
          <br />
          <input
            value={name}
            className="input"
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            value={category}
            className="input"
            type="text"
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            type="number"
            id="price"
            name="price"
          />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
          />
          <br />
          {image && (
            <img
              alt="Preview"
              width="200px"
              height="200px"
              src={URL.createObjectURL(image)}
            />
          )}
          <br />
          <button type="submit" className="uploadBtn">Upload and Submit</button>
        </form>
      </div>
    </>
  );
};

export default Create;
