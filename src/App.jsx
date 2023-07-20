import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import Stands from "./components/DataFetching/Stands/Stands";
import Characters from "./components/DataFetching/Characters/Characters";
import CharacterDetails from "./components/DataFetching/Characters/CharacterDetails";
import Home from "./components/Home/Home";
import StandDetails from "./components/DataFetching/Stands/StandDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stands" element={<Stands />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetails />} />
        <Route path="/stands/:id" element={<StandDetails />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
