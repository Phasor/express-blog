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
import UserDetail from './Components/UserDetail';
import CreatePost from "./Pages/CreatePost";
import PostDetail from "./Components/PostDetail";
import PrivateRoutes from "./Components/PrivateRoutes";
import './index.css'

function App() {

  return (
    <Router>
    <div className="font-roboto text-gray-800 bg-[#E5E7EB]">
        <Routes>
            <Route index element={<Login/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/logout" element={<Logout/>}/>
                <Route path="/users/:id" element={<UserDetail/>}/>
                <Route exact path="/users" element={<Users/>}/>
                <Route exact path="/create-post" element={<CreatePost/>}/>
                <Route path="/post/:id" element={<PostDetail/>}/>
            </Route>
            {/* No match route */}
            <Route path="*" element={<Navigate to="/home"/>}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
