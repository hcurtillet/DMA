import React from "react";
import { Home, SignUp, Login, ForgetPassword, QuestionsList, Profile } from "./views";
import { AuthProvider } from "./context/AuthProvider";
import { PrivateRoute, CenterContainer } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App(props) {
  const {
    model, // Model keeping application state
  } = props;

  // route
  function NoMatch() {
    return (
      <CenterContainer>
        <h3>
          No match for <code>{window.location.pathname}</code>
        </h3>
      </CenterContainer>
    );
  }

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home model={model} />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/forget-password" element={<ForgetPassword />} />
            <Route exact path="/questions-list" element={<QuestionsList/>}/>
            <Route exact path="/profile" element={<PrivateRoute />}>
              <Route exact path="/profile" element={<Profile />} />
            </Route>
            {/* unmatched Route */}
            <Route path="*" element={<NoMatch />} />
          </Routes>{" "}
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
