import './App.css';
import AppRoutes from './pages/routes' 
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './context/themes-context.js'
import { Navbar } from  './components/Navbar/index'

function App() {
  return (
     <ThemeProvider>
      <>
        <Navbar />
        <GlobalStyle />
        <AppRoutes />
      </>
     </ThemeProvider>
  );
}

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
  }

  :root {
    --CornflowerBlue: #6495ED;
    --grey11: #1C1C1C;
    --white: #FFF;
    --yellowGold: #FFCC03;
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
