import { useCallback, useEffect } from "react";

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

  target.width = image.naturalWidth;
  target.height = image.naturalHeight;

  const context = target.getContext("2d");
  if (!context) {
    throw Error("No 2D Context in Canvas");
  }

  context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
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
