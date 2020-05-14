import React from 'react';
import { PropTypes } from 'react'










export default class ExerciseSearch extends React.Component {




	render () {
		return (
			<div>
				<input
					type="text"
					id="exercises"
					placeholder="Search exercises:"
					value={this.props.value}
					onChange={e => this.props.onChange(e.target.value)}
					style={{backgroundColor:'rgb(243,243,243)',width:'90%',
					paddingLeft:'10px',marginLeft:'1%',height:'45px',
					marginBottom:'10px',marginTop:'10px',
					borderRadius:'12px'}}
					/>
			</div>
		)
	}
}
