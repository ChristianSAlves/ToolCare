import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Rotas from './rotas_react.js';
import { ApiProvider } from './ApiContext.js'; 

function App() {
    return (
        <Router>
            <ApiProvider>
                <Rotas/>
            </ApiProvider>
        </Router>
    );
}

export default App;

