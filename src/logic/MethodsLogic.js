function mashBeer() {

	this.isRunning = !this.isRunning;

	if (this.isRunning) {
		this.$refs.buttonMash.innerHTML = "Running";
		this.startInterval = setInterval(this.mashTimer, 1000);
	}
	if (!this.isRunning) {
		clearInterval(this.startInterval);
		this.$refs.buttonMash.innerHTML = "Paused";
	}
}

function mashTimer() {
	if (this.mashCounter <= 0) {
		clearInterval(this.mashCounter);

		if (this.selectedBeer.method.mash_temp.length == 1) {
			this.$refs.buttonMash.innerHTML = "Done"
			this.isRunning = false;
		}
		else if (
			this.selectedBeer.method.mash_temp.length > 1 &&
			this.currentMashIndex != this.selectedBeer.method.mash_temp.length - 1
		) {
			this.currentMashIndex++;
			this.mashCounter =
				this.selectedBeer.method.mash_temp[this.currentMashIndex].duration * 60;
		} else if (
			this.currentMashIndex >= this.selectedBeer.method.mash_temp.length - 1
		) {
			this.$refs.buttonMash.innerHTML = "Done";
			this.isRunning = false;
		}
	}
	else this.mashCounter--;
}
