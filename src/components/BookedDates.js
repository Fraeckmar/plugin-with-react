import React from 'react'
import DATE from './custom/Date'

class BookedDates extends React.Component
{
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className={'card xw-100 p-0 border-0 shadow '+(this.props.bookId ? '' : 'd-none')}>
				<h3 className='card-header border-0'> Booking Details </h3>
				<div className='card-body p-0'>
					<table className='table m-0 table-bordered'>
						<tbody>
							<tr>
								<td className='border-bottom-0 px-3'>
									<strong>Selected Date(s)</strong>
								</td>
								<td className='border-bottom-0 px-3'>									
									<ul className='m-0 ps-2 list-disc'>
										{Object.keys(this.props.bookedDates)?.map((_date, idx) => {
											let mo = parseFloat(_date.split('-')[1])-1
											let day = _date.split('-')[2]
											let monthName = DATE.monthNames[mo]
											if (this.props.rateType == 'default') {
												return (
													<li key={idx}>{monthName} {day}</li>
												)
											}											
										})}
									</ul>									
								</td>
							</tr>
							<tr className={this.props.rateType == 'default' ? 'd-none' : ''}>
								<td className=' px-3'><strong>Total</strong></td>
								<td className=' px-3'></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

export default BookedDates