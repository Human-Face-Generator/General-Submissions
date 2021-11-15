import React from "react";
import './home.css';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import Axios from "axios";
import { useState, useEffect } from "react";
import Hfg from "./images/Hfg.png";

const Home = () => {
  const history = useHistory();
  const [imgUrls, setUrls] = useState([]);

  const maskRoute = () => {
    history.push('/generateMask');
  }

  useEffect(async () => {
    const response = await Axios.get("http://localhost:3004/obtain-Random-images");
    const data = response.data;
    var list = [];
    data.map((obj, idx) => {
      list.push(obj.imgURL);
    })
    //console.log(list);
    setUrls(list);
    //setTimeout(()=>{setShowimg(true)},2000)
  }, [])

  return (
    <div className="homePageBody">
      <div className="homepage">

        <div id="heading" >
          <p> A unique real-time face generator.</p>
         {/* <span> <img className="hfglogo" src={Hfg}/></span> */}
        </div>
{/* 
        <div className="btns">
          <Button variant="primary" size="sm">Browse all images</Button>
          <Button onClick={maskRoute} variant="primary" size="sm">Generate a face from mask</Button>
        </div> */}

      </div>
      <div className="crouselarea">
        <div className="crouselTextArea">
          <p className="crouselText1">Create the face you need</p>
          <p  className="crouselText2">Yes. Just like in the videogames, you can now
create a photo-realistic face from scratch.</p>
        </div>
      <Carousel fade >

{imgUrls && imgUrls.map((url, idx) => {
  return (
    <Carousel.Item interval={4000}>
      <img
        className="d-block"
        key={idx}
        src={`http://localhost:3004/obtain-images/${url}`}
      />
    </Carousel.Item>
  )
})}

</Carousel>
      </div>
      

      <div className="homePage-subsection">
        <p className="footerText1">Infinite</p>
        <p className="footerText2">
        That’s the number of unique faces you can craft in our app. Seriously, technically nothing can stop you.
        </p>
      </div>

      <div className="homePage-footer">
      <p className="footerText3">So go ahead, Create someone</p>
      <Button className="footer-btn" 
               onClick={()=>history.push('/generateMask')}>
        Create a Person</Button>
      </div>
    </div>
  );
}

export default Home;