import React from "react";
import "../App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "../context/Context";
import Discover from "./Discover";
import NavBar from "./NavBar";
import Trending from "./Trending";
import MoreInfo from "./MoreInfo";
import ProtectedRoute from "./ProtectedRoute";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import WatchList from "./WatchList";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Upcoming from "./Upcoming";
import Profile from "./Profile";
function App() {
  return (
    <div className="App">
      <Provider>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/up-coming" component={Upcoming} />
            <Route path="/top-rated" component={TopRated} />
            <Route path="/popular" component={Popular} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/watch-list" component={WatchList} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/more-info" component={MoreInfo} />
            <Route path="/trending" component={Trending} />
            <Route path="/" component={Discover} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
