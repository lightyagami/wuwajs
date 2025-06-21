"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventSetSubLevelsVisible = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetSubLevelsVisible extends LevelGeneralBase_1.LevelEventBase {
  ExecuteInGm(e, l) {
    this.ExecuteNew(e, l)
  }
  ExecuteNew(e, l) {
    e && ((e = e) ? ControllerHolder_1.ControllerHolder.SubLevelController.SetSubLevelVisible({
      ActionParams: e,
      Context: l,
      ActionId: this.Id,
      GroupId: this.GroupId,
      FinishCallback: () => {
        this.FinishExecute(!0)
      }
    }) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "执行行为.LevelEventSetSubLevelsVisible 参数不正确"))
  }
}
exports.LevelEventSetSubLevelsVisible = LevelEventSetSubLevelsVisible;
//# sourceMappingURL=LevelEventSetSubLevelsVisible.js.map