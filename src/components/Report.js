import React from 'react'
import API from './custom/API'
import GenField from './custom/GenField'
import Spinner from './custom/Spinner'
import { CSVDownload } from 'react-csv'

class Report extends React.Component
{

	constructor(props) {
		super(props)

		this.state = {
			dateFrom: '',
			dateTo: '',
			status: '',
			customer: '',
			customers: {},
			statusList: [],
			showLoding: false,
			CSVDownload: '',
			errMsg: '',
			fileName: 'Online Booking - '+(new Date).getTime()
		}

		this.setFieldValue = this.setFieldValue.bind(this)
		this.formSubmitHandle = this.formSubmitHandle.bind(this)
	}

	setFieldValue(field, value) {
		this.setState({[field]: value})
	}

	formSubmitHandle(e) {
		e.preventDefault()

		let dateFrom = null
		let dateTo = null
		if (this.state.dateFrom) {
			let yr = this.state.dateFrom.getFullYear()
			let mo = this.state.dateFrom.getMonth()+1
			let day = this.state.dateFrom.getDate()
			dateFrom = yr+'-'+mo+'-'+day
		}
		if (this.state.dateTo) {
			let yr = this.state.dateTo.getFullYear()
			let mo = this.state.dateTo.getMonth()+1
			let day = this.state.dateTo.getDate()
			dateTo = yr+'-'+mo+'-'+day
		}

		const formParams = {
			date_from: dateFrom,
			date_to: dateTo,
			status: this.state.status,
			customer: this.state.customer
		}

		this.setState({showLoding: true, CSVDownload: ''})
		API.post('wpcb/report_data',formParams)
		.then(res => {
			const headers = res.data.headers
			const data = res.data.data
			if (Object.values(data).length) {
				this.setState({
					errMsg: '',
					successMsg: Object.values(data).length+' record(s) found.',
					CSVDownload: <CSVDownload headers={Object.values(headers)} data={Object.values(data)} filename={this.state.fileName} />
				})
			} else {
				this.setState({
					successMsg: '',
					errMsg: 'No record(s) found.'
				})
			}	
			this.setState({showLoding: false})		
		})
		.catch(err => {
			console.log('Error in getting report data')
			console.log(err)
			this.setState({
				showLoding: false,
				errMsg: 'Something went wrong',
				successMsg: ''
			})
		})
	}

	componentDidMount() {
		this.setState({showLoding: true})
		Promise.all([
			API.get('wpcb/customers'),
			API.get('wpcb/customer_field'),
			API.get('wpcb/status_list')
		])		
		.then(res => {
			const customerData = res[0].data.bookings
			const field = res[1].data
			const statusList = res[2].data
			let customers = []

			for (let _data of Object.values(customerData)) {
				customers.push(_data[field.key])
			}
			this.setState({
				customers,
				statusList,
				showLoding: false
			})
		})
		.catch(err => {
			console.log('Error in retrieving of customers')
			console.log(err)
			this.setState({showLoding: true})
		})
	}
	
	render() {
		return (
			<>
			{this.state.CSVDownload}
			<Spinner isVisible={this.state.showLoding} />
			<div className='p-3'>
				<p className={'alert alert-danger '+(this.state.errMsg ? '' : 'd-none')}>
					{this.state.errMsg}
				</p>
				<p className={'alert alert-success '+(this.state.successMsg ? '' : 'd-none')}>
					{this.state.successMsg}
				</p>
				<h4 className='h4'>Generate Report</h4>
				<form onSubmit={this.formSubmitHandle}>
					<div className='card card-body border-0 shadow'>
						<div className='row mb-2'>
							<div className='col-12 col-md-6'>
								<label className='form-label'>From: </label>
								<GenField 
									field={{
										type: 'date',
										key: 'dateFrom',
										value: this.state.dateFrom,
										class: 'form-control',
										required: true
									}}
									setFieldValue={this.setFieldValue}
								/>
							</div>
							<div className='col-12 col-md-6'>
								<label className='form-label'>To:</label>
								<GenField 
									field={{
										type: 'date',
										key: 'dateTo',
										value: this.state.dateTo,
										class: 'form-control'
									}}
									setFieldValue={this.setFieldValue}
								/>
							</div>
						</div>
						<div className='mb-2'>
							<label className='form-label'>Status:</label>
							<GenField 
								field={{
									type: 'select',
									key: 'status',
									value: this.state.status,
									class: 'form-select',
									options: this.state.statusList
								}}
								setFieldValue={this.setFieldValue}
							/>
						</div>
						<div className='mb-2'>
							<label className='form-label'>Customer:</label>
							<GenField 
								field={{
									type: 'select',
									key: 'customer',
									value: this.state.customer,
									class: 'form-select',
									options: this.state.customers
								}}
								setFieldValue={this.setFieldValue}
							/>
						</div>
						<div className='mt-2'>
							<button type='submit' className='btn btn-primary'>Generate</button>
						</div>
					</div>
				</form>
			</div>
			</>
		)
	}
}

export default Report