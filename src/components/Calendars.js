import React, { useEffect, useState, useRef } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { useNavigate, Link } from 'react-router-dom'
import API from './custom/API'
import MaterialReactTable from 'material-react-table'
import Confirm from './custom/Confirm'
import Spinner from './custom/Spinner'
import {NotificationContainer, NotificationManager} from 'react-notifications'

const Bookings = () => {
	const [data, setData] = useState([])
	const [isApiCalled, setIsApiCalled] = useState(false)
	const [rowSelection, setRowSelection] = useState({})
	const [selectedIds, setSelectedIds] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isModalShow, setModalVisibility] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const [deleteId, setDeleteId] = useState(0)
	const [showSpinner, setShowSpinner] = useState(false)

	const copyHandle = (bookId, shortcode, e) => {
		let clases = document.getElementsByClassName('shortcode-copy')
		for(var i = 0; i < clases.length; i++){
			clases[i].innerText = 'Copy'
		}
		document.getElementById('copy-'+bookId).innerHTML = 'Copied'
		navigator.clipboard.writeText(shortcode)
	}

	const resetCopied = () => {
		let clases = document.getElementsByClassName('shortcode-copy')
		setTimeout(() => {
			for(var i = 0; i < clases.length; i++){
				clases[i].innerText = 'Copy'
			}
		}, 1000)
	}

	const columns = [
		{
			accessorKey: 'actions',
			header: 'Actions',
			Cell: ({ cell }) => <span className='px-2'>{cell.getValue()}</span>,
			size: 1
		},
		{
			accessorKey: 'post_title',
			header: 'Calendar Name',
		},
		{
			accessorKey: 'post_date',
			header: 'Date Plublish',
		},
		{
			accessorKey: 'post_author',
			header: 'Author',
		},
		{
			accessorKey: 'shortcode_id',
			header: 'Shortcode',
			size: 200,
			Cell: ({ cell }) => {
				let value = cell.getValue()
				return (
					<Tippy content='Insert this shortcode into your page.'>
						<div>
							<span className=''>[wpcb_booking id={value}]</span>
							&nbsp; <small 
								role='button' className='badge bg-secondary text-white' 
								onClick={(e) => copyHandle(value, '[wpcb_booking id='+value+']', e)}
								onMouseLeave={resetCopied}
							>
								<span className='shortcode-copy' id={'copy-'+value}>Copy</span>
							</small>
						</div>
					</Tippy>					
				)
			}
		}
	]

	const deleteHandle = (id) => {
		let ids = [id]
		setShowSpinner(true)
		setShowConfirm(false)
		API.post('wpcb/delete_posts',{ids})
		.then(res => {
			NotificationManager.success('Calendar deleted successfully.')
			getCalendarsData()			
		})
		.catch(err => {
			console.log('Error in deteling calendar')
			console.log(err)
		})
	}

	const getCalendarsData = () => {
		API.get('wpcb/calendars')		
		.then(res => {
			let _data = []
			let calendars = res.data	
			setShowSpinner(false)		

			for (let id in calendars) {
				let itemData = {
					id: id,
					post_title: calendars[id].post_title,
					post_author: calendars[id].post_author,
					post_date: calendars[id].post_date,
					shortcode_id: calendars[id].shortcode_id,
					actions: <>
						<Link to={'/calendar/'+id} className='text-secondary' title='Edit' style={{ fontSize: '20px' }}><i className='fa fa-pencil'></i></Link>
						<span 
							className='text-danger mx-2' 
							title='Delete' role='button' 
							style={{ fontSize: '20px' }} 
							onClick={() => {
								setDeleteId(id)
								setShowConfirm(true)
							}}
							>
							<i className='fa fa-trash'></i>
						</span>
					</>
				}
				_data.push(itemData)
			}
			console.log(_data)
			setData(_data)
			setIsLoading(false)
		})
		.catch(err => {
			console.log('Error in bookings')
			console.log(err)
		})
	}

	useEffect(() => {
		if (!isApiCalled) {
			setIsApiCalled(true)
			getCalendarsData()
		}
	})

	return (
		<>
		<NotificationContainer />
		<Spinner isVisible={showSpinner} />
		<Confirm isVisible={showConfirm} id={deleteId} setVisibility={setShowConfirm} confirmAction={deleteHandle} type='calendar'/>
		<MaterialReactTable 
			columns={columns} 
			data={data}
			state={{ rowSelection, isLoading: isLoading }}
			initialState={{ density: 'compact' }}
			enableHiding={false}
			enableFullScreenToggle={false}
			renderTopToolbarCustomActions={() => (
				<Link
					className="btn btn-sm btn-outline-primary"
					to={'/calendar'}
				>
					Add New <i className='fa fa-plus'></i>
				</Link>
			)}
		/>
		</>
	)
}

export default Bookings