import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/layout";
import FileManager from "./components/filemanager/fileManager";
import AuthForm from "./components/auth/main";
import ShareDrive from "./components/share/main";

import PrivateRoute from "./components/route/Private";
import PublicRoute from "./components/route/Public";

import "./App.css";

function App() {
    return (
        <Router>
            <Routes>
                 <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={
                        <Layout>
                            <FileManager />
                        </Layout>
                    }/>
                </Route>
                <Route path="/login" element={<PublicRoute />}>
                    <Route path="" element={<AuthForm type={"LOGIN"}/>} />
                </Route>
                <Route path="/register" element={<PublicRoute />}>
                    <Route path="" element={<AuthForm type={"REGISTER"}/>} />
                </Route>
                <Route path="/share/:id" element={<PrivateRoute />}>
                    <Route path="" element={<ShareDrive/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
