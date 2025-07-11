"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMorphPaoTaiHandle = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoleMorphHandleBase_1 = require("./RoleMorphHandleBase");
class RoleMorphPaoTaiHandle extends RoleMorphHandleBase_1.RoleMorphHandleBase {
  BeginMorph() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
    if (e) {
      e.ControlCameraByMoveAxis = true;
    }
  }
  EndMorph() {
    var e = ModelManager_1.ModelManager.SkillButtonUiModel.GamepadData;
    if (e) {
      e.ControlCameraByMoveAxis = false;
    }
  }
}
exports.RoleMorphPaoTaiHandle = RoleMorphPaoTaiHandle;
//# sourceMappingURL=RoleMorphPaoTaiHandle.js.map