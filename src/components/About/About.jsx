import s from './About.module.css'

const About=()=>{

    return(
        <div className="container-fluid">
            <section>
                <h1 className="text-center mt-3" >About Us</h1>
            </section>
            <div className={s.container2}>
                <h2>About our project</h2>
                <p>Our project focuses on making an e-commerce application for the sale of natural and healthy foods. The main objective of the project is to give a nice and friendly tool to consumers who use websites of food retailers.</p>
            
            </div> 
            <div className={s.container2}>
                <h2>Developer team</h2>
                <p>Our work team has been trained in the bootcamp of <strong>Full Stack Web </strong> imparted by <strong>Soy Henry. </strong></p><p> And is made up of:</p>
                <ul>
                    <li>Javier Pintos (Uru)</li>
                    <li>Juan Matanzo  (Arg)</li>
                    <li>Mario Benitez (Mex)</li>
                    <li>Mauricio Mendez (Col)</li>
                    <li>Santiago Diaz (Col)</li>
                    <li>Santiago Muller (Arg)</li>
                </ul>
                
            </div> 
            <div className={s.container2}>
                <h2>Knowledge Areas</h2>
                
                <p>Our project is made for different development environments, applying various methodologies and work tools according to the area.</p>
                <p>This application was developed with current programming technologies both in the backend area, databases and in the frontend.</p>
            </div> 
        </div>
    )
}

export default About;