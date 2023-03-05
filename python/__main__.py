import cv2
import os
import numpy as np
import sys    

video=cv2.VideoCapture(os.path.join(os.path.dirname(__file__),"../Pedestrian_Walking.mp4"))
while True:
    grabbed, frame=video.read()
    if(not grabbed):
        break    
    state,arr=cv2.imencode(".jpg",frame)
    if(not state):
        continue
    sys.stdout.buffer.write(arr.tobytes())
