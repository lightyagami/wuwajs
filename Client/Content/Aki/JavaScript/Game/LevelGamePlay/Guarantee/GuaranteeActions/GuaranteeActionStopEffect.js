"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionStopEffect = undefined;
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionStopEffect extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    if (e && (e.ScreenEffectHandle && ModelManager_1.ModelManager.ScreenEffectModel.EndScreenEffect(e.ScreenEffectHandle), e.EffectId && EffectSystem_1.EffectSystem.StopEffectById(e.EffectId, "[GuaranteeActionStopEffect] 行为树保底销毁特效", true), e.Mp4Name)) {
      ControllerHolder_1.ControllerHolder.VideoBpController.RemoveBp();
    }
  }
  OnClear(e, t) {
    if (t?.Type === 6) {
      t = t.TreeIncId;
      if (!ModelManager_1.ModelManager.GeneralLogicTreeModel.GuaranteeActionsWhenLogicTreeRemove.has(t)) {
        ModelManager_1.ModelManager.GeneralLogicTreeModel.GuaranteeActionsWhenLogicTreeRemove.set(t, []);
      }
      ModelManager_1.ModelManager.GeneralLogicTreeModel.GuaranteeActionsWhenLogicTreeRemove.get(t).push({
        Name: "StopEffect",
        Params: e
      });
    }
  }
}
exports.GuaranteeActionStopEffect = GuaranteeActionStopEffect;
//# sourceMappingURL=GuaranteeActionStopEffect.js.map