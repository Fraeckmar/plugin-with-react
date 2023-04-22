import React from 'react'
import GenField from '../custom/GenField'

class SidebarRightForm extends React.Component
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
		for (let _key in fields) {
			let _value = _key == key ? value : fields[_key].value
			fields[_key].value = _value
			values[_key] = _value
		}
		this.setState({fields: fields})
		this.props.setFormFieldValues(values)
	}

	componentDidUpdate() {
		if (this.props.fields && !Object.values(this.state.fields).length) {
			this.setState({fields: this.props.fields})

			let values = {}
			for (let _key in this.props.fields) {
				values[_key] = this.props.fields[_key].value
			}
			this.props.setFormFieldValues(values)
		}
	}

	render() {
		return (
			<>
			<div className='card card-body w-100 border-0 shadow'>
				{Object.keys(this.state.fields)?.map((key, idx) => {
					return (
						<div className='form-group' key={idx}>
							<label className='form-label fw-semibold'> {this.state.fields[key].label} </label>
							<GenField field={this.state.fields[key]} setFieldValue={this.setFieldValue}/>
						</div>
					)
				})}
			</div>
			</>
		)
	}
}

export default SidebarRightForm