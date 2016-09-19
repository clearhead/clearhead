/**
 * Check a phone number, return true or false. US 10 digit numbers only.
 *
 *
 * @param  {string} phone User provided phone number
 * @return {string,object}       Validated phone number or error message
 */
function phoneCheck(phone) {
	var bad_chars = /[-.\s\n\t\D#$%^&)(]/g;
	var s_phone = phone.replace(bad_chars, "");
	var regex = /^[0-9]{10}$/;
	var valid_phone = regex.test(s_phone);
	return valid_phone;
}

export default phoneCheck;
