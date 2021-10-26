import React, { useState,useEffect } from "react";

const ListImages=(props)=>{
    const [ListImages,setImages]=useState([]);

    useEffect(()=>{
        setImages(props.location.state.images);
    },[props.location.state.images]);

    return (
        <>
          <div>
              {ListImages.map((key,idx)=>{
                  return (
                     <p><img className="listImages" src={key}/></p>
                  )
              })}
          </div>
        </>
    );
}

export default ListImages;