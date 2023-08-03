import {  Route, Routes,useNavigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext, useEffect } from 'react';
import AuthContext from './store/AuthContext';

function App() {
  
  const authCtx=useContext(AuthContext)
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage/>}>
        </Route>
       {!authCtx.isLoggedIn && (<Route path='/auth' element={<AuthPage />}>
          
        </Route>)}
        {authCtx.isLoggedIn &&( <Route path='/profile' element={<UserProfile />}>
          
        </Route>)}
        <Route path='*' element={<AuthPage/>}>
        </Route>
        </Routes>
    </Layout>
  );
}

export default App;
