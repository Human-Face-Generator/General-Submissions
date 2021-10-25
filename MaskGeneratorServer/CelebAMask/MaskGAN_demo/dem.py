import os
import sys
import cv2
import time
import numpy as np
from PIL import Image

import torch
from torchvision.utils import save_image

from options.test_options import TestOptions
from data.data_loader import CreateDataLoader
from models.models import create_model
from data.base_dataset import BaseDataset, get_params, get_transform, normalize

color_list = [(0, 0, 0), (204, 0, 0), (76, 153, 0), (204, 204, 0), (51, 51, 255), (204, 0, 204), (0, 255, 255), (51, 255, 255), (102, 51, 0), (255, 0, 0), (102, 204, 0), (255, 255, 0), (0, 0, 153), (0, 0, 204), (255, 51, 153), (0, 204, 204), (0, 51, 0), (255, 153, 51), (0, 204, 0)]

os.environ["CUDA_VISIBLE_DEVICES"] = str(0)
#model = Model(config)
opt = TestOptions().parse(save=False)
opt.nThreads = 1   # test code only supports nThreads = 1
opt.batchSize = 1  # test code only supports batchSize = 1
opt.serial_batches = True  # no shuffle
opt.no_flip = True  # no flip
model = create_model(opt)  
filename="../face_parsing/test_results/1.png"
mat_img = cv2.imread(filename)
# mat_img=cv2.cvtColor(mat_img,cv2.COLOR_BGR2GRAY)
# for i in range(512):
#     for j in range(512):
#         for k in range(3):
#             mat_img[i][j][k]=color_list[mat_img[i][j][k]][3-k-1]

mask = mat_img.copy()
mask_m = mat_img       
params = get_params(opt, (512,512))
transform_mask = get_transform(opt, params, method=Image.NEAREST, normalize=False, normalize_mask=True)
transform_image = get_transform(opt, params)
mask = mask.copy()
mask_m = mask_m.copy()
mat_img=Image.open("../0.jpg")
img = mat_img.copy()
mask = transform_mask(Image.fromarray(np.uint8(mask))) 
mask_m = transform_mask(Image.fromarray(np.uint8(mask_m)))
img = transform_image(img)
# start_t = time.time()
generated = model.inference(torch.FloatTensor([mask_m.numpy()]), torch.FloatTensor([mask.numpy()]), torch.FloatTensor([img.numpy()]))
save_image((generated.data[0] + 1) / 2,'../11.jpg')
