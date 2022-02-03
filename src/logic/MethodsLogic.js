export default function mashBeerImpl(dataObj) {

	var interval;

	dataObj.isRunning = !dataObj.isRunning;

	if (dataObj.isRunning) {
		dataObj.mashButtonMsg = "Running";
		interval = setInterval(function() { mashTimer(dataObj) }, 1000);
	}
	if (!dataObj.isRunning) {
		clearInterval(interval);
		dataObj.mashButtonMsg = "Paused";
	}
}

function mashTimer(dataObj) {
	if (dataObj.mashCounter <= 1) {
		console.log(dataObj.mashCounter);
		clearInterval(dataObj.mashCounter);

		if (dataObj.selectedBeer.method.mash_temp.length == 1) {
			dataObj.mashButtonMsg = "Done"
			dataObj.isRunning = false;
		}
		else if (
			dataObj.selectedBeer.method.mash_temp.length > 1 &&
			dataObj.currentMashIndex != dataObj.selectedBeer.method.mash_temp.length - 1
		) {
			dataObj.currentMashIndex++;
			dataObj.mashCounter =
				dataObj.selectedBeer.method.mash_temp[dataObj.currentMashIndex].duration * 60;
		} else if (
			dataObj.currentMashIndex >= dataObj.selectedBeer.method.mash_temp.length - 1
		) {
			dataObj.mashButtonMsg = "Done";
			dataObj.isRunning = false;
		}
	}
	else dataObj.mashCounter--;
}
