import './SavedImages.css';
import {useState,useEffect} from "react";
import {useHistory} from "react-router";
import Axios from 'axios';
import {Button} from "react-bootstrap";
import deleteIcon from "./images/deleteIcon.png";

const SavedImages=()=>{
    
   const [ImageLists,setLists] = useState([]);
   const [listNames,setNames]=useState([]);// for next page, to avoid another call to db
   const [addlist,setaddlist]=useState(false);
   const [newCollname,setcollname]=useState("");
   const [colldeleted,setdelstatus]=useState(false);
   const history=useHistory();
   const UserID=localStorage.getItem('UserID');
   console.log(UserID);
   const addCollName= ()=>{

      console.log("coll name obtained");
      console.log(newCollname)
      Axios.post("http://localhost:3004/addnewcollection",{collName:newCollname}).then(
         (res)=>{
            console.log(res.data)
            if(res.data==="new doc added" || res.data==="doc updated")
            {   
                 setaddlist(!addlist);
            }
         }
      ).catch((err)=>{console.log(err)});
   }

   const deleteColl=(collname)=>{
      console.log(collname);
      Axios.post("http://localhost:3004/deleteCollection",{collection:collname}).then(
         (res)=>{
            if(res.data==="ok")
            {setdelstatus(!colldeleted);}
         }
      ).catch(err=>console.log(err))

   }

useEffect( ()=>{

         Axios.get("http://localhost:3004/ImageLists").then((imgobj)=>{ 
            if(imgobj.data==="Empty List")  
            {
                  console.log(imgobj.data);
            }    
            else   
         {var data=imgobj.data.lists;// array of lists
          // console.log(data);
           let names=[];
   data.map(list=>names.push(list.listName));
           setNames(names);
        
            setLists(data); }                
     }).catch((err)=>{console.log(err)});
  
},[addlist,colldeleted])

    return (
        <>
        <div className="bgsetup">
        <div className="savedImages">

            <div className="headingSI">
            <h1 >Organize your saved photos here</h1>
            </div>
           
            <div className="listNames">
             <h1>Your Gallery</h1><br/>
            { ImageLists && ImageLists.map((list,idx)=>{
               return (
                  <div className="listItem" key={idx}>
                  <p id="selectedList" onClick={()=>{
            history.push( {pathname:"/listImages",state:{images:list,allListNames:listNames}} );
                  }}>
                  {list.listName}
                  </p>
                  <img className="deleteicon" src={deleteIcon} onClick={()=>deleteColl(list.listName)}/>
                  </div>
               )
            })}
           </div>
           <br/>

           <div >
               { addlist ?
               <div className="newlist">
               <input className="forminput" id="fi" type="text"
               placeholder=" Your Collection name" 
               onChange={(e)=>{setcollname(e.target.value)}}
               />
               <Button className="addlistbtn" onClick={()=>addCollName()}>
                  Create</Button>
               <Button className="addlistbtn" onClick={()=>setaddlist(!addlist)}>
               Cancel</Button>
               </div>
               :
               <Button onClick={
                  ()=>{ setaddlist(!addlist);}
               }>Create a new Collection</Button>} 
         </div>


        </div>
        <br/>
       </div>
        </>
    );
}

export default SavedImages;