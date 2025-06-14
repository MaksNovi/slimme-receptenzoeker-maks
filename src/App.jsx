import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/common/Header.jsx';
import Home from './pages/Home.jsx';
import Footer from "./components/common/Footer.jsx";
import SearchRecipes from "./pages/SearchRecipes.jsx";
import RecipeDetails from "./pages/RecipeDetails.jsx";
import PopularRecipes from "./pages/PopularRecipes.jsx";
import Favorites from "./pages/Favorites.tsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import './App.css'

function App() {

  return (
      <AuthProvider>
      <Router>
          <div className="app-container">
              <Header />
              <main className="main-content">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search-results" element={<SearchRecipes />} />
                      <Route path="/recipe/:id" element={<RecipeDetails />} />
                      <Route path="/popular-recipes" element={<PopularRecipes />} />
                      <Route path="/favorites" element={<Favorites/>} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                  </Routes>
              </main>
              <Footer/>
          </div>
      </Router>
      </AuthProvider>
  );
}

export default App
