import React from 'react';
import DatePicker from 'react-native-datepicker';

const DatePickerComponent = ({style, date, onDateChange}) => {
	return (
		<DatePicker
	        style={style}
	        date= {date}
	        mode="date"
	        placeholder="select date"
	        androidMode="spinner"
	        format="MMM D,YYYY"
	        showIcon={false}
	        onDateChange = {onDateChange}
	    />
	);
};

export default DatePickerComponent;