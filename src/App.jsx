import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'

function App() {

  return (
      <Router>
          <div className="app-container">
              <Header />
              <main className="main-content">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/search-results" element={<SearchResults />} />
                      <Route path="/recipe/:id" element={<RecipeDetails />} />
                      <Route path="/favourite" element={<FavouriteRecipe />} />
                      <Route path="/login" element={<Login />} />
                  </Routes>
              </main>
              <Footer />
          </div>
      </Router>
  );
}

export default App
