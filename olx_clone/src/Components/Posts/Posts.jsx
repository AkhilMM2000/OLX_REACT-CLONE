import React,{useContext,useEffect,useState} from 'react';

import { collection, getDocs } from "firebase/firestore";
import Heart from '../../assets/Heart';
import './Post.css';
import { AuthContext, Firebasecontext } from "../../store/Firebasecontext";
import { Postcontext } from '../../store/Postcontext';
import { useNavigate } from 'react-router-dom';
function Posts() {
  const { user } = useContext(AuthContext);
  const { db } = useContext(Firebasecontext);
  const [products,setProducts]=useState([])
 const {Setpostdetails}=useContext(Postcontext)
  const navigate=useNavigate()
  const Productdetails=(product)=>{
     Setpostdetails(product)
     navigate('/view')
  }
  useEffect(() => {
 
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, "products");
        const snapshot = await getDocs(productsCollection);
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id, // Include document ID
          ...doc.data(), // Spread the product data
        }));
 
   
        setProducts(productsList); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [db]); 
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {/* here */}
    {products.map((product)=>
          <div className="card" onClick={()=>Productdetails(product)}>
            <div className="favorite">

              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageUrl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.category}</span>
              <p className="name"> {product.name}</p>
                
            {product.date && (
      <span>{new Date(product.date).toDateString()}</span>
    )}
            </div>
       
         
          </div>
    )
}
          {/* here */}
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
