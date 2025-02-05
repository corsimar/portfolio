// CONSTANTS
const SMALL_WRAPPER_HEIGHT = 300,
  MEDIUM_WRAPPER_HEIGHT = 500,
  LARGE_WRAPPER_HEIGHT = 600;
const SMALL_ELEMENT_SIZE = 4,
  MEDIUM_ELEMENT_SIZE = 6,
  LARGE_ELEMENT_SIZE = 8;

// DOM VARIABLES
var simulationWrapper, element, elementsCount;

// ELEMENTS
var elements = [];

function updateSimulation() {
  setInterval(function () {
    for (let i = 0; i < elements.length; i++) {
      // Update each element position
      var aux = $("#element" + elements[i].index);
      var currentPosition = aux.offset();

      var x = currentPosition.left + elements[i].velocity.x;
      var y = currentPosition.top + elements[i].velocity.y;

      $(aux).offset({
        left: x,
        top: y,
      });

      elements[i].position = new Vector(x, y);
    }

    for (let i = 0; i < elements.length; i++) {
      // Compute each element's new parameters
      elements[i].computeParameters();
    }
  }, 1000 / FRAMES_PER_SECOND);
}

function initSimulation() {
  simulationWrapper = new SimulationWrapper(
    $("#simulationWrapper"),
    MEDIUM_WRAPPER_HEIGHT
  );
  element = $("#element");
  elementsCount = $("#elementsCount");

  // Compute the center of the wrapper
  var wrapperPosition = simulationWrapper.domElement.offset();
  center[0] = wrapperPosition.left + simulationWrapper.domElement.width() / 2;
  center[1] = wrapperPosition.top + simulationWrapper.domElement.height() / 2;

  spawnElements();
  updateSimulation();
}

function updateElementsCount() {
  elementsCount.text(elements.length + " elements");
}

function spawnElement(index) {
  var aux = element.clone();

  aux.attr("id", "element" + index);
  aux.attr("hidden", false);

  var x = center[0] + gap[0] * (index % numberOfElementsPerRow);
  var y = center[1] + gap[1] * parseInt(index / numberOfElementsPerRow);
  aux.offset({
    left: x,
    top: y,
  });

  elements.push(new Element(elements.length, [x, y]));

  simulationWrapper.domElement.append(aux);

  updateElementsCount();
}

function removeLastElement() {
  $("#element" + (elements.length - 1)).remove();
  elements.splice(elements.length - 1, 1);

  updateElementsCount();
}

function spawnElements() {
  for (var i = 0; i < numberOfElements; i++) {
    spawnElement(i);
  }
}

$(document).ready(function () {
  initSimulation();
});
