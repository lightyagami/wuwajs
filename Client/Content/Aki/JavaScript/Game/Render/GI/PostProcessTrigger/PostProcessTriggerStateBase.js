"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const StateBase_1 = require("../../../../Core/Utils/StateMachine/StateBase");
const RenderModuleController_1 = require("../../Manager/RenderModuleController");
class PostProcessTriggerStateBase extends StateBase_1.StateBase {
  OnEnter(e) {}
  OnUpdate(e) {}
  OnExit(e) {}
  GetTargetDefaultValue() {
    var e = this.Owner.GetWuYinQuBattleState();
    var t = this.Owner.GetWuYinQuBattleKey();
    if (e === 0 || e === 4) {
      if (RenderModuleController_1.RenderModuleController.GetIdleClearAtmosphere(this.Owner.GetWuYinQuBattleKey())) {
        return 0;
      } else {
        return 1;
      }
    } else if ((e === 1 || e === 2 || e === 3) && e === RenderModuleController_1.RenderModuleController.GetCurrentKeyState(t)) {
      return 1;
    } else {
      return 0;
    }
  }
}
exports.default = PostProcessTriggerStateBase;
//# sourceMappingURL=PostProcessTriggerStateBase.js.map