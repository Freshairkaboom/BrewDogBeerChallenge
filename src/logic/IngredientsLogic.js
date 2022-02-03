export default function addIngredientImpl(dataObj, index) {
  var isCorrectOrder;
  var ingredientOrder;

  if (dataObj.ingredientList[index]) {
    ingredientOrder = dataObj.ingredientList[index].add;
    isCorrectOrder = checkIfCorrectOrder(ingredientOrder, dataObj.hopCounter);
  }
  else isCorrectOrder = false;
  if (!dataObj.isHops) isCorrectOrder = true;

  if (isCorrectOrder) {
    incrementHopValues(ingredientOrder, dataObj.hopCounter);
    dataObj.doneIngredients.push(index);
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
  else if (ingredientOrder == "dry hop") return true;
  return false;
}

function incrementHopValues(ingredientOrder, hopCounter) {
  if (
    ingredientOrder == "start" &&
    hopCounter.startHops.added < hopCounter.startHops.total
  ) {
    hopCounter.startHops.added++;
  }

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

export function getHopsAddTotalsImpl(dataObj) {
  dataObj.hopCounter.startHops = { added: 0, total: 0 };
  dataObj.hopCounter.middleHops = { added: 0, total: 0 };
  dataObj.hopCounter.endHops = { added: 0, total: 0 };

  for (var i = 0; i < dataObj.ingredientList.length; i++) {
    if (dataObj.ingredientList[i].add == "start")
      dataObj.hopCounter.startHops.total++;
    else if (dataObj.ingredientList[i].add == "middle")
      dataObj.hopCounter.middleHops.total++;
    else if (dataObj.ingredientList[i].add == "end")
      dataObj.hopCounter.endHops.total++;
  }
}
