import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import API from './custom/API'
import CalendarForm from './forms/CalendarForm'
import Spinner from './custom/Spinner'

const CalendarPost = () => {
	let { id } = useParams()
	const [showLoading, setShowLoading] = useState(false)

	return (
		<>
			<Spinner isVisible={showLoading}/>
			<CalendarForm id={id} setShowLoading={setShowLoading} />
		</>
	)
}

export default CalendarPost