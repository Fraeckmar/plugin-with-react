const Legend = () => {
	return (
		<div className='d-flex'>
			<div className='d-flex align-items-center me-3'>
				<div className='w-7 h-7 bg-available shadow-sm me-1'></div>
				<span className='flex-grow-1'>Available</span>
			</div>
			<div className='d-flex align-items-center me-3'>
				<div className='w-7 h-7 bg-unavailable shadow-sm me-1'></div>
				<span className='flex-grow-1'>Unavailable</span>
			</div>
			<div className='d-flex align-items-center me-3'>
				<div className='w-7 h-7 bg-booked shadow-sm me-1 d-flex justify-content-center align-items-center text-white h5 m-0'>
					<i class="fa fa-check"></i>
				</div>
				<span className='flex-grow-1'>Booked</span>
			</div>
		</div>
	)
}

export default Legend