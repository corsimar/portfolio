function computeDistance(vector1, vector2) {
    return Math.sqrt((vector2.x - vector1.x) * (vector2.x - vector1.x) + (vector2.y - vector1.y) * (vector2.y - vector1.y));
}

function subtractVectors(vector1, vector2) {
    return new Vector(vector1.x - vector2.x, vector1.y - vector2.y);
}

function radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    multiplyByScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }

    divideByScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
    }

    velocityMagnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize() {
        var magnitude = this.velocityMagnitude();

        if (!isNaN(magnitude)) {
            this.x /= magnitude;
            this.y /= magnitude;
        }
    }
}