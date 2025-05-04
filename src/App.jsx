import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/common/Header.jsx';
import Home from './pages/Home.jsx';
import './App.css'

function App() {

  return (
      <Router>
          <div className="app-container">
              <Header />
              <main className="main-content">
                  <Routes>
                      <Route path="/" element={<Home />} />

                  </Routes>
              </main>
          </div>
      </Router>
  );
}

export default App
