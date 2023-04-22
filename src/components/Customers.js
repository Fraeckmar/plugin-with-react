import React from 'react'
import MaterialReactTable from 'material-react-table'
import API from './custom/API'
import Spinner from './custom/Spinner'

class Customers extends React.Component
{
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			columns: [],
			isLoading: false
		}
	}
	componentDidMount() {
		this.setState({isLoading: true})
		API.get('wpcb/customers')
		.then(res => {
			let column_data = res.data.columns
			let booking_data = Object.values(res.data.bookings)
			let tblColumns = []
			let tblData = []
			
			for (let key in column_data) {
				tblColumns.push({
					accessorKey: key,
					header: column_data[key]
				})
			}

			console.log(tblColumns)

			for (let _data of booking_data) {
				_data.is_registered = <i className={'fa fa-1-5x fa-circle-'+(_data.is_registered.status ? 'check text-success' : 'xmark text-danger')}></i>
				tblData.push(_data)
			}

			this.setState({
				columns: tblColumns,
				data: tblData,
				isLoading: false
			})
			
		})
		.catch(err => {
			console.log('Error in retrieving of customers')
			console.log(err)
			this.setState({isLoading: true})
		})
	}
	render() {
		return (
			<>
				<MaterialReactTable 
					data={this.state.data}
					columns={this.state.columns}
					state={{ isLoading: this.state.isLoading }}
					initialState={{ density: 'compact' }}
					enableHiding={false}
					enableFullScreenToggle={false}
				/>
			</>
		)
	}
}

export default React.memo(Customers)