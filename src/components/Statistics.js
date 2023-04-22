import React from 'react'
import API from './custom/API'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Spinner from './custom/Spinner'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

class Statistics extends React.Component
{
	constructor(props) {
		super(props)

		this.state = {
			showLoading: false,			
			moStatistics: '',
			yrStatistics: '',
			summary: {
				daily: 0,
				weekly: 0,
				monthly: 0,
				yearly: 0
			},
			moConfig: {
				labels: [],
				datasets: [{
					label: 'Booking',
					data: [],
					borderColor: '#3f83f8',
					backgroundColor: '#3f83f878',
					pointStyle: 'circle',
					pointRadius: 8,
					pointHoverRadius: 10
				}]
			},
			yrConfig: {
				labels: [],
				datasets: [{
					label: 'Booking',
					data: [],
					borderColor: '#3f83f8',
					backgroundColor: '#3f83f878',
					pointStyle: 'circle',
					pointRadius: 8,
					pointHoverRadius: 10
				}]
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
					display: false,
					},
					title: {
					display: false,
					},
				},
			}
		}
	}

	componentDidMount() {
		this.setState({showLoading: true})
		API.get('wpcb/statistics')
		.then(res => {
			let statistics = res.data.statistics
			let summary = res.data.summary

			let moData = this.state.moConfig
			for (let mo in statistics.monthly) {
				moData.labels.push(mo)
				moData.datasets[0].data.push(statistics.monthly[mo])
			}

			let yrData = this.state.yrConfig
			for (let yr in statistics.yearly) {
				yrData.labels.push(yr)
				yrData.datasets[0].data.push(statistics.yearly[yr])
			}

			this.setState({
				showLoading: false,
				summary,
				moStatistics: <Line options={this.state.options} data={moData} />,
				yrStatistics: <Line options={this.state.options} data={yrData} />
			})
				
		})
		.catch(err => {
			console.log('Error in retrieving of statistics')
			console.log(err)
		})
	}

	render() {
		return (
			<>
			<Spinner isVisible={this.state.showLoading} />
			<div className={'mt-2 p-4 '+(this.state.showLoading ? 'd-none' : '')}>
				<div id='summary' className='mb-5 pb-5'>
					<div className='row'>
						<div id='daily' className='col-md-3 col-sm-6'>
							<div class="data d-flex align-items-center p-3 rounded">
								<div class="icon flex-shrink-1 p-3 ms-1 me-3">
									<i class="fa fa-book text-center w-9"></i>
								</div>
								<div>
									<p class="label text-left">Today</p>
									<p class="count text-left">{this.state.summary.daily} <i class="fa fa-caret-up"></i></p>
								</div>
							</div>
						</div>
						<div id='weekly' className='col-md-3 col-sm-6'>
							<div class="data d-flex align-items-center p-3 rounded">
								<div class="icon flex-shrink-1 p-3 ms-1 me-3">
									<i class="fa fa-book text-center w-9"></i>
								</div>
								<div>
									<p class="label text-left">This Week</p>
									<p class="count text-left">{this.state.summary.weekly} <i class="fa fa-caret-up"></i></p>
								</div>
							</div>
						</div>
						<div id='monthly' className='col-md-3 col-sm-6'>
							<div class="data d-flex align-items-center p-3 rounded">
								<div class="icon flex-shrink-1 p-3 ms-1 me-3">
									<i class="fa fa-book text-center w-9"></i>
								</div>
								<div>
									<p class="label text-left">This Month</p>
									<p class="count text-left">{this.state.summary.monthly} <i class="fa fa-caret-up"></i></p>
								</div>
							</div>
						</div>
						<div id='yearly' className='col-md-3 col-sm-6'>
							<div class="data d-flex align-items-center p-3 rounded">
								<div class="icon flex-shrink-1 p-3 ms-1 me-3">
									<i class="fa fa-book text-center w-9"></i>
								</div>
								<div>
									<p class="label text-left">This Year</p>
									<p class="count text-left">{this.state.summary.yearly} <i class="fa fa-caret-up"></i></p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div id='statistics' className='mt-5'>
					<div className='row'>
						<div className='col-sm-6'>
							<div className='text-center h6 mb-2'>MONTHLY</div>
							{this.state.moStatistics}
						</div>
						<div className='col-sm-6'>
							<div className='text-center h6 mb-2'>YEARLY</div>
							{this.state.yrStatistics}
						</div>
					</div>
				</div>				
			</div>
			</>
		)
	}
}

export default Statistics