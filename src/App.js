import logo from './logo.svg';
import './App.css';
import './index.css';
import HomeScreen from './HomeScreen';
import AddForm from './Components/AddForm';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import ShowMeds from './Components/ShowMeds';
import PatientsList from './Components/PatientsList/PatientsList';
import AddPatient from './Components/AddPatient';
import ShowPatient from './Components/ShowPatient/ShowPatient';

function App() {
  return (
    <div className="App">

      <Provider store={store}>
        <BrowserRouter>
          <div class="p-5" style={{
            display: "flex", fontSize: "30px",
            justifyContent: "space-between"
          }}>
            <div className='hover-nav'>
            <Link to="/"><span className='h5 zeroes'>Medicines</span></Link>&nbsp;&nbsp;
              <Link to="/patientsList"><span className='h5 ones'>Patients</span></Link>&nbsp;&nbsp;
              <span className='h5 twos'>Appointments</span>
            </div>
            {/* <i class="menus fa fa-bars" style={{zIndex:"1",color:showMenu?"white":"black"}} onClick={()=>setShowMenu(prev=>!prev)}></i> */}
            <h2 class="">CLINIC MANAGEMENT</h2>
          </div>
          <Routes>

            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/add" element={<AddForm />} />
            <Route path="/addPatient" element={<AddPatient />} />
            <Route path="/medDetails" element={<ShowMeds />} />
            <Route path='/patientsList' element={<PatientsList />} />
            <Route path='/showPatient' element={<ShowPatient />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
