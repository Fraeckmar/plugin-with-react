import React, { Suspense} from 'react'
import { Route, Routes } from 'react-router-dom'

const Bookings = React.lazy(() => import('./Bookings'))
const Calendars = React.lazy(() => import('./Calendars'))
const Settings = React.lazy(() => import('./Settings'))
const Customers = React.lazy(() => import('./Customers'))
const Statistics = React.lazy(() => import('./Statistics'))
const Report = React.lazy(() => import('./Report'))
const BookingPost = React.lazy(() => import('./BookingPost'))
const CalendarPost = React.lazy(() => import('./CalendarPost'))
const DefaultContent = React.lazy(() => import('./DefaultContent'))
import Config from './custom/Config'


const AppContent = () => {

  return (
    <Suspense fallback={Config.loading}>
		<Routes>
			<Route exact path="bookings" name="Booking List" element={<Bookings />} />
			<Route exact path="calendars" name="Calendar List" element={<Calendars />} />
			<Route exact path="customers" name="Customers" element={<Customers />} />
			<Route exact path="report" name="Report" element={<Report />} />
			<Route exact path="statistics" name="Statistics" element={<Statistics />} />
			<Route exact path="settings" name="Login Page" element={<Settings />} />
			<Route exact path="booking/:id?" name="Booking Post" element={<BookingPost />} />
			<Route exact path="calendar/:id?" name="Calendar Post" element={<CalendarPost />} />
			<Route path="*" name="Main" element={<DefaultContent />} />			
		</Routes>
	</Suspense>
  )
}

export default AppContent
