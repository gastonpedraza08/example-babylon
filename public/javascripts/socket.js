const id = uuid.v4();
    let socket = io.connect( "localhost:8080", { query:`id=${id}`,transports: ['websocket'] } );
    socket.on('connect', () => {
      localStorage.setItem('id', id);
      socket.emit('add-cube', { id: id, position: { x: 0, y: 0.75, z: 0} });
    });

    socket.on('get-cubes', data => {
      loadCubes(data)
    })




    function loadCube(sceneP, cube) {
      if (cube.id === id) return null;

      sceneP.meshes.forEach(mesh => {
        if (cube.id === mesh.name) {
          mesh.position = cube.position;
          mesh.rotation = {
            x: cube.rotation._x,
            y: cube.rotation._y,
            z: cube.rotation._z,
          }
          if (cube.key === "w") {
            mesh.animationGroups[3].start();
          } else if (cube.key === "s") {
            //mesh.animationGroups[0].start();
          }
          return;
        }
      })
    }

    function loadCubes(cubes) {
       cubes.forEach(async c => {
        if (c.id !== id ) {
          let personaje;
          let { meshes: newMeshes, animationGroups } = await BABYLON.SceneLoader.ImportMeshAsync(null, "images/", "b.glb", scene);
          
          personaje = BABYLON.MeshBuilder.CreateCapsule("collider", { height: 4, radius: 1.5}, scene);
          personaje.name = c.id;
          personaje.animationGroups = animationGroups;
          personaje.animationGroups[1].play(true);
          personaje.position.y = 0.75;
          personaje.speed = 0.2;
          personaje.frontVector = new BABYLON.Vector3(1, 0, 0);
          personaje.checkCollisions = true;
          personaje.rotationQuaternion = undefined;
          personaje.isVisible = false;

          var playerCollider = newMeshes[1];
          playerCollider.setParent(personaje);
          playerCollider.position = new BABYLON.Vector3(0,0,0);

          personaje.position.y = c.position.y;
          personaje.position.x = c.position.x;
          personaje.position.z = c.position.z;

          personaje.rotation.y = c.rotation.y;
          personaje.rotation.x = c.rotation.x;
          personaje.rotation.z = c.rotation.z;
        }
      })
    }