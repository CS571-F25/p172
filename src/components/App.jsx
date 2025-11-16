import React from "react"
import { HashRouter, Route, Routes } from 'react-router';

import Layout from './Layout';
import Home from './Home';
import NoMatch from './NoMatch';
import Page from "./Page";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/page" element={<Page/>} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
