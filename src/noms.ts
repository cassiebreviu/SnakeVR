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

export function addNom(scene: Scene, snake: Mesh, snakeSpeed: number) {
  //meshName is string name of model file "apple.babylon"
  //var meshOptions = ["grapes.babylon", "apple.babylon", "orange.babylon"];

  var food = addGrapesNom(scene);
  if (food === null) {
    food = MeshBuilder.CreateSphere(
      "sphere1",
      { diameter: 0.4, segments: 16 },
      scene
    );
  }

  var foodMaterial = new StandardMaterial("foodMaterial", scene);
  foodMaterial.diffuseTexture = new Texture(
    "https://i.imgur.com/3MulZNm.png",
    scene
  );
  food.material = foodMaterial;
  food.position = new Vector3(
    Math.random() * 5,
    Math.random() * 5,
    Math.random() * 5
  );

  // Intersections
  food.actionManager = new ActionManager(scene);
  food.actionManager.registerAction(
    new ExecuteCodeAction(
      {
        trigger: ActionManager.OnIntersectionEnterTrigger,
        parameter: snake,
      },
      function () {
        var particleSystem = addParticlesToMesh(food, scene);
        scene.removeMesh(food);
        sleep(250).then(() => {
          removeParticlesFromMesh(particleSystem);
          let currentScore = incrementScore();
          //add new mesh length to snake
          let currentSpeed = snakeSpeed;

          //scale snake box longer here
          snake.scaling.addInPlace(new Vector3(1, 0, 0));
          //increase speed
          snakeSpeed = currentSpeed * 2;
          //add a new nom
          addNom(scene, snake, snakeSpeed);
        });
      }
    )
  );
}
//TODO: get custom mesh to work
function addGrapesNom(scene: Scene): Mesh {
  SceneLoader.ImportMesh("", "/assets/", "grapes.babylon", scene, function (
    grapes
  ) {
    return grapes[0];
  });
  return null;
}

export function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
