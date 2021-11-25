import React from "react"
import {
  Home,
  SignUp,
  Login,
  ForgetPassword,
  Forum
} from './views';
import { AuthProvider } from './context/AuthProvider';
import { 
  PrivateRoute,
  CenterContainer 
} from "./components";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App(props) {

  const {
    model, // Model keeping application state
  } = props;

  // route
  const NoMatch = ({ location }) => (
    <CenterContainer>
        <h3>No match for <code>{location.pathname}</code></h3>
    </CenterContainer>
  );
  
  return(
    <div className="App">
      <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<PrivateRoute/>}>
                  <Route exact path='/' element={<Home/>}/>
              </Route>
              <Route exact path="/login" element={<Login model={model}/>}/>
              <Route exact path="/signup" element={<SignUp model={model}/>}/>
              <Route path="/forget-password" exact element={<ForgetPassword model={model}/>}/>
              <Route exact path="/forum" element={<Forum/>}/>
              {/* unmatched Route */}
              <Route component={NoMatch} />
            </Routes>
          </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
