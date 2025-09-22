"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventEnableKey4Func = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventEnableKey4Func extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.WI = false;
  }
  ExecuteNew(e, n) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Photograph", 57, "[LevelEventEnableKey4Func]", ["Enable", e.IsEnable], ["FuncKey", e.FuncKey]);
      }
      this.WI = e.IsEnable;
      if (e.FuncKey === 0) {
        ModelManager_1.ModelManager.BattleUiModel.SetTimeDilationSkillButtonEnable(e.IsEnable);
      }
      this.FinishExecute(true);
    } else {
      this.FinishExecute(false);
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(this.WI ? EventDefine_1.EEventName.AddGuaranteeAction : EventDefine_1.EEventName.RemGuaranteeAction, this.Type, this.BaseContext, {
      Name: "DisableKey4Func"
    });
  }
}
exports.LevelEventEnableKey4Func = LevelEventEnableKey4Func;
//# sourceMappingURL=LevelEventEnableKey4Func.js.map