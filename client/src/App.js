import { Routes, Route } from 'react-router-dom';
import './App.css';
import Post from './Post';
import Header from './Header';

function App() {
  return (
    <Routes>
      {/* Index route for the main content */}
      <Route
        index 
        element={
          <main>
            <Header />
            <Post />
            <Post />
            <Post />
            <Post />
          </main>
        }
      />
      {/* Login route */}
      <Route path={'/login'} element={
          <main>
            <Header />
            <div>Login Page</div>
          </main>
        } 
      />
    </Routes>
  );
}

export default App;
