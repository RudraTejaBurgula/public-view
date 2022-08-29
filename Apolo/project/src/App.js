import { AuthProvider } from './functions/AuthContext';
import SignUp from './views/signUp';
import { Routes, BrowserRouter as Router, Route, Navigate } from 'react-router-dom'
import LogIn from './views/login';
import Dashboard from './views/Dashboard';
import Admin from './views/Admin';
import { createContext, useReducer } from 'react';
import ProctectedRoutes from './functions/ProtectedRoutes';
import AdminRoute from './functions/AdminRoute';
export const countContext = createContext();
const initialState = {
  basket: [],
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        basket: [...state.basket, action.item]
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <Router>
        <AuthProvider>
          <countContext.Provider value={{ countState: state, countDispatch: dispatch }}>
            <Routes>
              <Route path="/" element={<Navigate to="/Dashboard" replace='true' />} />
              <Route
                element={<ProctectedRoutes basketCount={state.basket} />}
              >
                <Route path="/Dashboard" element={<Dashboard />} />
              </Route>
              <Route path="/SignUp" element={<SignUp />} />
              {/* ################################################### */}
              <Route 
                element={<AdminRoute adminCount={state.basket} />}
              >
                <Route path="/Admin" element={<Admin />} />
              </Route>
              <Route path='/Login' element={<LogIn />} />

            </Routes>
          </countContext.Provider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;