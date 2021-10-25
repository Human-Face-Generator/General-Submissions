from flask import Flask, request, jsonify
# from face_parsing import generateMask
from PIL import Image
from flask.helpers import send_file
import os
app=Flask(__name__)
from flask_cors import CORS
import cv2
import numpy as  np
import json
CORS(app)

color_map={"#000000":0,"#cc0000":1,"#4d9900":2,"#cccc00":3,"#3333ff":4,"#cc00cc":5,"#00ffff":6,"#33ffff":7,"#663300":8,"#ff0000":9,"#66cc00":10,"#ffff00":11,"#000099":12,"#0000cc":13,"#ff3399":14,"#00cccc":15,"#003300":16,"#ff9933":17,"#00cc00":18}


@app.route('/createMask',methods=['GET','POST'])
def createMask():
  if(request.method == 'POST'):
    file=request.files.get("file")
    file=np.fromfile(file,np.uint8)
    file = cv2.imdecode(file, cv2.IMREAD_COLOR)
    cv2.imwrite("0.jpg",file)
    os.chdir("face_parsing/")
    os.system("python -u generateMask.py --batch_size 1 --imsize 512 --test_size 1 --version parsenet --train False")
    os.chdir("..")
    # cv2.imshow("file",file)
    # cv2.waitKey(0)
    return send_file('./face_parsing/test_color_visualize/0.png')

@app.route('/createFace',methods=['GET','POST'])
def createFace():
    if(request.method == 'POST'):
        dict=json.loads(request.get_json())
        filename="./face_parsing/test_results/0.png"
        img = cv2.imread(filename).copy()
        # print(len(dict["lines"]))
        
        for i in range(len(dict["lines"])):
            for j in range(len(dict["lines"][i]["points"])):
                for k in range(2):
                    tup=(int(dict["lines"][i]["points"][j]['x'])+k,int(dict["lines"][i]["points"][j]['y']+k))
                    color=color_map[dict["lines"][i]["brushColor"]]
                    radius=dict["lines"][i]["brushRadius"]
                    cv2.circle(img,tup,radius,(color,color,color),-1)
                    
        cv2.imwrite("./face_parsing/test_results/1.png",img)
        # cv2.imshow("img",img)
        # cv2.waitKey(0)
        os.chdir("MaskGAN_demo")
        os.system("python -u dem.py")
        os.chdir("..")
        return send_file("11.jpg")

