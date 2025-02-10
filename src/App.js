import './App.css';
import UserForm from "./components/usercreatefrom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";    
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  && sed -i 's|/static|/createuserbysccaned/static|g' build/index.html

function App() {
  return (
    <Router  basename="/createuserbysccaned">
      <Routes>
        <Route path="/" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
