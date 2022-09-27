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
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import PostDetail from './pages/PostDetail';


function App() {
  return (
    <Router>
        <div className='w-screen'>
            <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/logout" element={<Logout/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route path="/:id" element={<PostDetail/>}/>
                <Route path="/" element={<Home/>}/>
                {/* No match route */}
                <Route path="*" element={<Navigate to="/" replace />}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;
