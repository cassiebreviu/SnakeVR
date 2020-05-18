import {
  Scene,
  StandardMaterial,
  ActionManager,
  Texture,
  MeshBuilder,
  Vector3,
  HemisphericLight,
  PhysicsImpostor,
  ExecuteCodeAction,
  Mesh,
} from "babylonjs";

import { addParticlesToMesh } from "./particles";
import { sleep } from "./noms";
import { removeParticlesFromMesh } from "./particles";
import { stopGame } from "./index";

export function createBoxEnv(scene: Scene, snake: Mesh) {
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
    { mass: 0, friction: 0, restitution: 0.5 },
    scene
  );

  createWall("North", 0, 0, 30, scene, snake);
  createWall("South", 0, 0, -30, scene, snake);
  createWall("East", 30, 0, 0, scene, snake);
  createWall("West", -30, 0, 0, scene, snake);

  var light = new HemisphericLight("HemiLight", new Vector3(0, 5, 5), scene);
  light.intensity = 5;
}

//helper function to create walls
function createWall(
  direction: string,
  positionX: number,
  positionY: number,
  positionZ: number,
  scene: Scene,
  snake: Mesh
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
    { mass: 0, restitution: 0.5, friction: 0 },
    scene
  );
  addSnakeInteraction(wall, snake, scene);
}

export function addSnakeInteraction(plane: Mesh, snake: Mesh, scene: Scene) {
  plane.actionManager = new ActionManager(scene);
  plane.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnIntersectionEnterTrigger,
        parameter: snake,
      },
      function () {
        var particleSystem = addParticlesToMesh(snake, scene);
        scene.removeMesh(snake);
        sleep(250).then(() => {
          removeParticlesFromMesh(particleSystem);
          stopGame();
        });
      }
    )
  );
}
