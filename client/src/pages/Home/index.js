import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import {Button} from "react-bootstrap";

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
      </>
    );
}

export default Home;