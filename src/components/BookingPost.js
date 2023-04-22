import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import API from './custom/API'
import Spinner from './custom/Spinner'
import BookingForm from './forms/BookingForm'
import SidebarRightForm from './forms/SidebarRightForm'
import BookedDates from './BookedDates'
import Calendar from './custom/Calendar'
import GenField from './custom/GenField'
import Legend from './custom/legend'
import {NotificationContainer, NotificationManager} from 'react-notifications'

const BookingPost = () => {
	const { id } = useParams()
	const bookId = id ?? ''

	const apiUrl = document.getElementById('wpcb_site_url').value+'/wp-json/'
	const userId = document.getElementById('wpcb_current_user').value

	const state = useRef({})
	const [title, setTitle] = useState('')
	const [spinnerVisible, setSpinnerVisible] = useState(false)
	const [formValues, setFormValues] = useState({})
	const [formDisplay, setFormDisplay] = useState('d-none')
	const [calendarId, setCalendarId] = useState(0)
	const [selectedDates, setSelectedDates] = useState([])
	const [bookedDates, setBookedDates] = useState({})
	const [rateType, setRateType] = useState('default')
	const [calendars, setCalendars] = useState({})
	const [refreshCalendar, setRefreshCalendar] = useState(false)
	const [doneLoads, setDoneLoads] = useState({
		calendar: false,
		post: false
	})

	const dateClickHandle = () => {
		if (!calendarId) {
			NotificationManager.error('Please choose calendar first.')
		}
		return calendarId
	}

	const setFormFieldValues = (attFormValues) => {
		let newFormValues = formValues
		for (let key in attFormValues) {
			newFormValues[key] = attFormValues[key]
		}
		setFormValues(newFormValues)
	}

	const submitHandle = (e) => {
		e.preventDefault()
		if (!selectedDates.length) {
			NotificationManager.error('No selected date.')
			return
		}
		let data = {
			user_id: userId,
			calendar_id :calendarId,
			booking_id: bookId,
			action: bookId ? 'edit' : 'new',
			post_title: title,
			fields: formValues,
			selected_dates: selectedDates
		}

		setSpinnerVisible(true)
		API.post('wpcb/update_booking_post', data)
		.then(res => {
			let data = res.data
			NotificationManager.success(data.message)
			setSpinnerVisible(false)
			setRefreshCalendar(true)
			getBookingData()
			if (!bookId) {
				clearFieldValues()
			}			
		})
		.catch(err => {
			console.log('Error in saving book post')
			console.log(err)
			NotificationManager.error(err.response.data.message)
			setSpinnerVisible(false)
		})
	}

	const doneLoadData = (type, isDone=true) => {	
		let newDoneLoads = doneLoads
		newDoneLoads[type] = isDone
		let allDone = true
		for (let _type in newDoneLoads) {
			if (!newDoneLoads[_type]) {
				allDone = false
			}
		}
		setSpinnerVisible(!allDone)	
		setDoneLoads(newDoneLoads)
	}

	const setFieldValue = (key, value) => {
		if (key == 'calendarId' && value) {
			let newDoneLoads = doneLoads
			newDoneLoads.calendar = false
			setDoneLoads(newDoneLoads)
			setSpinnerVisible(true)
			setCalendarId(value)
			setRefreshCalendar(true)
			clearFieldValues()
		}
	}

	const clearFieldValues = () => {
		if (state.fields) {
			for (let section in state.fields) {
				for (let field_key in state.fields[section]) {
					state.fields[section][field_key].value = ''
				}
			}
		}
		if (state.status_fields) {
			for (let field_key in state.status_fields) {
				state.status_fields[field_key].value = ''
			}
		}
		setFormFieldValues([])
	}

	const updateSelectedDates = (selectedDates) => {
		setSelectedDates(selectedDates)
	}

	const getBookingData = () => {
		Promise.all([
			API.get(`wpcb/booking_fields/${bookId}`),
			API.get('wpcb/calendars')
		])
		.then(res => {
			let cFields = res[0].data
			let newBookedDates = {}
			state.fields = cFields.fields
			state.status_fields = cFields.status_fields

			if (Object.values(cFields.booked_dates).length) {
				for (let mo in cFields.booked_dates) {
					for (let _date in cFields.booked_dates[mo]) {
						newBookedDates[_date] = {
							price: 0,
							time: ''
						}
					}
				}
			}

			let calData = res[1].data
			let calendars = {}
			for (let id in calData) {
				calendars[id] = calData[id].post_title
			}

			setCalendars(calendars)
			setBookedDates(newBookedDates)
			setRateType(cFields.rate_type)	
			setTitle(cFields.post_title)
			setCalendarId(cFields.calendar_id)
			setFormDisplay('')
			doneLoadData('post')
		})
		.catch(err => {
			console.log('Error in retrieving booking fields')
			console.log(err)
		})
	}

	const setBookedDatess = (bookedDates) => {
		setBookedDates(bookedDates)
	}

	useEffect(() => {
		if (id) {
			setSpinnerVisible(true)
		}
		getBookingData()		
	}, [])

	useEffect(() => {
		
	}, [])

	return(
		<>
			<NotificationContainer />
			<Spinner isVisible={spinnerVisible}/>
			<div className={'p-2 px-3 '+formDisplay}>
				<div className='pt-3'>
					<h3 className='h3'>{bookId ? 'Edit' : 'New'} Booking</h3>
					<input type='text' className='form-control' required value={title} onChange={e => {setTitle(e.target.value)}}/>
				</div>
				<form className='row mt-3 w-100' onSubmit={e => {submitHandle(e)}}>
					<div className='col-12 col-md-3'>
						<div className='card p-0 border-0 shadow mb-2'>
							<div className='form-group'>
								<GenField 
									setFieldValue={setFieldValue}
									field={{
										key: 'calendarId',
										type: 'select',
										value: calendarId,
										options: calendars,
										class: 'form-control border-0',
										idxValue: true
									}}
								/>
							</div>
						</div>
						<Calendar 
							className='m-0'
							headingClass='h4'
							arrowClass='h6'
							calendarId={calendarId} 
							bookId={bookId}
							apiUrl={apiUrl} 
							doneLoadData={doneLoadData}
							updateSelectedDates={updateSelectedDates}
							refreshCalendar={refreshCalendar}
							setRefreshCalendar={setRefreshCalendar}
							setBookedDates={setBookedDatess}
							isAdmin={true}
							dateClickHandle={dateClickHandle}
						/>
						<div className='card p-3 border-0 shadow'>
							<h5>Legend</h5>
							<Legend />
						</div>
					</div>
					<div className='col-12 col-md-6 px-4'>
						<BookingForm fields={state.fields} doneLoadData={doneLoadData} setFormFieldValues={setFormFieldValues}/>
						<BookedDates bookId={bookId} bookedDates={bookedDates} rateType={rateType}/>
					</div>
					<div className='col-12 col-md-3'>
						<SidebarRightForm fields={state.status_fields} setFormFieldValues={setFormFieldValues}/>
						<div className='card card-body w-100 mt-2 border-0 shadow'>
							<button className='btn btn-primary' type='submit'>Submit</button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default BookingPost