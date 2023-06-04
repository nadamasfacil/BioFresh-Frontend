import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import CardContainer from "../CardContainer/CardContainer.jsx";
import SearchBar from "../SearchBar/SearchBar";
import {getProducts} from "../../Redux/actions/actionsProducts.js";
import {getCategories} from "../../Redux/actions/actionsCategories.js";
import s from "./LandingHome.module.css";
import table from '../../assets/img/table.jpg';
import woman from '../../assets/img/woman.jpg';
import RatingContainer from "../Rating/RatingContainer.jsx";


const Landing_home = ({ whereIAm, hereIAm }) => {

    const dispatch = useDispatch();


    const loadingData = async () => {
        const all_Products = await getProducts();
        dispatch(all_Products);
        const all_Categories = await getCategories();
        dispatch(all_Categories);
    };


  useEffect(() => {
      loadingData();
  }, []);

  return (
    <div className="container-fluid">
      
      {/* Sección Hero */}
      <div className={s.hero}>
        <h1 className="col-7 bg-black opacity-75 rounded-pill text-white text-center p-1"><strong>The Best and Healthiest you find here</strong></h1>
      </div>

      {/* Sección Cards */}
      <h2 className="col-xs-12 text-center mt-3"  >FEATURED PRODUCTS</h2>
      <RatingContainer whereIAm={whereIAm} hereIAm={hereIAm} />

      <div className="container-fluid" >
        <h2 className="my-3 text-center">Welcome to Biofresh</h2>
        <p className="col-12 offset-0 col-lg-10 offset-lg-1 h6" >At Biofresh, we are dedicated to providing you with a wide variety of healthy and environmentally friendly products, so you can take care of your well-being and the planet.</p>
        <div className="row my-3">
          <p className="col-12 offset-0 col-lg-6 offset-lg-1 h6">
          Explore our wide range of products and discover a universe of healthy options for your lifestyle. From organic and unprocessed foods to personal care and household cleaning products, at Biofresh, you will find everything you need to live a more natural life.<br /><br />
          Each product we offer has been carefully selected by our experts, who ensure that it meets our standards of quality and purity. We work directly with trusted suppliers who share our passion for natural and sustainable products, ensuring that only the best reaches your hands.
          </p>
          <img className="col-10 offset-1 my-3 col-md-8 offset-md-2 my-md-3 col-lg-4 offset-lg-0 my-lg-0" src={table} alt="Table" />
        </div>
        <p className="col-12 offset-0 col-lg-10 offset-lg-1 h6" >At Biofresh, we know that your time is valuable, which is why we have designed an easy-to-use, intuitive, and secure online shopping platform. With just a few clicks, you can browse our categories, read detailed product descriptions, check reviews from satisfied customers, and place your order comfortably from the convenience of your home.</p>
        <div className="row my-3" >
          <img className="col-10 offset-1 my-3 col-md-8 offset-md-2 my-md-3 col-lg-4 offset-lg-1 my-lg-0" src={woman} alt="Woman" />
          <p className="col-12 offset-0 my-3 col-lg-6 offset-lg-0 h6" >In addition, we work hard to ensure that your order arrives in perfect condition and ready for you to enjoy.<br /><br />
          At Biofresh, we are here to guide you on your journey to a healthier and more sustainable life. Our customer service team will be happy to assist you with any inquiries or concerns you may have. Thank you for choosing Biofresh as your trusted online store for packaged and packaged natural products!
          </p>
        </div>
      </div>

      <div className="container-fluid mt-5">
        <SearchBar/>
        <h2 className="col-xs-12 text-center mt-3"  >PRODUCTS</h2>
        <CardContainer whereIAm={whereIAm} hereIAm={hereIAm} />
      </div>

    </div>
  );
};

export default Landing_home;