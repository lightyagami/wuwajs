"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRefreshInputTag = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../../Game/Global");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelEventLockInputState_1 = require("../LevelEventLockInputState");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRefreshInputTag extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(true, true, true, true);
    LevelEventLockInputState_1.LevelEventLockInputState.Unlock();
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    var r = Global_1.Global.BaseCharacter?.CharacterActorComponent?.Entity;
    var n = 477750727;
    if (r?.Valid && (r = r.GetComponent(206))?.HasTag(n) && (r.RemoveTag(n), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Test", 29, "[LevelEventRefreshInputTag.ExecuteNew] RemoveTag 禁止冲刺");
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, {
      Name: "UnLimitPlayerOperation"
    });
  }
}
exports.LevelEventRefreshInputTag = LevelEventRefreshInputTag;
//# sourceMappingURL=LevelEventRefreshInputTag.js.map