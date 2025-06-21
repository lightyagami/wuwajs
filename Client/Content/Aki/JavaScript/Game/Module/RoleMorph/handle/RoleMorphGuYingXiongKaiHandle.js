"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RoleMorphGuYingXiongKaiHandle = void 0;
const ModelManager_1 = require("../../../Manager/ModelManager"),
  RoleMorphHandleBase_1 = require("./RoleMorphHandleBase");
class RoleMorphGuYingXiongKaiHandle extends RoleMorphHandleBase_1.RoleMorphHandleBase {
  BeginMorph() {
    ModelManager_1.ModelManager.TrackModel.SetForceCloseTracked(!0);
    var e = [447171607, 2049999375],
      e = (ModelManager_1.ModelManager.BattleUiModel.SetTagIdJoystickStaticVisible(e), ModelManager_1.ModelManager.BattleUiModel.SetTagIdMoveCursorVisible(e), ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData());
    e && (e.OnlyBattleInput = !0, ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag())
  }
  EndMorph() {
    ModelManager_1.ModelManager.TrackModel.SetForceCloseTracked(!1);
    var e = ModelManager_1.ModelManager.BattleUiModel.GetCurRoleData();
    e && (e.OnlyBattleInput = !1, ModelManager_1.ModelManager.InputDistributeModel.RefreshInputDistributeTag())
  }
}
exports.RoleMorphGuYingXiongKaiHandle = RoleMorphGuYingXiongKaiHandle;
//# sourceMappingURL=RoleMorphGuYingXiongKaiHandle.js.map