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
  ExtendedGamepadButton,
} from "babylonjs";
import { TextBlock, AdvancedDynamicTexture } from "babylonjs-gui";
import { addLabelToScene, updateScore } from "./score";
import * as cannon from "cannon";

import { createBoxEnv } from "./envBox";
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
let attempts = 0;
let gameText = new TextBlock();

function createScene(): Scene {
  scene = new Scene(engine);
  //create camera
  camera = new FreeCamera("camera", new Vector3(0, 0, -10), scene);
  camera.attachControl(canvas, true);
  //camera.inputs.clear();

  //add physics engine
  var cannonPlugin = new CannonJSPlugin(true, 10, cannon);
  scene.enablePhysics(new Vector3(0, 0, 0), cannonPlugin);

  snake = createSnake(scene);
  var vrHelper = scene.createDefaultVRExperience();

  //create box environment
  createBoxEnv(scene, snake);
  addLabelToScene();
  registerSnakeController(vrHelper);

  gameText.text = "Press right trigger to play game";
  gameText.color = "white";
  gameText.fontSize = 25;
  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "helperText",
    true
  );
  advancedTexture.addControl(gameText);
  return scene;
}

var startGame = () => {
  if (attempts > 0) {
    attempts++;
    snake.isVisible = true;
    snake = createSnake(scene);
  }
  //reset score
  updateScore(0);
  //start movement
  isGameActive = true;
  addNom(scene, snake, snakeSpeed);
  //addAppleNom(scene);
  //addGrapesNom(scene);
  //addOrangeNom(scene);
  gameText.isVisible = false;
};

export function stopGame() {
  isGameActive = false;
  updateScore(0);
  gameText.isVisible = true;
  gameText.text = "Game Over. Press right trigger to try again!";
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
    webVRController.onTriggerStateChangedObservable.add(
      (trigger: ExtendedGamepadButton) => {
        if (webVRController.hand == "right") {
          if (trigger.pressed && !isGameActive) {
            startGame();
          }
        }
      }
    );
    webVRController.onPadValuesChangedObservable.add(
      (stickValues: StickValues) => {
        if (webVRController.hand == "right") {
          if (stickValues.y < 0) {
            console.log("move up");
            Animation.CreateAndStartAnimation(
              "anim",
              snake,
              "position",
              snakeSpeed,
              100,
              snake.position,
              new Vector3(0, 0, 100),
              Animation.ANIMATIONLOOPMODE_CONSTANT
            );
          } else if (stickValues.y > 0 && stickValues.x < 0) {
            console.log("move down");
            Animation.CreateAndStartAnimation(
              "anim",
              snake,
              "position",
              snakeSpeed,
              100,
              snake.position,
              new Vector3(0, 0, -100),
              Animation.ANIMATIONLOOPMODE_CONSTANT
            );
          }
          console.log("right hand joystick");
        } else if ((webVRController.hand = "left")) {
          console.log("left hand joystick");
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
          //move up
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
