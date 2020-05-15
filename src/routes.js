import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import App from './containers/App';
import Howto from './containers/Howto/index';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
			  <Route exact path='/' component={App}/>
			  <Route path='/Howto' component={Howto}/>
			</Switch>
		</BrowserRouter>
	)
}
