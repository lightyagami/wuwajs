"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
class AiWeaponBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static CharacterRequestPickUpAiWeapon(e, r) {
    ModelManager_1.ModelManager.AiWeaponModel.Net.SendHoldWeaponPush(e, r);
  }
}
exports.default = AiWeaponBlueprintFunctionLibrary;
//# sourceMappingURL=AiWeaponBlueprintFunctionLibrary.js.map