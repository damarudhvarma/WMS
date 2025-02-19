import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import Login from "./components/Login";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/dashboard" element={<DefaultLayout></DefaultLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
