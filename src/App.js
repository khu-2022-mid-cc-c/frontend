import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FileManager from "./components/filemanager/fileManager";
import AuthForm from "./components/auth/main";
import ShareDrive from "./components/share/main";
import EmbedRenderer from "./embed/embedRenderer";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FileManager />}></Route>
                <Route path="/embed/*" element={<EmbedRenderer />}></Route>
                <Route path="/login" element={<AuthForm type={"LOGIN"}/>} />
                <Route path="/register" element={<AuthForm type={"REGISTER"}/>} />
                <Route path="/share/:id" element={<ShareDrive/>} />
            </Routes>
        </Router>
    );
}

export default App;
