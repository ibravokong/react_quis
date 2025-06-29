import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

function App() {
	const [pregunta, setPregunta] = useState(null);

	const handleGetPregunta = async () => {
		setPregunta(undefined);
		//const res = await api.get("/preguntas/random");
		const res = {
			"preguntaa": "Title Pregunta",
			"altCorrecta": "alt correcta",
			"alt1": "alt 1",
			"alt2": "alt 2",
			"alt3": "alt 3"
		}
		setPregunta(res);
		console.log(res);
	}

	return (
		<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
			<button onClick={handleGetPregunta}>Get Pregunta</button>
			{pregunta ? (
				<div>
					<PreguntaComponent pregunta={pregunta} />
				</div>
			) : (
				<p>Cargando pregunta...</p>
			)}
		</div>
	);
}

const PreguntaComponent = ({ pregunta }) => {
	const [seleccionada, setSeleccionada] = useState(null);
	const [respondido, setRespondido] = useState(false);
	const [esCorrecta, setEsCorrecta] = useState(null);

	const alternativas = [
		{ texto: pregunta.altCorrecta, id: "correcta" },
		{ texto: pregunta.alt1, id: "alt1" },
		{ texto: pregunta.alt2, id: "alt2" },
		{ texto: pregunta.alt3, id: "alt3" },
	];

	const handleSeleccion = (idx) => {
		if (respondido) return;
		setSeleccionada(idx);
		setRespondido(true);
		setEsCorrecta(alternativas[idx].id === "correcta");
	};

	const handleReiniciar = () => {
		setSeleccionada(null);
		setRespondido(false);
		setEsCorrecta(null);
	};

	return (
		<div>
			<h2>{pregunta.preguntaa}</h2>
			<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
				{alternativas.map((alt, idx) => (
					<BotonAlternativaComponent
						key={idx}
						texto={alt.texto}
						seleccionada={seleccionada === idx}
						esCorrecta={alt.id === "correcta"}
						respondido={respondido}
						esSeleccion={seleccionada === idx}
						onClick={() => handleSeleccion(idx)}
					/>
				))}
			</div>

			{respondido && (
				<div style={{ marginTop: "15px" }}>
					<p style={{ fontWeight: "bold" }}>
						{esCorrecta ? "✅ ¡Respuesta correcta!" : "❌ Respuesta incorrecta"}
					</p>
					<button onClick={handleReiniciar}>Reiniciar</button>
				</div>
			)}
		</div>
	);
};

const BotonAlternativaComponent = ({
	texto,
	seleccionada,
	esCorrecta,
	respondido,
	esSeleccion,
	onClick,
}) => {
	let backgroundColor = "#f0f0f0";

	if (respondido) {
		if (esSeleccion) {
			backgroundColor = esCorrecta ? "#4caf50" : "#f44336";
		} else if (esCorrecta) {
			backgroundColor = "#c8e6c9";
		}
	} else if (seleccionada) {
		backgroundColor = "#d0d0ff";
	}

	return (
		<button
			onClick={onClick}
			style={{
				padding: "10px",
				backgroundColor,
				color: "black",
				border: "1px solid #ccc",
				borderRadius: "4px",
				cursor: respondido ? "default" : "pointer",
				textAlign: "left",
			}}
			disabled={respondido}
		>
			{texto}
		</button>
	);
};

export default App;