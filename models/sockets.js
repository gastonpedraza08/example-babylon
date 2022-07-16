const CubeList = require('./cube-list.js');
const Cube = require('./cube');

class Sockets {

    constructor( io ) {

        this.io = io;
        this.cubeList = new CubeList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            console.log("conectado", socket.handshake.query.id)
            this.cubeList.addCube(new Cube(socket.handshake.query.id, 
                { x: 0, y: 0.75, z: 0 },
                { x: 0, y: 0, z: 0 },
                ))
            // esto seria para inicializar todos los cubes
            this.io.emit( 'get-cubes' , this.cubeList.getCubes() );

            // move
            socket.on( 'move', ( tank ) => {
                this.io.emit('move-player', tank);
                this.cubeList.updateCube(tank);
            });

            socket.on("disconnect", data => {
                this.cubeList.removeCube(socket.handshake.query.id);
                this.io.emit('remove-cube', socket.handshake.query.id);
            });        
        });
    }


}


module.exports = Sockets;