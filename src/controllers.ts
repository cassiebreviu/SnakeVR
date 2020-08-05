import {
  Mesh,
  Scene,
  Engine,
  Vector3,
  Animation,
  StickValues,
} from "babylonjs";
import {
  AdvancedDynamicTexture,
  Rectangle,
  Control,
  TextBlock,
} from "babylonjs-gui";

import { startGame, getGameStatus } from "./game";

let snakeSpeed = 5;

export function registerSnakeController(
  engine: Engine,
  snake: Mesh,
  scene: Scene,
  xrHelper
) {
  xrHelper.input.onControllerAddedObservable.add((inputSource) => {
    inputSource.onMotionControllerInitObservable.add((motionController) => {
      const ids = motionController.getComponentIds();
      console.log(ids);

      var hand = motionController.handness;
      console.log(hand);

      var triggerComponent = motionController.getComponent(
        "xr-standard-trigger"
      );
      var thumbstickComponent = motionController.getComponent(
        "xr-standard-thumbstick"
      );

      triggerComponent.onButtonStateChangedObservable.add((component) => {
        // something changed, check the changes object
        console.log(component);
        var gameStatus = getGameStatus();
        console.log("current game status: " + gameStatus);
        if (component.pressed && hand === "right" && !gameStatus) {
          startGame(snake, scene);
        }
      });

      thumbstickComponent.onAxisValueChangedObservable.add(
        (stickValues: StickValues) => {
          if (hand == "right") {
            console.log("right hand joystick");
            console.log("x " + stickValues.x);
            console.log("y " + stickValues.y);
            //move up
            if (stickValues.y < 0) {
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
            } else if (stickValues.x > 0) {
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
          } else if ((hand = "left")) {
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
            if (stickValues.y < 0 && stickValues.x > 0) {
              console.log("move forward");
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
              console.log("move backward");
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
          }
        }
      );
    });
  });
}
