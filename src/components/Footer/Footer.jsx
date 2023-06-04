import { Link } from "react-router-dom";
import imgpropia from "../../img/logo.png";

const Footer = () => {

  return (
    <div className='col bg-secondary' >
      <div className='row' >
        <figure className='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
          <img src={imgpropia} alt="Biofresh Logo" className='img-fluid p-5' />
        </figure>
        <article className='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
          <h4 className='text-warning-emphasis p-4 text-center'>INFORMATION</h4>
          <p className='h6 text-warning p-4 text-center'>
          This web page is the result of the Final Project of Henry's FullStack Master.
          </p>
        </article>
        <article className='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
          <h4 className='text-warning-emphasis p-4 text-center'>Group 5 Pt-10b</h4>
          <p className='h6 text-warning p-4 text-center'>
            Juan Cruz Matanzo <br/>
            Santiago Muller <br/>
            Javier Pintos <br/>
            Mauricio Mendez <br/>
            Santiago Diaz <br/>
            Mario A. Benitez D. 
          </p>
        </article>
        <article className='col-xs-12 col-sm-6 col-md-3 col-lg-3'>
          <h4 className='h5 text-warning-emphasis p-4 text-center'>MENU</h4>
          <div className='p-4 text-center'>
            <Link to='/' className="link-light link-light-hover"  >Home</Link><br/>
            <Link to='/store' className="link-light link-light-hover" >Store</Link><br/>
            <Link to='/about' className="link-light link-light-hover" >About Us</Link><br/>
            <Link to='/contact' className="link-light link-light-hover" >Contact Us</Link>
          </div>
        </article> 
      </div>
      <h5 className='text-warning-emphasis p-4 text-center'>Copyright 2023</h5>
    </div>
  )
};

export default Footer;