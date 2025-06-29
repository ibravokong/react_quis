import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

function App() {
	const [pregunta, setPregunta] = useState(null);

	const handleGetPregunta = async () => {
		setPregunta(undefined);
		const res = await api.get("/preguntas/random");
		setPregunta(res);
		console.log(res);
	}

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<button onClick={handleGetPregunta}>Get Pregunta</button>
			{pregunta ? (
				<div>
					<h2>{pregunta.preguntaa}</h2>
					<ul>
						{[pregunta.AltCorrecta, pregunta.Alt1, pregunta.Alt2, pregunta.Alt3].map(
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

const PreguntaComponent = () => {
	
}

export default App;