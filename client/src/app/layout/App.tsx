import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container><Outlet /></Container>
    </ThemeProvider>

  )
}

export default App
