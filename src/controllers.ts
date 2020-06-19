import { Mesh, Scene, Engine } from "babylonjs";
import { TextBlock, AdvancedDynamicTexture } from "babylonjs-gui";
import { updateScore } from "./score";
import { createSnake } from "./snake";
import { addNom } from "./noms";
let attempts = 0;
let snakeSpeed = 5;
let isGameActive = false;
let gameText = new TextBlock();

var startGame = (isGameActive: Boolean, snake: Mesh, scene: Scene) => {
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

export function registerSnakeController(
  engine: Engine,
  snake: Mesh,
  scene: Scene,
  xrHelper
) {
  let speedDelta = 60 / 1000;
  let deltaTime = engine.getDeltaTime();
  let distance = snakeSpeed * speedDelta * deltaTime;

  //update text
  gameText.text = "Press right trigger to play game";
  gameText.color = "white";
  gameText.fontSize = 25;
  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "helperText",
    true
  );
  advancedTexture.addControl(gameText);

  xrHelper.input.onControllerAddedObservable.add((inputSource) => {
    inputSource.onMotionControllerInitObservable.add((motionController) => {
      const ids = motionController.getComponentIds();
      console.log(ids);

      const triggerComponent = motionController.getComponent(
        "xr-standard-trigger"
      );

      triggerComponent.onButtonStateChangedObservable.add((component) => {
        // something changed, check the changes object
        console.log(component);
        if (component.pressed && !isGameActive) {
          console.log(component.pressed);
          startGame(true, snake, scene);
          isGameActive = true;
        }
      });

      triggerComponent.onAxisValueChangedObservable.add((values) => {
        console.log(values.x, values.y);
      });
    });
  });
  //var webXrInput = new WebXRInput(xrHelper.sessionManager, xrHelper.camera);

  // webXrInput.onControllerAddedObservable.add((inputSource) => {
  //   inputSource.onMotionControllerInitObservable.add((motionController) => {
  //     const ids = motionController.getComponentIds();
  //     console.log(ids);
  //     motionController.onModelLoadedObservable.add((model) => {
  //       model.getComponent("xr-standard-trigger");
  //     });
  //   });
  // });

  //   webXrInput.onControllerAddedObservable.add((inputSource) => {
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
}
