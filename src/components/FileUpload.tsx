import { type ChangeEventHandler } from "react";

type Props = {
  onFileUploaded: (file: File) => void;
  onUpdate?: (update: string) => void;
};

const FileUpload = ({ onFileUploaded, onUpdate = () => {} }: Props) => {
  const onFileChanged: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files === null || files.length === 0) {
      onUpdate("no file found");
      return;
    }

    onUpdate("file added, updating...");
    onFileUploaded(files[0]);
  };

  return (
    <div>
      <label htmlFor="file-upload">Upload your image</label>
      <input
        className="hidden"
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={onFileChanged}
      />
    </div>
  );
};

export default FileUpload;
