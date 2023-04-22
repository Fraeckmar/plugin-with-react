import { Component } from 'react'

class Notification extends Component
{
	constructor(props) {
		super(props)
	}

	componentDidUpdate() {
		if (this.props.isVisible) {
			setTimeout(() => {
				this.props.closeNotif()
			}, 3000)
		}
	}

	render() {
		return (
			<>
				<div class={'wpcb-notif pe-4 h6 fw-normal alert alert-'+this.props.type+' '+(this.props.isVisible ? '' : 'd-none')}>
                    <span class={'fa fa-lg fa-'+this.props.icon+'-circle'}></span>&nbsp;
					<span>{this.props.message}</span> 
                    <span class="wpcb-notif-dismiss" onClick={this.props.closeNotif}>&times;</span>
                </div>
			</>
		)
	}
}

export default Notification