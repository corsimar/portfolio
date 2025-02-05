class SimulationWrapper {
  constructor(domElement, height) {
    this.domElement = domElement;
    this.setHeight(height);
  }

  setHeight(height) {
    this.height = height;

    this.domElement.height(this.height);
  }
}
