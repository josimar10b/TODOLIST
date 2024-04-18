import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Task from "./components/Task";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Task />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;

