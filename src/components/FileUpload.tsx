import { type ChangeEventHandler } from "react";

type Props = { onFileUploaded: (file: File) => void };

const FileUpload = ({ onFileUploaded }: Props) => {
  const onFileChanged: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (files === null || files.length === 0) {
      return;
    }

    onFileUploaded(files[0]);
  };

  return <input type="file" accept="image/*" onChange={onFileChanged} />;
};

export default FileUpload;
