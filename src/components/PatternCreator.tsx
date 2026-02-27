import { useState } from "react";
import FileUpload from "./FileUpload";
import ImageToCanvas from "./ImageToCanvas";
import PatternEditor from "./PatternEditor";
import { Pattern, Method } from "afghan-square-maker";
import Messages from "./Messages";

const PatternCreator = () => {
  const [file, setFile] = useState<File>();
  const [pattern, setPattern] = useState<Pattern>();
  const [groupRows, setGroupRows] = useState(true);
  const [messages, setMessages] = useState<string[]>([]);

  function onUpdate(component: string) {
    return function (message: string) {
      setMessages((prev) => [
        ...prev,
        `${component}: ${message.substring(0, 64)}`,
      ]);
    };
  }

  const sendUpdate = onUpdate("pattern creator");

  function handleFileUpload(file: File): void {
    setFile(file);
  }

  function handleCanvasReady(canvas: HTMLCanvasElement): void {
    sendUpdate("setting the pattern from canvas");
    const pattern = Pattern.FromCanvas(canvas);
    sendUpdate(`pattern ${pattern.height}, ${pattern.width}`);
    setPattern(pattern);
  }

  function handlePatternEdit(newPattern: boolean[][]): void {
    sendUpdate("setting the pattern from edit");
    setPattern(Pattern.FromRows(newPattern));
  }

  return (
    <div className="flex flex-col gap-4 items-center align-middle justify-center max-w-screen min-w-screen p-4">
      <Messages messages={messages} />
      <div className="flex items-center justify-between border">
        <FileUpload
          onFileUploaded={handleFileUpload}
          onUpdate={onUpdate("file upload")}
        />
      </div>
      <div className="hidden">
        {file && (
          <ImageToCanvas
            file={file}
            onCanvasReady={handleCanvasReady}
            onUpdate={onUpdate("image to canvas")}
          />
        )}
      </div>
      {pattern && (
        <div className="flex flex-col gap-4 align-middle items-center justify-center w-full">
          <div className="w-full max-w-3xl">
            <PatternEditor
              pattern={pattern.rows}
              onChange={handlePatternEdit}
            />
          </div>
          <div className="flex flex-col items-center w-full">
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
              {Method.FromPattern(pattern, { groupRows }).map((val, idx) => (
                <p key={idx}>{val}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternCreator;
