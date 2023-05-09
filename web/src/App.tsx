import React, { StrictMode } from 'react';
import Global from './styles/global';

import {AuthProvider} from './context/AuthContext';
import  {Routers}  from './routes';
import { BrowserRouter } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Routers />
      </AuthProvider>
      <Global />
    </StrictMode>  
    </BrowserRouter>   
  );
}

export default App;
