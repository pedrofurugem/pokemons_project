import './App.css';
import AppRoutes from './routes/routes' 
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
