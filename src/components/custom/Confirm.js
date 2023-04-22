import { Component } from 'react'

class Confirm extends Component
{
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<>
				<div className={'modal '+(this.props.isVisible ? 'd-block' : '')} style={{ backgroundColor: '#86868640' }}>
					<div className="modal-dialog w-100 text-center">
						<div className="modal-content modal-content bg-white border-0">
							<h5 className="modal-header justify-content-start h5 m-0 border-0"><i class="fa fa-info-circle text-danger">&nbsp;</i> Are you sure to delete selected {this.props.type ? this.props.type : 'item'}?</h5>
							<div class="modal-footer p-2">
								<button 
									type="button" 
									class="btn btn-outline-danger" 
									data-mdb-dismiss="modal"
									onClick={() => this.props.setVisibility(false)}
								>
									Cancel
								</button>
								<button 
									type="button" 
									class="btn btn-danger confirm" 
									onClick={() => this.props.confirmAction(this.props.id)}
									>
										Confirm
								</button>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}
}

export default Confirm