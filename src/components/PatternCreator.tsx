import { useState } from "react";
import FileUpload from "./FileUpload";
import ImageToCanvas from "./ImageToCanvas";
import Pattern from "afghan-square-maker/dist/src/pattern";
import PatternEditor from "./PatternEditor";

const PatternCreator = () => {
  const [file, setFile] = useState<File>();
  const [pattern, setPattern] = useState<Pattern>();

  function handleFileUpload(file: File): void {
    console.log("uploaded");
    setFile(file);
  }

  function handleCanvasReady(canvas: HTMLCanvasElement): void {
    console.log("setting from canvas");
    setPattern(Pattern.FromCanvas(canvas));
  }

  function handlePatternEdit(newPattern: boolean[][]): void {
    console.log("setting from edit");
    setPattern(Pattern.FromRows(newPattern));
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <div>
        <FileUpload onFileUploaded={handleFileUpload} />
      </div>
      <div>
        {file && (
          <ImageToCanvas file={file} onCanvasReady={handleCanvasReady} />
        )}
      </div>
      <div>
        <PatternEditor pattern={pattern?.rows} onChange={handlePatternEdit} />
      </div>
    </div>
  );
};

export default PatternCreator;
