import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    const fontSize = localStorage.getItem("fontSize");
    const altoContraste = localStorage.getItem("altoContraste");

    if (fontSize) {
      document.documentElement.style.fontSize = `${fontSize}px`;
    }

    if (altoContraste === "true") {
      document.body.classList.add("alto-contraste");
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;