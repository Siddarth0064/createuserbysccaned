import './App.css';
import UserForm from "./components/usercreatefrom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
            <Routes>
            <Route path="/" element={ <UserForm />} />
        </Routes>
        </Router>
);
}

export default App;
