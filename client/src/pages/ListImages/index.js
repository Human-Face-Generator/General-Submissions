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




/*<input type="file" name="sampleimg" onChange={(e)=>setfile(e.target.files[0])}/>
<button onClick={()=>sendfile()}>send</button>


const [file,setfile]=useState(null);

const sendfile=async()=>{
    const formdata = new FormData();
    formdata.append("sampleimg",file);
    console.log(formdata);

   await Axios.post("http://localhost:3004/upload",formdata).then((res)=>console.log(res))

}
*/