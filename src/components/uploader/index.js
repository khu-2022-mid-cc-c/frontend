import './uploader.css';
import React, {useRef} from "react";

/**
 * AWS 파일 업로더
 * @param {JSX.Element} [props.uploadBox] 업로드 박스 (JSX 엘리먼트)
 * @param {string} [props.uploadURL] 업로드할 URL
 * @param {(fileName: string) => void} [props.OnUploadStarted] 업로드가 시작되었을 때 호출되는 함수
 * @param {(percent: number) => void} [props.OnUploadStatusChanged] 업로드 퍼센테이지가 변경되었을 때 호출되는 함수
 * @param {() => void} [props.OnUploadDone] 업로드가 완료되었을 때 호출되는 함수
 * @param {(error: string) => void} [props.OnUploadFail] 업로드가 실패하였을 때 호출되는 함수
 * @returns {JSX.Element}
 * @constructor
 */
const Uploader = (props) => {
  let uploadBox = props.uploadBox;
  if (uploadBox === undefined) {
    uploadBox = <div>Drop file here or click here to upload file</div>;
  }

  const UploadFile = async (event, element = null) => {
    const input = element ?? event.target;
    const files = input.files;

    if (files.length > 1) {
      alert('한번에 한 개의 파일만 업로드할 수 있습니다.');
      input.files = [];
      return;
    } else if (files.length < 1) {
      return;
    }


    const file = files[0];
    const form = new FormData();
    form.append('uploadedFile', file, file.name);

    const request = new XMLHttpRequest();
    request.open('PUT', props.uploadURL);

    request.upload.addEventListener('progress', function(e) {
      const percent_completed = (e.loaded / e.total) * 100;
      if (props.OnUploadStatusChanged) props.OnUploadStatusChanged(percent_completed);
    });

    request.addEventListener('load', function() {
      if (request.status === 200) {
        if (props.OnUploadDone) props.OnUploadDone();
      } else {
        if (props.OnUploadFail) props.OnUploadFail(request.responseXML.querySelector('Error Message').innerHTML);
      }
    });

    request.send(form);
    if (props.OnUploadStarted) props.OnUploadStarted(file.name);
  }

  const InputFile = React.forwardRef((props, ref) => {
    return <input type={"file"} ref={ref} onChange={UploadFile} />;
  });

  const fileInput = useRef(null);

  const OnFileDrop = (event) => {
    event.preventDefault();

    fileInput.current.files = event.dataTransfer.files;
    UploadFile(null, fileInput.current).then();
  }

  const OpenFileSelector = () => {
    fileInput.current.click();
  }

  return (
    <div
      className={"FileUploader"}
      onDragOver={(e) => e.preventDefault()}
      onDrop={OnFileDrop}
      onClick={OpenFileSelector}
    >
      <InputFile ref={fileInput} />
      {uploadBox}
    </div>
  );
};

export default Uploader;
