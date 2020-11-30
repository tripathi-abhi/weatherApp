const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

if (!process.argv[2]) {
	return console.log("Address field required with CLI command");
}

const getAddress = () => {
	let i = 2;
	let address = "";
	while (process.argv[i] != undefined) {
		address += process.argv[i] + ", ";
		i++;
	}
	return address;
};

geocode(getAddress(), (error, { latitude, longitude, location } = {}) => {
	if (error) {
		return console.log("Error ", error);
	}
	console.log("Place : ", location);
	forecast(
		latitude,
		longitude,
		(error, { description, temperature, humidity } = {}) => {
			if (!error) {
				console.log(
					`Weather description : ${description} \nTemperature : ${temperature}K \nHumidity : ${humidity}`
				);
			} else {
				console.log("Error ", error);
			}
		}
	);
});
