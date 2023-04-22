import spinnerIcon from '../../images/windows.png'

const Spinner = ({isVisible}) => {
	return (
		<div className={'modal '+(isVisible ? 'd-block' : '')} tabindex="-1">
			<div className="modal-dialog modal-dialog-centered w-100 text-center">
				<div className="modal-content modal-content bg-transparent border-0">
					<div className="modal-body">
						<div className=''>
							<img style={{ backgroundColor: '#f6f6f6f7' }} className='w-24 p-3' src={spinnerIcon}/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Spinner