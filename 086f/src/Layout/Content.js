import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import Home from "../Pages/Home/Index.js";

class Content extends Component {

  render () {

    // function Home () {
    //   return (
    //     <div>
    //       <h2>Home</h2>
    //     </div>
    //   );
    // }

    function About () {
      return (
        <div>
          <h2>About</h2>
        </div>
      );
    }

    function Dashboard () {
      return (
        <div>
          <h2>Dashboard</h2>
        </div>
      );
    }
    return (
      <>
        <Layout.Content className="site-layout container-fluid" style={{ padding: '0 50px', marginTop: 64 }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Layout.Content>
      </>
    );
  }
}

Content.propTypes = {

};

export default Content;