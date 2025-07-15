import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navebar';
import Footer from './Components/Footer';
import PagesRoutes from './Routes/PagesRoute';
import ScrollToTop from './Components/ScrollToTop'; // ⬅️ Import it here

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* ⬅️ Place it here, right inside Router */}
      <Navbar />
      <PagesRoutes />
      <Footer />
    </Router>
  );
}

export default App;
