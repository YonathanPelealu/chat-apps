function timeDifference(date1: any, date2: any): any {
	var difference = new Date(date1).getTime() - new Date(date2).getTime();

	var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
	difference -= daysDifference * 1000 * 60 * 60 * 24;

	var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
	difference -= hoursDifference * 1000 * 60 * 60;

	var minutesDifference = Math.floor(difference / 1000 / 60);
	difference -= minutesDifference * 1000 * 60;

	// var secondsDifference = Math.floor(difference / 1000);
	return {
		day: daysDifference || 0,
		hour: hoursDifference || 0,
		minute: minutesDifference || 0,
	};
}

export { timeDifference };
