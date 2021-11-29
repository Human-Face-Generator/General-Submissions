import './index.css';
import classNames from './index.css';
import classes from './Mask.module.css';
import { useEffect, useState } from 'react';
// import CanvasDraw from "react-canvas-draw";
import CanvasDraw from "../../Components/CanvasDraw";
import { saveAs } from 'file-saver';
import Axios from 'axios';
import { Button } from "react-bootstrap";
import Compress from "compress.js";


function GenerateMask(props) {
   
  const fetchmaskURL = "http://localhost:5000/createMask";
  const createFaceURL = "http://localhost:5000/createFace";
  const fetchrandomFaceURL = "http://4241-104-198-243-137.ngrok.io";
  const compress = new Compress();

  const [customImg, setCusImg] = useState(null);
  const [customrandImg, setCusrandImg] = useState(null);
  const [randomImgFiles, setRandomImages] = useState([])
  const UserID = localStorage.getItem('UserID');
  const [newFace, setnewFace] = useState(null);
  const [randimage, setrandimage] = useState(null)
  const [orimage, setorimage] = useState("null")
  var loadableCanvas, saveableCanvas;

  const defaultProps = {
    onChange: null,
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#000000",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 512,
    canvasHeight: 512,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false
  };
  
  const [state, setState] = useState(() => {
    return {
      color: "#cc0000",
      width: 0,
      height: 0,
      brushRadius: 4,
      lazyRadius: 1,
      uimg: null,
      disabled: true,
    }
  });



  const fetchrandomFace = async (event) => {
    const response = await fetch(fetchrandomFaceURL,{cache: 'no-store'}
    ).then((response) => response)
      .then(result => result)
      .catch((err) => console.error(err))
    console.log(response)
    const res = await response.blob()

    localStorage.setItem("randomface", window.URL.createObjectURL(res));
    setrandimage(localStorage.getItem("randomface"))

    var filedata = new File([res], "randomimg", { type: 'image/jpeg' }); 
    var resizedFileData=await resizeImageFn(filedata) ;
    setCusrandImg(resizedFileData);
  }

  const fetchrandomFacezip = async (e) => {
    const method = 'GET';

    const url = fetchrandomFaceURL + "/zip"

    fetch(url)
      .then(res => res.blob())
      .then((data) => {
        console.log("succesful")
        saveAs(data, "randomFaceZip.zip")

      }).catch((err) => { console.log(err) });


  }

  const fetchmask = async (file) => {
    console.log(file)
     localStorage.setItem("orimage", window.URL.createObjectURL(file));
     setorimage(localStorage.getItem("orimage"));
    var formData = new FormData();
    formData.append("file",file)
    // console.log(formData.get("file"))
    let response = await fetch(fetchmaskURL, {
      'method': 'POST',
      'body': formData
    }).then((response) => response)
      .then(result => result)
      .catch((err) => console.error(err))
    let res = await response.blob();
    
    // saveAs(res,"01.png");
    localStorage.setItem("mask", window.URL.createObjectURL(res));
    setState({ ...state, uimg: localStorage.getItem("mask"), width: 512, height: 512, disabled: false })
    if (saveableCanvas) saveableCanvas.drawImage()
  }

  const fetchnewFace = async (event) => {
    localStorage.setItem(
      "savedDrawing",
      saveableCanvas.getSaveData()
    );
    // console.log(localStorage.getItem("savedDrawing"));
    let item = localStorage.getItem("savedDrawing");
    let response = await fetch(createFaceURL, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((response) => response)
      .then(result => result)
      .catch((err) => console.error(err))

    let res = await response.blob();
   
    localStorage.setItem("maskImage1",res);
 // ********************************************************************
    var filedata = new File([res], "randomimg", { type: 'image/jpeg' }); 
    var resizedFileData=await resizeImageFn(filedata) ;
    setCusImg(resizedFileData);
 // ********************************************************************
    localStorage.setItem("maskImage",filedata);
    localStorage.setItem("face", window.URL.createObjectURL(res));
    setnewFace(localStorage.getItem("face"))
  }

  const AddtoCollection = async (Img) => {
    const formdata = new FormData();
    formdata.append("savedimg", Img);
    console.log(formdata)
    await Axios.post(`http://localhost:3004/upload/${UserID}`, formdata).then((res) =>
      console.log(res)).catch(err => console.log(err));
  }
  async function resizeImageFn(file) {

    const resizedImage = await compress.compress([file], {
      size: 2, // the max size in MB, defaults to 2MB
      quality: 1, // the quality of the image, max is 1,
      maxWidth: 300, // the max width of the output image, defaults to 1920px
      maxHeight: 300, // the max height of the output image, defaults to 1920px
      resize: true,
      // defaults to true, set false if you do not want to resize the image width and height
    })
    const img = resizedImage[0];
    const base64str = img.data
    const imgExt = img.ext
    const resizedFile = Compress.convertBase64ToFile(base64str, imgExt)
    return resizedFile;
  }

  const sendfiles = async () => {
    const formdata = new FormData();
    //console.log(randomImgFiles)
    // formdata.append("randomImages",randomImgFiles);   cant do it in this way
    var i = 0;
    for (i; i < randomImgFiles.length; i++) {
      const img = await resizeImageFn(randomImgFiles[i]);
      //  console.log(img);
      //  console.log(randomImgFiles[i]);
      formdata.append("randomImages", img);

    }
    //console.log(formdata)
    await Axios.post(`http://localhost:3004/uploadRandomImgs`, formdata).then((res) =>
      console.log(res)).catch(err => console.log(err));
  }

  useEffect(async ()=>{
    if( props.location.state && props.location.state.RandomimgURL)
    {
       const image=await fetch(props.location.state.RandomimgURL);
       const imgblob=await image.blob();
       const file=new File([imgblob],"randomImage");
       //console.log(file);
       await fetchmask(file);
    }
  },[])


  return (
    <div className="maskPageContainer">
     
      <div className='main-box'>
        <h2>React Canvas Draw</h2>

        <div className={classes.randomimage}>
          <button className={classes.btn} onClick={fetchrandomFace}>
            Random Image
          </button>

          {randimage ?<div className="randImgCont"> <img src={randimage} height="256" width="256" alt={"no image"} /> 
          
          <Button style={{width:"256px"}} onClick={async () => await AddtoCollection(customrandImg)}>
          Add to Default collection
        </Button>
        </div>
          : null}
          
        </div>
        <div className={classes.randomimage}>
          <button className={classes.btn} onClick={fetchrandomFacezip}>
            Download 10 Random images
          </button>
          {/* {randimage?<img src={randimage} alt={"no image"} />:null} */}
        </div>

        <div className={classNames.tools}>
          <input
            type="file"
            onChange={(event)=>fetchmask(event.target.files[0])}
            className={classes['choose-file']}
          />
          <br />
          <div>
            <label className={classes.inputlabel}>Brush-Radius :</label>
            <input
              className={classes.inputbox}
              type="number"
              value={state.brushRadius}
              onChange={e =>
                setState({ ...state, brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label className={classes.inputlabel}> Lazy-Radius :</label>
            <input
              className={classes.inputbox}
              type="number"
              value={state.lazyRadius}
              onChange={e =>
                setState({ ...state, lazyRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div className={classes.options}>
            <button
              className={classes.btn}
              onClick={fetchnewFace}
            >
              Save
            </button>

            <button
              className={classes.btn}
              onClick={() => { saveableCanvas.clear(); }}
            >
              Clear
            </button>

            <button
              className={classes.btn}
              onClick={() => { saveableCanvas.undo(); }}
            >
              Undo
            </button>

            <select className={classes.btn} id="color" onChange={(e) => {
              setState({ ...state, color: e.target.value })
            }}>
              <option value="#000000">background</option>
              <option value="#cc0000" selected>skin</option>
              <option value="#4d9900">nose</option>
              <option value="#cccc00">eye_glasses</option>
              <option value="#3333ff">right_eye</option>
              <option value="#cc00cc">left_eye</option>
              <option value="#00ffff">right_brow</option>
              <option value="#33ffff">left_brow</option>
              <option value="#663300">right_ear</option>
              <option value="#ff0000">left_ear</option>
              <option value="#66cc00">mouth</option>
              <option value="#ffff00">upper_lip</option>
              <option value="#000099">lower_lip</option>
              <option value="#0000cc">hair</option>
              <option value="#ff3399">hat</option>
              <option value="#00cccc">ear_ring</option>
              <option value="#003300">necklace</option>
              <option value="#ff9933">neck</option>
              <option value="#00cc00">cloth</option>
            </select>
          </div>

          
        </div>
        <div className={classes.imageArea}>

          <br />
          <div className={classes.imageContainer}>
            <div>
              {orimage !== "null" ? <img src={orimage} height="256" /> : null}
            </div>
            <div>
              {newFace ?
                <div>
                  <img src={newFace} height="256" /><br /><br />
                  <Button onClick={async () => await AddtoCollection(customImg)}>
                    Add to Default collection
                  </Button>
                  {/* <Button onClick={()=>saveAs(localStorage.getItem("maskImage"),"image.jpg")}>
                    download
                  </Button> */}
                </div> :
                null}
            </div>
          </div>

          <div className={classes.facemask}>

            <CanvasDraw
              ref={canvasDraw => (saveableCanvas = canvasDraw)}
              brushColor={state.color}
              brushRadius={state.brushRadius}
              lazyRadius={state.lazyRadius}
              canvasWidth={state.width}
              canvasHeight={state.height}
              imgSrc={state.uimg}
              disabled={state.disabled}
            // refreshBackgroundImage={true}
            />
          </div>

        </div>
{/* 
        <br /><br />

        <br /><br />
        <br /><br />
        <br /><br />
        <br /><br />
        <div style={{ zIndex: "100" }}>
          <div>random image</div>
          <input type="file" multiple onChange={(e) => setRandomImages(e.target.files)} />
          <button onClick={() => sendfiles()}>send</button>
        </div> */}

      </div>
    </div>
  
  );
}

export default GenerateMask;