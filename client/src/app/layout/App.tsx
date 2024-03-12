import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";

// const products = [
//   {name:'product1', price:100.00},
//   {name:'product2', price:200.00}
// ]

function App() {
  // const[products, setProducts] = useState([
  //   {name:'product1', price:100.00},
  //   {name:'product2', price:200.00}
  // ])

  const[darkMode, setDarkMode] = useState(false);
  const palettype = darkMode ?'dark' : 'light';

  function handleThemeChange( ) {
    setDarkMode(!darkMode);
  }

  const theme = createTheme({
    palette: {
      mode: palettype,
      background: {
        default: palettype==='light' ? '#eaeaea' : '#121212'
    }
  }})

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container><Catalog /></Container>
    </ThemeProvider>

  )
}

export default App
