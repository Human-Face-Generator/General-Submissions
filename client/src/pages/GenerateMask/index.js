import './index.css';
import classNames from './index.css'
import { useState } from 'react';
// import CanvasDraw from "react-canvas-draw";
import CanvasDraw from "../../Components/CanvasDraw";
//import { saveAs } from 'file-saver';
function GenerateMask() {

  const fetchmaskURL="http://localhost:5000/createMask";
  const createFaceURL="http://localhost:5000/createFace";
  const fetchrandomFaceURL="http://36a9-34-71-167-105.ngrok.io/";
  
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
  const [newFace, setnewFace] = useState(null);
  const [state, setState] = useState(() => {
    return {
      color: "#cc0000",
      width: 0,
      height: 0,
      brushRadius: 4,
      lazyRadius: 1,
      uimg: null,
    }
  });

  const [randimage, setrandimage] = useState(null)
  const [orimage, setorimage] = useState("null")
  var loadableCanvas, saveableCanvas;

  const fetchrandomFace=async(event)=>{
    let response = await fetch(fetchrandomFaceURL
    ).then((response) => response)
      .then(result => result)
      .catch((err) => console.error(err))
    // console.log(response)
    let res = await response.blob()
    
    localStorage.setItem("randomface", window.URL.createObjectURL(res));
    setrandimage(localStorage.getItem("randomface"))
  }
 
  const fetchmask=async(event)=>{
    localStorage.setItem("orimage", window.URL.createObjectURL(event.target.files[0]))
    setorimage(localStorage.getItem("orimage"))
    var formData = new FormData();
    formData.append("file", event.target.files[0])
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
    setState({ ...state, uimg: localStorage.getItem("mask"), width: 512, height: 512 })
    if(saveableCanvas)saveableCanvas.drawImage()
  }

  const fetchnewFace=async(event)=>{
    localStorage.setItem(
      "savedDrawing",
      saveableCanvas.getSaveData()
    );
    console.log(localStorage.getItem("savedDrawing"));
    let response = await fetch(createFaceURL, {
      'method': 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(localStorage.getItem("savedDrawing"))
    }).then((response) => response)
      .then(result => result)
      .catch((err) => console.error(err))
    // console.log(response)
    let res = await response.blob()
    localStorage.setItem("face", window.URL.createObjectURL(res));
    setnewFace(localStorage.getItem("face"))
  }

  return (
    <div className="App">

      <div>
        <h1>React Canvas Draw</h1>

        <div>
          <button onClick={fetchrandomFace}>
            random image
          </button>
          {randimage?<img src={randimage} alt={"no image"} />:null}
        </div>

        <div className={classNames.tools}>
          <input type="file"  onChange={fetchmask}/>
          <br />
          <button
            onClick={fetchnewFace}>
            Save
          </button>
          <button onClick={() => {saveableCanvas.clear();}} >
            Clear
          </button>
          <button onClick={() => {saveableCanvas.undo(); }} >
            Undo
          </button>

          <select id="color" onChange={(e) => {
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

          <div>
            <label>Brush-Radius:</label>
            <input
              type="number"
              value={state.brushRadius}
              onChange={e =>
                setState({ ...state, brushRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
          <div>
            <label>Lazy-Radius:</label>
            <input
              type="number"
              value={state.lazyRadius}
              onChange={e =>
                setState({ ...state, lazyRadius: parseInt(e.target.value, 10) })
              }
            />
          </div>
        </div>
        <img src={orimage} height="200" />
        <CanvasDraw
          ref={canvasDraw => (saveableCanvas = canvasDraw)}
          brushColor={state.color}
          brushRadius={state.brushRadius}
          lazyRadius={state.lazyRadius}
          canvasWidth={state.width}
          canvasHeight={state.height}
          imgSrc={state.uimg}
          // refreshBackgroundImage={true}
        />
        {/* <p>{state.uimg}</p> */}
        {newFace?<img src={newFace}  />:null}
      </div>
    </div>
  );
}

export default GenerateMask;