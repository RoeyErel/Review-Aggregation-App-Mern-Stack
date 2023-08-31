import { Route, Routes} from "react-router-dom";
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Stream from './pages/Stream'
import axios from "axios";
import Account from '../src/pages/Account'
import PrivateRoutes from "./components/PrivateRoutes";
axios.defaults.withCredentials = true;

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route element={<PrivateRoutes/>}>
                    <Route path='/account' element={<Account/>} />
                </Route>
                <Route path="/stream/:type/:id" element={<Stream />}/>
            </Routes>
        </div>
    );
}

export default App;