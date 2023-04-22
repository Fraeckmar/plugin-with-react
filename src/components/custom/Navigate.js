import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Navigate = ({navTo}) => {
	let navigate = useNavigate()
	useEffect(() => {
		if (navTo) {	
			navigate(navTo)
		}
	})
	return (<></>)
}

export default Navigate