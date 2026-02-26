import { useCallback, useEffect, useRef } from "react";

const renderImage = (file: File, target: HTMLImageElement) => {
  return new Promise<void>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (ev) => {
      target.src = ev.target?.result?.toString() ?? "";
      resolve();
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

  target.width = image.naturalWidth;
  target.height = image.naturalHeight;
  const context = target.getContext("2d");
  if (!context) {
    throw Error("No 2D Context in Canvas");
  }

  context.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
  return context;
};

type Props = {
  file: File;
  onCanvasReady: (context: HTMLCanvasElement) => void;
};

const ImageToCanvas = ({ file, onCanvasReady }: Props) => {
  const img = useRef<HTMLImageElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const convertFileToCanvas = useCallback(async () => {
    if (img.current === null || canvas.current === null) {
      return;
    }

    await renderImage(file, img.current);
  }, [file, onCanvasReady]);

  useEffect(() => {
    convertFileToCanvas().then(() => {
      if (!img.current || !canvas.current) {
        return;
      }

      addToCanvas(img.current, canvas.current);
      onCanvasReady(canvas.current);
    });
  }, [img, canvas, file]);

  return (
    <div className="flex flex-row gap-5 justify-between">
      <img ref={img} alt="uploaded image" />
      <canvas ref={canvas} />
    </div>
  );
};

export default ImageToCanvas;
