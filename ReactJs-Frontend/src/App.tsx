import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import SigninScreen from "./Screens/SigninScreen";

import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="/product/id/:id" element={<ProductScreen />} />
          <Route path="/login" element={<SigninScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
