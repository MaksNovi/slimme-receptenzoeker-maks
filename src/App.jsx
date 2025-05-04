import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/common/Header.jsx';
import Home from './pages/Home.jsx';
import Footer from "./components/common/Footer.jsx";
import SearchRecipes from "./pages/SearchRecipes.jsx";
import './App.css'

function App() {

  return (
      <Router>
          <div className="app-container">
              <Header />
              <main className="main-content">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search-results" element={<SearchRecipes />} />
                  </Routes>
              </main>
              <Footer/>
          </div>
      </Router>
  );
}

export default App
