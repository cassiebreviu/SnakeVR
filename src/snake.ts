import {
  Scene,
  StandardMaterial,
  Color4,
  Texture,
  MeshBuilder,
  Vector3,
  Engine,
  Mesh,
  FreeCamera,
  StickValues,
  WebVRController,
  ExecuteCodeAction,
  ActionManager,
  PointerDragBehavior,
  PhysicsImpostor,
} from "babylonjs";

import { addParticlesToMesh, removeParticlesFromMesh } from "./particles";
import { incrementScore } from "./score";
import { sleep } from "./noms";

export function createSnake(
  scene: Scene,
  snakeLength: number,
  snakeBody: Array<Mesh>
) {
  var mat1 = new StandardMaterial("mat0", scene);
  mat1.diffuseTexture = new Texture("https://i.imgur.com/3ylrOlA.jpg", scene);
  mat1.diffuseTexture.wrapU = 2;
  mat1.diffuseTexture.wrapV = 4;

  for (let i = 0; i < snakeLength; i++) {
    var snakeLink = MeshBuilder.CreateBox(
      "snake01",
      {
        size: 1,
      },
      scene
    );
    snakeLink.material = mat1;
    snakeLink.position.y = i;
    snakeBody.push(snakeLink);
  }
  var snake = Mesh.MergeMeshes(snakeBody);

  //add click to change direction of snake
  snake.physicsImpostor = new PhysicsImpostor(
    snake,
    PhysicsImpostor.BoxImpostor,
    { mass: 1, friction: 0 },
    scene
  );

  // //When pointer down event is raised
  // scene.onPointerDown = function (evt, pickResult) {
  //   // if the click hits the ground object, we change the impact position
  //   if (pickResult.hit && isGameActive) {
  //     snake.position.x = pickResult.pickedPoint.x;
  //     snake.position.y = pickResult.pickedPoint.y;
  //     snake.position.z = pickResult.pickedPoint.z;
  //   }
  // };

  return snake;
}

export function addNom(scene: Scene, snake: Mesh, snakeSpeed: number) {
  //meshName is string name of model file "apple.babylon"
  //var meshOptions = ["grapes.babylon", "apple.babylon", "orange.babylon"];

  var food = MeshBuilder.CreateSphere(
    "sphere1",
    { diameter: 0.4, segments: 16 },
    scene
  );
  var foodMaterial = new StandardMaterial("foodMaterial", scene);
  foodMaterial.diffuseTexture = new Texture(
    "https://i.imgur.com/3MulZNm.png",
    scene
  );
  food.material = foodMaterial;
  food.position = new Vector3(Math.random(), Math.random(), Math.random());

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
          var snakeLink = MeshBuilder.CreateBox(
            "snake01",
            {
              size: 1,
            },
            scene
          );
          //TODO: stop snake movement to add mesh
          let currentSpeed = snakeSpeed;
          snakeSpeed = 0;
          snakeLink.position.x = snake.position.x + currentScore;
          snakeLink.position.y = snake.position.y;
          snakeLink.position.z = snake.position.z;
          snake.addChild(snakeLink);

          //increase speed
          snakeSpeed = currentSpeed * 2;
          //add a new nom
          addNom(scene, snake, snakeSpeed);
        });
      }
    )
  );
}

/**
 * will attach an own PointerDragBehavoir to a given mesh
 * pointerDragBehavoir can only hold one attached mesh (attachedNode-property),
 * so this function will create 'unique' pointerDragBehavoirs and add them the the mesh
 */
export function attachOwnPointerDragBehavior(mesh) {
  // Create pointerDragBehavior in the desired mode
  var pointerDragBehavior = new PointerDragBehavior({
    dragPlaneNormal: new Vector3(0, 1, 0),
  });

  // If handling drag events manually is desired, set move attached to false
  pointerDragBehavior.moveAttached = false;

  // Use drag plane in world space
  pointerDragBehavior.useObjectOrientationForDragging = false;

  // Listen to drag events
  pointerDragBehavior.onDragStartObservable.add((event) => {
    console.log("startDrag");
  });
  pointerDragBehavior.onDragObservable.add((event) => {
    console.log("drag");

    //attachedNode could be also mesh here again...
    pointerDragBehavior.attachedNode.position.x += event.delta.x;
    pointerDragBehavior.attachedNode.position.z += event.delta.z;
    pointerDragBehavior.attachedNode.position.y += event.delta.y;
  });
  pointerDragBehavior.onDragEndObservable.add((event) => {
    console.log("endDrag");
  });

  mesh.addBehavior(pointerDragBehavior);
}
