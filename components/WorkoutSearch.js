import React from 'react';
import { PropTypes } from 'react'










export default class WorkoutSearch extends React.Component {






	constructor(props) {
				super(props);
		}




	render () {
		return (
			<div>
				<input
					type="text"
					id="workouts"
					placeholder="Workout name"
					value={this.props.value}
					onChange={e => this.props.onChange(e.target.value)}
					style={{backgroundColor:'rgb(243,243,243)',width:'37%',paddingLeft:'10px',
					marginLeft:'1.5%',height:'45px',borderRadius:'11px',marginBottom:'10px'}}
					/>
			</div>
		)
	}













}
