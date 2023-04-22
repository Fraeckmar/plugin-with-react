import React, {useEffect, useState} from "react"
import { useNavigate, Link } from 'react-router-dom'
import API from './custom/API'
import MaterialReactTable from 'material-react-table'
import {NotificationContainer, NotificationManager} from 'react-notifications'
import Confirm from "./custom/Confirm"

const Bookings = () => {
	const navigate = useNavigate()
	const [data, setData] = useState([])
	const [columns, setColumns] = useState([])
	const [rowSelection, setRowSelection] = useState({})
	const [selectedIds, setSelectedIds] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [showConfirm, setShowConfirm] = useState(false)

	const confirmDeletion = (ids) => {
		setShowConfirm(false)
		deleteBookings(ids)
	}

	const deleteBookings = (ids) => {
		setIsLoading(true)
		API.post('wpcb/delete_posts',{ids})
		.then(res => {
			setIsLoading(false)
			getBookingsData()
			NotificationManager.success('Delete successfully.')
			setSelectedIds([])
			setRowSelection([])
		})
		.catch(err => {
			console.log('Error in deteling calendar')
			console.log(err)			
			setIsLoading(false)
		})
	}

	const deleteHandle = (bookId) => {
		setSelectedIds([bookId])
		setShowConfirm(true)
	}

	const getBookingsData = () => {
		Promise.all([
			API.get('wpcb/booking_list_columns'),
			API.get('wpcb/bookings')
		])		
		.then(res => {
			let cols = res[0].data
			let bookings = res[1].data.bookings
			let booking_ids = res[1].data.booking_ids
			let _columns = [{
				accessorKey: 'actions',
				header: 'Actions',
				size: 1
			}]
			let _data = []

			

			for (let col in cols) {
				_columns.push({
					accessorKey: col,
					header: cols[col],
					Cell: col == 'wpcb_booking_status' ? ({ cell }) => <span className='badge bg-primary p-1 px-2'>{cell.getValue()}</span> : ({ cell }) => cell.getValue()
				})
			}

			for (let id of booking_ids) {
				let itemData = {
					id: id,
					actions: <>
						<Link to={'/booking/'+id} className='text-secondary ' title='Edit' style={{ fontSize: '20px' }}><i className='fa fa-pencil'></i></Link>
						<span className='text-danger mx-2' title='Delete' role='button' style={{ fontSize: '20px' }} onClick={() => deleteHandle(id)}><i className='fa fa-trash'></i></span>
					</>
				}
				for (let key of Object.keys(bookings[id])) {
					let colData = bookings[id][key]
					if (key == 'booked_dates') {
						let newColData = colData.map((_date, idx) => {
							return <><span className="rounded small booked-dates text-dark bg-light px-2">{_date}</span> <br/></>
						})
						colData = newColData
					}
					itemData[key] = colData
				}
				_data.push(itemData)
			}
			setColumns(_columns)
			setData(_data)
			setIsLoading(false)
		})
		.catch(err => {
			console.log('Error in bookings')
			console.log(err)
		})
	}

	useEffect(() => {
		getBookingsData()
	}, [])

	const bulkDelete = () => {
		if (!selectedIds.length) {
			NotificationManager.error('Please select booking(s) to delete.')
			return false
		}
		setShowConfirm(true)
	}

    return (
        <div className="booking-list table-valign-top">
			<Confirm isVisible={showConfirm} id={selectedIds} confirmAction={confirmDeletion} setVisibility={setShowConfirm} type='booking(s)'/>
			<NotificationContainer />
			<MaterialReactTable 
				columns={columns} 
				data={data}
				enableRowSelection
				enableSelectAll={false}
				state={{ rowSelection, isLoading: isLoading,  }}
				initialState={{density: 'compact' }}
				enableHiding={false}
				enableFullScreenToggle={false}
				// getRowId={(originalRow) => originalRow.boodId}
				muiSelectCheckboxProps={(tbl) => ({ // table items selected
					onClick: () => {
						let _selectedIds = selectedIds
						let idx = tbl.row.id
						let id = tbl.row.original.id
						setRowSelection((prev) => ({
							...prev,
							[idx]: !prev[idx],
						}))
						if (_selectedIds.indexOf(id) != -1) {
							_selectedIds.splice(_selectedIds.indexOf(id), 1)
						} else {
							_selectedIds.push(id);
						}
						setSelectedIds(_selectedIds)
					},
					selected: () => {
						let row = tbl.row
						rowSelection[row.id]
					},
					sx: {
					cursor: 'pointer',
					},
				})}
				renderTopToolbarCustomActions={() => (
					<div>
					<button className="btn btn-sm btn-danger" onClick={bulkDelete} > Bulk Delete </button>
					<Link to='/booking' className='btn btn-sm btn-outline-primary ms-2' title='New'>Add New <i className='fa fa-plus'></i></Link>
					</div>
				)}
				renderBottomToolbarCustomActions={() => (
					<button
						className="btn btn-sm btn-danger"
						onClick={bulkDelete}
					>
						Bulk Delete
					</button>
				)}
			/>
		</div>
    )
}
export default Bookings