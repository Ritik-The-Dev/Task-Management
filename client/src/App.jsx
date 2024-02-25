import AllRoutes from "./AllRoutes";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <div className="bg-[#f8f8f8] min-h-[100vh]">
      <Router>
        <AllRoutes />
      </Router>
    </div>
  )
}
