import React from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import {NotificationContainer, NotificationManager} from 'react-notifications'

import DATE from './Date'
import CalendarGoto from './CalendarGoTo'
import API from '../custom/API'
import FUNCTION from './Function'

class Calendar extends React.Component
{
	constructor(props) {
		super(props)
		let calendarId = document.getElementById('wpcb_calendar_id') ? document.getElementById('wpcb_calendar_id').value : this.props.calendarId
		this.state = {
			calendarId: calendarId,
			bookId: this.props.bookId,
			date: DATE.current,
			passDays: [],
			monthDays: [],
			monthDayNums: [],
			monthName: '',
			caledarHtml: '',
			fontSizes: {
				dayNum: 'inherit',
				dayName: 'inherit'
			},
			dateHeight: '',
			availableDates: [],
			selectedDates: [],
			enableDays: {},
			datesData: [],
			hovered: [],
			showGoTo: false
		}

		this.mouseEnterNav = this.mouseEnterNav.bind(this)
		this.mouseLeaveNav = this.mouseLeaveNav.bind(this)
		this.monthNameClickHandle = this.monthNameClickHandle.bind(this)
		this.setCalendarDates = this.setCalendarDates.bind(this)
		this.updateGoToVisibility = this.updateGoToVisibility.bind(this)
	}

	updateGoToVisibility(isShow) {
		this.setState({showGoTo: isShow})
	}

	dateClickHandle(date, data) {
		if (data.status != 'available') {
			NotificationManager.error('Not available.')
			return false
		}
		if (this.props.isAdmin) {
			let coninue = this.props.dateClickHandle(date, data)
			if (!coninue) {
				return false
			}
		}

		let selectedDates = this.state.selectedDates
		if (selectedDates.includes(date)) {
			let idx = selectedDates.indexOf(date)
			selectedDates.splice(idx, 1)
		} else {
			selectedDates.push(date)
		}
		this.props.updateSelectedDates(selectedDates)
		this.setState({selectedDates})
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

	setCalendarDates(date) {
		let passDays = []
		let monthDayNums = []		
		let year = date.getFullYear()
		let month = date.getMonth()
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

		let availableDates = []
		// Current Month
		for (let i=1; i<=monthLastDay; i++) {
			monthDayNums.push(i)
			let _date = new Date(year, month, i)
			let _dayName = DATE.dayNames[_date.getDay()]
			if (this.state.enableDays.length && this.state.enableDays.includes(_dayName)) {
				availableDates.push(i)
			}
		}
		
		// Next Month
		this.setState({
			date: date,
			passDays: passDays.reverse(),
			monthDayNums: monthDayNums,
			monthName: DATE.monthNames[date.getMonth()],
			availableDates: availableDates
		})
	}

	getDalendarData(calendarId) {
		this.props.doneLoadData('calendar', false)
		let bookId = this.props.bookId ? this.props.bookId : ''
		let date = this.state.date
		let formData = {
			setting: 'general',
			field: 'enable_days'
		}
		let apiReqs = [
			API.post(this.props.apiUrl+'wpcb/get_settings', formData)
		]

		if (calendarId) {
			apiReqs.push(API.get(this.props.apiUrl+'wpcb/calendar_data/'+calendarId+'/'+bookId))
		}
		Promise.all(apiReqs)
		.then(res => {
			let enableDays = res[0].data
			for (let idx in enableDays) {
				enableDays[idx] = enableDays[idx].toUpperCase()
			}

			let datesData = {}
			if (calendarId) {
				let calData = res[1].data
				let selectedDates = []
				let currentBookedDates = calData.current_booked_dates
				let dates = calData.other_booked_dates
				for (let yrMo in dates) {
					for (let _date in dates[yrMo]) {
						let dateData = dates[yrMo][_date]
						datesData[_date] = dateData
					}
				}

				let doneSetCalDate = false
				let bookedDates = {}
				for (let mo in currentBookedDates) {
					for (let _date in currentBookedDates[mo]) {
						selectedDates.push(_date)
						if (!doneSetCalDate) {
							let splitedDate = _date.split('-')
							let yr = splitedDate[0]
							let mo = parseInt(splitedDate[1])-1
							let day = splitedDate[2]
							date = new Date(yr, mo, day)
						}
						if (bookId) {
							bookedDates[_date] = {
								price: 0,
								time: ''
							}
						}
					}					
				}

				if (bookId) {
					this.props.setBookedDates(bookedDates)
				}

				this.setState({selectedDates})
				this.props.updateSelectedDates(selectedDates)
			}
			
			
			this.setState({
				datesData,
				enableDays
			})

			this.setCalendarDates(date)
			this.setCalendarHeight()
			this.props.doneLoadData('calendar')
		})
		.catch(err => {
			console.log('getDalendarData error')
			console.log(err)
			this.props.doneLoadData('calendar')
		})
	}

	setCalendarHeight() {
		const calendarInterval = setInterval(() => {
			let box = document.getElementById('calendarDays')
			if (box.offsetWidth) {
				let dateHeight= (box.offsetWidth / 7) + 'px'
				this.setState({dateHeight})
			}
		}, 100)

		setTimeout(() => {
			clearInterval(calendarInterval)
		}, 4000)
	}

	componentDidUpdate() {
		if (this.props.refreshCalendar) {
			this.getDalendarData(this.props.calendarId)
			this.props.setRefreshCalendar(false)
			this.setState({calendarId: this.props.calendarId})
		}

		if (this.props.calendarId && this.props.calendarId != this.state.calendarId) {
			this.getDalendarData(this.props.calendarId)
			this.setState({
				calendarId: this.props.calendarId,
				bookId: this.props.bookId	
			})
		}
	}

	componentDidMount() {
		this.getDalendarData(this.state.calendarId)
	}

	render() {
		return(
			<>
			<NotificationContainer />
			<div className={'card calendar p-0 border-0 shadow '+this.props.className}>
				<div className='card-header py-3 d-flex justify-content-between align-items-center'>
					<div 
						role='button' 
						className={'h4 m-0 p-1 shadow rounded-circle '+this.props.arrowClass+' '+(this.state.hovered.includes('arrowLeft') ? '' : 'text-secondary')}
						onMouseLeave={this.mouseLeaveNav}
						onClick={() => this.gotoCalendar(false)}
					>
						<i class='fa fa-angle-left p-0 px-2' onMouseEnter={() => this.mouseEnterNav('arrowLeft')}></i>
					</div>
					<div className={'h3 m-0 text-center text-uppercase '+this.props.headingClass+' '+(this.state.hovered.includes('monthName') ? '' : 'text-secondary')}
						role='button'
						onMouseLeave={this.mouseLeaveNav}
						onClick={this.monthNameClickHandle}
					>
						<span onMouseEnter={() => this.mouseEnterNav('monthName')}>{DATE.monthNames[this.state.date.getMonth()]} {this.state.date.getFullYear()}</span>
					</div>
					<div 
						role='button' 
						className={'h4 m-0 p-1 shadow rounded-circle '+this.props.arrowClass+' '+(this.state.hovered.includes('arrowRight') ? '' : 'text-secondary')}
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
							return <div className='day_name'> {dayName} </div>
						})}
						{/* Passed Month Dates */}
						{this.state.passDays?.map((dayNum, idx) => {
							return <div className='day_num ignore'></div>
						})}
						{/* Month Dates */}
						{this.state.monthDayNums?.map((dayNum, idx) => {
							let _mo = DATE.getMonth2Digit(this.state.date.getMonth())
							let _year = this.state.date.getFullYear()
							let _day = FUNCTION.leftFillNum(dayNum, 2)
							let _date = _year+ '-' +_mo+ '-' +_day 

							let _dateData = this.state.datesData.hasOwnProperty(_date) ? this.state.datesData[_date] : {}
							let _status = this.state.availableDates.includes(dayNum) ? 'available' : 'unavailable'
							_status = this.state.datesData.hasOwnProperty(_date) ? _dateData.status : _status
							if (this.state.selectedDates.includes(_date)) {
								_status = 'available'
							}
							let _desc = this.state.datesData.hasOwnProperty(_date) ? _dateData.description : ''
							_dateData.status = _status
							_dateData.description = _desc

							let selected = this.state.selectedDates.includes(_date) ? 'selected' : ''
							let bookedStatus = _status == 'booked' ? <span class="booked-status d-block"><i class="fa fa-check"></i></span> : ''
							let selectedIcon = selected ? <span class="selected-check d-block"><i class="fa fa-check"></i></span> : ''
							
							if (_dateData.description) {
								return <Tippy content={_dateData.description}>
									<div 
										key={idx}
										className={'day_num '+_status+' '+selected}
										style={{ 
											height: this.state.dateHeight
										}}
										onClick={() => this.dateClickHandle(_date, _dateData)}
									> 
										{dayNum}
										{bookedStatus}
										{selectedIcon}
									</div>
								</Tippy>
							} else {
								return <div 
									key={idx}
									className={'day_num '+_status+' '+selected}
									style={{ 
										height: this.state.dateHeight
									}}
									onClick={() => this.dateClickHandle(_date, _dateData)}
								> 													
									{dayNum}
									{bookedStatus}
									{selectedIcon}
								</div>
							}											
						})}
					</div>
				</div>
				<CalendarGoto isVisible={this.state.showGoTo} date={this.state.date} updateGoToVisibility={this.updateGoToVisibility} setDate={this.setCalendarDates}/>
			</div>
			</>
		)
	}
}

export default React.memo(Calendar)