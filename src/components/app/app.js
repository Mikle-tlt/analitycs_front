import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useUserStore} from "../../services/user/user-service";
import Login from "../login/login";
import Header from "../header/header";
import Profiles from "../profiles/profiles";
import Registration from "../registration/registration";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Clients from "../clients/clients";
import Buys from "../buys/buys";
import Categories from "../categories/categories";
import Regions from "../regions/regions";

function App() {
  const { user } = useUserStore();
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        {
          user && <Header />
        }
        <Routes>
          <Route path='/' element={<Login />} />

          <Route path='/registration' element={<Registration />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/clients/:clientId/buys' element={<Buys />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/regions' element={<Regions />} />

          <Route path='*' element={''} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
