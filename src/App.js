import './App.css';
import AppRoutes from './pages/routes' 
import { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <div>
     <GlobalStyle />
     <AppRoutes />
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }

  li {
    list-style: none;
    color: #FFF;
  }

  a {
    color: #000000;
    text-decoration: none;
  }

`


export default App;
