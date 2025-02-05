// SIMULATION DEFAULT VARIABLES
var numberOfElements = 80;
var numberOfElementsPerRow = 10;
var center = [0, 0],
  gap = [12, 12],
  edgeOffset = 20;
var separationRadius = 12,
  separationWeight = 1.5; // 1.5
var alignmentRadius = 40, // 20
  alignmentWeight = 1.5;
var cohesionRadius = 30, // 20
  cohesionWeight = 0.05; // 0.05
var SIMULATION_SPEED = 1.2,
  FRAMES_PER_SECOND = 60;

// CONSTANTS
const MINIMUM_WRAPPER_HEIGHT = 300,
  MAXIMUM_WRAPPER_HEIGHT = 1000,
  WRAPPER_HEIGHT_STEP = 50;
const MINIMUM_ELEMENTS = 30,
  MAXIMUM_ELEMENTS = 150;

// Inputs
var separationRadiusInp, alignmentRadiusInp, cohesionRadiusInp;
var separationWeightInp, alignmentWeightInp, cohesionWeightInp;

function initInputs() {
  separationRadiusInp = $("#separationRadius");
  alignmentRadiusInp = $("#alignmentRadius");
  cohesionRadiusInp = $("#cohesionRadius");

  separationWeightInp = $("#separationWeight");
  alignmentWeightInp = $("#alignmentWeight");
  cohesionWeightInp = $("#cohesionWeight");
}

function fillInputs() {
  separationRadiusInp.val(separationRadius);
  alignmentRadiusInp.val(alignmentRadius);
  cohesionRadiusInp.val(cohesionRadius);

  separationWeightInp.val(separationWeight);
  alignmentWeightInp.val(alignmentWeight);
  cohesionWeightInp.val(cohesionWeight);
}

function updateParameters(event) {
  if (event.target.id === "separationRadius")
    separationRadius = parseInt(separationRadiusInp.val());
  else if (event.target.id === "alignmentRadius")
    alignmentRadius = parseInt(alignmentRadiusInp.val());
  else if (event.target.id === "cohesionRadius")
    cohesionRadius = parseInt(cohesionRadiusInp.val());
  else if (event.target.id === "separationWeight")
    separationWeight = parseFloat(separationWeightInp.val());
  else if (event.target.id === "alignmentWeight")
    alignmentWeight = parseFloat(alignmentWeightInp.val());
  else if (event.target.id === "cohesionWeight")
    cohesionWeight = parseFloat(cohesionWeightInp.val());
}

function expandWrapperHeight() {
  let newHeight = simulationWrapper.height + WRAPPER_HEIGHT_STEP;

  if (newHeight <= MAXIMUM_WRAPPER_HEIGHT)
    simulationWrapper.setHeight(newHeight);
}

function shrinkWrapperHeight() {
  let newHeight = simulationWrapper.height - WRAPPER_HEIGHT_STEP;

  if (newHeight >= MINIMUM_WRAPPER_HEIGHT)
    simulationWrapper.setHeight(newHeight);
}

function addElement() {
  if (elements.length >= MAXIMUM_ELEMENTS) return;

  spawnElement(elements.length);
}

function removeElement() {
  if (elements.length <= MINIMUM_ELEMENTS) return;

  removeLastElement();
}

$(document).ready(function () {
  initInputs();
  fillInputs();
});
