import "./App.css";
import NavbarComponent from "./components/NavBarComponent";
import SearchBar from "./components/SearchBar";
import WeatherSection from "./components/WeatherSection";
import FooterComponent from "./components/FooterComponent";
import spring from "./assets/backgrounds/spring.jpg";
import summer from "./assets/backgrounds/summer.jpg";
import autumn from "./assets/backgrounds/autumn.jpg";
import winter from "./assets/backgrounds/winter.jpg";

function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

const seasonBackgrounds = {
  spring,
  summer,
  autumn,
  winter,
};

export default function App() {
  const season = getCurrentSeason();
  const backgroundImage = seasonBackgrounds[season];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <NavbarComponent />

      <main
        style={{ flex: 1, background: "linear-gradient(rgb(144 223 254 / 38%) 0%, rgb(7 74 103 / 54%) 100%)" }}
        className="d-flex flex-column align-items-center justify-content-center"
      >
        <SearchBar />
        <WeatherSection />
      </main>

      <FooterComponent />
    </div>
  );
}
