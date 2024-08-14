import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import './View.css';

const View = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProductAndUser = async () => {
      try {
        // Fetch product details
        const productDocRef = doc(db, 'products', id);
        const productDocSnap = await getDoc(productDocRef);

        if (productDocSnap.exists()) {
          const productData = productDocSnap.data();
          setProduct(productData);

          // Fetch creator (user) details
          if (productData.userId) {
            const userDocRef = doc(db, 'user', productData.userId);
            const userDocSnap = await getDoc(userDocRef);

            console.log(userDocSnap);
            

            if (userDocSnap.exists()) {
              setUser(userDocSnap.data());
            } else {
              console.error('No such user!');
              setUser(null)
            }
          } else {
            console.error('No userId in product document!');
            setUser(null)
          }
        } else {
          console.error('No such product!');
          setProduct(null)
        }
      } catch (error) {
        console.error('Error fetching product or user:', error);
      }
    };

    fetchProductAndUser();
  }, [id]);

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {product.price}</p>
          <span>{product.name}</span>
          <p>{product.category}</p>
        </div>
        {/* <div className="contactDetails">
          <p>Seller details</p>
          {user ? (
            <>
              <p>{user.username || 'No name'}</p>
              <p>{user.phone || 'No phone number'}</p>
            </>
          ) : (
            <p>No seller details available</p> 
          )}
        </div> */}
      </div>
    </div>
  );
};

export default View;
