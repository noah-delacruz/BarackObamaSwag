import React, { useEffect, useRef } from 'react';

const ImageRenderer = ({ imageUrls, onImagesCombined }) => {
  const containerRef = useRef();

  useEffect(() => {
    const loadImage = async (imageUrl) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageUrl;
        image.onload = () => {
          resolve(image);
        };
      });
    };

    const combineImages = async () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      const images = await Promise.all(imageUrls.map(loadImage));

      // Set canvas size to accommodate the largest image
      const maxWidth = images[0].width;
      const maxHeight = images[0].height;
      canvas.width = maxWidth;
      canvas.height = maxHeight;

      images.forEach((image, index) => {
        const startX = index === images.length - 2 ? 88 : 0
        const startY = index === images.length - 2 ? 360 : 0
        const imgWidth = index === images.length - 2 ? 269 : image.width
        const imgHeight = index === images.length - 2 ? 269 : image.height
        context.drawImage(image, startX, startY, imgWidth, imgHeight);
      });

      const combinedImageUrl = canvas.toDataURL('image/png');
      onImagesCombined(combinedImageUrl);
    };

    combineImages();
  }, [imageUrls, onImagesCombined]);

  return <div ref={containerRef}></div>;
};

export default ImageRenderer;
