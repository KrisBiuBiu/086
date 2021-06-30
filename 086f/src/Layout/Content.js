import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import Home from "../Pages/Home/Index.js";
import Manage from "../Pages/Manage/Index.js";
import Editor from "../Pages/Editor/Index.js";
import User from "../Pages/User/Index.js";
import Thread from "../Pages/Thread/Index.js";

class Content extends Component {

  render() {

    // function Home () {
    //   return (
    //     <div>
    //       <h2>Home</h2>
    //     </div>
    //   );
    // }

    function About() {
      return (
        <div>
          <h2>About</h2>
        </div>
      );
    }

    return (
      <>
        <Layout.Content className="site-layout container-fluid" style={{ padding: '0 50px', marginTop: 64, width: "100%" }}>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/editor">
              <Editor />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/manage">
              <Manage />
            </Route>
            <Route path="/user">
              <User />
            </Route>
            <Route path="/thread/:id" render={(props) => <Thread {...props} />}>
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