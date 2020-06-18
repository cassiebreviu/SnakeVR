import {
  Scene,
  Vector3,
  Engine,
  Mesh,
  FreeCamera,
  CannonJSPlugin,
  HemisphericLight,
  MeshBuilder,
  SceneComponentConstants,
} from "babylonjs";

import { addLabelToScene, updateScore } from "./score";
import { createSnake } from "./snake";
import { addNom } from "./noms";
import { SetUpEnvironment } from "./envBox";
import * as cannon from "cannon";

// Get the canvas DOM element
var canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
var engine: Engine = null;
var scene: Scene = null;
var sceneToRender: Scene = null;
var createDefaultEngine = function () {
  return new Engine(canvas, true, {
    preserveDrawingBuffer: true,
    stencil: true,
  });
};
let camera = null;
let snake: Mesh = null;
var xrHelper = null;

var createScene = async () => {
  scene = new Scene(engine);
  //create camera
  camera = new FreeCamera("camera", new Vector3(0, 0, -10), scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvas, true);
  var light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  //const env = scene.createDefaultEnvironment();
  xrHelper = await scene.createDefaultXRExperienceAsync({});
  xrHelper.teleportation.detach();
  xrHelper.pointerSelection.detach();

  //add physics engine
  var cannonPlugin = new CannonJSPlugin(true, 10, cannon);
  scene.enablePhysics(new Vector3(0, 0, 0), cannonPlugin);
  snake = createSnake(scene);
  SetUpEnvironment(scene, snake, engine, xrHelper);
  return scene;
};

try {
  engine = createDefaultEngine();
} catch (e) {
  console.log(
    "the available createEngine function failed. Creating the default engine instead"
  );
  engine = createDefaultEngine();
}
if (!engine) throw "engine should not be null.";
createScene().then((returnedScene) => {
  sceneToRender = returnedScene;
});

engine.runRenderLoop(function () {
  if (sceneToRender) {
    sceneToRender.render();
  }
});

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});
