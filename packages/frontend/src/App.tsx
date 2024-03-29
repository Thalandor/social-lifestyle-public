import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Profile from "./components/profile/Profile";
import Feed from "./components/feed/Feed";
import Header from "./components/header/Header";
import EnsureLoggedIn from "./components/login/EnsureLoggedIn";
import Login from "./components/login/Login";
import Footer from "./components/footer/Footer";

export enum AppRoutePath {
  Root = "/",
  Profile = "/Profile",
  Login = "/Login",
}

const PrivateApp = () => {
  return (
    <div className="App">
      <Route element={<EnsureLoggedIn />} />
      <header className="header">
        <Header></Header>
      </header>
      <main className="content">
        <Routes>
          <Route path={AppRoutePath.Root} element={<Feed />} />
          <Route path={AppRoutePath.Profile} element={<Profile />} />
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutePath.Root} element={<Login />} />
      <Route path={AppRoutePath.Login} element={<Login />} />
      <Route element={<PrivateApp />}></Route>
    </Routes>
  );
};

export default App;
