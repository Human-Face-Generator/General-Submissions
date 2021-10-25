import os
import cv2
import requests
import matplotlib.pyplot as plt
import numpy as np


# res =requests.post("http://localhost:5000/predict", files={'file': open('0.jpg', 'rb')})

# print(res)
# color_map={"#000000":0,"#cc0000":1,"#4d9900":2,"#cccc00":3,"#3333ff":4,"#cc00cc":5,"#00ffff":6,"#33ffff":7,"#663300":8,"#ff0000":9,"#66cc00":10,"#ffff00":11,"#000099":12,"#0000cc":13,"#ff3399":14,"#00cccc":15,"#003300":16,"#ff9933":17,"#00cc00":18}
# color_list = [(0, 0, 0), (204, 0, 0), (76, 153, 0), (204, 204, 0), (51, 51, 255),(204, 0, 204), (0, 255, 255), (51, 255, 255), (102, 51, 0), (255, 0, 0), (102, 204, 0), (255, 255, 0), (0, 0, 153), (0, 0, 204), (255, 51, 153), (0, 204, 204), (0, 51, 0), (255, 153, 51), (0, 204, 0)]

# lines=[{"points":[{"x":272.30981152987795,"y":327.15719540832407},{"x":272.30981152987795,"y":327.15719540832407},{"x":272.30981152987795,"y":327.15719540832407}],"brushColor":(255,0,0),"brushRadius":10}]
# # os.chdir("face_parsing/")
# # os.system("dir")
# # os.system("python -u generateMask.py --batch_size 1 --imsize 512 --test_size 1 --version parsenet --train False")
# # os.chdir("..")
# # os.chdir("MaskGAN_demo")
# # os.system("python -u dem.py")
# # image1=cv2.imread("./face_parsing/test_color_visualize/0.png")
# # image2=cv2.imread("./face_parsing/test_results/0.png")
# image=cv2.imread("0.jpg")

# tup=(int(lines[0]["points"][0]['x']),int(lines[0]["points"][0]['y']))
# print(tup)
# for x in range(len(lines)):
#     cv2.circle(image,tup,lines[x]["brushRadius"],lines[x]["brushColor"],-1)

# # print(image2[200][200])
# # print(image1[200][200])
# # for i in range(512):
# #     for j in range(512):
# #         for k in range(3):
# #             image2[i][j][k]=color_list[image2[i][j][k]][3-k-1]
# # # print(np.shape(image1))
# cv2.imshow("image",image)
# cv2.waitKey(0)
# # print(np.shape(cv2.cvtColor(image1,cv2.COLOR_BGR2GRAY)))

os.chdir("face_parsing")
os.chdir("..")
print(os.getcwd())