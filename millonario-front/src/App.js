import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

function App() {
  const [pregunta, setPregunta] = useState(null);

  const handleGetPregunta = async () => {
    setPregunta(undefined);
    try {
      const res = await api.get("/preguntas/random");
      setPregunta(res.data);
      console.log("Respuesta del backend:", res.data);
    } catch (err) {
      console.error("Error al obtener la pregunta:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button onClick={handleGetPregunta}>Get Pregunta</button>
      {pregunta ? (
        <div>
          <h2>{pregunta.preguntaa || "Texto no disponible"}</h2>
          <ul>
            {[pregunta.altCorrecta, pregunta.alt1, pregunta.alt2, pregunta.alt3].map(
              (opcion, idx) => (
                <li key={idx}>{opcion}</li>
              )
            )}
          </ul>
        </div>
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </div>
  );
}

export default App;
