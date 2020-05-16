import {
  Scene,
  StandardMaterial,
  Color4,
  Texture,
  MeshBuilder,
  Vector3,
  HemisphericLight,
  PhysicsImpostor,
  VRExperienceHelper,
} from "babylonjs";

export function createBoxEnv(scene: Scene) {
  var top = MeshBuilder.CreatePlane("top", { width: 150, height: 100 }, scene);
  top.position.x = 0;
  top.position.y = 50;
  top.position.z = 0;
  //top.material = groundMaterial;
  top.rotation = Vector3.RotationFromAxis(
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 0.5),
    new Vector3(0, 0.5, 0)
  );
  top.physicsImpostor = new PhysicsImpostor(
    top,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0, friction: 1 },
    scene
  );

  createWall("North", 0, 0, 30, scene);
  createWall("South", 0, 0, -30, scene);
  createWall("East", 30, 0, 0, scene);
  createWall("West", -30, 0, 0, scene);

  var light = new HemisphericLight("HemiLight", new Vector3(0, 5, 5), scene);
  light.intensity = 5;
}

//helper function to create walls
function createWall(
  direction: string,
  positionX: number,
  positionY: number,
  positionZ: number,
  scene: Scene
) {
  var groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseTexture = new Texture(
    "https://i.imgur.com/bbe1IMe.jpg",
    scene
  );

  var wall = MeshBuilder.CreateBox(
    direction,
    {
      width: 130,
      height: 150,
      depth: 1,
    },
    scene
  );
  wall.position.x = positionX;
  wall.position.y = positionY;
  wall.position.z = positionZ;
  wall.material = groundMaterial;
  if (direction == "East" || direction == "West") {
    //add rotation
    wall.rotation = new Vector3(0, 350, 0);
  }

  wall.physicsImpostor = new PhysicsImpostor(
    wall,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0, friction: 1 },
    scene
  );
}
