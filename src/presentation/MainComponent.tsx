import * as React from "react";
import { URLS } from "../shared/baseData";
import { Switch, Route, Redirect } from 'react-router-dom';
import HeaderComponent from "./Header/HeaderComponent";
import LoginContainer from "./Login/LoginContainer";
import RequestListContainer from "./Requests/RequestListContainer";

class Main extends React.Component<{}, {}> {

  render() {

    return(
        <div className="App">
          <HeaderComponent />
          <div className="App-body container">
            <Switch>
                <Route exact path={URLS.Requests} component={RequestListContainer} />
                <Route exact path={URLS.Home} component={LoginContainer} />
                <Redirect to={URLS.Home} />
            </Switch>
          </div>
        </div>
    );
  }

}

export default Main;
