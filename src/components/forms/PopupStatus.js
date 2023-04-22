import { Component } from 'react'

class PopupStatus extends Component
{
	constructor(props) {
		super(props)

		this.state = {
			dataUpdate: false,
			date : '',
			data: {},
			selectedStatus: '',
			activeTab: 'status'
		}

		this.submitHandle = this.submitHandle.bind(this)
		this.setStatusData = this.setStatusData.bind(this)
		this.descriptionChange = this.descriptionChange.bind(this)
	}

	setStatusData(e) {
		let value = e.target.value
		let data = this.state.data
		data.status = value
		this.setState({
			data: data,
			selectedStatus: value
		})
	}

	changeTabHandle(activeTab) {
		this.setState({activeTab})
	}

	descriptionChange(e) {
		let value = e.target.value
		let data = this.state.data
		data.description = value
		this.setState({data: data})
	}

	submitHandle() {
		this.props.updateCalendarData(this.state.date, this.state.data)
	}

	componentDidUpdate() {
		if (Object.values(this.props.dayData).length && this.state.date != this.props.date) {
			let setVar = {
				date: this.props.date,
				data: this.props.dayData,
				dataUpdate: true,
				selectedStatus: this.props.dayData.status
			}
			this.setState(setVar)
		}
		
	}

	render() {
		return (
			<div className={'modal '+(this.props.isVisible ? 'd-block' : '')} tabindex="-1">
				<div className="modal-dialog">
					<div className="modal-content modal-content shadow border-0 mt-5 go-to">
						<div className='modal-header border-0 p-0'>
							<div className='col-6'>
								<div role='button' className={'text-secondary h5 m-0 py-3 px-2 rounded-top border-bottom '+(this.state.activeTab == 'status' ? ' border-secondary' : 'border-white')} onClick={() => this.changeTabHandle('status')}>Day {this.props.day}</div>
							</div>
							<div className='col-6'>
								<div role='button' className={'text-secondary h5 m-0 py-3 px-2 rounded-top border-bottom d-flex justify-content-bwtween '+(this.state.activeTab == 'bookings' ? 'border-secondary' : 'border-white')}onClick={() => this.changeTabHandle('bookings')}>
									<span>Bookings &nbsp;</span> 
									<span class="badge bg-primary rounded-pill" style={{ fontSize: '12px', padding: '3px 7px', lineHeight: '1.4' }}>{this.props.dayData.booking_numbers && this.props.dayData.booking_numbers.length ? this.props.dayData.booking_numbers.length : ''}</span>
								</div>
							</div>
						</div>
						<div className='modal-body'>
							<div className={this.state.activeTab == 'status' ? '' : 'd-none'}>
								<div class="form-check form-check-inline">
									<label>
										<input 
											class="form-check-input" 
											name="date_status" 
											value="available" 
											type="radio" 
											checked={this.state.data.status == 'available'}
											onChange={this.setStatusData}
										/> 
										Available
									</label>
								</div>
								<div class="form-check form-check-inline">
									<label>
										<input 
											class="form-check-input" 
											name="date_status" 
											value="unavailable" 
											type="radio" 
											checked={this.state.data.status == 'unavailable'}
											onChange={this.setStatusData}
										/> 
										Unavailable
									</label>
								</div>
								<div class="form-check form-check-inline">
									<label>
										<input 
											class="form-check-input" 
											name="date_status" 
											value="booked" 
											type="radio" 
											checked={this.state.data.status == 'booked'}
											onChange={this.setStatusData}
										/> 
										Booked
									</label>
								</div>
								<div className='mt-2'>
									<label>Description</label>
									<textarea class="form-control" onChange={this.descriptionChange} value={this.state.data.description}></textarea>
								</div>
							</div>
							<div className={this.state.activeTab == 'bookings' ? '' : 'd-none'}>
								<ul class="ps-3 list-disc">
									{this.props.dayData.booking_numbers?.map((bookingNo, idx) => {
										return <li className='m-0 h6' key={idx}>{bookingNo}</li>
									})}
									<span className={this.props.dayData.booking_numbers && this.props.dayData.booking_numbers.length ? 'd-none' : ''}>No booking(s) found.</span>
								</ul>								
							</div>
						</div>
						<div className='modal-footer p-2'>
							<button className='btn btn-sm btn-info text-white' onClick={this.submitHandle}>OK</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PopupStatus