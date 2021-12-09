import React, { Component } from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import Topic from "../pages/Setting/Topic.js";
import TopicDefault from "../pages/Setting/TopicDefault.js";

class Content extends Component {

  render () {

    // function Home () {
    //   return (
    //     <div>
    //       <h2>Home</h2>
    //     </div>
    //   );
    // }

    function Home () {
      return (
        <div>
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
          <h2>About</h2>
          <br />
        </div>
      );
    }

    return (
      <>
        <Layout.Content className="site-layout container-fluid" style={{ margin: '80px 16px 0', overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 0 }}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/setting/topic">
                <Topic />
              </Route>
              <Route exact path="/setting/topicDefault/:topicId" render={(props) => <TopicDefault {...props} />}>
              </Route>
              {/* <Route path="/thread/:id" render={(props) => <Thread {...props} />}>
            </Route> */}
            </Switch>
          </div>
        </Layout.Content>
      </>
    );
  }
}

Content.propTypes = {

};

export default Content;