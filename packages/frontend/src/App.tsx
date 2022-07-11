import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/profile/Profile';
import Feed from './components/feed/Feed';
import Header from './components/header/Header';
import EnsureLoggedIn from './components/login/EnsureLoggedIn';
import Login from './components/login/Login';
import Footer from './components/footer/Footer';

export enum AppRoutePath {
  Feed = "/",
  Profile = "/Profile",
  Login = "/Login"
}

const PrivateApp = () => {
  return (
    <div className="App">
      <Route component={<EnsureLoggedIn />} />
      <header className="header">
        <Header></Header>
      </header>
      <main className="content">
        <Routes>
          <Route path={AppRoutePath.Feed} exact={true}>
            <Feed />
          </Route>
          <Route path={AppRoutePath.Profile} exact={true}>
            <Profile />
          </Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  )
}

const App = () => {
  return (
    <Routes>
      <Route path={AppRoutePath.Login} element={Login}></Route>
      <Route element={PrivateApp}></Route>
    </Routes>

  );
}

export default App;
