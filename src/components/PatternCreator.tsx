import { useState } from "react";
import FileUpload from "./FileUpload";
import ImageToCanvas from "./ImageToCanvas";
import Pattern from "afghan-square-maker/dist/src/pattern";
import PatternEditor from "./PatternEditor";
import Method from "afghan-square-maker/dist/src/method";

const PatternCreator = () => {
  const [file, setFile] = useState<File>();
  const [pattern, setPattern] = useState<Pattern>();
  const [groupRows, setGroupRows] = useState(true);

  function handleFileUpload(file: File): void {
    setFile(file);
  }

  function handleCanvasReady(canvas: HTMLCanvasElement): void {
    setPattern(Pattern.FromCanvas(canvas));
  }

  function handlePatternEdit(newPattern: boolean[][]): void {
    setPattern(Pattern.FromRows(newPattern));
  }

  return (
    <div className="flex flex-col gap-4 items-center align-middle justify-center">
      <div className="flex items-center justify-between border">
        <FileUpload onFileUploaded={handleFileUpload} />
      </div>
      <div className="hidden">
        {file && (
          <ImageToCanvas file={file} onCanvasReady={handleCanvasReady} />
        )}
      </div>
      {pattern && (
        <div className="flex flex-col gap-4 align-middle items-center justify-center w-screen">
          <div>
            <PatternEditor
              pattern={pattern.rows}
              onChange={handlePatternEdit}
            />
          </div>
          <div className="flex flex-col whitespace-nowrap items-center w-full">
            <div className="flex flex-row gap-2">
              <div>
                <input
                  type="checkbox"
                  checked={groupRows}
                  onChange={() => setGroupRows(!groupRows)}
                ></input>
              </div>
              <div>Group identical rows?</div>
            </div>
            <div>
              {Method.FromPattern(pattern, { groupRows }).map((val) => (
                <p>{val}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternCreator;
