import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config"; // Adjust the path to your Firebase config
import "./Posts.css";
import Heart from "../../assets/Heart";
import { useNavigate } from 'react-router-dom';

const Posts = ({ search }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products")); // Assuming your collection is named "products"
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div key={product.id} className="card" onClick={() => navigate(`/view/${product.id}`)}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="productCards">
          {filteredProducts.map((product) => (
            <div key={product.id} className="productCard" onClick={() => navigate(`/view/${product.id}`)}>
              <div className="productFavorite">
                <Heart />
              </div>
              <div className="productImage">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="productContent">
                <p className="productPrice">&#x20B9; {product.price}</p>
                <span className="productCategory">{product.category}</span>
                <p className="productName">{product.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
