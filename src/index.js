import React from 'react';
import ReactDOM from 'react-dom';
import './firebase.js';
import './index.css';
import App from './App';
import EditFormPage from './EditFormPage';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';

const Main = () => (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/:id" component={EditFormPage} />
		</div>
	</Router>	
);


ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();
