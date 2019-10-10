import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
import Home from './home'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
    <Switch>
        <Route path="/" component={App} />
        <Route path='/home' component={Home} />
    </Switch>
   </BrowserRouter>, document.getElementById('root'));
=======
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
>>>>>>> a0e1ef25d9ac0dfba1a5cdafb962b36542259c3e

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
