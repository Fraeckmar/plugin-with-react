import React, { useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const GenField = ({field, setFieldValue}) => {

	const inputFieldChange = (key, value) => {
		if (field.type == 'select' && field.hasOwnProperty('multiple') &&  field.multiple) {
			let newVal = []
			for (let item of value) {
				newVal.push(item.value)
			}
			value = newVal
		} else if (field.type == 'checkbox') {
			let newVal = field.value ?? []
			if (newVal.includes(value)) {
				var index = newVal.indexOf(value)
				newVal.splice(index, 1)
			} else {
				newVal.push(value)
			}
			value = newVal
		}

		if (field.key == 'width') {
			console.log(key+': '+value)
		}
		setFieldValue(key, value)
	}

	const getField = () => {
		let isRequired = field.hasOwnProperty('required') ? field.required : false

		switch (field.type) {
			case 'radio':
			case 'checkbox':
				return Object.keys(field.options)?.map((key, idx) => {
					let item = field.options[key]
					let isChecked = field.type == 'checkbox' ? field.value.includes(item) : field.value == item
					return (
						<div class="form-check">
							<input 
								type={field.type}  
								name={field.type == 'checkbox' ? field.key+'[]' : field.key}
								className={'form-check-input '+(field.class ? field.class : '')}
								onChange={e => inputFieldChange(field.key, item)}
								checked={isChecked}
								required={isRequired}
								id={field.key+idx}
								key={idx}
							/>
							<label class="form-check-label" for={field.key+idx}> {item} </label>
						</div>
					)
				})
			case 'textarea':
				return <textarea 
							value={field.value}
							onChange={e => inputFieldChange(field.key, e.target.value)}
							rows={field.rows ? field.rows : 3}
							className={field.class}
						/>
			case 'date':
				return <DatePicker 
					selected={field.value}
					onChange={date => inputFieldChange(field.key, date)}
					showTimeSelect={field.hasOwnProperty('hasTimePicker') && field.hasTimePicker}
					className={field.class ? field.class : ''}
					required={field.hasOwnProperty('required') && field.required}
				/>
			case 'select':
				let isMultiple = field.hasOwnProperty('multiple') ? field.multiple : false
				let isObj = true
				let _idx = 0
				for (let key in field.options) {
					if (key == 0 && _idx == 0) {
						isObj = false
					}
					_idx ++
				}

				if (isMultiple) {
					let _value = []
					let options = []
					
					for (let key in field.options) {
						if (isObj) {
							options.push({
								label: field.options[key],
								value: key
							})
						} else {
							options.push({
								label: field.options[key],
								value: field.options[key]
							})
						}	
					}
		
					for (let idx in options) {
						if (options[idx].value == field.value) {
							_value.push(options[idx])						
						} else if (typeof field.value == 'object' && Object.values(field.value).includes(options[idx].value)) {
							_value.push(options[idx])
						}
					}



					if (field.hasOwnProperty('creatable') && field.creatable) {
						return <CreatableSelect 
							isMulti
							isClearable
							value={_value}
							options={options}
							onChange={e => inputFieldChange(field.key, e) }
						/>
					} else {
						return <Select 
							isMulti
							isClearable
							value={_value}
							options={options}
							onChange={e => inputFieldChange(field.key, e) }
						/>
					}
				} else {
					return <select 
						value={field.value} 
						className={'xw-100 '+field.class}
						required={isRequired} 
						onChange={e  => inputFieldChange(field.key, e.target.value) }
					>
						<option value=''>Choose..</option>
						{Object.keys(field.options)?.map((key, idx) => {
							let value = isObj ? key : field.options[key]
							return (
								<option key={idx} value={value}> {field.options[key]} </option>
							)
						})}
					</select>
				}
			
			default:
				return (
					<>
						<input
							type={field.type} 
							placeholder={field.placeholder ? field.placeholder : ''} 
							className={field.class}
							onChange={e => inputFieldChange(field.key, e.target.value)}
							required={isRequired}
							value={field.value}
						/>
					</>
				)
		}
	}
	return (
		<>
		{getField(field)}
		</>
	)
}

export default GenField