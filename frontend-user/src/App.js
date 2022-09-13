import './index.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
  //import components
  import Home from './pages/Home';
  import Login from './pages/Login';


function App() {
  return (
    <Router>
        <div>
            <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
                {/* No match route */}
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
