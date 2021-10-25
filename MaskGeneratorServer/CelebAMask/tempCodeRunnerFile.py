import cv2
import matplotlib.pyplot as plt
image=plt.imread("0.jpg")
image=cv2.resize(image,(512,512))
cv2.imwrite('0.jpg',image)
