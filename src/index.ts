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
  CannonJSPlugin,
  PhysicsImpostor,
} from "babylonjs";
import {
  GUI3DManager,
  StackPanel3D,
  Button3D,
  TextBlock,
  AdvancedDynamicTexture,
  StackPanel,
} from "babylonjs-gui";
import { addLabelToScene, updateScore } from "./score";
import * as cannon from "cannon";

import { createBoxEnv } from "./envBox";
import { createSnake, addNom } from "./snake";

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
//snake globals
let snakeLength = 3;
let snakeBody = Array<Mesh>();
let snakeSpeed = 0.03;

function createScene(): Scene {
  scene = new Scene(engine);
  //create camera
  camera = new FreeCamera("camera", new Vector3(0, 30, -10), scene);
  camera.attachControl(canvas, true);

  //add physics engine
  var cannonPlugin = new CannonJSPlugin(true, 10, cannon);
  scene.enablePhysics(new Vector3(0, 0, 0), cannonPlugin);

  //create box environment
  var vrHelper = createBoxEnv(scene);

  snake = createSnake(scene, snakeLength, snakeBody, snake);
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
  panel.position.y = 30;
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

var stopGame = () => {
  isGameActive = false;
};

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
        //adding this because the on left stick fires for both right and left for some reason
        console.log("x " + stickValues.x);
        console.log("y " + stickValues.y);
        if (stickValues.x > 0) {
          console.log("move right");
          snake.position.x = snake.position.x + distance;
        }
        //move up
        else if (stickValues.y > 0) {
          console.log("move up");
          snake.position.y = snake.position.y + distance;
        }
        //move left
        else if (stickValues.x < 0) {
          console.log("move left");
          snake.position.x = snake.position.x - distance;
        }
        //move down
        else if (stickValues.y < 0) {
          console.log("move down");
          snake.position.y = snake.position.y - distance;
        }
      }
    );
  });
}
