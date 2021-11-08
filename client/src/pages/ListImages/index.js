import React, { useState,useEffect } from "react";
import "./index.css";
import Axios from "axios";
import ImageCard from "../../Components/ImageCard";

const ListImages=(props)=>{
    const [imgobjs,setImgobjs]=useState([]);//array of image objects   
   
    const [listToggle,setToggling]=useState(false);// image moved from curr list to another
    // hence imgobjs needs to be updated
    const currentList=props.location.state.images.listName;
   const allListNames=props.location.state.allListNames;

   const UserID=localStorage.getItem('UserID');
   console.log(UserID);
   
    useEffect(async()=>{
        const imglist=props.location.state.images.list;
        setImgobjs(imglist);
        //console.log(imglist)
    },[props.location.state.images.list]);

    useEffect(async()=>{
      await Axios.get(`http://localhost:3004/collection-imageList/${UserID}/${currentList}`)
      .then(obj=>{//console.log(obj);
        setImgobjs(obj.data.list);
      })
      .catch(err=>console.log(err))
    },[listToggle])

    return (
        <> 
        <div className="collImages">
        <p className="listName">{currentList}</p><br/>
          <div className="ListContainer">
              
              {imgobjs && imgobjs.map((imgobj,idx)=>{
                  return (
                      <div key={idx}>

                          <ImageCard 
                          img_url={`http://localhost:3004/obtain-images/${imgobj.img_url}`}
                          img_name={imgobj.img_name}
                          currlist={currentList}
                          listNames={allListNames}
                          filename={imgobj.img_url}
                          listToggle={listToggle}
                          setToggling={setToggling}
                          />

                     </div>
                  )
              })}
 
         </div>
        
       </div>
        </>
    );
}

export default ListImages;
