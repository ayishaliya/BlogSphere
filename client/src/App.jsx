import { useState } from "react";
import BlogHomePage from "./components/BlogHomePage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import SignupPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import Layout from "./components/Layout";
import CreateBlogPage from "./components/CreateBlogPage";
import BlogDetail from "./components/BlogDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogHomePage />}></Route>
        <Route path={"/login"} element={<LoginPage />}></Route>
        <Route path={"/signup"} element={<SignupPage />}></Route>
        <Route path={"/create"} element={<CreateBlogPage />}></Route>
        <Route path={"/post/:id"} element={<BlogDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
