import React from "react"
import {SignUp} from './auth';
import { AuthProvider } from '../context/AuthProvider';
import { Container } from "react-bootstrap"

function App() {

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <AuthProvider>
        <div className="App">
          <SignUp/>
        </div>
      </AuthProvider>
    </Container>
  );
}

export default App;
