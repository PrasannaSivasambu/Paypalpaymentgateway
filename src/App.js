import Home from './Component/Home';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Order from './Component/Order';
import { AppcontextProvider } from './Context/Appcontext';

function App() {
  return (
    <AppcontextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Order" element={<Order />} />
        </Routes>
      </Router>
    </AppcontextProvider>
  );
}

export default App;
