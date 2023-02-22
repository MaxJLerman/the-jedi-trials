import React, {useEffect, useState} from "react";

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

  const drawSprite = (context) => {
    context.drawImage(
      image, // source image
      currentFrame * (image.width / maxFrames), // start cropping [x position]
      0, // start cropping [y position]
      image.width / maxFrames, // width of 1 sprite frame
      image.height, // sprite height
      position.x - offset.x, // offsets the image [x position]
      position.y - offset.y, // offsets the image [y position]
      (image.width / maxFrames) * scale,
      image.height * scale,
    );
  };

  useEffect(() => {
    setElapsedFrames(elapsedFrames++);

    if (elapsedFrames % frameRate === 0) {
      if (currentFrame < maxFrames - 1) {
        setCurrentFrame(currentFrame++);
      } else {
        setCurrentFrame(0);
      }
    }
  }, [elapsedFrames, currentFrame, maxFrames]);

  return (
    <>
      {drawSprite()}
    </>
  );
};