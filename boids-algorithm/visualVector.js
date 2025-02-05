class VisualVector {
    constructor(color, id) {
        this.color = color;
        this.id = id;

        this.domElement = null;
    }

    renderVector(position, angle) {
        // Create the dom element
        if (this.domElement == null) {
            this.domElement = $("#visualVector").clone();
            $("body").append(this.domElement);
        }

        // Set element's id, make it visible and set its color
        this.domElement.attr("id", this.id);
        this.domElement.attr("hidden", false);
        this.domElement.css('background-color', this.color);
        this.domElement.children().eq(0).css('background-color', this.color);
        this.domElement.children().eq(1).css('background-color', this.color);

        this.domElement.css({
            left: position.x,
            top: position.y,
            transform: 'rotate(' + angle + 'deg)'
        });
    }
}