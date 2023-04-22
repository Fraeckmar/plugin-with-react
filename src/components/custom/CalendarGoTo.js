import React from 'react'
import DATE from './Date'

class CalendarGoto extends React.Component
{
	constructor(props) {
		super(props)

		this.state = {
			selectedYear: this.props.date.getFullYear(),
			selectedMonth: this.props.date.getMonth(),
			years: [],
			currentDisplay: '',
			animateYearsClass: '',
			animateMonthsClass: '',
			stateUpdate: false
		}

		this.goToYearHandle = this.goToYearHandle.bind(this)
	}

	goToYearHandle() {
		this.setState({currentDisplay: 'years'})
		this.animateYears()
	}

	resetAnimateClass() {
		this.setState({
			animateMonthsClass: '',
			animateYearsClass: ''
		})
	}

	animateMonths() {
		this.resetAnimateClass()
		setTimeout(() => {
			this.setState({animateMonthsClass: 'animate-scale'})
		}, 100)
	}

	animateYears() {
		this.resetAnimateClass()
		setTimeout(() => {
			this.setState({animateYearsClass: 'animate-scale'})
		}, 100)
	}

	yearClickHandle(year) {
		this.setState({
			selectedYear: year,
			currentDisplay: 'months'
		})
		this.animateMonths()
		let date = new Date(year, this.props.date.getMonth())
		this.props.setDate(date)
	}

	monthClickHandle(month) {
		let date = new Date(this.state.selectedYear, month)
		this.props.updateGoToVisibility(false)
		this.props.setDate(date)
	}

	componentDidMount() {
		let currentYear = DATE.current.getFullYear()
		let years = []

		for (let i=0; i<6; i++) {
			years.push(currentYear+i)
		}
		for (let i=6; i>0; i--) {
			if (!years.includes(currentYear-1)) {
				years.push(currentYear-i)
			}
		}
		years.sort()
		this.setState({years: years})
	}

	componentDidUpdate() {
		if (this.props.isVisible && !this.state.stateUpdate) {
			this.setState({
				currentDisplay: 'months',
				stateUpdate: true
			})
			this.animateMonths()
		}
	}

	render() {
		return (
			<div className={'modal '+(this.props.isVisible ? 'd-block' : '')} tabindex="-1">
				<div className="modal-dialog modal-dialog-centered xw-72 text-center">
					<div className="modal-content modal-content shadow border-0 go-to">
						<div className='modal-header'>
							<div 
								role='button' 
								className={'text-center current-year px-2 fw-semibold h5 m-0'+(this.state.currentDisplay == 'months' ? '' : 'd-none')}
								onClick={this.goToYearHandle}
							>
								{this.props.date.getFullYear()}
							</div>
							<button type="button" className='btn-close w-8' onClick={() => this.props.updateGoToVisibility(false)}></button>
						</div>
						<div className='modal-body'>
							<div className={'row scale-preset '+(this.state.currentDisplay == 'months' ? this.state.animateMonthsClass : 'd-none')}>
								{DATE.months.map((month, idx) => {
									return(
										<div 
											key={idx} 
											className={'col-3 py-3 month '+(this.props.date.getMonth() == idx ? 'current' : '')} 
											onClick={() => {this.monthClickHandle(idx)}}
										>{month}</div>
									)
								})}
							</div>
							<div className={'row scale-preset '+(this.state.currentDisplay == 'years' ? this.state.animateYearsClass : 'd-none')}>
								{this.state.years.map((year, idx) => {
									return(
										<div 
											key={idx}
											className={'col-3 py-3 year '+(this.props.date.getFullYear() == year ? 'current' : '')} 										
											onClick={() => this.yearClickHandle(year)}
										>{year}</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default CalendarGoto