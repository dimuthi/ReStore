import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext, useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
// const products = [
//   {name:'product1', price:100.00},
//   {name:'product2', price:200.00}
// ]

function App() {
  // const[products, setProducts] = useState([
  //   {name:'product1', price:100.00},
  //   {name:'product2', price:200.00}
  // ])
  const {setBasket} = useStoreContext();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if(buyerId) {
      agent.basket.getBasket()
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }
  }, [setBasket])

  const palettype = darkMode ? 'dark' : 'light';

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if(loading) return (<LoadingComponent message="Initialising app..."/>)

  const theme = createTheme({
    palette: {
      mode: palettype,
      background: {
        default: palettype === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

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
