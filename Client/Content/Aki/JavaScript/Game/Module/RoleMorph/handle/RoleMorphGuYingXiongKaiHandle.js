"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleMorphGuYingXiongKaiHandle = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoleMorphHandleBase_1 = require("./RoleMorphHandleBase");
class RoleMorphGuYingXiongKaiHandle extends RoleMorphHandleBase_1.RoleMorphHandleBase {
  BeginMorph() {
    ModelManager_1.ModelManager.TrackModel.SetForceCloseTracked(true);
    var e = [447171607, 2049999375];
    ModelManager_1.ModelManager.BattleUiModel.SetTagIdJoystickStaticVisible(e);
    ModelManager_1.ModelManager.BattleUiModel.SetTagIdMoveCursorVisible(e);
  }
  EndMorph() {
    ModelManager_1.ModelManager.TrackModel.SetForceCloseTracked(false);
  }
}
exports.RoleMorphGuYingXiongKaiHandle = RoleMorphGuYingXiongKaiHandle;
//# sourceMappingURL=RoleMorphGuYingXiongKaiHandle.js.map