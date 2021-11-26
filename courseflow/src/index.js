import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import { UserModel } from "./model";

// Initialize model
const myModel = new UserModel();

ReactDOM.render(<App model={myModel}/>, document.getElementById('root'));

