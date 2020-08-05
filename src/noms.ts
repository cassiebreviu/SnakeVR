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
  AbstractMesh,
} from "babylonjs";
import { addParticlesToMesh, removeParticlesFromMesh } from "./particles";
import { updateScore } from "./game";

let score = 0;

export function addNom(scene: Scene, snake: Mesh) {
  //meshName is string name of model file "apple.babylon"
  //var meshOptions = ["grapes.babylon", "apple.babylon", "orange.babylon"];

  addGrapesNom(scene, snake);

  var snakeNom = MeshBuilder.CreateSphere(
    "sphere1",
    { diameter: 0.4, segments: 16 },
    scene
  );

  var foodMaterial = new StandardMaterial("foodMaterial", scene);
  foodMaterial.diffuseTexture = new Texture(
    "https://i.imgur.com/3MulZNm.png",
    scene
  );
  snakeNom.material = foodMaterial;
  snakeNom.position = new Vector3(
    Math.random() * 5,
    Math.random() * 5,
    Math.random() * 5
  );

  // Intersections
  snakeNom.actionManager = new ActionManager(scene);
  snakeNom.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnIntersectionEnterTrigger,
        parameter: snake,
      },
      function () {
        var particleSystem = addParticlesToMesh(snakeNom, scene);
        scene.removeMesh(snakeNom);
        sleep(250).then(() => {
          removeParticlesFromMesh(particleSystem);
          updateScore(score++);

          //scale snake box longer here
          snake.scaling.addInPlace(new Vector3(1, 0, 0));
          //snakeSpeed = currentSpeed * 2;
          //add a new nom
          addNom(scene, snake);
        });
      }
    )
  );
}
//TODO: get custom mesh to work
function addGrapesNom(scene: Scene, snake: Mesh) {
  SceneLoader.ImportMesh("", "/assets/", "grapes.babylon", scene, function (
    grapes
  ) {
    var snakeFood = grapes[0];
    snakeFood.position = new Vector3(
      Math.random() * 5,
      Math.random() * 5,
      Math.random() * 5
    );
    snakeFood.actionManager = new ActionManager(scene);
    snakeFood.actionManager.registerAction(
      new ExecuteCodeAction(
        {
          trigger: ActionManager.OnIntersectionEnterTrigger,
          parameter: snake,
        },
        function () {
          var particleSystem = addParticlesToMesh(snakeFood, scene);
          scene.removeMesh(snakeFood);
          sleep(250).then(() => {
            removeParticlesFromMesh(particleSystem);
          });
        }
      )
    );
  });
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
