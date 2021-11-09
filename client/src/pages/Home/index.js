import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import {Button} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
const Home =()=>{
  const history = useHistory();
  const maskRoute=()=>{
    history.push('/generateMask');
  }
    
    return (
      <>
        <div className="homepage">

       <div id="heading"> A unique real-time face generator to create photo-realistic faces
      .You can create a unique person with your parameters in one click.
       </div>
       
       <div className="btns">
       <Button  variant="primary" size="sm">Browse all images</Button>
       <Button onClick={maskRoute} variant="primary" size="sm">Generate a face from mask</Button>
       </div>
  
        </div>
<Carousel fade >
  <Carousel.Item  interval={4000}>
    <img
      className="d-block"
      src="https://static.generated.photos/vue-static/face-generator/landing/wall/20.jpg"
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item  interval={4000}>
    <img
      className="d-block"
      src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aHVtYW4lMjBmYWNlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
      alt="Second slide"
    />

    
  </Carousel.Item>
  <Carousel.Item  interval={4000}>
    <img
      className="d-block"
      src="https://cdn.pixabay.com/photo/2021/06/04/10/28/portrait-6309448_960_720.jpg"
      alt="Third slide"
    />

  </Carousel.Item>
</Carousel>

      </>
    );
}

export default Home;