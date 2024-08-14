import React, { useState } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firebaseApp } from "../../firebase/config"; // Ensure this path is correct
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth"; // Import getAuth to get current user

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const auth = getAuth(); // Get the authentication instance
  const currentUser = auth.currentUser; // Get the current logged-in user

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

    setLoading(true);

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
        userId: currentUser.uid, // Add userId to the product data
      });

      toast.success("Product added successfully!");
      setName("");
      setCategory("");
      setPrice("");
      setImage(null);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error("Error adding product: " + error.message);
    } finally {
      setLoading(false);
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
            aria-label="Product Name"
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
            aria-label="Product Category"
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
            aria-label="Product Price"
          />
          <br />
          <label htmlFor="image">Image</label>
          <br />
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            aria-label="Product Image"
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
          <button type="submit" className="uploadBtn" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload and Submit'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
