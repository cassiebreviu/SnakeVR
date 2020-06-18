import {
  Mesh,
  Scene,
  Engine,
  WebVRController,
  ExtendedGamepadButton,
  StickValues,
  Vector3,
  Animation,
  WebXRExperienceHelper,
  WebXRControllerPointerSelection,
  WebXRInputSource,
  WebXRAbstractMotionController,
} from "babylonjs";
import { updateScore } from "./score";
import { createSnake } from "./snake";
import { addNom } from "./noms";
let attempts = 0;
let snakeSpeed = 5;

var startGame = (
  isGameActive: Boolean,
  gameText,
  snake: Mesh,
  scene: Scene
) => {
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

// function registerSnakeController(
//   engine: Engine,
//   snake: Mesh,
//   xrHelper: WebXRExperienceHelper
// ) {
//   let speedDelta = 60 / 1000;
//   let deltaTime = engine.getDeltaTime();
//   let distance = snakeSpeed * speedDelta * deltaTime;
//   var xrController = null;
//   xrController.motionController.onModelLoadedObservable.add((inputSource) => {
//     // webVRController.onTriggerStateChangedObservable.add(
//     // (trigger: ExtendedGamepadButton) => {
//     //   if (webVRController.hand == "right") {
//     //     if (trigger.pressed && !isGameActive) {
//     //       startGame();
//     //     }
//     //   }
//     // }
//     // );
//     xrController.motionController.onPadValuesChangedObservable.add(
//       (stickValues: StickValues) => {
//         if (webVRController.hand == "right") {
//           if (stickValues.y < 0) {
//             console.log("move up");
//             Animation.CreateAndStartAnimation(
//               "anim",
//               snake,
//               "position",
//               snakeSpeed,
//               100,
//               snake.position,
//               new Vector3(0, 0, 100),
//               Animation.ANIMATIONLOOPMODE_CONSTANT
//             );
//           } else if (stickValues.y > 0 && stickValues.x < 0) {
//             console.log("move down");
//             Animation.CreateAndStartAnimation(
//               "anim",
//               snake,
//               "position",
//               snakeSpeed,
//               100,
//               snake.position,
//               new Vector3(0, 0, -100),
//               Animation.ANIMATIONLOOPMODE_CONSTANT
//             );
//           }
//           console.log("right hand joystick");
//         } else if ((webVRController.hand = "left")) {
//           console.log("left hand joystick");
//           console.log("x " + stickValues.x);
//           console.log("y " + stickValues.y);
//           if (stickValues.x > 0 && stickValues.y > 0) {
//             console.log("move right");
//             Animation.CreateAndStartAnimation(
//               "anim",
//               snake,
//               "position",
//               snakeSpeed,
//               100,
//               snake.position,
//               new Vector3(100, 0, 0),
//               Animation.ANIMATIONLOOPMODE_CONSTANT
//             );
//             // Animation.CreateMergeAndStartAnimation(
//             //   "rotAnim",
//             //   snake,
//             //   "rotation",
//             //   1,
//             //   1,
//             //   snake.position,
//             //   new Vector3(0, 200, 0)
//             // );
//           }
//           //move up
//           else if (stickValues.y > 0 && stickValues.x < 0) {
//             console.log("move down");
//             Animation.CreateAndStartAnimation(
//               "anim",
//               snake,
//               "position",
//               snakeSpeed,
//               100,
//               snake.position,
//               new Vector3(0, -100, 0),
//               Animation.ANIMATIONLOOPMODE_CONSTANT
//             );
//           }
//           //move left
//           else if (stickValues.x < 0) {
//             console.log("move left");
//             Animation.CreateAndStartAnimation(
//               "anim",
//               snake,
//               "position",
//               snakeSpeed,
//               100,
//               snake.position,
//               new Vector3(-100, 0, 0),
//               Animation.ANIMATIONLOOPMODE_CONSTANT
//             );
//           }
//         }
//       }
//     );
//   });
//}
