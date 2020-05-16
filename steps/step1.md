## Clone starter template project and create scene

First we need to get the base starter project using BabylonJS, [Webpack](https://webpack.js.org/concepts/), and TypeScript

Steps to Run Starter Project and [Git Repo Link](https://github.com/cassieview/babylonjs-webpack-typescript-starter-project)

1. Clone the repo and change directories  
   `git clone https://github.com/cassieview/babylonjs-webpack-typescript-starter-project.git`  
   `cd babylonjs-webpack-typescript-starter-project`
2. Install packages  
   `npm install`
3. Build Project  
   `npm run build`
4. Run the script to test the project  
   `npm start`
5. Open in VS Code  
   `code .`

## Starter project

Let's talk about the starter project

### Simple index.html template

The template includes a canvas which will act as the container for our application.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      html,
      body {
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        text-align: center;
      }

      #renderCanvas {
        width: 100%;
        height: 100%;
        touch-action: none;
      }
    </style>
  </head>

  <body>
    <canvas id="renderCanvas"></canvas>
    <script src="dist/index.js"></script>
  </body>
</html>
```

### The index.ts TypeScript file

The `index.ts` file is the TypeScript file that creates the main scene. When you run `npm run build` it is to compiled to vanilla JavaScript in the dist folder. This is then called with the `script` tag in the `index.html`.

The script source for the game is found in the dist folder. Webpack is an open-source JavaScript module bundler it generates static assets representing those modules. This is what is loaded from the dist folder. WebPack compiles the script down to one source and that is used to serve the game script.

The below script shows how we import the packages needed from BabylonJS to create our game scene. Create the canvas variable and use vanilla JavaScript to grab the renderCanvas canvas tag from the html body section. Then we create the engine variable and pass in the new BabylonJS Engine.

```javascript
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
import * as cannon from "cannon";

//We will create these resources in another step so dont worry about the errors at this point
import { addLabelToScene, updateScore } from "./score";
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
```

Below we have the create scene function. Here we define the `scene`, pass in the `engine`. Then we create a camera. The camera is the point of view of the game player. We are using the [free camera]("https://doc.babylonjs.com/babylon101/cameras#free-camera").

Next we add a simple sphere `mesh` to our scene and set the basic properties such as size, name and the scene we created.

The VR helper adds the VR button to the bottom right of the screen so that a user can enter the game in vr for a web browser.

```javascript
function createScene(): Scene {
  scene = new Scene(engine);
  //create camera
  camera = new FreeCamera("camera", new Vector3(0, 0, -10), scene);
  camera.attachControl(canvas, true);

  //add physics engine
  var cannonPlugin = new CannonJSPlugin(true, 10, cannon);
  scene.enablePhysics(new Vector3(0, 0, 0), cannonPlugin);

  //create box environment
  createBoxEnv(scene);

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
    { mass: 0, friction: 0, restitution: 0 }
  );
  var vrHelper = scene.createDefaultVRExperience({
    createDeviceOrientationCamera: false,
  });
  vrHelper.enableTeleportation({ floorMeshes: [ground] });

  snake = createSnake(scene);
  startGameButton();
  addLabelToScene();
  registerSnakeController(vrHelper);

  return scene;
}

var scene: Scene = createScene();

engine.runRenderLoop(() => {
  scene.render();
});
```

[Next Step ->](step2.md)
