// components/FileUpload.tsx
import React, { useState } from "react";
import Uppy from "@uppy/core";
import XHR from "@uppy/xhr-upload";
import { DashboardModal } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

export type FileUploadSchema = {
  modalTriggerFromUppy?: boolean;
  image?: string;
  artCover?: string;
  triggerId?: "image" | "artCover" | null;
};

export type ModalTrigger = {
  isOpen: boolean;
  triggerId: "image" | "artCover" | null;
};

export type DataFromFileUpload = (data: FileUploadSchema) => void;

interface FileUploadProps {
  modalTrigger: ModalTrigger;
  dataFromFileUpload: DataFromFileUpload;
}
const FileUpload: React.FC<FileUploadProps> = ({
  modalTrigger,
  dataFromFileUpload,
}) => {
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        maxFileSize: 5000000,
        allowedFileTypes: ["image/*"],
      },
    }).use(XHR, {
      endpoint: "/api/upload",
      fieldName: "file",
      formData: true,
    })
  );
  const [fileData, setFileData] = useState({
    image: "",
    artCover: "",
  });
  uppy.on("dashboard:modal-closed", () => {
    dataFromFileUpload({
      modalTriggerFromUppy: false,
    });
  });

  uppy.on("upload-success", (file, response) => {
    if (response.body) {
      const newFileData = { ...fileData };
      // Update based on the triggerId
      if (modalTrigger.triggerId === "image") {
        newFileData.image = response.body.fileUrl;
      } else if (modalTrigger.triggerId === "artCover") {
        newFileData.artCover = response.body.fileUrl;
      }

      // Set the updated file data
      setFileData(newFileData);

      // Call the function with updated data
      dataFromFileUpload({
        image: newFileData.image,
        artCover: newFileData.artCover,
        triggerId: modalTrigger.triggerId!,
      });
    }
  });

  uppy.on("dashboard:close-panel", () => {
    dataFromFileUpload({
      modalTriggerFromUppy: false,
    });
  });

  return (
    <div>
      <DashboardModal uppy={uppy} open={modalTrigger.isOpen} theme="dark" />
    </div>
  );
};

export default FileUpload;
