import {
  AdvancedDynamicTexture,
  Rectangle,
  Control,
  TextBlock,
} from "babylonjs-gui";

let advancedTexture: AdvancedDynamicTexture;
let scoreText: TextBlock = new TextBlock();
let score = 0;
function init(): void {
  if (!advancedTexture) {
    advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("ui1");
  }
}

export function addLabelToScene(): void {
  if (!advancedTexture) {
    init();
  }
  let label = new Rectangle("score");
  label.background = "black";
  label.height = "30px";
  label.alpha = 0.5;
  label.zIndex = 5;
  label.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
  label.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
  advancedTexture.addControl(label);

  scoreText.text = "score: 0";
  scoreText.color = "white";
  label.addControl(scoreText);
}
export function incrementScore(): number {
  score++;
  scoreText.text = "score: " + score.toString();
  return score;
}

export function updateScore(newScore: number): void {
  score = newScore;
  scoreText.text = "score: " + score.toString();
}
