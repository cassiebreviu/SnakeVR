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
  AnimationPropertiesOverride,
  ExecuteCodeAction,
  ActionManager,
  PointerDragBehavior,
  PhysicsImpostor,
} from "babylonjs";

export function createSnake(scene: Scene) {
  var mat1 = new StandardMaterial("mat0", scene);
  mat1.diffuseTexture = new Texture("https://i.imgur.com/3ylrOlA.jpg", scene);
  mat1.diffuseTexture.wrapU = 2;
  mat1.diffuseTexture.wrapV = 4;

  var snake = MeshBuilder.CreateBox(
    "snake01",
    {
      size: 1,
    },
    scene
  );
  snake.material = mat1;

  //add click to change direction of snake
  snake.physicsImpostor = new PhysicsImpostor(
    snake,
    PhysicsImpostor.BoxImpostor,
    { mass: 2, friction: 0, restitution: 0.5 },
    scene
  );

  var overrides = new AnimationPropertiesOverride();

  overrides.enableBlending = true;
  overrides.blendingSpeed = 0.1;

  snake.animationPropertiesOverride = overrides;

  return snake;
}
