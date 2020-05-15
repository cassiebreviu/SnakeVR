import {
  Scene,
  Vector3,
  MeshBuilder,
  Mesh,
  StandardMaterial,
  Texture,
  SceneLoader,
  ActionManager,
  ExecuteCodeAction,
} from "babylonjs";
import { addParticlesToMesh, removeParticlesFromMesh } from "./particles";
import { incrementScore } from "./score";

// export function addNom(scene: Scene, snake: Mesh) {
//   //meshName is string name of model file "apple.babylon"
//   //var meshOptions = ["grapes.babylon", "apple.babylon", "orange.babylon"];

//   var food = MeshBuilder.CreateSphere(
//     "sphere1",
//     { diameter: 0.4, segments: 16 },
//     scene
//   );

//   food.position = new Vector3(
//     Math.random() * 10 - 5,
//     Math.random() * 10 - 5,
//     Math.random() * 10 - 5
//   );

//   // Intersections
//   food.actionManager = new ActionManager(scene);
//   food.actionManager.registerAction(
//     new ExecuteCodeAction(
//       {
//         trigger: ActionManager.OnIntersectionEnterTrigger,
//         parameter: snake,
//       },
//       function () {
//         var particleSystem = addParticlesToMesh(food, scene);
//         scene.removeMesh(food);
//         sleep(250).then(() => {
//           removeParticlesFromMesh(particleSystem);
//           incrementScore();
//           //add new mesh length to snake

//           //increase speed
//           //add a new nom
//           addNom(scene, snake);
//         });
//       }
//     )
//   );
// }
//TODO: get custom mesh to work
export function addGrapesNom(scene: Scene) {
  SceneLoader.ImportMesh(
    "",
    "/assets/grapes/",
    "grapes.babylon",
    scene,
    function (grapes) {}
  );
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
