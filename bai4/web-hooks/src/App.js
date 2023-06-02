import React from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import store from "redux/store";
import { Provider } from "react-redux";
import { Login, Register, HomePage } from "./routes";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <Routes>
            <Route path="groups">
              <Route index element={<HomePage />} />
              <Route path=":id" element={<HomePage />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to={"/groups"} />} />
          </Routes>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
