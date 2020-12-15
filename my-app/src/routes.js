import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import CreatePlailyst from "./Pages/CreatePlaylist";
import Body from "./Components/Body";
import SeePlaylist from "./Pages/SeePlaylist";
import Profile from "./Pages/Profile";
import getHashParams from "./Utils/getHashParams";

const token = getHashParams().access_token;

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        token !== undefined ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

const Routes = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Body>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/search" component={Search} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/createPlaylist" component={CreatePlailyst} />
          <PrivateRoute
            path="/playlist/id=:playlistId"
            component={SeePlaylist}
          />
        </Body>
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default Routes;
