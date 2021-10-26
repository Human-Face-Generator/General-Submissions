import './SavedImages.css';
import {useState,useEffect} from "react";
import {useHistory} from "react-router";
import Axios from 'axios';


const SavedImages=()=>{
    
   const [ImageLists,setLists] = useState([]);
   const history=useHistory();


useEffect( async()=>{

        await Axios.get("http://localhost:3004/ImageLists").then((imgobj)=>{          
            var data=imgobj.data.lists;// array of lists
           console.log(data);
            setLists(data);                 
     }).catch((err)=>{console.log(err)});
  
},[])

    return (
        <>
        <div className="savedImages">

            <div className="headingSI">
            <h1>Account Images</h1>
            <p >Organize your saved photos here</p>
            </div>

            <div className="listNames">
            {ImageLists.map((list,idx)=>{
               return (
                  <p id="selectedList" onClick={()=>{
                   history.push( {pathname:"/listImages",state:{images:list}} );
                  }}>
                  {list.listName}
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