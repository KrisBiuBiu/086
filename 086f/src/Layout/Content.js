import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import Home from "../Pages/Home/Index.js";
import Manage from "../Pages/Manage/Index.js";
import Editor from "../Pages/Editor/Index.js";
import UserHomePage from "../Pages/User/UserHomePage.js";
import UserSetting from "../Pages/User/UserSetting.js";
import Thread from "../Pages/Thread/Index.js";
import Topic from "../Pages/Topic/Index.js";

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
            <Route path="/user-homepage">
              <UserHomePage />
            </Route>
            <Route path="/user-setting">
              <UserSetting />
            </Route>
            <Route path="/topic/:topicId" render={(props) => <Topic {...props} key={props.location.pathname} />}>
            </Route>
            <Route path="/thread/:threadId" render={(props) => <Thread {...props} key={props.location.pathname} />}>
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