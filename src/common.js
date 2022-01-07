//This file is made to convert component methods into pure functions. Work in progress.

function addIngredient(event, ingredientOrder, ingredientList, isCorrectOrder, hopValues) {
    if (!ingredientList.add) {
        isCorrectOrder = true;
    }

    if (isCorrectOrder) {
        hopValues(ingredientOrder);
        event.target.innerHTML = "Done";
    }
}

function incrementHopValues(ingredientOrder) {
  if (
    ingredientOrder == "start" &&
    this.startHops.added < this.startHops.total
  )
    this.startHops.added++;
  else if (
    ingredientOrder == "middle" &&
    this.middleHops.added < this.middleHops.total
  )
    this.middleHops.added++;
  else if (
    ingredientOrder == "end" &&
    this.endHops.added < this.endHops.total
  )
    this.endHops.added++;
}

function checkIfCorrectOrder(ingredientOrder) {
  if (ingredientOrder == "start") return true;
  else if (ingredientOrder == "middle") {
      if(this.startHops.added == this.startHops.total) return true;
  }
  else if (ingredientOrder == "end") {
      if(this.startHops.added == this.startHops.total && this.middleHops.added == this.middleHops.total) return true;
  }
  return false;
}
