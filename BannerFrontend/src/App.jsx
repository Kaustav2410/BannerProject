import {BrowserRouter,Route, Routes} from "react-router-dom"
import FormPage from './pages/FormPage';
import BannerPage from './pages/BannerPage';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage/>} />
        <Route path="/:id" element={<BannerPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
