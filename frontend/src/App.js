// Import React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// IMPORT PAGES (COMPONENTS)
import Register from './pages/Register';
import Login from './pages/Login';
import SelectIngredients from './pages/SelectIngredients';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';

// IMPORT COMPONENTS
import Header from './components/Header';
import Footer from './components/Footer';

// Create App Component
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<SelectIngredients />} />
          <Route path="/recipe-list" element={<RecipeList />} />
          <Route path="/recipe-detail" element={<RecipeDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
