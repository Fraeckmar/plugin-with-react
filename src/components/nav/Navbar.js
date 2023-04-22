import React, {useEffect} from "react"
import { Link, useLocation, Route } from 'react-router-dom'


const NavBar = () => {
	const location = useLocation()
	const slug = location.pathname.replace('/', '')

    return (
        <nav className="navbar navbar-expand-lg w-100 p-0 bg-secondary">
			<div className="container-fluid px-0">
				<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item m-0">
						<Link to='bookings' className={'nav-link p-3 h6 m-0 fw-normal '+(slug == 'bookings' || slug == '' ? 'bg-white text-dark' : 'text-white')}>Manage Booking</Link>
					</li>
					<li className="nav-item m-0">
						<Link to='calendars' className={'nav-link p-3 h6 m-0 fw-normal '+(slug == 'calendars' ? 'bg-white text-dark' : 'text-white')}>Calendars</Link>
					</li>
					<li className="nav-item m-0">
						<Link to='customers' className={'nav-link p-3 h6 m-0 fw-normal '+(slug == 'customers' ? 'bg-white text-dark' : 'text-white')}>Customers</Link>
					</li>
					<li className="nav-item m-0">
						<Link to='Statistics' className={'nav-link p-3 h6 m-0 fw-normal '+(slug == 'Statistics' ? 'bg-white text-dark' : 'text-white')}>Statistics</Link>
					</li>
					<li className="nav-item m-0">
						<Link to='report' className={'nav-link p-3 h6 m-0 fw-normal '+(slug == 'report' ? 'bg-white text-dark' : 'text-white')}>Report</Link>
					</li>
					<li className="nav-item m-0">
						<Link to='settings' className={'nav-link p-3 h6 m-0 fw-normal '+(slug == 'settings' ? 'bg-white text-dark' : 'text-white')}>Settings</Link>
					</li>
				</ul>
				</div>
			</div>
		</nav>
    )
}
export default NavBar