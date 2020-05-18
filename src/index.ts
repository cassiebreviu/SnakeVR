import {
  Scene,
  MeshBuilder,
  Vector3,
  Engine,
  Mesh,
  FreeCamera,
  StickValues,
  WebVRController,
  Animation,
  CannonJSPlugin,
  PhysicsImpostor,
} from "babylonjs";
import { GUI3DManager, StackPanel3D, Button3D, TextBlock } from "babylonjs-gui";
import { addLabelToScene, updateScore } from "./score";
import * as cannon from "cannon";

import { createBoxEnv, addSnakeInteraction } from "./envBox";
import { createSnake } from "./snake";
import { addNom } from "./noms";

// Get the canvas DOM element
var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
// Load the 3D engine
var engine = new Engine(canvas, true, {
  preserveDrawingBuffer: true,
  stencil: true,
});

let camera = null;
let isGameActive = false;
let snake: Mesh = null;
//snake speed is animation frame per second
let snakeSpeed = 5;

function createScene(): Scene {
  scene = new Scene(engine);
  //create camera
  camera = new FreeCamera("camera", new Vector3(0, 0, -10), scene);
  camera.attachControl(canvas, true);

  //add physics engine
  var cannonPlugin = new CannonJSPlugin(true, 10, cannon);
  scene.enablePhysics(new Vector3(0, 0, 0), cannonPlugin);

  snake = createSnake(scene);

  var ground = MeshBuilder.CreateGround(
    "ground",
    { width: 100, height: 100 },
    scene
  );
  //ground.material = groundMaterial;
  ground.rotation = new Vector3(0, 0, 0);
  ground.position.x = 0;
  ground.position.y = -20;
  ground.position.z = 0;
  ground.physicsImpostor = new PhysicsImpostor(
    ground,
    PhysicsImpostor.BoxImpostor,
    { mass: 0, friction: 0.5, restitution: 0 }
  );
  addSnakeInteraction(ground, snake, scene);
  var vrHelper = scene.createDefaultVRExperience({
    createDeviceOrientationCamera: false,
  });
  vrHelper.enableTeleportation({ floorMeshes: [ground] });

  //create box environment
  createBoxEnv(scene, snake);
  startGameButton();
  addLabelToScene();
  registerSnakeController(vrHelper);

  return scene;
}

var startGameButton = () => {
  // Create the 3D UI managers
  var manager = new GUI3DManager(scene);
  // Create a horizontal stack panel
  var panel = new StackPanel3D();
  manager.addControl(panel);

  panel.margin = 0.02;
  panel.position.y = 0;
  var button = new Button3D();
  panel.addControl(button);
  button.onPointerUpObservable.add(function () {
    //reset score
    updateScore(0);
    //start movement
    isGameActive = true;
    addNom(scene, snake, snakeSpeed);
    //addAppleNom(scene);
    //addGrapesNom(scene);
    //addOrangeNom(scene);
    panel.removeControl(button);
  });

  var text1 = new TextBlock();
  text1.text = "Start Game";
  text1.color = "white";
  text1.fontSize = 40;
  button.content = text1;
};

export function stopGame() {
  isGameActive = false;
  updateScore(0);
  //refresh page
}

// call the createScene function
var scene = createScene();
// run the render loop
engine.runRenderLoop(function () {
  scene.render();
});
// the canvas/window resize event handler
window.addEventListener("resize", function () {
  engine.resize();
});

function registerSnakeController(vrHelper) {
  let speedDelta = 60 / 1000;
  let deltaTime = engine.getDeltaTime();
  let distance = snakeSpeed * speedDelta * deltaTime;

  vrHelper.onControllerMeshLoaded.add((webVRController: WebVRController) => {
    webVRController.onPadValuesChangedObservable.add(
      (stickValues: StickValues) => {
        if (webVRController.hand == "right") {
          console.log("right hand trigger");
        } else if ((webVRController.hand = "left")) {
          console.log("left hand triggered");
          console.log("x " + stickValues.x);
          console.log("y " + stickValues.y);
          if (stickValues.x > 0 && stickValues.y > 0) {
            console.log("move right");
            Animation.CreateAndStartAnimation(
              "anim",
              snake,
              "position",
              snakeSpeed,
              100,
              snake.position,
              new Vector3(100, 0, 0),
              Animation.ANIMATIONLOOPMODE_CONSTANT
            );

            // Animation.CreateMergeAndStartAnimation(
            //   "rotAnim",
            //   snake,
            //   "rotation",
            //   1,
            //   1,
            //   snake.position,
            //   new Vector3(0, 200, 0)
            // );
          }
          //move up
          else if (stickValues.y > 0 && stickValues.x < 0) {
            console.log("move down");
            Animation.CreateAndStartAnimation(
              "anim",
              snake,
              "position",
              snakeSpeed,
              100,
              snake.position,
              new Vector3(0, -100, 0),
              Animation.ANIMATIONLOOPMODE_CONSTANT
            );
          }
          //move left
          else if (stickValues.x < 0) {
            console.log("move left");
            Animation.CreateAndStartAnimation(
              "anim",
              snake,
              "position",
              snakeSpeed,
              100,
              snake.position,
              new Vector3(-100, 0, 0),
              Animation.ANIMATIONLOOPMODE_CONSTANT
            );
          }
          //move down
          else if (stickValues.y < 0) {
            console.log("move up");
            Animation.CreateAndStartAnimation(
              "anim",
              snake,
              "position",
              snakeSpeed,
              100,
              snake.position,
              new Vector3(0, 100, 0),
              Animation.ANIMATIONLOOPMODE_CONSTANT
            );
          }
          // var sixDofDragBehavior = new SixDofDragBehavior();
          // snake.addBehavior(sixDofDragBehavior);
        }
      }
    );
  });
}
