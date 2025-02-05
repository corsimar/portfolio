class Element {
  constructor(index, position) {
    this.index = index;
    this.position = new Vector(position[0], position[1]);

    // Assing a random starting velocity
    var randomAngle = Math.random() * 360;
    this.velocity = new Vector(
      Math.cos(radiansToDegrees(randomAngle)),
      Math.sin(radiansToDegrees(randomAngle))
    );
  }

  computeParameters() {
    this.separation = new Vector(0, 0);
    this.alignment = new Vector(0, 0);
    this.cohesion = new Vector(0, 0);
    var alignmentNeighbours = 0,
      cohesionNeighbours = 0;

    for (let i = 0; i < elements.length; i++) {
      if (i == this.index) continue;

      var distance = computeDistance(this.position, elements[i].position);

      if (distance <= separationRadius)
        this.separation.add(
          subtractVectors(this.position, elements[i].position)
        );

      if (distance <= alignmentRadius) {
        this.alignment.add(elements[i].velocity);
        alignmentNeighbours++;
      }

      if (distance <= cohesionRadius) {
        this.cohesion.add(elements[i].position);
        cohesionNeighbours++;
      }
    }

    // Compute the mean
    if (alignmentNeighbours > 0)
      this.alignment.divideByScalar(alignmentNeighbours);

    if (cohesionNeighbours > 0) {
      this.cohesion.divideByScalar(cohesionNeighbours);
      this.cohesion.subtract(this.position);
    }

    // Multiply each parameter with its own weight
    this.separation.multiplyByScalar(separationWeight);
    this.alignment.multiplyByScalar(alignmentWeight);
    this.cohesion.multiplyByScalar(cohesionWeight);

    // Compute the new velocity
    this.velocity.add(this.separation);
    this.velocity.add(this.alignment);
    this.velocity.add(this.cohesion);

    // Normalize the velocity vector
    this.velocity.normalize();

    // Multiply the vector with the simulation speed
    this.velocity.multiplyByScalar(SIMULATION_SPEED);

    // Check if the boids is coming close to an edge
    var x = simulationWrapper.domElement.offset().left;
    var y = simulationWrapper.domElement.offset().top;
    var w = simulationWrapper.domElement.width();
    var h = simulationWrapper.domElement.height();

    if (this.position.x < x + edgeOffset && this.velocity.x < 0) {
      //this.position.add(new Vector(edgeOffset, 0));
      this.velocity.x *= -1;
    }

    if (this.position.x > x + w - edgeOffset && this.velocity.x > 0) {
      //this.position.add(new Vector(-edgeOffset, 0));
      this.velocity.x *= -1;
    }

    if (this.position.y < y + edgeOffset && this.velocity.y < 0) {
      //this.position.add(new Vector(0, edgeOffset));
      this.velocity.y *= -1;
    }

    if (this.position.y > y + h - edgeOffset && this.velocity.y > 0) {
      //this.position.add(new Vector(0, -edgeOffset * 2));
      this.velocity.y *= -1;
    }
  }
}
