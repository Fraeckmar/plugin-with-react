import React from 'react'
import GenField from '../custom/GenField'
import API from '../custom/API'
import {NotificationContainer, NotificationManager} from 'react-notifications'

class SettingForm extends React.Component
{
	constructor(props) {
		super(props)

		this.state = {
			formData: this.props.formData
		}

		this.setFieldValue = this.setFieldValue.bind(this)
		this.submitHandle = this.submitHandle.bind(this)
	}

	submitHandle(e) {
		e.preventDefault()
		this.props.setShowLoading(true)

		let formFields = {}
		for (let section of this.state.formData) {
			for (let field of section.fields) {
				formFields[field.key]  = field.value
			}
		}

		API.post('wpcb/save_setting', {
			setting: this.props.setting,
			fields_data: formFields
		})
		.then(res => {
			this.props.setShowLoading(false)
			this.props.getSettingsData()
			NotificationManager.success('Save successfully.')
		})
		.catch(err => {
			console.log('Error in setting form submission')
			console.log(err)
		})
		
	}

	setFieldValue(key, value) {
		if (key == 'width') {
			console.log('setFieldValue: '+value)
		}
		let formData = this.state.formData
		for (let s_idx in formData) {
			for (let f_idx in formData[s_idx].fields) {
				let field = formData[s_idx].fields[f_idx]

				if (field.key == key) {
					field.value = value
					if (field.options && typeof value == 'object' && Object.values(field.options).length < Object.values(value).length && field.type == 'select' && field.multiple) {
						field.options = value
					}
				}
				
			}
		}
		this.setState({formData})
	}


	render() {
		return (
			<>
				<NotificationContainer />
				<form onSubmit={this.submitHandle}>
					{this.state.formData?.map((section, idx) => {
						return <div className={'card border-0 shadow p-0 xw-100 '+this.props.className} key={idx}>
							<div className={'card-header h6 '+(section.hasOwnProperty('heading') ? '' : 'd-none')}>{section.heading}</div>
							<div className='card-body'>
								{section.fields?.map((field, idx) => {		
									if (field.hasOwnProperty('show_in_form') && !field.show_in_form) {
										return false
									}	
									// Append Calendar Width
									let addFieldHtml = ''
									if (field.key == 'day_name_font_size') {
										let wField = {}
										let uField = {}
										for (let _section of this.state.formData) {
											for (let _field of _section.fields) {
												if (_field.key == 'width') {
													wField = _field
												} else if (_field.key == 'width_unit') {
													uField = _field
												}
											}
										}
										
										let html = <div className='mb-2'>
											<label className='form-label mb-1 fw-semibold'>Width</label>
											<div className='d-flex'>
												<GenField field={wField} setFieldValue={this.setFieldValue}/>
												<GenField field={uField} setFieldValue={this.setFieldValue}/>
											</div>
										</div>
										addFieldHtml = html
									}	

									return <>
										{addFieldHtml}
										<div key={idx} className='mb-2'>
											<label className='form-label mb-1 fw-semibold'>{field.label}</label>
											<p className='small text-muted m-0' dangerouslySetInnerHTML={{ __html:field.description }}></p>
											<GenField field={field} setFieldValue={this.setFieldValue}/>
										</div>
									</>
								})}
							</div>
						</div>
					})}
					<div className='card card-body border-0 shadow p-0 mb-4 xw-100'>
						<button className='btn btn-primary w-100'>Save Setting</button>
					</div>
				</form>
			</>
		)
	}
}

export default SettingForm