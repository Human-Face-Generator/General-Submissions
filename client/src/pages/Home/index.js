import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import {Button} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import Axios from "axios";
import { useState,useEffect } from "react";
const Home =()=>{
  const history = useHistory(); 
  const [imgUrls,setUrls]=useState([]);

  const maskRoute=()=>{
    history.push('/generateMask');
  }
    
  useEffect(async ()=>{
     const response= await Axios.get("http://localhost:3004/obtain-Random-images");
    const data=response.data;
    var list=[];
    data.map((obj,idx)=>{
      list.push(obj.imgURL);
    })
    //console.log(list);
    setUrls(list);
   //setTimeout(()=>{setShowimg(true)},2000)
  },[])
 
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
  
   {imgUrls && imgUrls.map((url,idx)=>{
      return (
      <Carousel.Item  interval={4000}>
        <img
          className="d-block"
          key={idx}
          src={`http://localhost:3004/obtain-images/${url}`}
        />      
      </Carousel.Item>
      )
      })}

</Carousel>

  <div className="homePage-subsection">
    <h2 >Create the face you need</h2>
    <p>
     Yes. Just like in the videogames, you can now
create a photo-realistic face from scratch.
Just select the suitable parameters.
    </p>
  </div>
      </>
    );
}

export default Home;