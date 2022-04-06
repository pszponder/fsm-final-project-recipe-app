// Import React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORT PAGES (COMPONENTS)
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import SelectIngredients from './pages/SelectIngredients';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import RecipeSearch from './pages/RecipeSearch';
import Recipe from './pages/Recipe';

// IMPORT COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';

// IMPORT STYLING
import './styles/app.css';

// Create App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="pages">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/" element={<SelectIngredients />} />
            <Route path="/recipe-list" element={<RecipeList />} />
            <Route path="/recipe-detail" element={<RecipeDetail />} />
            <Route path="/recipe-search" element={<RecipeSearch />} />
            <Route path="/recipe" element={<Recipe />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
