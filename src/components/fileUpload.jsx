import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginCopyPath from "filepond-plugin-copy-path"
// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function FileUpload({setPdfFile}) {
  const [files, setFiles] = useState([]);

  useEffect(()=>{
    if(files.length){
      console.log("entering if")
    console.log(files[0].file)
    setPdfFile(files)
    }
  },[files])
  // FilePond.setOptions({
  //   server:{
  //       url: 'http://192.168.0.100',
  //       process: './process',
  //       revert: './revert',
  //       restore: './restore/',
  //       load: './load/',
  //       fetch: './fetch/'
  //   }});
  return (
    <div >
      <FilePond
        files={files}
        allowReorder={true}
        allowMultiple={true}
        onupdatefiles={setFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  );
}