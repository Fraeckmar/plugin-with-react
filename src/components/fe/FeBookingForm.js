import React from 'react'
import Calendar from '../custom/Calendar'
import DATE from '../custom/Date'
import Spinner from '../custom/Spinner'
import BookingForm from '../forms/BookingForm'
import API from '../custom/API'
import Legend from '../custom/legend'
import {NotificationContainer, NotificationManager} from 'react-notifications'


class FeBookingForm extends React.Component
{
	constructor(props) {
		super(props)

		this.state = {
			userId: document.getElementById('wpcb_current_user').value ?? 0,
			apiUrl: document.getElementById('wpcb_site_url').value+'/wp-json/',
			calendarId: document.getElementById('wpcb_calendar_id').value,
			showLoading: false,
			submitLoading: false,
			fields: {},
			formValues: {},
			selectedDates: [],
			succesMsg: '',
			doneLoads: {
				calendar: false,
				form: false
			}
		}

		this.doneLoadData = this.doneLoadData.bind(this)
		this.setFormFieldValues = this.setFormFieldValues.bind(this)
		this.updateSelectedDates = this.updateSelectedDates.bind(this)
		this.submitHandle = this.submitHandle.bind(this)
	}


	setFormFieldValues(attFormValues) {
		let formValues = this.state.formValues
		for (let key in attFormValues) {
			formValues[key] = attFormValues[key]
		}
		this.setState({formValues: formValues})
	}

	doneLoadData(type) {
		let doneLoads = this.state.doneLoads
		doneLoads[type] = true
		let allDone = true
		for (let _type in doneLoads) {
			if (!doneLoads[_type]) {
				allDone = false
			}
		}
		if (allDone) {
			this.setState({showLoading: false})
		}
		this.setState({doneLoads: doneLoads})
	}

	updateSelectedDates(selectedDates) {
		this.setState({selectedDates})
	}

	submitHandle(e) {
		e.preventDefault()

		if (!this.state.selectedDates.length) {
			NotificationManager.error('No selected date.')
			return false
		}

		let data = {
			user_id: this.state.userId,
			from_customer: true,
			calendar_id: this.state.calendarId,
			action: 'new',
			fields: this.state.formValues,
			selected_dates: this.state.selectedDates
		}

		this.setState({
			showLoading: true,
			submitLoading: true
		})

		API.post(this.state.apiUrl+'wpcb/update_booking_post', data)
		.then(res => {
			let data = res.data
			if (data.thankyou_page) {
				location.href = data.thankyou_page
			} else {
				this.setState({showLoading: false})
				this.setState({succesMsg: data.thankyou_msg})
			}			
		})
		.catch(err => {
			console.log('Error in saving book post')
			console.log(err)
			NotificationManager.error(err.response.data.message)
			this.setState({showLoading: false})
		})
	}

	componentDidMount() {
		this.setState({showLoading: true})
		API.get(this.state.apiUrl+`wpcb/booking_fields`)
		.then(res => {
			let data = res.data
			this.setState({fields: data.fields})
			this.doneLoadData('form')
		})
		.catch(err => {
			console.log('Error in retrieving of booking fields')
			console.log(err)
		})
	}

	render() {
		return (
			<>
				<NotificationContainer />
				<Spinner isVisible={this.state.showLoading}/>
				<div className={'alert alert-success h5 '+(this.state.succesMsg ? '' : 'd-none')}>{this.state.succesMsg}</div>
				<form onSubmit={this.submitHandle} className={this.state.showLoading && !this.state.submitLoading || this.state.succesMsg ? 'd-none' : ''}>				
					<div className='mb-3'>
						<Calendar apiUrl={this.state.apiUrl} doneLoadData={this.doneLoadData} updateSelectedDates={this.updateSelectedDates}/>
					</div>
					<div className='mb-5'>
						<h5 className='h5'>Legend</h5>
						<Legend />
					</div>
					<div className='mb-3'>
						<BookingForm fields={this.state.fields} setFormFieldValues={this.setFormFieldValues} />
					</div>
					<div className='mb-3'>
						<button className='btn btn-primary w-100'>Submit</button>
					</div>
				</form>
			</>
		)
	}
}

export default FeBookingForm