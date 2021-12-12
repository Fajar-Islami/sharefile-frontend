import RenderFile from "@components/RenderFile";
import axios from "axios";
import { IFile } from "libs/types";
import { GetServerSidePropsContext, NextPage } from "next";
import fileDownload from "js-file-download";

const index: NextPage<{ file: IFile }> = ({
  file: { format, name, sizeInBytes, id },
}) => {
  const handlerDownload = async () => {
    const { data } = await axios.get(`/api/files/${id}/download`, {
      responseType: "blob", // agar download abe;
    });

    fileDownload(data, name);
  };
  return (
    <div className="flex flex-col items-center justify-center py-3 space-y-4 bg-gray-800 rounded-md shadow-xl w-96">
      {!id ? (
        <span>Oops! File does not exist! check the url </span>
      ) : (
        <>
          <img
            src="/images/file-download.png"
            alt="download"
            className="w-16 h-16"
          />
          <h1 className="text-xl">Your file is ready to be downloaded</h1>
          <RenderFile file={{ format, name, sizeInBytes }} />
          <button className="button" onClick={handlerDownload}>
            Download
          </button>
        </>
      )}{" "}
    </div>
  );
};

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;
  let file;

  try {
    const { data } = await axios.get(
      `${process.env.API_BASE_ENDPOINT}/api/files/${id}`
    );
    file = data;
  } catch (error) {
    console.log(error.response.data);
    file = {};
  }

  return {
    props: { file },
  };
}
