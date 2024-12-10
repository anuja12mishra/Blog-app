import { Routes, Route } from 'react-router-dom';
import './App.css';
import Post from './Post';
import Header from './Header';
import Layout from './Layout';
import IndexPage from './Pages/IndexPage'; 
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  return (
    <Routes>
      {/* base tempelete */}
      <Route path="/" element={<Layout />}>
        {/* Index route for the main content */}
        <Route index element={<IndexPage />}/>
        {/* Login route */}
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/Register'} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
