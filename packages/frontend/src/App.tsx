import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router';
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
      <Route component={EnsureLoggedIn}></Route>
      <header className="header">
        <Header></Header>
      </header>
      <main className="content">
        <Switch>
          <Route path={AppRoutePath.Feed} exact={true}>
            <Feed />
          </Route>
          <Route path={AppRoutePath.Profile} exact={true}>
            <Profile />
          </Route>
        </Switch>
      </main>
      <Footer></Footer>
    </div>
  )
}

function App() {
  return (
    <Switch>
      <Route path={AppRoutePath.Login} component={Login}></Route>
      <Route component={PrivateApp}></Route>
    </Switch>

  );
}

export default App;
