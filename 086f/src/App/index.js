import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import Header from "../Layout/Header"
import Content from "../Layout/Content"
import Footer from "../Layout/Footer"
import Floating from "../Layout/Floating"

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

class App extends React.Component {
  render () {
    return (
      <Router>
        <Layout className="layout">
          <Header />
          <Content />
          <Footer />
          <Floating />
        </Layout>
      </Router>
    );
  }
}

export default App;