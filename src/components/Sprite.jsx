import React, {useState} from "react";

export const Sprite = ({
  position,
  imageSrc,
  scale = 1,
  maxFrames = 1,
  frameRate = 11,
  offset = {
    x: 0,
    y: 0,
  },
  usableCanvasHeight, // y value to reference the bottom of a usable background
  topResetValue, // y value to reset the position of the fighter sprites to
}) => {
 const [width, setWidth] = useState(50);
 const [height, setHeight] = useState(150);
 const image = new Image();
 image.src = imageSrc;
 const [currentFrame, setCurrentFrame] = useState(0);
 const [elapsedFrames, setElapsedFrames] = useState(0);
};