"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionUnLimitPlayerOperation = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelEventLockInputState_1 = require("../../LevelEventLockInputState");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionUnLimitPlayerOperation extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(true, true, true, true);
    LevelEventLockInputState_1.LevelEventLockInputState.Unlock();
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    ModelManager_1.ModelManager.BattleUiModel.ChildViewData.ShowBattleView(1);
    ModelManager_1.ModelManager.BattleInputModel.SetAllInputEnable(true, 0);
    LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView = [];
    var r;
    var t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    if (t?.Valid && ((t = t.GetComponent(215))?.HasTag(r = 477750727) && (t.RemoveTag(r), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("Test", 29, "[GuaranteeActionUnLimitPlayerOperation.OnExecute] RemoveTag 禁止冲刺"), t?.HasTag(r = -63548288) && t.RemoveTag(r), t?.HasTag(r = 229513169))) {
      t.RemoveTag(r);
    }
    ModelManager_1.ModelManager.LevelFuncFlagModel.SetFuncFlagEnable(0, true);
  }
}
exports.GuaranteeActionUnLimitPlayerOperation = GuaranteeActionUnLimitPlayerOperation;
//# sourceMappingURL=GuaranteeActionUnLimitPlayerOperation.js.map