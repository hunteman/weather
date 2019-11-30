import React, { Component } from "react";

class Tren extends Component {
	constructor() {
		super();
		this.state = {
			value: 'html',
			langs: [
				'Язык HTML',
				'Язык CSS',
				'Язык JavaScript',
				'Язык PHP',
			]
		};
	}

	//Изменяем this.state.value при изменении селекта:
	handleSelectChange(event) {
		this.setState({value: event.target.value});
	}

	render() {
		
		//Формируем в цикле набор из тегов <option>:
		const options = this.state.langs.map((item, index) => {
			return <option key={index} value={index}>{item}</option>;
		});

		return <div>
			<p>Ваш выбор: {this.state.langs[this.state.value]}</p>
			<select
				value={this.state.value}
				onChange={this.handleSelectChange.bind(this)}
			>

				{options}

			</select>
		</div>;
	}
}
export default Tren;