import ReactDOM from "react-dom/client";

import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { App } from "./App";

import { PrivateRoute } from "./components/PrivateRoute";
import { ContactMe } from "./pages/ContactMe";
import { ContentFeed } from "./pages/ContentFeed";
import { Login } from "./pages/Login";
import { WhishList } from "./pages/WhishList";

import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/login' element={<Login />} />

          {/* Private Routes */}
          <Route path='' element={<PrivateRoute />}>
            <Route path='feed' element={<ContentFeed />} />
            <Route path='whish-list' element={<WhishList />} />
            <Route path='contact' element={<ContactMe />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
