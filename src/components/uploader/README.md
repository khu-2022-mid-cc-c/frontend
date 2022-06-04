# AWS 파일 업로더

## 사용 예시
```jsx
import Uploader from '../components/uploader';

<Uploader
  uploadBox={<div>여기에 파일을 끌어다 놓거나 클릭하여 파일을 선택하세요.</div>}
  uploadURL={"AWS file upload URL"}
  OnUploadStarted={(filename) => console.log(`파일 ${filename} 업로드 시작됨`)}
  OnUploadStatusChanged={(percent) => console.log(`파일 업로드 ${percent}% 완료`)}
  OnUploadDone={() => console.log('파일 업로드 성공')}
  OnUploadFail={(msg) => console.log(msg)}
/>
```
