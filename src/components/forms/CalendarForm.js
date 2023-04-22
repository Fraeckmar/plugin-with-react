import { Component } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import DATE from '../custom/Date'
import CalendarGoto from '../custom/CalendarGoTo'
import PopupStatus from './PopupStatus'
import API from '../custom/API'
import Spinner from '../custom/Spinner'
import Legend from '../custom/legend'
import Navigate from '../custom/Navigate'
import USER from '../custom/User'
import FUNCTION from '../custom/Function'
import Notification from '../custom/Notification'
import {NotificationContainer, NotificationManager} from 'react-notifications'

class CalendarForm extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			action: this.props.id ? 'Edit' : 'New',
			calendarTitle: '',
			date: DATE.current,
			datesData: {},
			enableDays: [],
			availableDates: [],
			passDays: [],
			monthDays: [],
			monthDayNums: [],
			monthName: '',
			caledarHtml: '',
			events: {},
			fontSizes: {
				dayNum: 'inherit',
				dayName: 'inherit'
			},
			collapsing: [],
			dateHeight: 'auto',
			selectedDates: [],
			hovered: [],
			selectedDate: {},
			selectedDayNum: 0,
			selectedDayData: {},
			showPopupStatus: false,
			showLoading: false,
			notif: {
				msg: '',
				icon: '',
				type: '',
				visible: false
			},
			noEventsMsg: '',
			errMsg: '',
			navTo: ''
		}

		this.mouseEnterNav = this.mouseEnterNav.bind(this)
		this.mouseLeaveNav = this.mouseLeaveNav.bind(this)
		this.monthNameClickHandle = this.monthNameClickHandle.bind(this)
		this.setCalendarDates = this.setCalendarDates.bind(this)
		this.updateCalendarData = this.updateCalendarData.bind(this)
		this.dateClickHandle = this.dateClickHandle.bind(this)
		this.updateGoToVisibility = this.updateGoToVisibility.bind(this)
	}

	updateGoToVisibility(isShow) {
		this.setState({showGoTo: isShow})
	}

	updateCalendarData(date, data) {
		let datesData = this.state.datesData
		datesData[date] = data
		this.setState({
			showPopupStatus: false,
			datesData: datesData
		})
	}

	dateClickHandle(date, dayData, dayNum) {
		this.setState({
			showPopupStatus: true,
			selectedDate: date,
			selectedDayData: dayData,
			selectedDayNum: dayNum
		})
	}

	mouseEnterNav(key) {
		this.setState({hovered: [key]})
	}
	mouseLeaveNav() {
		this.setState({hovered: []})
	}

	gotoCalendar(isNext) {
		let newDate = this.state.date
		newDate = isNext ? DATE.addMonths(newDate, 1) : DATE.subMonths(newDate, 1) 
		this.setCalendarDates(newDate)
		this.setState({date: newDate})
	}

	monthNameClickHandle() {
		this.setState({showGoTo: true})
	}

	collapseHandle(date) {
		let collapsing = []
		if (!this.state.collapsing.includes(date)) {
			collapsing.push(date)
		}
		this.setState({collapsing: collapsing})
	}

	submitHandle(e) {
		e.preventDefault()
		this.props.setShowLoading(true)
		this.setState({
			errMsg: '',
			showLoading: true
		})
		let params = {
			user_id: USER.id,
			calendar_id: this.props.id,
			calendar_title: this.state.calendarTitle,
			action: this.state.action,
			dates: this.state.datesData
		}

		API.post('wpcb/calendar_data', params)
		.then(res => {
			let calendarId = res.data
			if (this.state.action.toLowerCase() == 'new') {
				this.setState({
					navTo: '/calendar/'+calendarId,
					action: 'Edit'
				})
				this.props.id = calendarId
			}
			this.getDalendarData()
			NotificationManager.success('Calendar save successfully.')
			
		}).catch(err => {
			console.log('Submti calendar err')
			console.log(err)
			this.setState({errMsg: 'Something went wrong during submission of form.'})
		})
	}

	setCalendarDates(date) {
		let passDays = []
		let monthDayNums = []		
		let year = date.getFullYear()
		let month = date.getMonth()
		let datesData = this.state.datesData
		date = new Date(year, month, 1)

		let advancedYear = year
		let advancedMonth = month+1
		if (month == 11) {
			advancedYear = advancedYear+1
			advancedMonth = month+2
		}

		let monthLastDay = (new Date(year, advancedMonth, 0)).getDate()
		let passMonthLastDay = (new Date(year, month, 0))
		
		// Pass Month Days
		for (let i=0; i<date.getDay(); i++) {
			let passDay = passMonthLastDay.getDate()-i
			passDays.push(passDay)
		}

		let events = {}
		let availableDates = []

		// Current Month Days
		for (let i=1; i<=monthLastDay; i++) {
			monthDayNums.push(i)
			let _date = new Date(year, month, i)
			let _dayName = DATE.dayNames[_date.getDay()]
			if (this.state.enableDays.includes(_dayName)) {
				availableDates.push(i)
			}
			
			let plusDay = FUNCTION.leftFillNum(i, 2)
			let plusMo = FUNCTION.leftFillNum(_date.getMonth()+1, 2)
			let plusDate = year+'-'+plusMo+'-'+plusDay
			let moname = DATE.monthNames[month]
			if (datesData.hasOwnProperty(plusDate) && datesData[plusDate].description) {
				events[plusDate] = {
					date: moname +' '+ i,
					desc: datesData[plusDate].description
				}
			}
		}	
		
		let noEventsMsg = Object.values(events).length ? '' : 'No data to show.'
		
		// Next Month
		this.setState({
			date: date,
			passDays: passDays.reverse(),
			monthDayNums: monthDayNums,
			monthName: DATE.monthNames[date.getMonth()],
			availableDates: availableDates,
			events: events,
			noEventsMsg: noEventsMsg
		})
	}

	getDalendarData() {
		this.props.setShowLoading(true)
		this.setState({showLoading: true})
		let requests = [
			API.post('wpcb/get_settings',{
				setting: 'general',
				field: 'enable_days'
			})
		]
		if (this.props.id) {
			requests.push(API.get('wpcb/calendar_data/'+this.props.id))
		}

		Promise.all(requests)
		.then(res => {
			let enableDays = res[0].data
			for (let idx in enableDays) {
				enableDays[idx] = enableDays[idx].toUpperCase()
			}

			this.setState({
				enableDays,
				showLoading: false
			})

			if (this.props.id) {
				let calData = res[1].data
				let dates = calData.other_booked_dates
				let calendarTitle = calData.calendar_title
				let datesData = {}
				
				for (let yrMo in dates) {
					for (let date in dates[yrMo]) {
						let dateData = dates[yrMo][date]
						datesData[date] = dateData
					}
				}
				
				this.setState({
					datesData,
					calendarTitle
				})
			}
			this.setCalendarDates(this.state.date)
			this.props.setShowLoading(false)
		})
		.catch(err => {
			console.log(err)
		})
	}

	componentDidMount() {
		let box = document.getElementById('calendarDays')
		let date = DATE.current
		if (box.offsetWidth) {
			let dateHeight = (box.offsetWidth / 7) + 'px'
			this.setState({
				dateHeight: dateHeight,
				date: date
			})
		}
		
		this.getDalendarData()	
	}

	render() {
		return (
			<div className={'p-2 px-3 '+this.props.className}>
				<NotificationContainer />
				<Navigate navTo={this.state.navTo} />
				<div className={'alert alert-danger '+(this.state.errMsg ? '' : 'd-none')}>{this.state.errMsg}</div>
				<form onSubmit={e => {this.submitHandle(e)}}>
					<div className='mb-2'>
						<h3 className='h3'>{this.state.action} Calendar</h3>
						<input 
							type='text' 
							className='form-control' 
							value={this.state.calendarTitle}
							onChange={(e) => this.setState({calendarTitle: e.target.value})}
							required
						/>
					</div>
					<div className='row'>
						<div className='col-12 col-md-4 pt-1'>
							<div className='mt-3 shadow p-3 border border-light'>
								<h4>Events & Holidays</h4>
								<p className={'p-1 '+(this.state.noEventsMsg ? '' : 'd-none')}>{this.state.noEventsMsg}</p>
								{Object.keys(this.state.events)?.map((_date, idx) => {
									return <div 
										key={idx}
										className={'shadow-sm border border-light rounded p-2 mt-2 bg-light'}
										onClick={() => this.collapseHandle(_date)}
										role='button'
									>
										<div
											className={'d-flex justify-content-between align-items-center '+(this.state.collapsing.includes(_date) ? 'fw-bold' : 'fw-semibold')}
										>
											{this.state.events[_date].date}
											<i className={'fa fa-angle-'+(this.state.collapsing.includes(_date) ? 'up' : 'down')}></i>
										</div>
										<div 
											className={'border border-start-0 border-end-0 border-bottom-0 mt-2 pt-2 collapse '+(this.state.collapsing.includes(_date) ? 'show' : '')}
											onClick={(e) => e.stopPropagation()}
											role='text'
										>
											{this.state.events[_date].desc}
										</div>
									</div>
								})}								
							</div>
						</div>
						<div className='col-12 col-md-4'>
							<div className='card calendar shadow border-0 p-0 xw-100'>
								<div className='card-header py-3 d-flex justify-content-between align-items-center'>
									<div 
										role='button' 
										className={'h4 m-0 p-1 shadow rounded-circle '+(this.state.hovered.includes('arrowLeft') ? '' : 'text-secondary')}
										onMouseLeave={this.mouseLeaveNav}
										onClick={() => this.gotoCalendar(false)}
									>
										<i class='fa fa-angle-left p-0 px-2' onMouseEnter={() => this.mouseEnterNav('arrowLeft')}></i>
									</div>
									<div className={'h3 mx-5 m-0 text-center text-uppercase '+(this.state.hovered.includes('monthName') ? '' : 'text-secondary')}
										role='button'
										onMouseLeave={this.mouseLeaveNav}
										onClick={this.monthNameClickHandle}
									>
										<span onMouseEnter={() => this.mouseEnterNav('monthName')}>{DATE.monthNames[this.state.date.getMonth()]} {this.state.date.getFullYear()}</span>
									</div>
									<div 
										role='button' 
										className={'h4 m-0 p-1 shadow rounded-circle '+(this.state.hovered.includes('arrowRight') ? '' : 'text-secondary')}
										onMouseLeave={() => this.mouseLeaveNav()}
										onClick={() => this.gotoCalendar(true)}
									>
										<i class='fa fa-angle-right p-0 px-2' onMouseEnter={() => this.mouseEnterNav('arrowRight')}></i>
									</div>
								</div>
								<div className='card-body'>
									<div id='calendarDays' className='days'>
										{/* Day Names */}
										{DATE.dayNames?.map((dayName, idx) => {
											return <div className='day_name' style={{ width: '14.28%' }}> {dayName} </div>
										})}
										{/* Passed Month Dates */}
										{this.state.passDays?.map((dayNum, idx) => {
											return <div className='day_num ignore' style={{ width: '14.28%' }}></div>
										})}
										{/* Month Dates */}
										{this.state.monthDayNums?.map((dayNum, idx) => {
											let _mo = DATE.getMonth2Digit(this.state.date.getMonth())
											let _year = this.state.date.getFullYear()
											let _day = dayNum < 10 ? '0'+dayNum : dayNum
											let _date = _year+ '-' +_mo+ '-' +_day 

											let _dateData = this.state.datesData.hasOwnProperty(_date) ? this.state.datesData[_date] : {}
											let _status = this.state.availableDates.includes(dayNum) ? 'available' : 'unavailable'
											_status = this.state.datesData.hasOwnProperty(_date) ? _dateData.status : _status
											let _desc = this.state.datesData.hasOwnProperty(_date) ? _dateData.description : ''
											_dateData.status = _status
											_dateData.description = _desc

											let bookedStatus = _status == 'booked' ? <span class="booked-status d-block"><i class="fa fa-check"></i></span> : ''
											
											if (_dateData.description) {
												return <Tippy content={_dateData.description}>
													<div 
														key={idx}
														className={'day_num '+_status}
														style={{ 
															height: this.state.dateHeight
														}}
														onClick={() => this.dateClickHandle(_date, _dateData, dayNum)}
														data-tooltip-id="my-tooltip" 
														data-tooltip-content="Hello world!"
													> 
														{dayNum}
														{bookedStatus}
													</div>
												</Tippy>
											} else {
												return <div 
													key={idx}
													className={'day_num '+_status}
													style={{ 
														height: this.state.dateHeight
													}}
													onClick={() => this.dateClickHandle(_date, _dateData, dayNum)}
													data-tooltip-id="my-tooltip" 
													data-tooltip-content="Hello world!"
												> 													
													{dayNum}
													{bookedStatus}
												</div>
											}											
										})}
									</div>
								</div>
								<CalendarGoto isVisible={this.state.showGoTo} date={this.state.date} updateGoToVisibility={this.updateGoToVisibility} setDate={this.setCalendarDates}/>
							</div>
						</div>
						<div className='col-12 col-md-4 pt-1'>
							<div className='mt-3 shadow p-3 border border-light'>
								<h4>Legend</h4>
								<Legend />
							</div>
							<div className='mt-3 shadow p-3 border border-light'>
								<button type='submit' className='btn btn-secondary w-100'>Save</button>
							</div>
						</div>
					</div>
				</form>
				<PopupStatus 
					dayData={this.state.selectedDayData} 
					date={this.state.selectedDate} 
					isVisible={this.state.showPopupStatus} 
					updateCalendarData={this.updateCalendarData} 
					day={this.state.selectedDayNum}
				/>
			</div>
		)
	}
}

export default CalendarForm