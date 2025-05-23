import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavBarComponent";
import SearchBar from "./components/SearchBar";
import WeatherSection from "./components/WeatherSection";
import FooterComponent from "./components/FooterComponent";
import DetailsPage from "./components/DetailsPage";
import spring from "./assets/backgrounds/spring.jpg";
import summer from "./assets/backgrounds/summer.jpg";
import autumn from "./assets/backgrounds/autumn.jpg";
import winter from "./assets/backgrounds/winter.jpg";
import "./App.css";

// Funzione per determinare la stagione corrente – utile per cambiare lo sfondo dinamicamente
function getCurrentSeason() {
  //const fakeDate = new Date("2025-01-01"); // Data fittizia per testare la stagione
  //const month = fakeDate.getMonth();
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring"; // Mar, Apr, Mag
  if (month >= 5 && month <= 7) return "summer"; // Giu, Lug, Ago
  if (month >= 8 && month <= 10) return "autumn"; // Set, Ott, Nov
  return "winter"; // Dic, Gen, Feb
}

// Mappa per associare la stagione allo sfondo corretto
const seasonBackgrounds = {
  spring,
  summer,
  autumn,
  winter,
};

export default function App() {
  const season = getCurrentSeason(); // recupero la stagione
  const backgroundImage = seasonBackgrounds[season]; // carico lo sfondo corrispondente

  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundImage: `url(${backgroundImage})`, // sfondo stagionale
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <NavbarComponent />
        <main
          style={{
            flex: 1, // prende tutto lo spazio disponibile
            background: "linear-gradient(rgb(144 223 254 / 38%) 0%, rgb(7 74 103 / 54%) 100%)",
          }}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Routes>
            {/* Home page: mostra messaggio, search bar e meteo per città principali */}
            <Route
              path="/"
              element={
                <>
                  <div className="text-center my-4">
                    <h2>Cerca una città per visualizzare il meteo</h2>
                    <div className="d-flex justify-content-center mt-3">
                      <SearchBar />
                    </div>
                  </div>
                  <WeatherSection />
                </>
              }
            />
            {/* Pagina dettagli per città selezionata */}
            <Route path="/details/:city" element={<DetailsPage />} />
          </Routes>
        </main>
        <FooterComponent />
      </div>
    </Router>
  );
}
