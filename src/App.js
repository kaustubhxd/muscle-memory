import { Route, Routes } from 'react-router-dom';
import './App.css';
import ExerciseLog from './pages/ExerciseLog';
import Home from './pages/Home';
import { HashRouter as Router } from 'react-router-dom';

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

  return (
    <div>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/log" element={<ExerciseLog />} />

            {/* <Route element={<ProtectedRoute />}>
              <Route path="/summary" element={<Summary />} />
            </Route> */}
          </Routes>
      </Router>
        
    </div>
  );
}

export default App;