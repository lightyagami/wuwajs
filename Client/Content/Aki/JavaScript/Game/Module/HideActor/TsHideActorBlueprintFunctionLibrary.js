"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const HideActorController_1 = require("./HideActorController");
class TsHideActorBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static HideMesh() {
    HideActorController_1.HideActorController.HideMesh();
  }
  static HideEffect() {
    HideActorController_1.HideActorController.HideEffect();
  }
  static ShowMesh() {
    HideActorController_1.HideActorController.ShowMesh();
  }
  static ShowEffect() {
    HideActorController_1.HideActorController.ShowEffect();
  }
  static HideNpcMesh() {
    HideActorController_1.HideActorController.HideNpcMesh();
  }
  static HideNpcEffect() {
    HideActorController_1.HideActorController.HideNpcEffect();
  }
  static ShowNpcMesh() {
    HideActorController_1.HideActorController.ShowNpcMesh();
  }
  static ShowNpcEffect() {
    HideActorController_1.HideActorController.ShowNpcEffect();
  }
}
exports.default = TsHideActorBlueprintFunctionLibrary;
//# sourceMappingURL=TsHideActorBlueprintFunctionLibrary.js.map