import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

function App() {
    return (
		<Router>
      		<Routes>
        		<Route path="/" element={<AppEntry />} />
      		</Routes>
    	</Router>
    );
}

const AppEntry = () => {
    return (
    	<div>
      		<h1>QuisPete</h1>
    	</div>
  	);
}

export default App;
