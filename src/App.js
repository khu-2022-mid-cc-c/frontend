import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FileManager from "./components/filemanager/fileManager";
import AuthForm from "./components/auth/main";
import ShareDrive from "./components/share/main";
import DriveList from "./components/driveList/driveList";
import EmbedRenderer from "./embed/embedRenderer";
import About from "./components/about/about";
import PrivateRoute from "./components/route/Private";
import PublicRoute from "./components/route/Public";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/drive/:driveId" element={<PrivateRoute />}>
                    <Route path="" element={<FileManager />} />
                </Route>
                <Route path="/drives" element={<PrivateRoute />}>
                    <Route path="" element={<DriveList />} />
                </Route>
                <Route path="/login" element={<PublicRoute />}>
                    <Route path="" element={<AuthForm type={"LOGIN"} />} />
                </Route>
                <Route path="/register" element={<PublicRoute />}>
                    <Route path="" element={<AuthForm type={"REGISTER"} />} />
                </Route>
                <Route path="/embed/*" element={<PublicRoute />}>
                    <Route path="" element={<EmbedRenderer />} />
                </Route>
                <Route path="/" element={<PublicRoute />}>
                    <Route path="" element={<About />} />
                </Route>
                <Route path="/share/:id" element={<PrivateRoute />}>
                    <Route path="" element={<ShareDrive />} />
                </Route>
                {/* <Route path="/" element={<Navigate to="/drive/asd" />}></Route> */}
            </Routes>
        </Router>
    );
}

export default App;
