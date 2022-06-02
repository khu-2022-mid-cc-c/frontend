import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/layout";
import FileManager from "./components/filemanager/fileManager";
import AuthForm from "./components/auth/main";
import ShareDrive from "./components/share/main";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout>
                        <FileManager />
                    </Layout>
                }/>
                <Route path="/login" element={<AuthForm type={"LOGIN"}/>} />
                <Route path="/register" element={<AuthForm type={"REGISTER"}/>} />
                <Route path="/share/:id" element={<ShareDrive/>} />
            </Routes>
        </Router>
    );
}

export default App;
