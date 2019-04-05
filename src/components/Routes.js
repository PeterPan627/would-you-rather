import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";

import Login from "./Login";
import NewQuestion from "./NewQuestion";

function Routes(props) {
  return <div className="container">
    <Switch>
      {
        props.notLoggedIn ? <Route path='/' exact component={Login}/> :
          <Fragment>
            <Route path='/add' component={NewQuestion}/>
          </Fragment>
      }
    </Switch>
  </div>;
}

Routes.propTypes = {notLoggedIn: PropTypes.any};

export default Routes;