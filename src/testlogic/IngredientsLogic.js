export default function addIngredientImpl(ingredientList, hopCounter, index, doneIngredients, checkIfCorrectOrder, incrementHopValues, isHops) {
    var isCorrectOrder;
    var ingredientOrder;

    if (ingredientList[index]) {
      ingredientOrder = ingredientList[index].add;
      isCorrectOrder = checkIfCorrectOrder(ingredientOrder, hopCounter);
    }
    else isCorrectOrder = false;
    if(!isHops) isCorrectOrder = true;

    if (isCorrectOrder) {
      incrementHopValues(ingredientOrder, hopCounter);
      doneIngredients.push(index);
    }
  }

  function checkIfCorrectOrder(ingredientOrder, hopCounter) {
    if (ingredientOrder == "start") return true;
    else if (ingredientOrder == "middle") {
      if (hopCounter.startHops.added == hopCounter.startHops.total)
        return true;
    } else if (ingredientOrder == "end") {
      if (
        hopCounter.startHops.added == hopCounter.startHops.total &&
        hopCounter.middleHops.added == hopCounter.middleHops.total
      )
        return true;
    }
    else if(ingredientOrder == "dry hop") return true;
    return false;
  }

  function incrementHopValues(ingredientOrder, hopCounter) {
    if (
      ingredientOrder == "start" &&
      hopCounter.startHops.added < hopCounter.startHops.total
    )
      hopCounter.startHops.added++;
    else if (
      ingredientOrder == "middle" &&
      hopCounter.middleHops.added < hopCounter.middleHops.total
    )
      hopCounter.middleHops.added++;
    else if (
      ingredientOrder == "end" &&
      hopCounter.endHops.added < hopCounter.endHops.total
    )
      hopCounter.endHops.added++;
  }
