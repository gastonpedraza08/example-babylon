class Cube {

    constructor( id, position, rotation ) {

        this.id    = id;
        this.position = position;
        this.rotation = rotation;
    }
    
    setPosition(newPosition) {
        this.position = newPosition.position;
        this.rotation = newPosition.rotation;
    }

}

module.exports = Cube;
