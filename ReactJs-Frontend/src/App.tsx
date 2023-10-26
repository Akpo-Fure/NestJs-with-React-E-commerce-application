import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
