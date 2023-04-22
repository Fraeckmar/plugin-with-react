const DATE = {}

DATE.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
DATE.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
DATE.dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
DATE.subMonths = (date, months) => {
	date.setMonth(date.getMonth() - months)	  
	return date;
}
DATE.addMonths = (date, months) => {
	date.setMonth(date.getMonth() + months)	  
	return date;
}
DATE.current = new Date()
DATE.getMonth2Digit = (month) => {
	return ("0" + (month + 1)).slice(-2)
}
export default DATE