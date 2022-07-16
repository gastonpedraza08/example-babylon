const Cube = require('./cube');


class CubeList {

    constructor() {

        this.cubes = [
            //new Cube({ x: 0, y: 0.75, z: 0 }),
            //new Cube({ x: 10, y: 0.75, z: 0 }),
        ];

    }

    addCube( newCube ) {
        this.cubes.push( newCube );
        return this.cubes;
    }

    removeCube( id ) {
        this.cubes = this.cubes.filter( cube => cube.id !== id );
    }


    updateCube ( cube ) {
        this.cubes = this.cubes.map(c => {
            if (c.id === cube.id) {
                return {
                    id: cube.id,
                    position: {
                        x: cube.position._x,
                        y: cube.position._y,
                        z: cube.position._z,
                    },
                    rotation: {
                        x: cube.rotation._x,
                        y: cube.rotation._y,
                        z: cube.rotation._z,
                    },
                };
            } else {
                return c;
            }
        })
    }

    getCubes() {
        return this.cubes;
    }

}


module.exports = CubeList;