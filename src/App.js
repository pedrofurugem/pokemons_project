import './App.css';
import AppRoutes from './pages/routes' 
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from './context/themes-context.js'
import { ThemeTogglerButton } from './components/Theme-toggler-button/index'

function App() {
  return (
    <div>
     <ThemeProvider>
      <ThemeTogglerButton />
      <GlobalStyle />
      <AppRoutes />
     </ThemeProvider>
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
