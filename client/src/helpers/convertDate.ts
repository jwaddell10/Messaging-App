export default function convertDate(date: string | number): string {
	// Create a date object, handle both string and numeric timestamps
	const parsedDate = new Date(date);

	// Validate the date
	if (isNaN(parsedDate.getTime())) {
		throw new Error("Invalid date format.");
	}

	// Formatting options
	const options: Intl.DateTimeFormatOptions = {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	};

	// Return the formatted date
	return parsedDate.toLocaleString("en-EN", options);
}
