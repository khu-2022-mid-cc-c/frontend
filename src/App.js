import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";

import FileManager from "./components/filemanager/fileManager";
import AuthForm from "./components/auth/main";
import ShareDrive from "./components/share/main";
import DriveList from "./components/driveList/driveList";
import EmbedRenderer from "./embed/embedRenderer";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/drive/:driveId" element={<FileManager />} />
                <Route path="/drives" element={<DriveList />} />
                <Route path="/login" element={<AuthForm type={"LOGIN"} />} />
                <Route
                    path="/register"
                    element={<AuthForm type={"REGISTER"} />}
                />
                <Route path="/embed/*" element={<EmbedRenderer />} />
                <Route path="/share/:id" element={<ShareDrive />} />
                <Route path="/" element={<Navigate to="/drives" />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
