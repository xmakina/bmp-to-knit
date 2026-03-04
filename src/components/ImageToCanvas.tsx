import { useCallback, useEffect } from "react";
import ratioCalculator from "../utilities/ratioCalculator";

const renderImage = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (ev) => {
      const data = ev.target?.result?.toString();
      if (data) {
        resolve(data);
      }
      reject("No data found");
    };

    reader.readAsDataURL(file);
  });
};

const addToCanvas = (image: HTMLImageElement, target: HTMLCanvasElement) => {
  if (image.naturalHeight > 60 || image.naturalWidth > 60) {
    throw Error(
      `Image too large ${JSON.stringify({ height: image.naturalHeight, width: image.naturalWidth })} `,
    );
  }

  if (image.naturalWidth === 0 || image.naturalHeight === 0) {
    throw Error(
      `Image too small ${JSON.stringify({ height: image.naturalHeight, width: image.naturalWidth })} `,
    );
  }

  const calc = ratioCalculator({ width: 34, height: 27 });
  const { width, height } = calc({
    width: image.naturalWidth,
    height: image.naturalHeight,
  });
  target.width = width;
  target.height = height;

  const context = target.getContext("2d");
  if (!context) {
    throw Error("No 2D Context in Canvas");
  }
  const offsetX = (width - image.naturalWidth) / 2;
  const offsetY = (height - image.naturalHeight) / 2;

  context.fillStyle = "white";
  context.fillRect(0, 0, target.width, target.height);

  context.drawImage(
    image,
    offsetX,
    offsetY,
    image.naturalWidth,
    image.naturalHeight,
  );
  return context;
};

const FileToCanvas = async (
  file: File,
  onCanvasReady: (canvas: HTMLCanvasElement) => void,
  onUpdate: (message: string) => void,
) => {
  onUpdate(`rendering image...`);
  const imgData = await renderImage(file);
  onUpdate(`image loaded ${imgData.length}`);
  const image = new Image();
  const canvas = document.createElement("canvas");

  image.onload = () => {
    try {
      addToCanvas(image, canvas);
      onCanvasReady(canvas);
    } catch (ex: any) {
      onUpdate(`Error: ${ex.message}`);
    }
  };

  image.src = imgData;
};

type Props = {
  file: File;
  onCanvasReady: (context: HTMLCanvasElement) => void;
  onUpdate?: (message: string) => void;
};

const ImageToCanvas = ({ file, onCanvasReady, onUpdate = () => {} }: Props) => {
  const convertFileToCanvas = useCallback(async () => {
    await FileToCanvas(file, onCanvasReady, onUpdate);
  }, [file]);

  useEffect(() => {
    convertFileToCanvas();
  }, [file]);

  return <div className="flex flex-row gap-5 justify-between"></div>;
};

export default ImageToCanvas;
