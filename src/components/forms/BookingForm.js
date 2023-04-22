import React, { Component } from 'react'
import GenField from '../custom/GenField'

class BookingForm extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			fields: {}
		}

		this.setFieldValue = this.setFieldValue.bind(this)
	}

	setFieldValue(key, value) {
		let fields = this.state.fields
		let values = {}
		for (let section in fields) {
			for (let _key in fields[section]) {
				let _value = _key == key ? value : fields[section][_key].value
				fields[section][_key].value = _value
				values[_key] = _value
			}
		}
		this.setState({fields: fields})
		this.props.setFormFieldValues(values)
	}

	componentDidUpdate() {
		if (this.props.fields && !Object.values(this.state.fields).length) {	
			this.setState({fields: this.props.fields})

			let values = {}
			for (let section in this.props.fields) {
				for (let _key in this.props.fields[section]) {
					values[_key] = this.props.fields[section][_key].value
				}
			}
			this.props.setFormFieldValues(values)
		}
	}

	render() {
		return (
			<>
			{Object.keys(this.state.fields)?.map((section, idx) => {
				return (
					<div className='card xw-100 p-0 border-0 shadow' key={idx}>
						<h3 className='card-header'>{section}</h3>
						<div className='card-body'>
							{Object.keys(this.state.fields[section])?.map((key, idx) => {
								return (
									<div className='form-group mb-2' key={idx}>
										<label className='form-label'> {this.state.fields[section][key].label} </label>
										<GenField field={this.state.fields[section][key]} setFieldValue={this.setFieldValue}/>
									</div>
								)
							})}
						</div>
					</div>
				)
			})}
			</>
		)
	}
}

export default React.memo(BookingForm)