import { useState } from "react";
import "./App.css";
import Method from "afghan-square-maker/dist/src/method";
import Pattern from "afghan-square-maker/dist/src/pattern";
import FileUpload from "./components/FileUpload";
import ImageToCanvas from "./components/ImageToCanvas";

function App() {
  const [method, setMethod] = useState<string[]>([]);
  const [file, setFile] = useState<File>();

  const onCanvasReady = (canvas: HTMLCanvasElement) => {
    const pattern = Pattern.FromCanvas(canvas);
    setMethod(Method.FromPattern(pattern));
  };

  const onFileUploaded = (file: File) => {
    setFile(file);
  };

  return (
    <>
      <FileUpload onFileUploaded={onFileUploaded} />
      {file && <ImageToCanvas file={file} onCanvasReady={onCanvasReady} />}
      <div className="flex flex-col">
        {method.map((v) => (
          <div>{v}</div>
        ))}
      </div>
    </>
  );
}

export default App;
