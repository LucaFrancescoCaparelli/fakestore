import { Outlet } from "react-router-dom";

import Container from "react-bootstrap/Container";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div className='App'>
      <Header />
      <ToastContainer />

      <Container fluid>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
