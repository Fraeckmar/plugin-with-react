const FUNCTION = {}
FUNCTION.leftFillNum = (num, targetLength) => {
	return num.toString().padStart(targetLength, "0")
}
FUNCTION.ucwords = (str) => {
	return str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	})
}

export default FUNCTION