import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import Home from './Pages/Home';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Users from './Pages/Users';
import CreatePost from "./Pages/CreatePost";

function App() {

  return (
    <Router>
    <div>
        <Routes>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/logout" element={<Logout/>}/>
            <Route exact path="/users" element={<Users/>}/>
            <Route exact path="/create-post" element={<CreatePost/>}/>
            <Route path="/" element={<Home/>}/>
            {/* No match route */}
            <Route path="*" element={<Navigate to="/" replace />}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
