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

import { createSnake } from "./snake";
import { addNom } from "./noms";

var advancedTexture: AdvancedDynamicTexture;
var scoreText = new TextBlock();
var gameText = new TextBlock();
var isGameActive = false;

function init(): void {
  if (!advancedTexture) {
    advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("ui1");
  }
}

export function startGame(snake: Mesh, scene: Scene) {
  isGameActive = true;
  addNom(scene, snake);
  //TODO: Add multiple?
  //addAppleNom(scene);
  //addGrapesNom(scene);
  //addOrangeNom(scene);
  gameText.isVisible = false;
}

export function stopGame() {
  isGameActive = false;
  gameText.isVisible = true;
  gameText.text = "Game Over!";
  //TODO: add refresh to restart
}
export function getGameStatus(): boolean {
  return isGameActive;
}

export function addLabelToScene(): void {
  if (!advancedTexture) {
    init();
  }

  //update text
  gameText.text = "Press trigger to play game";
  gameText.color = "white";
  gameText.fontSize = 25;
  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI(
    "helperText",
    true
  );
  advancedTexture.addControl(gameText);

  let label = new Rectangle("score");
  label.background = "black";
  label.height = "30px";
  label.alpha = 0.5;
  label.zIndex = 5;
  label.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  label.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_LEFT;
  advancedTexture.addControl(label);

  scoreText.text = "score: 0";
  scoreText.color = "white";
  label.addControl(scoreText);
}
export function updateScore(newScore: number): void {
  scoreText.text = "score: " + newScore.toString();
}
