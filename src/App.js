import { Route, Routes } from 'react-router-dom';
import './App.css';
import ExerciseLog from './pages/ExerciseLog';
import Home from './pages/Home';
import { HashRouter as Router } from 'react-router-dom';
import { useEffect, useState } from 'react';
import client from './helpers/axiosClient';
import CustomSplashScreen from './common/CustomSplashScreen';
import NewHome from './pages/NewHome';

// function ProtectedRoute({ children }) {
//   // logout due to inactivity
//   const { logoutByInactivity, showGlobalModal } = useAxiosClient()
//   const dispatch = useDispatch()
//   useEffect(() => {
//     if (logoutByInactivity) {
//       dispatch(discardAuthInfo())
//       showGlobalModal({
//         status: 'error',
//         title: 'Inactivity Logout',
//         body: 'You have been logged out due to inactivity. Please login again.'
//       })
//     }
//   }, [logoutByInactivity])

//   // check if auth data present in redux, if yes login
//   const allowed = useSelector(loggedIn)
//   // console.log({allowed})
//   if (!allowed) {
//     return <Navigate to="/" replace />
//   }
//   return <Outlet />
// }


function App() {

  const [serverOnline, setServerOnline] = useState(false)

  useEffect(() => {
    console.log('Checking server status')
    client.get('').then((res) => {
      if(res.status === 200) setServerOnline(true)
    })
  },[])
  

  return (
    <div>
      {serverOnline ? <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<NewHome />} />

            <Route path="/log" element={<ExerciseLog />} />
            
            {/* <Route element={<ProtectedRoute />}>
              <Route path="/summary" element={<Summary />} />
            </Route> */}
          </Routes>
      </Router> 
      : <CustomSplashScreen />}
    </div>
  );
}

export default App;