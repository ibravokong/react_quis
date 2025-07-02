import axios from "axios";
import { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/PreguntaComponent.css";
import "./styles/BotonAlternativaComponent.css";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Función para desordenar un array
function mezclarArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function App() {
    const [pregunta, setPregunta] = useState(null);

    const handleGetPregunta = async () => {
        setPregunta(undefined);
        try {
            //const res = await api.get("/preguntas/random");
            //const data = res.data;
            const data = {
                "preguntaa": "Title Pregunta",
                "altCorrecta": "alt correcta",
                "alt1": "alt 1",
                "alt2": "alt 2",
                "alt3": "alt 3"
            }
            setPregunta(data);
            console.log("Pregunta recibida:", data);
        } catch (err) {
            console.error("Error al obtener la pregunta:", err);
        }
    };

    return (
        <div className="app-container">
            <video autoPlay loop muted playsInline className="background-video">
                <source src="/video/background.webm" type="video/webm" />
                Tu navegador no soporta video.
            </video>
            <img
                src="/images/logo.png"
                alt="Pregunta"
                className="app-logo"
            />
            <h1 className="app-title">WoW Lore Guesser</h1>
            <button onClick={handleGetPregunta} className="boton-obtener">
                Obtener Pregunta
            </button>

            {pregunta ? (
                <PreguntaComponent pregunta={pregunta} onSiguiente={handleGetPregunta} />
            ) : (
                <p>Cargando pregunta...</p>
            )}
        </div>
    );
}

const PreguntaComponent = ({ pregunta, onSiguiente }) => {
    const [alternativas, setAlternativas] = useState([]);
    const [seleccion, setSeleccion] = useState(null);
    const [esCorrecta, setEsCorrecta] = useState(null);

    useEffect(() => {
        if (pregunta) {
        const opciones = mezclarArray([
            { texto: pregunta.altCorrecta, esCorrecta: true },
            { texto: pregunta.alt1, esCorrecta: false },
            { texto: pregunta.alt2, esCorrecta: false },
            { texto: pregunta.alt3, esCorrecta: false },
        ]);
        setAlternativas(opciones);
        setSeleccion(null);
        setEsCorrecta(null);
        }
    }, [pregunta]);

    const handleSeleccion = (opcion) => {
        if (seleccion) return;
        setSeleccion(opcion.texto);
        setEsCorrecta(opcion.esCorrecta);
    };

    return (
        <div>
            <h2 className="pregunta-titulo">{pregunta.preguntaa || "Texto no disponible"}</h2>
            <div className="pregunta-alternativas">
                {alternativas.map((opcion, idx) => (
                <BotonAlternativaComponent
                    key={idx}
                    opcion={opcion}
                    seleccion={seleccion}
                    onClick={handleSeleccion}
                />
                ))}
            </div>
            {seleccion && (
                <>
                <p className="pregunta-resultado">
                    {esCorrecta ? "✅ ¡Respuesta correcta!" : "❌ Respuesta incorrecta"}
                </p>
                <button onClick={onSiguiente} className="boton-siguiente">
                    Siguiente Pregunta
                </button>
                </>
            )}
        </div>
    );
};

const BotonAlternativaComponent = ({ opcion, seleccion, onClick }) => {
    const clase =
        "pregunta-opcion" +
        (seleccion === opcion.texto
        ? opcion.esCorrecta
            ? " correcta"
            : " incorrecta"
        : "");

    return (
        <button onClick={() => onClick(opcion)} disabled={!!seleccion} className={clase}>
        {opcion.texto}
        </button>
    );
};

export default App;

