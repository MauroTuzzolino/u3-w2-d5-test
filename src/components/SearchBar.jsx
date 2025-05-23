import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/details/${city}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex my-3 justify-content-center" style={{ width: "100%" }}>
      <input
        type="text"
        placeholder="Cerca una città"
        className="form-control me-2"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ width: "100%", maxWidth: "800px" }}
      />
      <button className="btn btn-primary" type="submit">
        Cerca
      </button>
    </form>
  );
}
