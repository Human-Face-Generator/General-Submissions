import React, { useState,useEffect } from "react";
import "./index.css";

const ListImages=(props)=>{
    const [imgobjs,setImgobjs]=useState([]);//array of image objects
    
    useEffect(()=>{
        setImgobjs(props.location.state.images.list)
    },[props.location.state.images.list]);

    return (
        <> 
        <h3>{props.location.state.images.listName}</h3><br/>
          <div className="ListContainer">
              
              {imgobjs.map((imgobj,idx)=>{
                  return (
                      <div>
                     <p><img className="listImages" src={imgobj.img_url}/></p>
                     <p>{imgobj.img_name}</p>
                     </div>
                  )
              })}

         </div>
        </>
    );
}

export default ListImages;