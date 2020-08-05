import {
  Scene,
  StandardMaterial,
  Color3,
  Texture,
  MeshBuilder,
  SkeletonViewer,
  Engine,
  Mesh,
  FreeCamera,
  StickValues,
  AnimationPropertiesOverride,
  ExecuteCodeAction,
  ActionManager,
  Skeleton,
  PhysicsImpostor,
  Bone,
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

  //var overrides = new AnimationPropertiesOverride();
  //overrides.loopMode =
  //overrides.enableBlending = true;

  //overrides.blendingSpeed = 0.1;
  //snake.animationPropertiesOverride = overrides;
  //snake.skeleton = new Skeleton("snakeSkeleton", "1", scene);
  //snake.skeleton.bones = [
  //  new Bone("snakeBones1", snake.skeleton),
  //  new Bone("snakeBones2", snake.skeleton),
  //];
  return snake;
}
