import DropZoneComponent from "@components/DropZoneComponent";
import RenderFile from "@components/RenderFile";
import { useState } from "react";
import axios from "axios";
import DownloadFile from "@components/DownloadFile";
import EmailForm from "@components/EmailForm";

export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadPageLink, setDownloadPageLink] = useState(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");

  const handleUpload = async () => {
    if (uploadState == "Uploading") return;
    setUploadState("Uploading");

    const formData = new FormData();
    formData.append("myFile", file); // menyesuaikan dengan nama di backend

    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDownloadPageLink(data.downloadedPageLink);
      setId(data.id);
    } catch (error) {
      console.log(error.response.data);
      setUploadState("Upload Failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setDownloadPageLink(null);
    setUploadState("Upload");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium">
        Got a File? Share it like Fake News
      </h1>
      <div className="flex w-96 flex-col items-center bg-gray-800 shadow-xl rounded-xl justify-center">
        {/* Dropzone */}
        {!downloadPageLink && <DropZoneComponent setFile={setFile} />}

        {/* Render file */}
        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}

        {/* Upload button */}
        {!downloadPageLink && file && (
          <button className="button" onClick={handleUpload}>
            {uploadState}
          </button>
        )}

        {downloadPageLink && (
          <div className="p-2 text-center">
            <DownloadFile downloadPageLink={downloadPageLink} />
            {/* Email */}
            <EmailForm id={id} />

            <button className="button" onClick={resetComponent}>
              Upload new File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
