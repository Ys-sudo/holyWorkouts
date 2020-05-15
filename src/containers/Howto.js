import React from 'react';
import {Link} from 'react-router-dom';

export default class Howto extends React.Component {
	render () {
		return (
			<div>
				How to use?
				<p>
				With care !
				More options coming soon...
				Work in progress since 12.05.2020.
				</p>
				<Link to="/">
                    <button id="home">Go Home</button>
                </Link>
			</div>
		)
	}
}
