import React, { Component } from 'react';

function InsuranceInput(props) {
	return (
		<div>
			<h1>Hello, {props.name}</h1>			
			<form>
				Insurace Name:<input type="text"></input>
				Policy/Identification Number:<input type="text"></input>
				Group Number:<input type="text"></input>
				{/* <input type="text"></input> */}
			</form>
		</div>
	)
}

export default class InsuranceForm extends Component {
	render() {
		console.log(this.props.name)
		return (
			<InsuranceInput 
			name={this.props.name}
			/>
		);
	}
}
