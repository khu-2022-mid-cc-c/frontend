import React, {useState, useRef} from "react";

/**
 * AWS 파일 업로더
 * @param {JSX.Element} [props.uploadBox] 업로드 박스 (JSX 엘리먼트)
 * @param {(fileName: string, percent: number) => void} [props.OnUploadStatusChanged] 업로드 퍼센테이지가 변경되었을 때 호출되는 함수
 * @param {(fileName: string) => void} [props.OnUploadDone] 업로드가 완료되었을 때 호출되는 함수
 * @param {(fileName: string, error: string) => void} [props.OnUploadFail] 업로드가 실패하였을 때 호출되는 함수
 * @returns {JSX.Element}
 * @constructor
 */
const Uploader = (props) => {
  let uploadBox = props.uploadBox;
  if (uploadBox === undefined) {
    uploadBox = <div>Drop file here or click here to upload file</div>;
  }

  const RequestFileUpload = async (file, callback = (percent) => {
  }) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjU0MTk3MjM2LCJleHAiOjE2NTQyODM2MzZ9.ZpsXd2ZXbBdn-V709G3YmtlYVYFYVuEw-u3BeaOAhLE'; // Temp Token: 이후 로그인 연동하시면 변경해주세요.
    const driveId = 4;

    const request = await fetch(`https://linkhu.which.menu/api/drive/file/${driveId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        key: file.name,
        modified: file.lastModifiedDate.toISOString(),
        created: file.lastModifiedDate.toISOString(),
      }),
    });
    const json = await request.json();
    if (json.status === false) {
      return false;
    }

    const uploadRequest = new XMLHttpRequest();
    uploadRequest.open("PUT", json.url);

    uploadRequest.upload.addEventListener("progress", function (e) {
      const percent_completed = (e.loaded / e.total) * 100;
      callback(percent_completed);
    });

    uploadRequest.addEventListener("load", function () {
      if (uploadRequest.status === 200) {
        callback(true);
      } else {
        callback(uploadRequest.responseXML.querySelector("Error Message").innerHTML);
      }
    });

    uploadRequest.send(file);
    callback(0);
  }

  const UploadFile = async (event, element = null) => {
    const input = element ?? event.target;
    const files = input.files;

    if (files.length < 1) {
      return;
    }

    for (const file of files) {
      await RequestFileUpload(file, (data) => {
        if (typeof data === 'string') {
          if (props.OnUploadFail !== undefined)
            props.OnUploadFail(file.name, data);
        } else if (data === true) {
          if (props.OnUploadDone !== undefined)
            props.OnUploadDone(file.name);
        } else {
          if (props.OnUploadStatusChanged !== undefined)
            props.OnUploadStatusChanged(file.name, data);
        }
      });
    }
  };

  const InputFile = React.forwardRef((props, ref) => {
    return <input type={"file"} ref={ref} onChange={UploadFile}/>;
  });

  const fileInput = useRef(null);

  const OnFileDrop = (event) => {
    event.preventDefault();

    fileInput.current.files = event.dataTransfer.files;
    UploadFile(null, fileInput.current).then();
  };

  const OpenFileSelector = () => {
    fileInput.current.click();
  };

  return (
    <div
      className={"apiModalContents FileUploader"}
      onDragOver={(e) => e.preventDefault()}
      onDrop={OnFileDrop}
      onClick={OpenFileSelector}
    >
      <InputFile ref={fileInput}/>
      {uploadBox}
    </div>
  );
};

function UploadProgress(props) {
  return (
    <div className="apiModalContents uploadFileModal">
      <h2>파일 업로드</h2>
      {props.files.map(file => (
        <div>{file.fileName} 업로드 {file.progress !== true ? (
          <progress max="100" value={file.progress}>
            {props.progress}%
          </progress>
        ) : file.progress === true ? (
          '완료'
        ) : file.error !== false ? (
          '실패'
        ) : ''}</div>
      ))}
    </div>
  );
}

function UploadFile(props) {
  const [mouseOver, setMouseOver] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState([]);

  const dropHandler = (e) => {
    e.preventDefault();
    setMouseOver(false);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    setMouseOver(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setMouseOver(false);
  };

  return (
    fileUploadProgress.length < 1 ? (
      <Uploader
        uploadURL={"https://linkhu-drive-4.s3.ap-northeast-2.amazonaws.com/test_file.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZUKHZ3I5YS3D56LT%2F20220602%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220602T193128Z&X-Amz-Expires=900&X-Amz-Signature=62bbcf33d5d9713b8396d4d3b6ae9a28a5bb5494600aa99ffbcf72e8d54476cb&X-Amz-SignedHeaders=host%3Bx-amz-meta-createdat%3Bx-amz-meta-updatedat%3Bx-amz-meta-uploader&x-amz-meta-createdat=2022-06-02T19%3A31%3A28.857Z&x-amz-meta-updatedat=2022-06-02T19%3A31%3A28.857Z&x-amz-meta-uploader=1"}
        uploadBox={
          <div
            className="uploadFileModal"
            onDrop={dropHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
          >
            <h2>파일 업로드</h2>
            <div
              className={`fileDropZone ${
                mouseOver ? "mouseOver" : ""
              }`}
            >
              여기에 파일(들)을 드래그해주세요
            </div>
          </div>
        }
        OnUploadStatusChanged={(fileName, progress) => {
          const currentFileUploadProgress = fileUploadProgress;
          const currentFile = currentFileUploadProgress.findIndex(p => p.fileName === fileName);
          if (currentFile === -1) {
            currentFileUploadProgress.push({
              fileName,
              progress,
              error: false,
            });
          } else {
            currentFileUploadProgress[currentFile].progress = progress;
          }

          setFileUploadProgress([...currentFileUploadProgress]);
        }}
        OnUploadDone={(fileName) => {
          const currentFileUploadProgress = fileUploadProgress;
          const currentFile = currentFileUploadProgress.findIndex(p => p.fileName === fileName);
          if (currentFile === -1) {
            currentFileUploadProgress.push({
              fileName,
              progress: true,
              error: false,
            });
          } else {
            currentFileUploadProgress[currentFile].progress = true;
          }

          setFileUploadProgress([...currentFileUploadProgress]);
        }}
        OnUploadFail={(fileName, message) => {
          const currentFileUploadProgress = fileUploadProgress;
          const currentFile = currentFileUploadProgress.findIndex(p => p.fileName === fileName);
          if (currentFile === -1) {
            currentFileUploadProgress.push({
              fileName,
              progress: 0,
              error: message,
            });
          } else {
            currentFileUploadProgress[currentFile].error = message;
          }

          setFileUploadProgress([...currentFileUploadProgress]);
        }}
      />
    ) : (
      <UploadProgress
        files={fileUploadProgress}
      />
    ));
}

export default UploadFile;
