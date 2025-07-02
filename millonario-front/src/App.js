import axios from "axios";
import { useState } from "react";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// Función para desordenar un array
function mezclarArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function App() {
  const [pregunta, setPregunta] = useState(null);
  const [alternativas, setAlternativas] = useState([]);
  const [seleccion, setSeleccion] = useState(null);
  const [esCorrecta, setEsCorrecta] = useState(null);

  const handleGetPregunta = async () => {
    setPregunta(undefined);
    setSeleccion(null);
    setEsCorrecta(null);
    try {
      const res = await api.get("/preguntas/random");
      const data = res.data;
      setPregunta(data);

      // Mezcla las alternativas
      const opciones = mezclarArray([
        { texto: data.altCorrecta, esCorrecta: true },
        { texto: data.alt1, esCorrecta: false },
        { texto: data.alt2, esCorrecta: false },
        { texto: data.alt3, esCorrecta: false },
      ]);
      setAlternativas(opciones);

      console.log("Pregunta recibida:", data);
    } catch (err) {
      console.error("Error al obtener la pregunta:", err);
    }
  };

  const handleSeleccion = (opcion) => {
    if (seleccion) return; // Evita seleccionar más de una vez
    setSeleccion(opcion.texto);
    setEsCorrecta(opcion.esCorrecta);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIBP6hnbGCcpp0M9iliuWVuTaSVOv2oNPRA&s"
        alt="Pregunta"
        style={{ width: "120px", marginBottom: "20px" }}
      />
      <h1>WoW Lore Guesser</h1>
      <button
        onClick={handleGetPregunta}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Obtener Pregunta
      </button>

      {pregunta ? (
        <div>
          <h2>{pregunta.preguntaa || "Texto no disponible"}</h2>
          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            {alternativas.map((opcion, idx) => (
              <button
                key={idx}
                onClick={() => handleSeleccion(opcion)}
                disabled={!!seleccion}
                style={{
                  display: "block",
                  margin: "10px 0",
                  padding: "10px 20px",
                  backgroundColor:
                    seleccion === opcion.texto
                      ? opcion.esCorrecta
                        ? "#4CAF50"
                        : "#dc3545"
                      : "#f0f0f0",
                  color: seleccion === opcion.texto ? "#fff" : "#333",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: seleccion ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                }}
              >
                {opcion.texto}
              </button>
            ))}
          </div>
          {seleccion && (
            <p style={{ marginTop: "15px", fontSize: "18px", fontWeight: "bold" }}>
              {esCorrecta ? "✅ ¡Respuesta correcta!" : "❌ Respuesta incorrecta"}
            </p>
          )}
        </div>
      ) : (
        <p>Cargando pregunta...</p>
      )}
    </div>
  );
}

export default App;

