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
}
exports.default = TsHideActorBlueprintFunctionLibrary;
//# sourceMappingURL=TsHideActorBlueprintFunctionLibrary.js.map