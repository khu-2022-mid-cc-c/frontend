import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/layout";
import FileManager from "./components/filemanager/fileManager";
import Login from "./components/auth/main";

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
                <Route path="/login" element={<Login type={"LOGIN"}/>} />
                <Route path="/register" element={<Login type={"REGISTER"}/>} />
            </Routes>
        </Router>
    );
}

export default App;
