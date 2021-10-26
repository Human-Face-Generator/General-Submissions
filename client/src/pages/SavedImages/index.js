import './SavedImages.css';
import {useState,useEffect} from "react";
import {useHistory} from "react-router";
import Axios from 'axios';


const SavedImages=()=>{
    
   const [ImageLists,setLists] = useState({});
   const history=useHistory();


const getLists=async ()=>{

    await Axios.get("http://localhost:3004/ImageLists").then((imgobj)=>{
           
           let tempNames=[];
           imgobj=imgobj.data;
           delete imgobj._id;
           delete imgobj.__v;

           console.log(imgobj);
           setLists(imgobj);
          console.log(Object.keys(imgobj));
           
    }).catch((err)=>{console.log(err)});

    }


useEffect( async()=>{
        await getLists(); 
},[])

    return (
        <>
        <div className="savedImages">

            <div className="headingSI">
            <h1>Account Images</h1>
            <p >Organize your saved photos here</p>
            </div>

            <div className="listNames">
            {Object.keys(ImageLists).map((key,idx)=>{
               return (
                  <p onClick={()=>{
                   history.push( {pathname:"/listImages",state:{images:ImageLists[key]}} );
                  }}>
                  {key}
                  </p>
               )
            })}

            </div>
       
        </div>
        <br/>
       
        </>
    );
}

export default SavedImages;