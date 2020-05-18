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

  // //When pointer down event is raised
  // scene.onPointerDown = function (evt, pickResult) {
  //   // if the click hits the ground object, we change the impact position
  //   if (pickResult.hit && isGameActive) {
  //     snake.position.x = pickResult.pickedPoint.x;
  //     snake.position.y = pickResult.pickedPoint.y;
  //     snake.position.z = pickResult.pickedPoint.z;
  //   }
  // };

  var overrides = new AnimationPropertiesOverride();

  overrides.enableBlending = true;
  overrides.blendingSpeed = 0.1;

  snake.animationPropertiesOverride = overrides;

  return snake;
}

/**
 * will attach an own PointerDragBehavoir to a given mesh
 * pointerDragBehavoir can only hold one attached mesh (attachedNode-property),
 * so this function will create 'unique' pointerDragBehavoirs and add them the the mesh
 */
export function attachOwnPointerDragBehavior(mesh) {
  // Create pointerDragBehavior in the desired mode
  var pointerDragBehavior = new PointerDragBehavior({
    dragPlaneNormal: new Vector3(0, 1, 0),
  });

  // If handling drag events manually is desired, set move attached to false
  pointerDragBehavior.moveAttached = false;

  // Use drag plane in world space
  pointerDragBehavior.useObjectOrientationForDragging = false;

  // Listen to drag events
  pointerDragBehavior.onDragStartObservable.add((event) => {
    console.log("startDrag");
  });
  pointerDragBehavior.onDragObservable.add((event) => {
    console.log("drag");

    //attachedNode could be also mesh here again...
    pointerDragBehavior.attachedNode.position.x += event.delta.x;
    pointerDragBehavior.attachedNode.position.z += event.delta.z;
    pointerDragBehavior.attachedNode.position.y += event.delta.y;
  });
  pointerDragBehavior.onDragEndObservable.add((event) => {
    console.log("endDrag");
  });

  mesh.addBehavior(pointerDragBehavior);
}
